// @vitest-environment jsdom
import { describe, it, expect, beforeEach, vi, beforeAll } from "vitest";

// Node 22 has a partial built-in localStorage that lacks .clear().
// Stub a full implementation so tests are environment-agnostic.
const makeLocalStorageMock = () => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => { store[key] = value; },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { store = {}; },
    get length() { return Object.keys(store).length; },
    key: (i: number) => Object.keys(store)[i] ?? null,
  };
};

beforeAll(() => {
  vi.stubGlobal("localStorage", makeLocalStorageMock());
});
import {
  STATUS_LABELS,
  STATUS_COLORS,
  pickAnnouncement,
  loadPicks,
  savePicks,
} from "../announcement-picks";
import type { KStartupAnnouncement } from "@/types/announcement";

const MOCK_ITEM: KStartupAnnouncement = {
  pbanc_sn: "12345",
  biz_pbanc_nm: "스타트업 지원 프로그램",
  pbanc_ntrp_nm: "K-Startup",
  supt_regin: "서울",
  pbanc_rcpt_bgng_dt: "2024-01-01",
  pbanc_rcpt_end_dt: "2024-03-31",
  detl_pg_url: "https://example.com",
  supt_biz_clsfc: "예비창업",
};

describe("STATUS_LABELS", () => {
  it("covers all 5 application statuses", () => {
    expect(Object.keys(STATUS_LABELS)).toHaveLength(5);
  });

  it("maps picked to '관심'", () => {
    expect(STATUS_LABELS.picked).toBe("관심");
  });

  it("maps accepted to '합격'", () => {
    expect(STATUS_LABELS.accepted).toBe("합격");
  });
});

describe("STATUS_COLORS", () => {
  it("has color entries for all 5 statuses", () => {
    expect(Object.keys(STATUS_COLORS)).toHaveLength(5);
  });

  it("each entry has border, bg, and text keys", () => {
    for (const entry of Object.values(STATUS_COLORS)) {
      expect(entry).toHaveProperty("border");
      expect(entry).toHaveProperty("bg");
      expect(entry).toHaveProperty("text");
    }
  });
});

describe("pickAnnouncement", () => {
  it("returns a PickedAnnouncement with status=picked", () => {
    const result = pickAnnouncement(MOCK_ITEM);
    expect(result.status).toBe("picked");
  });

  it("copies pbanc_sn from the source item", () => {
    const result = pickAnnouncement(MOCK_ITEM);
    expect(result.pbanc_sn).toBe(MOCK_ITEM.pbanc_sn);
  });

  it("sets pickedAt and statusChangedAt to valid ISO strings", () => {
    const before = new Date().toISOString();
    const result = pickAnnouncement(MOCK_ITEM);
    expect(result.pickedAt >= before).toBe(true);
    expect(result.statusChangedAt >= before).toBe(true);
  });

  it("pickedAt and statusChangedAt are equal on creation", () => {
    const result = pickAnnouncement(MOCK_ITEM);
    expect(result.pickedAt).toBe(result.statusChangedAt);
  });
});

describe("loadPicks / savePicks", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("loadPicks returns empty object when localStorage is empty", () => {
    expect(loadPicks()).toEqual({});
  });

  it("savePicks persists picks and loadPicks restores them", () => {
    const pick = pickAnnouncement(MOCK_ITEM);
    savePicks({ [pick.pbanc_sn]: pick });
    const loaded = loadPicks();
    expect(loaded[pick.pbanc_sn].pbanc_sn).toBe(MOCK_ITEM.pbanc_sn);
    expect(loaded[pick.pbanc_sn].status).toBe("picked");
  });

  it("loadPicks returns empty object on JSON parse error", () => {
    localStorage.setItem("kstartup-announcement-picks", "not-json");
    expect(loadPicks()).toEqual({});
  });
});
