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

interface ProjectItem {
  slug: string;
  title: string;
}

interface Props {
  projectList: ProjectItem[];
  uploadedSlugs: string[];
  hardcodedSlugs: string[];
}

type SelectionMode = "list" | "new";

type ProjectStatus = "locked" | "uploaded" | "static";

function getProjectStatus(
  slug: string,
  hardcodedSlugs: string[],
  uploadedSlugs: string[],
): ProjectStatus {
  if (hardcodedSlugs.includes(slug)) return "locked";
  if (uploadedSlugs.includes(slug)) return "uploaded";
  return "static";
}

export default function UploadForm({
  projectList,
  uploadedSlugs,
  hardcodedSlugs,
}: Props) {
  const [token, setToken] = useState("");
  const [mode, setMode] = useState<SelectionMode>("list");
  const [selectedSlug, setSelectedSlug] = useState("");
  const [newSlug, setNewSlug] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<UploadResponseResult | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [cliSlug, setCliSlug] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const slug = mode === "list" ? selectedSlug : newSlug;
  const staticSlugs = projectList.map((p) => p.slug);

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(SESSION_KEY);
      if (saved) setToken(saved);
    } catch {
      // privacy mode
    }
  }, []);

  const handleTokenChange = (val: string) => {
    setToken(val);
    try {
      sessionStorage.setItem(SESSION_KEY, val);
    } catch {}
  };

  const clearToken = () => {
    setToken("");
    try {
      sessionStorage.removeItem(SESSION_KEY);
    } catch {}
  };

  const selectProject = (s: string) => {
    setMode("list");
    setSelectedSlug(s);
    setResult(null);
  };

  const switchToNew = () => {
    setMode("new");
    setSelectedSlug("");
    setResult(null);
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
      } catch {}

      const res = interpretUploadResponse(resp.status, body);
      setResult(res);

      // Mark slug as uploaded after success
      if (res.kind === "success" && mode === "list") {
        setSelectedSlug(res.slug);
      }
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

  // Uploaded slugs that are NOT in projectList (e.g. e2e test uploads)
  const extraUploaded = uploadedSlugs.filter(
    (s) => !projectList.some((p) => p.slug === s) && !hardcodedSlugs.includes(s),
  );

  return (
    <div className="mx-auto max-w-[680px] p-6 font-sans">
      <h1 className="text-foreground mb-1 text-xl font-semibold tracking-tight">
        Admin · Upload
      </h1>
      <p className="text-muted mb-8 text-sm">
        HTML 파일을 업로드하면 <code className="font-mono">/projects/&#123;slug&#125;</code>에 게시됩니다.
      </p>

      {/* ── Result Banner ── */}
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
              <div>{result.replaced ? "기존 콘텐츠 교체됨" : "신규 게시"}</div>
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
                <div className="text-muted font-mono text-xs">{String(result.details)}</div>
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

        {/* ── Project List ── */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-foreground text-sm font-medium">프로젝트 선택</span>
            <button
              type="button"
              onClick={switchToNew}
              className={`text-xs transition-colors ${
                mode === "new"
                  ? "text-accent font-medium"
                  : "text-muted hover:text-foreground"
              }`}
            >
              + 새 슬러그
            </button>
          </div>

          <div className="border-border bg-surface overflow-hidden rounded-lg border">
            <div className="max-h-[320px] overflow-y-auto">
              {/* Known projects */}
              {projectList.map((project) => {
                const status = getProjectStatus(project.slug, hardcodedSlugs, uploadedSlugs);
                const isSelected = mode === "list" && selectedSlug === project.slug;
                const isDisabled = status === "locked";

                return (
                  <button
                    key={project.slug}
                    type="button"
                    disabled={isDisabled}
                    onClick={() => !isDisabled && selectProject(project.slug)}
                    className={`flex w-full items-center justify-between gap-3 border-b px-4 py-2.5 text-left transition-colors last:border-b-0 ${
                      isSelected
                        ? "border-border bg-accent/10"
                        : isDisabled
                        ? "border-border opacity-40 cursor-not-allowed"
                        : "border-border hover:bg-surface-hover cursor-pointer"
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <div className={`truncate text-sm font-medium ${isSelected ? "text-accent" : "text-foreground"}`}>
                        {project.title}
                      </div>
                      <div className="text-muted font-mono text-xs">{project.slug}</div>
                    </div>
                    <div className="flex shrink-0 items-center gap-1.5">
                      {!isDisabled && (
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); setCliSlug(project.slug); }}
                          className="text-muted hover:text-foreground rounded px-1.5 py-0.5 text-xs transition-colors"
                          title="재생성 CLI 명령어 보기"
                        >
                          CLI
                        </button>
                      )}
                      <StatusBadge status={status} />
                    </div>
                  </button>
                );
              })}

              {/* Extra uploaded slugs not in project list */}
              {extraUploaded.map((s) => {
                const isSelected = mode === "list" && selectedSlug === s;
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => selectProject(s)}
                    className={`flex w-full items-center justify-between gap-3 border-b px-4 py-2.5 text-left transition-colors last:border-b-0 ${
                      isSelected
                        ? "border-border bg-accent/10"
                        : "border-border hover:bg-surface-hover cursor-pointer"
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <div className={`truncate text-sm font-medium ${isSelected ? "text-accent" : "text-foreground"}`}>
                        {s}
                      </div>
                      <div className="text-muted font-mono text-xs">{s}</div>
                    </div>
                    <StatusBadge status="uploaded" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* New slug input */}
          {mode === "new" && (
            <div className="pt-1">
              <input
                type="text"
                value={newSlug}
                onChange={(e) => setNewSlug(e.target.value)}
                placeholder="새 슬러그 입력 (예: my-project)"
                autoComplete="off"
                autoFocus
                spellCheck={false}
                className={`border-border bg-surface text-foreground placeholder:text-muted font-mono focus:ring-accent w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-1 ${
                  slugClass.kind === "invalid" || slugClass.kind === "hardcoded"
                    ? "border-red-500 focus:ring-red-500"
                    : ""
                }`}
              />
              {slugClass.message && (
                <p
                  className={`mt-1 text-xs ${
                    slugClass.kind === "invalid" || slugClass.kind === "hardcoded"
                      ? "text-red-600 dark:text-red-400"
                      : "text-yellow-600 dark:text-yellow-400"
                  }`}
                >
                  {slugClass.message}
                </p>
              )}
            </div>
          )}

          {/* Selected slug display */}
          {mode === "list" && selectedSlug && (
            <p className="text-muted text-xs">
              선택됨:{" "}
              <code className="text-foreground font-mono">
                /projects/{selectedSlug}
              </code>
              {uploadedSlugs.includes(selectedSlug) && (
                <span className="ml-2 text-yellow-600 dark:text-yellow-400">→ 교체됩니다</span>
              )}
            </p>
          )}
        </div>

        {/* ── File Drop Zone ── */}
        <div className="space-y-1.5">
          <label className="text-foreground text-sm font-medium">HTML 파일</label>

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
                <p className="text-foreground font-mono text-sm font-medium">{file.name}</p>
                <p className="text-muted text-xs">{formatBytes(file.size)}</p>
              </div>
            ) : (
              <div className="space-y-1">
                <p className="text-muted text-sm">클릭하거나 파일을 여기에 드래그하세요</p>
                <p className="text-muted/60 text-xs">.html, 최대 5MB</p>
              </div>
            )}
          </div>

          {!fileResult.ok && file !== null && (
            <p className="text-xs text-red-600 dark:text-red-400">{fileResult.message}</p>
          )}
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

      {/* ── CLI Modal ── */}
      {cliSlug && (
        <div
          className="bg-background/80 fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setCliSlug(null)}
        >
          <div
            className="border-border bg-surface w-full max-w-md rounded-xl border p-5 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-foreground text-sm font-semibold">재생성 명령어</h2>
              <button
                type="button"
                onClick={() => setCliSlug(null)}
                className="text-muted hover:text-foreground text-xs transition-colors"
              >
                닫기
              </button>
            </div>
            <p className="text-muted mb-4 text-xs">
              Playwright는 서버리스에서 실행 불가. 로컬에서 아래 명령어를 실행하세요.
            </p>
            <div className="space-y-3">
              <CliCommand
                label="① HTML 생성 (전체 슬러그)"
                command="pnpm generate:all-projects-html"
              />
              <CliCommand
                label="② Vercel Blob 업로드"
                command="pnpm seed:project-html"
              />
            </div>
            <p className="text-muted mt-3 text-xs">
              슬러그: <code className="text-foreground font-mono">{cliSlug}</code>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function CliCommand({ label, command }: { label: string; command: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    void navigator.clipboard.writeText(command).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };
  return (
    <div>
      <p className="text-muted mb-1 text-xs">{label}</p>
      <div className="border-border bg-surface-hover flex items-center justify-between gap-2 rounded-md border px-3 py-2">
        <code className="text-foreground font-mono text-xs">{command}</code>
        <button
          type="button"
          onClick={copy}
          className="text-muted hover:text-foreground shrink-0 text-xs transition-colors"
        >
          {copied ? "복사됨" : "복사"}
        </button>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: ProjectStatus }) {
  if (status === "locked") {
    return (
      <span className="shrink-0 rounded px-1.5 py-0.5 text-xs font-medium bg-neutral-100 text-neutral-400 dark:bg-neutral-800 dark:text-neutral-500">
        잠김
      </span>
    );
  }
  if (status === "uploaded") {
    return (
      <span className="shrink-0 rounded px-1.5 py-0.5 text-xs font-medium bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
        업로드됨
      </span>
    );
  }
  return null;
}
