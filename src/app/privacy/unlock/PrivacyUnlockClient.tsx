"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { startTransition, useState } from "react";
import { PRIVACY_ACCESS_ENV_KEY } from "@/lib/privacy-access";

type UnlockError = "invalid_key" | "config_missing" | "network" | "";

function getErrorMessage(error: UnlockError): string {
  switch (error) {
    case "invalid_key":
      return "Base64 access key가 일치하지 않습니다.";
    case "config_missing":
      return `${PRIVACY_ACCESS_ENV_KEY} 가 로컬에 설정되지 않았습니다.`;
    case "network":
      return "로컬 검증 요청에 실패했습니다. 서버 상태를 확인하세요.";
    default:
      return "";
  }
}

export default function PrivacyUnlockClient({
  nextPath,
  configured,
}: {
  nextPath: string;
  configured: boolean;
}) {
  const router = useRouter();
  const [key, setKey] = useState("");
  const [error, setError] = useState<UnlockError>("");
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isPending || !configured) {
      return;
    }

    setIsPending(true);
    setError("");

    try {
      const response = await fetch("/api/privacy/unlock", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ key, nextPath }),
      });

      const payload = (await response.json().catch(() => null)) as
        | { ok?: boolean; error?: UnlockError; nextPath?: string }
        | null;

      if (!response.ok || !payload?.ok) {
        setError(payload?.error ?? "network");
        return;
      }

      startTransition(() => {
        router.replace(payload.nextPath ?? nextPath);
        router.refresh();
      });
    } catch {
      setError("network");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className="min-h-screen px-4 py-10 flex items-center justify-center">
      <div className="w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-950/90 p-8 shadow-2xl shadow-black/30">
        <div className="mb-8">
          <div className="w-14 h-14 rounded-2xl border border-zinc-800 bg-zinc-900 flex items-center justify-center mb-5">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-zinc-400"
            >
              <path d="M12 1v6" />
              <path d="m15.5 4.5-7 7" />
              <path d="M4.5 8.5h6" />
              <rect x="3" y="11" width="18" height="10" rx="2" />
            </svg>
          </div>
          <p className="text-[11px] font-mono uppercase tracking-[0.28em] text-zinc-500 mb-3">
            Private Access
          </p>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-50 mb-2">
            Base64 key required
          </h1>
          <p className="text-sm leading-relaxed text-zinc-400">
            `/privacy` 영역은 로컬에서 생성한 base64 access key를 입력해야만 열립니다.
          </p>
        </div>

        {configured ? (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <label className="block">
              <span className="text-xs font-mono uppercase tracking-[0.24em] text-zinc-500">
                Access Key
              </span>
              <input
                type="password"
                name="privacy-key"
                autoComplete="off"
                spellCheck={false}
                value={key}
                onChange={(event) => setKey(event.target.value)}
                placeholder="Paste local base64 key"
                className="mt-2 w-full rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-100 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </label>

            {error ? (
              <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {getErrorMessage(error)}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={isPending}
              className="w-full rounded-2xl bg-blue-500 px-4 py-3 text-sm font-medium text-white transition hover:bg-blue-400 disabled:cursor-not-allowed disabled:bg-blue-500/60"
            >
              {isPending ? "Verifying..." : "Unlock privacy workspace"}
            </button>
          </form>
        ) : (
          <div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 px-4 py-4 text-sm text-amber-200">
            <p className="font-medium mb-2">Local configuration required</p>
            <p className="leading-relaxed">
              `.env.local` 에 <code className="font-mono">{PRIVACY_ACCESS_ENV_KEY}</code> 를
              설정한 뒤 다시 시도하세요. 예: <code className="font-mono">openssl rand -base64 32</code>
            </p>
          </div>
        )}

        <div className="mt-6 pt-5 border-t border-zinc-900 flex items-center justify-between gap-3 text-xs text-zinc-500">
          <span>Target: {nextPath}</span>
          <Link href="/" className="hover:text-zinc-300 transition-colors">
            Back to portfolio
          </Link>
        </div>
      </div>
    </div>
  );
}
