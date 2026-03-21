import Link from "next/link";
import type { ReactNode } from "react";
import PrivateLogoutButton from "./PrivateLogoutButton";
import PrivateSideNav, { type PrivateNavSection } from "./PrivateSideNav";

export default function PrivateDocumentShell({
  title,
  meta,
  headerExtras,
  sections,
  children,
}: {
  title: string;
  meta?: ReactNode;
  headerExtras?: ReactNode;
  sections: PrivateNavSection[];
  children: ReactNode;
}) {
  return (
    <>
      <PrivateSideNav sections={sections} />

      <div className="max-w-[800px] mx-auto px-6 py-12 privacy-content">
        <div className="mb-8 flex items-center justify-between gap-4 print:hidden">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5" />
              <path d="m12 19-7-7 7-7" />
            </svg>
            Back to portfolio
          </Link>

          <PrivateLogoutButton />
        </div>

        <header className="mb-10 pb-8 border-b border-zinc-800">
          <div className="flex items-start justify-between gap-6">
            <div className="min-w-0 flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
                {title}
              </h1>
              {meta}
            </div>
          </div>
          {headerExtras}
        </header>

        {children}
      </div>
    </>
  );
}
