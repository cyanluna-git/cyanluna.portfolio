import { SLUG_PATTERN } from "@/lib/project-html-blob";
import { messageForCode } from "./error-messages";

export type SlugKind = "empty" | "invalid" | "hardcoded" | "static" | "new";

export interface SlugClassification {
  kind: SlugKind;
  message?: string;
}

export interface SlugClassifyOptions {
  staticSlugs: string[];
  hardcodedSlugs: string[];
}

/** Classify a slug string into one of 5 states for the form UI. */
export function classifySlug(
  slug: string,
  { staticSlugs, hardcodedSlugs }: SlugClassifyOptions,
): SlugClassification {
  if (slug === "") {
    return { kind: "empty" };
  }
  if (!SLUG_PATTERN.test(slug)) {
    return {
      kind: "invalid",
      message: "슬러그 형식이 잘못됐어요. 영소문자/숫자/하이픈, 1~64자.",
    };
  }
  if (hardcodedSlugs.includes(slug)) {
    return {
      kind: "hardcoded",
      message: "이 슬러그는 하드코드 라우트로 보호되어 업로드 불가합니다.",
    };
  }
  if (staticSlugs.includes(slug)) {
    return {
      kind: "static",
      message: "기존 정적 프로젝트와 동일. 업로드 시 blob이 우선 렌더됩니다.",
    };
  }
  return { kind: "new" };
}

// ---------------------------------------------------------------------------

export type FileValidationResult =
  | { ok: true }
  | { ok: false; code: "file_too_large" | "bad_file_type"; message: string };

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

/** Validate a file for the upload form — extension and size checks only. */
export function validateFile(file: Pick<File, "name" | "size"> | null): FileValidationResult {
  if (file === null) {
    return { ok: false, code: "bad_file_type", message: ".html 파일만 업로드할 수 있어요." };
  }
  if (!file.name.toLowerCase().endsWith(".html")) {
    return {
      ok: false,
      code: "bad_file_type",
      message: ".html 파일만 업로드할 수 있어요.",
    };
  }
  if (file.size > MAX_FILE_SIZE) {
    return {
      ok: false,
      code: "file_too_large",
      message: "파일이 5MB를 초과합니다.",
    };
  }
  return { ok: true };
}

// ---------------------------------------------------------------------------

export interface CanSubmitParams {
  token: string;
  slugClass: SlugClassification;
  fileResult: FileValidationResult;
}

/** True only when all three inputs are valid and the slug is not hardcoded. */
export function canSubmit({ token, slugClass, fileResult }: CanSubmitParams): boolean {
  if (!token.trim()) return false;
  if (slugClass.kind !== "static" && slugClass.kind !== "new") return false;
  if (!fileResult.ok) return false;
  return true;
}

// ---------------------------------------------------------------------------

/** Build the multipart FormData payload for the upload endpoint. */
export function buildUploadFormData(slug: string, file: File): FormData {
  const fd = new FormData();
  fd.append("slug", slug);
  fd.append("file", file);
  return fd;
}

// ---------------------------------------------------------------------------

/** Build the Authorization header for the upload endpoint. */
export function buildAuthHeader(token: string): { Authorization: string } {
  return { Authorization: `Bearer ${token}` };
}

// ---------------------------------------------------------------------------

export type UploadResponseResult =
  | { kind: "success"; slug: string; replaced: boolean }
  | { kind: "error"; code: string; message: string; details?: unknown }
  | { kind: "network_error"; message: string };

/**
 * Interpret the fetch response from the upload endpoint.
 * Caller passes the numeric status and the parsed body (or null on parse failure).
 */
export function interpretUploadResponse(
  status: number,
  body: unknown,
): UploadResponseResult {
  if (status === 200) {
    const b = body as Record<string, unknown>;
    if (b && b.ok === true && typeof b.slug === "string") {
      return {
        kind: "success",
        slug: b.slug as string,
        replaced: b.replaced === true,
      };
    }
    return { kind: "network_error", message: "서버 응답이 예상 형식이 아닙니다." };
  }

  if (status >= 400 && status < 600) {
    const b = body as Record<string, unknown> | null;
    const err = b && typeof b === "object" ? (b.error as Record<string, unknown> | undefined) : undefined;
    if (err && typeof err.code === "string") {
      return {
        kind: "error",
        code: err.code,
        message: messageForCode(err.code),
        details: err.details,
      };
    }
    return { kind: "network_error", message: "서버 응답이 예상 형식이 아닙니다." };
  }

  return { kind: "network_error", message: "네트워크 오류가 발생했습니다. 잠시 후 다시 시도하세요." };
}
