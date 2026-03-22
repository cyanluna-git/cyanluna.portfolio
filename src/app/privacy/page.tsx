"use client";

import Link from "next/link";
import { useState, useCallback } from "react";
import { PrivateDocumentShell, type PrivateNavSection } from "@/components/private";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Priority = "즉시" | "단기" | "중기" | "장기";

interface ChecklistItem {
  id: string;
  label: string;
  priority: Priority;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const STORAGE_KEY = "career-assessment-progress";
const LAST_REVIEWED_KEY = "career-assessment-last-reviewed";

const PRIORITY_COLORS: Record<Priority, { bg: string; text: string; border: string }> = {
  "즉시": { bg: "bg-red-500/15", text: "text-red-400", border: "border-red-500/20" },
  "단기": { bg: "bg-amber-500/15", text: "text-amber-400", border: "border-amber-500/20" },
  "중기": { bg: "bg-blue-500/15", text: "text-blue-400", border: "border-blue-500/20" },
  "장기": { bg: "bg-purple-500/15", text: "text-purple-400", border: "border-purple-500/20" },
};

const STRATEGY_PROGRESS: Record<string, { label: string; items: number; description: string }> = {
  A: { label: "스케일 경험 만들기", items: 3, description: "6개월 목표" },
  B: { label: "테스트 전략 강화", items: 4, description: "2주 목표" },
  C: { label: "팀 리더십 간접 증명", items: 4, description: "진행 중" },
  D: { label: "포트폴리오 프레이밍 강화", items: 1, description: "즉시 가능" },
};

const ROADMAP_ITEMS: { priority: Priority; items: ChecklistItem[] }[] = [
  {
    priority: "즉시",
    items: [
      { id: "d-1", label: "전략 D: 주요 프로젝트 3개에 Architecture Decisions 섹션 추가", priority: "즉시" },
      { id: "c-1", label: "전략 C: DevTools 상세 페이지 3개 프레이밍 강화 (팀 도구 → 팀 프로세스)", priority: "즉시" },
    ],
  },
  {
    priority: "단기",
    items: [
      { id: "b-1", label: "전략 B: 포트폴리오에 Playwright e2e + GitHub Actions CI 추가", priority: "단기" },
      { id: "c-2", label: "전략 C: Intersection 섹션에 '팀 AI 도입' 수치 추가", priority: "단기" },
    ],
  },
  {
    priority: "중기",
    items: [
      { id: "a-1", label: "전략 A: Today.Bike 또는 Equipment Gateway에 스케일 레이어 추가", priority: "중기" },
      { id: "a-2", label: "해당 프로젝트 상세 페이지에 부하 테스트 결과 포함", priority: "중기" },
    ],
  },
  {
    priority: "장기",
    items: [
      { id: "a-3", label: "전략 A: 실시간 데이터 스트리밍 프로젝트 or 기존 프로젝트 multi-tenant SaaS 전환", priority: "장기" },
      { id: "blog-1", label: "기술 블로그 시작 (아키텍처 의사결정 과정을 글로 정리)", priority: "장기" },
    ],
  },
];

const REVIEW_CHECKPOINTS: ChecklistItem[] = [
  { id: "rev-apr", label: "2026년 4월: 전략 D + C 완료 확인, 포트폴리오 프레이밍 점검", priority: "단기" },
  { id: "rev-jun", label: "2026년 6월: e2e 테스트 + CI 파이프라인 추가 확인, 스케일 프로젝트 착수 여부", priority: "중기" },
  { id: "rev-sep", label: "2026년 9월: 스케일 경험 프로젝트 완료, 포트폴리오 전체 리프레시", priority: "중기" },
  { id: "rev-dec", label: "2026년 12월: 연간 회고 — 포지셔닝 재평가, 다음 해 방향 설정", priority: "장기" },
];

// ---------------------------------------------------------------------------
// Helper: localStorage
// ---------------------------------------------------------------------------

function loadCheckedState(): Record<string, boolean> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, boolean>) : {};
  } catch {
    return {};
  }
}

function saveCheckedState(state: Record<string, boolean>): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // localStorage unavailable
  }
}

function loadLastReviewed(): string {
  if (typeof window === "undefined") return "";
  try {
    return localStorage.getItem(LAST_REVIEWED_KEY) ?? "";
  } catch {
    return "";
  }
}

