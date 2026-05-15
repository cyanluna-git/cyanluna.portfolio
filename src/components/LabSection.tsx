"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type ProjectType = "pitch" | "report" | "demo" | "lab";

interface LabItem {
  slug: string;
  title: string;
  type: ProjectType;
  uploadedAt: string;
  thumbnailUrl: string;
}

interface Props {
  lang: "en" | "ko";
}

const TYPE_COLORS: Record<ProjectType, string> = {
  pitch: "#3B82F6",
  report: "#10B981",
  demo: "#F59E0B",
  lab: "#8B5CF6",
};

const TYPE_LABELS: Record<ProjectType, { en: string; ko: string }> = {
  pitch: { en: "Pitch", ko: "피치" },
  report: { en: "Report", ko: "리포트" },
  demo: { en: "Demo", ko: "데모" },
  lab: { en: "Lab", ko: "랩" },
};

export default function LabSection({ lang }: Props) {
  const [items, setItems] = useState<LabItem[] | null>(null);

  useEffect(() => {
    fetch("/api/admin/projects")
      .then((res) => res.json())
      .then((data: unknown) => {
        if (Array.isArray(data)) {
          setItems(data as LabItem[]);
        } else {
          setItems([]);
        }
      })
      .catch(() => {
        setItems([]);
      });
  }, []);

  // Loading or empty — render nothing
  if (items === null || items.length === 0) {
    return null;
  }

  return (
    <section id="lab" className="border-t border-border px-4 py-12 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h2 className="text-2xl font-bold font-display tracking-tight sm:text-4xl">
            {lang === "ko" ? "랩" : "Lab"}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            {lang === "ko" ? "최근 업로드" : "Recent uploads"}
          </p>
        </div>

        <ul className="divide-y divide-border">
          {items.map((item) => {
            const typeColor = TYPE_COLORS[item.type] ?? TYPE_COLORS.lab;
            const typeLabel =
              (TYPE_LABELS[item.type] ?? TYPE_LABELS.lab)[lang];
            const date = new Date(item.uploadedAt).toLocaleDateString(
              lang === "ko" ? "ko-KR" : "en-US",
            );

            return (
              <li key={item.slug}>
                <Link
                  href={`/projects/${item.slug}`}
                  className="group flex items-center gap-4 py-4 transition-colors hover:bg-surface/50 px-2 rounded-lg -mx-2"
                >
                  {/* Thumbnail — visible on group hover */}
                  <div className="relative h-[45px] w-[80px] shrink-0 overflow-hidden rounded border border-border bg-surface">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.thumbnailUrl}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                    />
                    {/* Placeholder visible when thumbnail not shown */}
                    <div
                      className="absolute inset-0 flex items-center justify-center group-hover:hidden"
                      style={{ backgroundColor: `${typeColor}14` }}
                    >
                      <div
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: typeColor }}
                      />
                    </div>
                  </div>

                  {/* Title */}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground group-hover:text-white transition-colors">
                      {item.title}
                    </p>
                  </div>

                  {/* Type badge */}
                  <span
                    className="shrink-0 rounded px-2 py-0.5 text-xs font-medium"
                    style={{
                      color: typeColor,
                      backgroundColor: `${typeColor}1a`,
                      border: `1px solid ${typeColor}40`,
                    }}
                  >
                    {typeLabel}
                  </span>

                  {/* Date */}
                  <span className="shrink-0 font-mono text-xs text-muted">
                    {date}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
