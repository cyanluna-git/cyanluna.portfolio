"use client";

import { useRouter } from "next/navigation";
import { startTransition, useState } from "react";

export default function PrivateLogoutButton() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  async function handleLogout() {
    if (isPending) {
      return;
    }

    setIsPending(true);
    try {
      await fetch("/api/privacy/logout", { method: "POST" });
    } finally {
      startTransition(() => {
        router.replace("/privacy/unlock");
        router.refresh();
      });
      setIsPending(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={isPending}
      className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs font-medium text-zinc-300 transition hover:border-zinc-700 hover:bg-zinc-800 hover:text-zinc-100 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isPending ? "Locking..." : "Lock workspace"}
    </button>
  );
}
