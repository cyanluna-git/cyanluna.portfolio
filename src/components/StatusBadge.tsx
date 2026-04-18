type Status = "live" | "active" | "beta";
type Lang = "en" | "ko";

const statusColors: Record<Status, string> = {
  live: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  active: "bg-blue-500/15 text-blue-400 border-blue-400/20",
  beta: "bg-amber-500/15 text-amber-400 border-amber-500/20",
};

const statusLabels: Record<Status, Record<Lang, string>> = {
  live: { en: "Live", ko: "운영 중" },
  active: { en: "In Development", ko: "개발 중" },
  beta: { en: "Beta", ko: "베타" },
};

export default function StatusBadge({ status, lang }: { status: Status; lang: Lang }) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-medium rounded-full border whitespace-nowrap ${statusColors[status]}`}>
      {status === "live" && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />}
      {statusLabels[status][lang]}
    </span>
  );
}