function saveLastReviewed(date: string): void {
  try {
    localStorage.setItem(LAST_REVIEWED_KEY, date);
  } catch {
    // localStorage unavailable
  }
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function PriorityTag({ priority }: { priority: Priority }) {
  const c = PRIORITY_COLORS[priority];
  return (
    <span className={`inline-flex items-center px-2 py-0.5 text-[11px] font-medium rounded-full border ${c.bg} ${c.text} ${c.border}`}>
      {priority}
    </span>
  );
}

function Checkbox({
  id,
  label,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  checked: boolean;
  onChange: (id: string, checked: boolean) => void;
}) {
  return (
    <label className="flex items-start gap-3 cursor-pointer group py-1.5">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(id, e.target.checked)}
        className="mt-0.5 w-4 h-4 rounded border-2 border-zinc-600 bg-transparent checked:bg-blue-500 checked:border-blue-500 cursor-pointer accent-blue-500 shrink-0"
      />
      <span className={`text-sm leading-relaxed transition-colors ${checked ? "line-through text-zinc-500" : "text-zinc-300"}`}>
        {label}
      </span>
    </label>
  );
}

function SectionHeader({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2
      id={id}
      className="text-xl font-bold tracking-tight mt-12 mb-6 pl-4 border-l-4 border-blue-500 scroll-mt-24"
    >
      {children}
    </h2>
  );
}

function SubSectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-lg font-semibold tracking-tight mt-8 mb-4 text-zinc-200">
      {children}
    </h3>
  );
}

function Blockquote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="border-l-2 border-zinc-600 pl-4 my-4 text-zinc-400 italic leading-relaxed text-sm">
      {children}
    </blockquote>
  );
}

