import type {
  ApplicationStatus,
  KStartupAnnouncement,
  PickedAnnouncement,
} from "@/types/announcement";

const PICKS_STORAGE_KEY = "kstartup-announcement-picks";

export const STATUS_LABELS: Record<ApplicationStatus, string> = {
  picked: "관심",
  planning: "지원예정",
  applied: "지원완료",
  accepted: "합격",
  rejected: "탈락",
};

export const STATUS_COLORS: Record<
  ApplicationStatus,
  { border: string; bg: string; text: string }
> = {
  picked: {
    border: "border-blue-500/20",
    bg: "bg-blue-500/10",
    text: "text-blue-300",
  },
  planning: {
    border: "border-amber-500/20",
    bg: "bg-amber-500/10",
    text: "text-amber-300",
  },
  applied: {
    border: "border-violet-500/20",
    bg: "bg-violet-500/10",
    text: "text-violet-300",
  },
  accepted: {
    border: "border-emerald-500/20",
    bg: "bg-emerald-500/10",
    text: "text-emerald-300",
  },
  rejected: {
    border: "border-rose-500/20",
    bg: "bg-rose-500/10",
    text: "text-rose-300",
  },
};

export function loadPicks(): Record<string, PickedAnnouncement> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(PICKS_STORAGE_KEY);
    return raw
      ? (JSON.parse(raw) as Record<string, PickedAnnouncement>)
      : {};
  } catch {
    return {};
  }
}

export function savePicks(picks: Record<string, PickedAnnouncement>): void {
  try {
    localStorage.setItem(PICKS_STORAGE_KEY, JSON.stringify(picks));
  } catch {}
}

export function pickAnnouncement(
  item: KStartupAnnouncement,
): PickedAnnouncement {
  const now = new Date().toISOString();
  return {
    pbanc_sn: item.pbanc_sn,
    biz_pbanc_nm: item.biz_pbanc_nm,
    pbanc_ntrp_nm: item.pbanc_ntrp_nm,
    supt_regin: item.supt_regin,
    pbanc_rcpt_bgng_dt: item.pbanc_rcpt_bgng_dt,
    pbanc_rcpt_end_dt: item.pbanc_rcpt_end_dt,
    detl_pg_url: item.detl_pg_url,
    supt_biz_clsfc: item.supt_biz_clsfc,
    status: "picked",
    pickedAt: now,
    statusChangedAt: now,
  };
}
