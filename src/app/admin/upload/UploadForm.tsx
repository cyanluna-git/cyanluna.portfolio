"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  buildAuthHeader,
  buildUploadFormData,
  canSubmit,
  classifySlug,
  interpretUploadResponse,
  validateFile,
  type SlugClassification,
  type UploadResponseResult,
  type FileValidationResult,
} from "./upload-helpers";

const SESSION_KEY = "admin_upload_token";

interface Props {
  staticSlugs: string[];
  hardcodedSlugs: string[];
}

export default function UploadForm({ staticSlugs, hardcodedSlugs }: Props) {
  const [token, setToken] = useState("");
  const [slug, setSlug] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<UploadResponseResult | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Restore token from sessionStorage on mount
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(SESSION_KEY);
      if (saved) setToken(saved);
    } catch {
      // privacy mode — silent fallback
    }
  }, []);

  // Persist token to sessionStorage on change
  const handleTokenChange = (val: string) => {
    setToken(val);
    try {
      sessionStorage.setItem(SESSION_KEY, val);
    } catch {
      // silent fallback
    }
  };

  const clearToken = () => {
    setToken("");
    try {
      sessionStorage.removeItem(SESSION_KEY);
    } catch {
      // silent
    }
  };

  const applyFile = useCallback((f: File | null) => {
    setFile(f ?? null);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    applyFile(e.target.files?.[0] ?? null);
  };

  const clearFile = () => {
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Drag and drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    applyFile(e.dataTransfer.files[0] ?? null);
  };

  // Derived state
  const slugClass: SlugClassification = classifySlug(slug, { staticSlugs, hardcodedSlugs });
  const fileResult: FileValidationResult = validateFile(file);
  const submitEnabled = canSubmit({ token, slugClass, fileResult }) && !loading;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!submitEnabled || !file) return;

    setLoading(true);
    setResult(null);

    try {
      const fd = buildUploadFormData(slug, file);
      const resp = await fetch("/api/admin/projects/upload", {
        method: "POST",
        headers: buildAuthHeader(token),
        body: fd,
      });

      let body: unknown = null;
      try {
        body = await resp.json();
      } catch {
        // non-JSON body → fallback
      }

      setResult(interpretUploadResponse(resp.status, body));
    } catch {
      setResult({ kind: "network_error", message: "네트워크 오류가 발생했습니다. 잠시 후 다시 시도하세요." });
    } finally {
      setLoading(false);
    }
  };

  const formatBytes = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  };

  return (
    <div className="mx-auto max-w-[640px] p-6 font-sans">
      <h1 className="text-foreground mb-1 text-xl font-semibold tracking-tight">
        Admin · Upload
      </h1>
      <p className="text-muted mb-8 text-sm">
        HTML 파일을 업로드하면 <code className="font-mono">/projects/&#123;slug&#125;</code>에 게시됩니다.
      </p>

      {/* ── Result Banner (above form) ── */}
      {result && (
        <div
          className={`mb-6 rounded-lg border px-4 py-3 text-sm ${
            result.kind === "success"
              ? "border-green-500/30 bg-green-500/10 text-green-700 dark:text-green-400"
              : "border-red-500/30 bg-red-500/10 text-red-700 dark:text-red-400"
          }`}
        >
          {result.kind === "success" ? (
            <div className="space-y-1">
              <div className="font-medium">✓ 업로드 완료</div>
              <div>
                {result.replaced ? "기존 콘텐츠 교체됨" : "신규 게시"}
              </div>
              <a
                href={`/projects/${result.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-accent underline underline-offset-2"
              >
                {result.slug} 페이지 보기 →
              </a>
            </div>
          ) : result.kind === "error" ? (
            <div className="space-y-1">
              <div className="font-medium">업로드 실패</div>
              <div>{result.message}</div>
              {result.details != null && (
                <div className="text-muted font-mono text-xs">
                  {String(result.details)}
                </div>
              )}
            </div>
          ) : (
            <div>
              <span className="font-medium">오류</span> · {result.message}
            </div>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* ── Token ── */}
        <div className="space-y-1.5">
          <label className="text-foreground text-sm font-medium" htmlFor="token">
            관리자 토큰
          </label>
          <div className="flex gap-2">
            <input
              id="token"
              type="password"
              value={token}
              onChange={(e) => handleTokenChange(e.target.value)}
              placeholder="Bearer 토큰 입력"
              autoComplete="off"
              className="border-border bg-surface text-foreground placeholder:text-muted focus:ring-accent flex-1 rounded-md border px-3 py-2 text-sm outline-none focus:ring-1"
            />
            {token && (
              <button
                type="button"
                onClick={clearToken}
                className="border-border text-muted hover:text-foreground rounded-md border px-3 py-2 text-sm transition-colors"
              >
                초기화
              </button>
            )}
          </div>
        </div>

        {/* ── Slug ── */}
        <div className="space-y-1.5">
          <label className="text-foreground text-sm font-medium" htmlFor="slug">
            슬러그
          </label>
          <input
            id="slug"
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="예: my-project-name"
            autoComplete="off"
            spellCheck={false}
            className={`border-border bg-surface text-foreground placeholder:text-muted font-mono focus:ring-accent w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-1 ${
              slugClass.kind === "invalid" || slugClass.kind === "hardcoded"
                ? "border-red-500 focus:ring-red-500"
                : slugClass.kind === "static"
                ? "border-yellow-500/60 focus:ring-yellow-500/60"
                : ""
            }`}
          />
          {slugClass.message && (
            <p
              className={`text-xs ${
                slugClass.kind === "invalid" || slugClass.kind === "hardcoded"
                  ? "text-red-600 dark:text-red-400"
                  : "text-yellow-600 dark:text-yellow-400"
              }`}
            >
              {slugClass.message}
            </p>
          )}
        </div>

        {/* ── File Drop Zone ── */}
        <div className="space-y-1.5">
          <label className="text-foreground text-sm font-medium">
            HTML 파일
          </label>

          <div
            role="button"
            tabIndex={0}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") fileInputRef.current?.click();
            }}
            className={`border-border bg-surface hover:bg-surface-hover cursor-pointer select-none rounded-lg border-2 border-dashed px-4 py-6 text-center transition-colors ${
              isDragging ? "border-accent bg-accent/5" : ""
            } ${!fileResult.ok && file !== null ? "border-red-500/50" : ""}`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="text/html,.html"
              className="hidden"
              onChange={handleFileChange}
              tabIndex={-1}
            />
            {file ? (
              <div className="space-y-1">
                <p className="text-foreground font-mono text-sm font-medium">
                  {file.name}
                </p>
                <p className="text-muted text-xs">{formatBytes(file.size)}</p>
              </div>
            ) : (
              <div className="space-y-1">
                <p className="text-muted text-sm">
                  클릭하거나 파일을 여기에 드래그하세요
                </p>
                <p className="text-muted/60 text-xs">.html, 최대 5MB</p>
              </div>
            )}
          </div>

          {/* File validation feedback */}
          {!fileResult.ok && file !== null && (
            <p className="text-xs text-red-600 dark:text-red-400">
              {fileResult.message}
            </p>
          )}

          {/* File clear button */}
          {file && (
            <button
              type="button"
              onClick={clearFile}
              className="text-muted hover:text-foreground text-xs underline underline-offset-2 transition-colors"
            >
              파일 선택 해제
            </button>
          )}
        </div>

        {/* ── Submit ── */}
        <button
          type="submit"
          disabled={!submitEnabled}
          className={`accent-button w-full rounded-md border px-4 py-2.5 text-sm font-medium transition-colors ${
            !submitEnabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span
                className="border-accent/30 border-t-accent inline-block h-4 w-4 animate-spin rounded-full border-2"
                aria-hidden="true"
              />
              업로드 중…
            </span>
          ) : (
            "업로드"
          )}
        </button>
      </form>
    </div>
  );
}