function StrategyProgressBar({
  strategy,
  checkedState,
}: {
  strategy: string;
  checkedState: Record<string, boolean>;
}) {
  const info = STRATEGY_PROGRESS[strategy];
  const allItems = ROADMAP_ITEMS.flatMap((g) => g.items).filter((item) =>
    item.id.startsWith(strategy.toLowerCase() + "-")
  );
  const relevantItems = strategy === "D" ? allItems : allItems;
  const checked = relevantItems.filter((item) => checkedState[item.id]).length;
  const total = relevantItems.length || info.items;
  const pct = total > 0 ? Math.round((checked / total) * 100) : 0;

  const barColor: Record<string, string> = {
    A: "bg-blue-500",
    B: "bg-amber-500",
    C: "bg-emerald-500",
    D: "bg-purple-500",
  };

  return (
    <div className="flex items-center gap-4 py-2">
      <div className="w-8 h-8 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-sm font-bold font-mono">
        {strategy}
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-medium text-zinc-300">{info.label}</span>
          <span className="text-xs text-zinc-500 font-mono">{checked}/{total}</span>
        </div>
        <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${barColor[strategy]}`}
            style={{ width: `${pct}%` }}
          />
        </div>
        <span className="text-[11px] text-zinc-500 mt-0.5 block">{info.description}</span>
      </div>
    </div>
  );
}

const SECTIONS: PrivateNavSection[] = [
  { id: "sec-1", label: "1. 현재 위치" },
  { id: "sec-2", label: "2. 시장 포지셔닝" },
  { id: "sec-3", label: "3. 보완 전략" },
  { id: "sec-4", label: "4. 로드맵" },
  { id: "sec-5", label: "5. 차별화 메시지" },
  { id: "sec-6", label: "6. 리뷰 체크포인트" },
];

// ---------------------------------------------------------------------------
// Main Page
// ---------------------------------------------------------------------------

export default function PrivacyPage() {
  const [checkedState, setCheckedState] = useState<Record<string, boolean>>(
    () => loadCheckedState()
  );
  const [lastReviewed, setLastReviewed] = useState(() => loadLastReviewed());

  const handleCheck = useCallback((id: string, checked: boolean) => {
    setCheckedState((prev) => {
      const next = { ...prev, [id]: checked };
      saveCheckedState(next);
      return next;
    });
  }, []);

  const handleUpdateReviewDate = useCallback(() => {
    const now = new Date().toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setLastReviewed(now);
    saveLastReviewed(now);
  }, []);

  return (
    <PrivateDocumentShell
      title="Career Assessment & Strategy"
      sections={SECTIONS}
      meta={
        <>
          <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500">
            <span className="font-mono">2026년 3월</span>
            <span className="text-zinc-700">|</span>
            <span>AI (Claude) 기반 객관적 평가</span>
            <span className="text-zinc-700">|</span>
            <span>포트폴리오 26개 태스크 전수 구현 후 코드베이스 기반 분석</span>
          </div>
          <div className="mt-3 flex flex-wrap gap-3">
            <Link
              href="/privacy/founder-programs"
              className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-700 bg-zinc-800/80 px-3 py-1.5 text-xs text-zinc-300 hover:border-zinc-600 hover:text-zinc-100 transition-colors"
            >
              Founder Programs
            </Link>
            <Link
              href="/privacy/announcements"
              className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-700 bg-zinc-800/80 px-3 py-1.5 text-xs text-zinc-300 hover:border-zinc-600 hover:text-zinc-100 transition-colors"
            >
              사업공고 트래커
            </Link>
            <Link
              href="/privacy/my-picks"
              className="inline-flex items-center gap-1.5 rounded-lg border border-violet-500/30 bg-violet-500/5 px-3 py-1.5 text-xs text-violet-300 hover:border-violet-400/40 hover:text-violet-200 transition-colors"
            >
              My Picks
            </Link>
          </div>
        </>
      }
      headerExtras={
        <>
          <div className="mt-4 flex items-center gap-3">
            <span className="text-xs text-zinc-500">
              Last reviewed: {lastReviewed || "—"}
            </span>
            <button
              onClick={handleUpdateReviewDate}
              className="text-[11px] px-2 py-0.5 rounded border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-300 transition-colors cursor-pointer print:hidden"
            >
              Mark as reviewed today
            </button>
          </div>

          <div className="mt-6 p-4 rounded-xl bg-zinc-900 border border-zinc-800">
            <h3 className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-3">Strategy Progress</h3>
            <div className="space-y-2">
              {Object.keys(STRATEGY_PROGRESS).map((key) => (
                <StrategyProgressBar key={key} strategy={key} checkedState={checkedState} />
              ))}
            </div>
          </div>
        </>
      }
    >

        {/* ── Section 1: 현재 위치 ── */}
        <SectionHeader id="sec-1">1. 현재 위치: 솔직한 평가</SectionHeader>

        <SubSectionHeader>Raw Skill Level: 시니어 ~ Staff급 풀스택 엔지니어</SubSectionHeader>

        <h4 className="text-base font-semibold mt-6 mb-3 text-emerald-400">강점 (증거 기반)</h4>

        <div className="space-y-6 text-sm leading-relaxed text-zinc-300">
          <div>
            <p className="font-semibold text-zinc-200 mb-2">① 수직 통합 능력 — 시장에서 거의 유일한 조합</p>
            <ul className="list-disc list-inside space-y-1 text-zinc-400 ml-1">
              <li>PLC 프로토콜(Modbus TCP, OPC-UA, MQTT) → FastAPI → React → Vercel 배포까지 <strong className="text-zinc-200">한 사람이 관통</strong></li>
              <li>OT(Operational Technology)와 IT를 동시에 production-level로 다루는 엔지니어는 극히 드물다</li>
              <li>CPET(심폐운동부하검사)처럼 전문 의료 도메인의 데이터 모델링까지 직접 설계 → <strong className="text-zinc-200">도메인 학습 속도가 빠르다는 증거</strong></li>
            </ul>
          </div>

          <div>
            <p className="font-semibold text-zinc-200 mb-2">② 아키텍처 설계력</p>
            <ul className="list-disc list-inside space-y-1 text-zinc-400 ml-1">
              <li>Equipment Gateway: &ldquo;YAML → auto-generated REST API&rdquo; — configuration-driven architecture의 교과서적 접근</li>
              <li>Resource Board: &ldquo;입력은 쉽게, 분류는 상세히&rdquo; — 설계 철학이 코드에 실제로 반영됨</li>
              <li>단순히 동작하는 코드가 아니라, <strong className="text-zinc-200">왜 이렇게 만들었는지</strong>에 대한 의사결정이 명확함</li>
            </ul>
          </div>

          <div>
            <p className="font-semibold text-zinc-200 mb-2">③ 메타-엔지니어링 (가장 큰 차별점)</p>
            <ul className="list-disc list-inside space-y-1 text-zinc-400 ml-1">
              <li>6-agent AI 파이프라인 직접 설계 및 운용 (Planner/Builder/Shield/Inspector/Ranger/Critic)</li>
              <li>30개+ Claude Code 스킬 시스템 자체 구축</li>
              <li>코드 리뷰 자동화를 Backend/Frontend/PLC 3개 도메인으로 분리</li>
              <li><strong className="text-zinc-200">&ldquo;도구를 만드는 사람 vs 도구를 쓰는 사람&rdquo;</strong> — 이 차이는 Staff+ 엔지니어의 핵심 특성</li>
              <li>Javis를 통한 10명 팀 스프린트 관리 + AI 도입 주도</li>
            </ul>
          </div>

          <div>
            <p className="font-semibold text-zinc-200 mb-2">④ 제품 감각</p>
            <ul className="list-disc list-inside space-y-1 text-zinc-400 ml-1">
              <li>11개 프로덕트가 모두 &ldquo;기술 데모&rdquo;가 아닌 <strong className="text-zinc-200">실제 문제를 해결하는 제품</strong></li>
              <li>4개 vertical(Industrial/Health/Consumer/DevTools)에 걸친 다양한 사용자 맥락 이해</li>
              <li>B2B(제조) + B2C(자전거/금융) + Internal(DevTools) 전부 경험</li>
            </ul>
          </div>
        </div>

        <h4 className="text-base font-semibold mt-8 mb-3 text-red-400">약점 (포트폴리오 기준, 솔직하게)</h4>

        <div className="space-y-6 text-sm leading-relaxed text-zinc-300">
          <div>
            <p className="font-semibold text-zinc-200 mb-2">① 스케일 경험이 포트폴리오에서 안 보인다</p>
            <ul className="list-disc list-inside space-y-1 text-zinc-400 ml-1">
              <li>대부분 사내/소규모 서비스 → 높은 동시접속, 분산 시스템, eventual consistency 경험이 드러나지 않음</li>
              <li>horizontal scaling, sharding, message queue 기반 아키텍처 경험이 포트폴리오에 없음</li>
              <li>글로벌 시장에서 Staff로 바로 포지셔닝할 때 가장 큰 gap</li>
            </ul>
          </div>

          <div>
            <p className="font-semibold text-zinc-200 mb-2">② 테스트 전략이 unit 중심</p>
            <ul className="list-disc list-inside space-y-1 text-zinc-400 ml-1">
              <li>Shield agent가 자동 테스트를 생성하지만, integration/e2e 커버리지가 얇아 보임</li>
              <li>실제 DB를 붙인 통합 테스트, Playwright/Cypress 기반 e2e가 포트폴리오에 드러나지 않음</li>
            </ul>
          </div>

          <div>
            <p className="font-semibold text-zinc-200 mb-2">③ 대규모 팀 리더십이 포트폴리오에서 간접적으로만 보인다</p>
            <ul className="list-disc list-inside space-y-1 text-zinc-400 ml-1">
              <li>실제로는 Javis sprint로 10명 팀 협업 중이지만, 회사 프로젝트라 공개 불가</li>
              <li>포트폴리오만 보면 &ldquo;혼자 만드는 사람&rdquo;으로 보일 수 있음</li>
            </ul>
          </div>
        </div>

        {/* ── Section 2: 시장 포지셔닝 ── */}
        <SectionHeader id="sec-2">2. 시장 포지셔닝</SectionHeader>

        <div className="space-y-6 text-sm leading-relaxed">
          <div>
            <SubSectionHeader>한국 시장: 상위 5~10%</SubSectionHeader>
            <ul className="list-disc list-inside space-y-1 text-zinc-400 ml-1">
              <li>제조업 DX 분야에서 이 조합(스마트팩토리 + 풀스택 + AI 네이티브)을 가진 사람은 <strong className="text-zinc-200">손에 꼽음</strong></li>
              <li>대기업 DX팀, 스마트팩토리 스타트업에서 CTO/Tech Lead 급으로 포지셔닝 가능</li>
              <li>AI 네이티브 도구 구축 경험은 2026년 현재 매우 높은 프리미엄</li>
            </ul>
          </div>

          <div>
            <SubSectionHeader>글로벌 (실리콘밸리 기준): 미드 ~ 시니어</SubSectionHeader>
            <ul className="list-disc list-inside space-y-1 text-zinc-400 ml-1">
              <li>기술적 깊이는 충분하지만, &ldquo;수백만 유저 서빙 경험&rdquo;이 없어 Staff로 바로 가기엔 gap</li>
              <li>하지만 Industrial IoT + AI 조합은 미국에서도 희소 — <strong className="text-zinc-200">도메인 특화</strong> 시장에서는 시니어 이상</li>
            </ul>
          </div>

          <div>
            <SubSectionHeader>가장 경쟁력 있는 포지션 (현재 기준)</SubSectionHeader>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse mt-2">
                <thead>
                  <tr className="text-left text-zinc-500 border-b border-zinc-800">
                    <th className="py-2 pr-4 font-medium">#</th>
                    <th className="py-2 font-medium">포지션</th>
                  </tr>
                </thead>
                <tbody className="text-zinc-300">
                  <tr className="border-b border-zinc-800/50">
                    <td className="py-2.5 pr-4 font-mono text-blue-400">1</td>
                    <td className="py-2.5"><strong>제조업 SaaS 스타트업 CTO / 공동창업자</strong> — 최적 포지션</td>
                  </tr>
                  <tr className="border-b border-zinc-800/50">
                    <td className="py-2.5 pr-4 font-mono text-blue-400">2</td>
                    <td className="py-2.5"><strong>산업 AI 솔루션 회사 Tech Lead</strong> — Siemens, Rockwell 등의 DX 조직</td>
                  </tr>
                  <tr className="border-b border-zinc-800/50">
                    <td className="py-2.5 pr-4 font-mono text-blue-400">3</td>
                    <td className="py-2.5"><strong>버티컬 SaaS 시니어 아키텍트</strong> — MES, QMS, EAM 도메인</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 font-mono text-blue-400">4</td>
                    <td className="py-2.5"><strong>AI-native 개발도구 회사</strong> — Anthropic, Cursor, Vercel 등의 DevEx 영역</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ── Section 3: 보완 전략 ── */}
        <SectionHeader id="sec-3">3. 보완 전략</SectionHeader>

        {/* Strategy A */}
        <SubSectionHeader>전략 A: 스케일 경험 만들기 (6개월)</SubSectionHeader>
        <p className="text-sm text-zinc-400 mb-4">가장 효과적인 방법: 기존 프로젝트에 스케일 레이어 추가</p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="text-left text-zinc-500 border-b border-zinc-800">
                <th className="py-2 pr-4 font-medium">프로젝트</th>
                <th className="py-2 pr-4 font-medium">추가할 것</th>
                <th className="py-2 font-medium">증명되는 역량</th>
              </tr>
            </thead>
            <tbody className="text-zinc-300">
              <tr className="border-b border-zinc-800/50">
                <td className="py-2.5 pr-4 font-mono text-sm">Today.Bike</td>
                <td className="py-2.5 pr-4">실시간 라이더 위치 공유 (WebSocket + Redis pub/sub)</td>
                <td className="py-2.5 text-zinc-400">Real-time at scale, horizontal scaling</td>
              </tr>
              <tr className="border-b border-zinc-800/50">
                <td className="py-2.5 pr-4 font-mono text-sm">Equipment Gateway</td>
                <td className="py-2.5 pr-4">장비 100대 시뮬레이터 + 부하 테스트</td>
                <td className="py-2.5 text-zinc-400">High-throughput IoT data pipeline</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4 font-mono text-sm">AI Kanban Pipeline</td>
                <td className="py-2.5 pr-4">Multi-tenant SaaS 전환 + rate limiting</td>
                <td className="py-2.5 text-zinc-400">SaaS architecture, multi-tenancy</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-zinc-400 mt-4 mb-2"><strong className="text-zinc-300">또는: 하나의 새 프로젝트</strong></p>
        <ul className="list-disc list-inside space-y-1 text-sm text-zinc-400 ml-1">
          <li>실시간 제조 데이터 스트리밍 플랫폼 (Kafka/NATS → InfluxDB → Grafana)</li>
          <li>1만 장비 시뮬레이션으로 부하 테스트 결과까지 포트폴리오에 포함</li>
        </ul>

        {/* Strategy B */}
        <SubSectionHeader>전략 B: 테스트 전략 강화 (2주)</SubSectionHeader>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="text-left text-zinc-500 border-b border-zinc-800">
                <th className="py-2 pr-4 font-medium">액션</th>
                <th className="py-2 font-medium">대상</th>
              </tr>
            </thead>
            <tbody className="text-zinc-300">
              <tr className="border-b border-zinc-800/50">
                <td className="py-2.5 pr-4">Playwright e2e 테스트</td>
                <td className="py-2.5">포트폴리오 사이트 자체 (가장 쉬운 시작점)</td>
              </tr>
              <tr className="border-b border-zinc-800/50">
                <td className="py-2.5 pr-4">Integration test with DB</td>
                <td className="py-2.5">OQC/EOB 시딩 스크립트 → 실제 Docker DB 기동 + 검증</td>
              </tr>
              <tr className="border-b border-zinc-800/50">
                <td className="py-2.5 pr-4">Shield agent 업그레이드</td>
                <td className="py-2.5">e2e 테스트 생성 능력 추가</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4">CI/CD에 테스트 파이프라인 추가</td>
                <td className="py-2.5">GitHub Actions로 PR마다 전체 테스트 실행</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Strategy C */}
        <SubSectionHeader>전략 C: 팀 리더십 간접 증명 (진행 중)</SubSectionHeader>
        <p className="text-sm text-zinc-400 mb-3">현재 Javis로 10명 팀 관리 중. 공개할 수 없으므로:</p>
        <ol className="list-decimal list-inside space-y-1.5 text-sm text-zinc-400 ml-1">
          <li><strong className="text-zinc-300">Javis 상세 페이지</strong>에서 &ldquo;이 도구가 팀에 미친 임팩트&rdquo;를 Before/After로 강조</li>
          <li><strong className="text-zinc-300">Code Review Suite 상세 페이지</strong>에서 &ldquo;리뷰 사이클 단축&rdquo; 메트릭 추가</li>
          <li><strong className="text-zinc-300">Kanban Pipeline 상세 페이지</strong>에서 &ldquo;팀 개발 거버넌스&rdquo; 프레이밍</li>
          <li>About이나 Intersection 섹션에 &ldquo;10인 팀 AI 도입 주도&rdquo; 문구 추가 (회사명 없이)</li>
        </ol>

        {/* Strategy D */}
        <SubSectionHeader>전략 D: 포트폴리오 프레이밍 강화 (즉시 가능)</SubSectionHeader>
        <p className="text-sm text-zinc-400 mb-3">각 프로젝트 상세 페이지에 <strong className="text-zinc-300">&ldquo;Architecture Decisions&rdquo;</strong> 서브섹션 추가:</p>
        <ul className="list-disc list-inside space-y-1 text-sm text-zinc-400 ml-1">
          <li>&ldquo;왜 PostgreSQL? → scale 시 read replica 전략&rdquo;</li>
          <li>&ldquo;왜 FastAPI? → async 기반으로 concurrent connection 처리&rdquo;</li>
          <li>&ldquo;왜 YAML config? → 장비 100대 추가 시 코드 변경 없이 확장&rdquo;</li>
        </ul>
        <Blockquote>
          실제 스케일 경험이 없어도, <strong className="text-zinc-200">스케일을 고려한 의사결정을 했다는 것</strong>을 보여줄 수 있음
        </Blockquote>

        {/* ── Section 4: 우선순위 로드맵 ── */}
        <SectionHeader id="sec-4">4. 우선순위 로드맵</SectionHeader>

        <div className="space-y-8">
          {ROADMAP_ITEMS.map((group) => (
            <div key={group.priority}>
              <div className="flex items-center gap-2 mb-3">
                <PriorityTag priority={group.priority} />
                <span className="text-xs text-zinc-500 font-mono">
                  {group.priority === "즉시" && "(이번 주)"}
                  {group.priority === "단기" && "(1개월)"}
                  {group.priority === "중기" && "(3개월)"}
                  {group.priority === "장기" && "(6개월)"}
                </span>
              </div>
              <div className="pl-2 border-l border-zinc-800">
                {group.items.map((item) => (
                  <Checkbox
                    key={item.id}
                    id={item.id}
                    label={item.label}
                    checked={!!checkedState[item.id]}
                    onChange={handleCheck}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ── Section 5: 핵심 차별화 메시지 ── */}
        <SectionHeader id="sec-5">5. 핵심 차별화 메시지 (면접/네트워킹용)</SectionHeader>

        <SubSectionHeader>30초 엘리베이터 피치</SubSectionHeader>
        <Blockquote>
          &ldquo;저는 공장 PLC부터 소비자 앱까지 혼자 관통하는 풀스택 엔지니어입니다.<br />
          11개 프로덕트를 4개 도메인에서 출시했고,<br />
          6-agent AI 파이프라인으로 개발 프로세스 자체를 자동화합니다.<br />
          제조 DX, SaaS, AI 도구 — 세 세계의 교차점에서 일합니다.&rdquo;
        </Blockquote>

        <SubSectionHeader>영문 버전</SubSectionHeader>
        <Blockquote>
          &ldquo;I&apos;m a full-stack engineer who ships products spanning from factory PLC registers to consumer apps.<br />
          11 products across 4 domains, with a 6-agent AI pipeline that automates the development process itself.<br />
          I work at the intersection of Manufacturing DX, SaaS products, and AI-native tooling.&rdquo;
        </Blockquote>

        <SubSectionHeader>질문 대비</SubSectionHeader>

        <div className="space-y-6 text-sm">
          <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
            <p className="font-semibold text-zinc-200 mb-2">&ldquo;스케일 경험이 있나요?&rdquo;</p>
            <p className="text-zinc-400 leading-relaxed">
              &ldquo;현재 프로젝트들은 사내 도구 중심이라 대규모 트래픽은 아닙니다. 하지만 Equipment Gateway의 configuration-driven 아키텍처는 장비 100대까지 코드 변경 없이 확장 가능하도록 설계했고, Resource Board의 PostgreSQL 쿼리는 만 단위 레코드에서도 인덱스 기반으로 일관된 성능을 유지합니다. 현재 실시간 데이터 스트리밍 확장을 진행 중입니다.&rdquo;
            </p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
            <p className="font-semibold text-zinc-200 mb-2">&ldquo;혼자 일하는 스타일인가요?&rdquo;</p>
            <p className="text-zinc-400 leading-relaxed">
              &ldquo;포트폴리오는 개인 프로젝트 위주이지만, 회사에서는 Javis라는 자체 개발 도구로 10명 팀의 스프린트를 관리하고 있습니다. AI 기반 코드 리뷰 자동화를 팀에 도입해서 리뷰 사이클을 단축했고, 스프린트 리스크 분석도 자동화했습니다.&rdquo;
            </p>
          </div>
        </div>

        {/* ── Section 6: 정기 리뷰 체크포인트 ── */}
        <SectionHeader id="sec-6">6. 정기 리뷰 체크포인트</SectionHeader>

        <div className="pl-2 border-l border-zinc-800 space-y-2">
          {REVIEW_CHECKPOINTS.map((item) => (
            <div key={item.id} className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={!!checkedState[item.id]}
                onChange={(e) => handleCheck(item.id, e.target.checked)}
                className="mt-1 w-4 h-4 rounded border-2 border-zinc-600 bg-transparent checked:bg-blue-500 checked:border-blue-500 cursor-pointer accent-blue-500 shrink-0"
              />
              <div className="flex items-start gap-2 min-w-0 flex-wrap">
                <PriorityTag priority={item.priority} />
                <span className={`text-sm leading-relaxed ${checkedState[item.id] ? "line-through text-zinc-500" : "text-zinc-300"}`}>
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* ── Footer ── */}
        <div className="mt-16 pt-8 border-t border-zinc-800">
          <p className="text-xs text-zinc-600 italic">
            이 문서는 .gitignore로 공개 리포에서 제외됨. 정기적으로 업데이트하며 커리어 방향을 점검할 것.
          </p>
          <p className="text-xs text-zinc-700 mt-4 print:hidden">
            Tip: Use your browser&apos;s Print function (Cmd+P / Ctrl+P) to export this page as a PDF.
          </p>
        </div>
    </PrivateDocumentShell>
  );
}
