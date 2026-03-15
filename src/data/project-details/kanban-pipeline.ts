import type { ProjectDetail } from "@/types/project-detail";

export const kanbanPipeline: ProjectDetail = {
  slug: "kanban-pipeline",
  vertical: "devtools",
  verticalColor: "#8B5CF6",
  status: "live",
  title: {
    en: "AI Kanban Pipeline",
    ko: "AI 칸반 파이프라인",
  },
  tagline: {
    en: "6-agent AI team that plans, builds, tests, and reviews your code",
    ko: "코드를 계획, 구현, 테스트, 리뷰하는 6-에이전트 AI 팀",
  },
  heroImage: "/projects/kanban-pipeline/board.webp",

  painPoints: [
    {
      icon: "🔄",
      title: {
        en: "Context Switching in Solo Dev",
        ko: "솔로 개발의 컨텍스트 전환",
      },
      description: {
        en: "Solo developers constantly switch between planning, coding, testing, and reviewing — each context switch burns time and mental energy. There's no separation of concerns when one person wears every hat.",
        ko: "솔로 개발자는 계획, 코딩, 테스트, 리뷰 사이를 끊임없이 전환합니다 — 매번 컨텍스트 전환이 시간과 정신적 에너지를 소모합니다. 한 사람이 모든 역할을 맡으면 관심사 분리가 불가능합니다.",
      },
    },
    {
      icon: "👁️",
      title: {
        en: "No Code Review for Solo Projects",
        ko: "솔로 프로젝트의 코드 리뷰 부재",
      },
      description: {
        en: "Without teammates, code goes from brain to production with zero review. Bugs, architectural missteps, and quality regressions slip through because there's nobody to catch them before merge.",
        ko: "팀원이 없으면 코드가 머릿속에서 프로덕션까지 리뷰 없이 직행합니다. 버그, 아키텍처 실수, 품질 저하가 머지 전에 잡아줄 사람이 없어 그대로 통과합니다.",
      },
    },
    {
      icon: "📋",
      title: {
        en: "Vague 'Done' Criteria",
        ko: "모호한 '완료' 기준",
      },
      description: {
        en: "Tasks start with rough descriptions and end with 'looks good enough'. No upfront acceptance criteria, no verifiable checklist, no structured review — just a developer's gut feeling that it's probably done.",
        ko: "태스크가 대략적인 설명으로 시작해서 '이 정도면 됐겠지'로 끝납니다. 사전 수락 기준도, 검증 가능한 체크리스트도, 구조화된 리뷰도 없이 — 개발자의 감으로 완료를 판단합니다.",
      },
    },
  ],

  beforeAfter: [
    {
      before: {
        en: "Solo dev wearing planner/coder/tester/reviewer hats simultaneously",
        ko: "계획자/코더/테스터/리뷰어 역할을 동시에 수행하는 솔로 개발",
      },
      after: {
        en: "6 specialized AI agents handle each role in a structured pipeline",
        ko: "6개 전문 AI 에이전트가 구조화된 파이프라인에서 각 역할을 수행",
      },
    },
    {
      before: {
        en: "Code pushed without any review or quality gate",
        ko: "리뷰나 품질 게이트 없이 코드를 푸시",
      },
      after: {
        en: "Inspector scores code on 7 dimensions + circuit breaker stops bad code after 3 rejections",
        ko: "Inspector가 7개 차원으로 코드를 평가 + 3회 거부 시 회로 차단기로 불량 코드 차단",
      },
    },
    {
      before: {
        en: "Task descriptions with no acceptance criteria or completion checklist",
        ko: "수락 기준이나 완료 체크리스트 없는 태스크 설명",
      },
      after: {
        en: "Planner writes done_when checklist upfront; Ranger verifies every item passes",
        ko: "Planner가 사전에 done_when 체크리스트 작성; Ranger가 모든 항목 통과를 검증",
      },
    },
  ],

  approach: {
    title: {
      en: "Multi-Agent Kanban Orchestration",
      ko: "멀티 에이전트 칸반 오케스트레이션",
    },
    description: {
      en: "The pipeline models software development as a 7-column kanban board where 6 specialized AI agents each own a stage. Planner decomposes requirements into implementation plans with explicit done_when checklists. Critic reviews plans for feasibility, scoring clarity, done-when quality, and reversibility. Builder generates code following the approved plan. Shield writes tests covering edge cases the Builder might miss. Inspector performs structured code review across 7 dimensions (quality, error handling, type safety, security, performance, coverage, completion). Ranger runs lint, build, and the full test suite. A circuit breaker halts the pipeline after 3 consecutive rejections, preventing infinite rework loops. Every agent signs its output with nickname, model, and timestamp — the task card becomes the complete work log. Human approval gates at plan review and code review keep critical decisions under developer control.",
      ko: "파이프라인은 소프트웨어 개발을 7-컬럼 칸반 보드로 모델링하며, 6개 전문 AI 에이전트가 각 단계를 담당합니다. Planner가 요구사항을 명시적 done_when 체크리스트와 함께 구현 계획으로 분해합니다. Critic이 명확성, 완료 기준 품질, 가역성을 평가하며 계획을 리뷰합니다. Builder가 승인된 계획에 따라 코드를 생성합니다. Shield가 Builder가 놓칠 수 있는 엣지 케이스를 커버하는 테스트를 작성합니다. Inspector가 7개 차원(품질, 에러 처리, 타입 안전성, 보안, 성능, 커버리지, 완성도)으로 구조화된 코드 리뷰를 수행합니다. Ranger가 린트, 빌드, 전체 테스트 스위트를 실행합니다. 회로 차단기가 연속 3회 거부 시 파이프라인을 중단하여 무한 재작업 루프를 방지합니다. 모든 에이전트가 닉네임, 모델, 타임스탬프로 출력에 서명하여 — 태스크 카드가 완전한 작업 로그가 됩니다. 계획 리뷰와 코드 리뷰의 사람 승인 게이트로 핵심 결정이 개발자 통제 하에 유지됩니다.",
    },
  },

  features: [
    {
      title: {
        en: "7-Column Pipeline with 3 Levels",
        ko: "3단계 레벨의 7-컬럼 파이프라인",
      },
      description: {
        en: "Tasks flow through Request, Plan, Plan Review, Implement, Code Review, Test, and Done. The pipeline supports 3 risk levels: L1 Quick skips all reviews for trivial changes, L2 Standard includes code review, and L3 Full activates every gate including plan review and testing. Each level maps to the actual risk profile of the change.",
        ko: "태스크가 요청, 계획, 계획 리뷰, 구현, 코드 리뷰, 테스트, 완료를 거칩니다. 3가지 리스크 레벨을 지원합니다: L1 Quick은 사소한 변경에 모든 리뷰를 건너뛰고, L2 Standard는 코드 리뷰를 포함하며, L3 Full은 계획 리뷰와 테스트를 포함한 모든 게이트를 활성화합니다.",
      },
      image: "/projects/kanban-pipeline/board.webp",
    },
    {
      title: {
        en: "6 Specialized AI Agents",
        ko: "6개 전문 AI 에이전트",
      },
      description: {
        en: "Each agent has a fixed nickname and distinct responsibility: Planner decomposes requirements, Critic reviews plans, Builder writes code, Shield writes tests, Inspector scores implementations on 7 dimensions, and Ranger runs the full test suite. Model routing is configurable — Planner and Builder use high-reasoning models (Opus), while review agents use faster models (Sonnet).",
        ko: "각 에이전트에 고정 닉네임과 고유 책임이 있습니다: Planner가 요구사항을 분해, Critic이 계획을 리뷰, Builder가 코드를 작성, Shield가 테스트를 작성, Inspector가 7개 차원으로 구현을 평가, Ranger가 전체 테스트 스위트를 실행합니다. Planner와 Builder는 고추론 모델(Opus), 리뷰 에이전트는 빠른 모델(Sonnet)을 사용합니다.",
      },
      image: "/projects/kanban-pipeline/task-detail.webp",
    },
    {
      title: {
        en: "Full Audit Trail",
        ko: "완전한 감사 추적",
      },
      description: {
        en: "Every agent signs its output with a signature header: nickname, model name, and timestamp. The agent_log field records a chronological JSON array of all agent actions. Plan, implementation notes, review comments, and test results are stored as structured data — the task card itself becomes the complete work log with full traceability.",
        ko: "모든 에이전트가 닉네임, 모델명, 타임스탬프로 출력에 서명합니다. agent_log 필드가 모든 에이전트 작업의 시간순 JSON 배열을 기록합니다. 계획, 구현 노트, 리뷰 코멘트, 테스트 결과가 구조화된 데이터로 저장되어 — 태스크 카드 자체가 완전한 추적이 가능한 작업 로그가 됩니다.",
      },
      image: "/projects/kanban-pipeline/list-view.webp",
    },
    {
      title: {
        en: "Circuit Breaker + Human Gates",
        ko: "회로 차단기 + 사람 승인 게이트",
      },
      description: {
        en: "A built-in circuit breaker monitors rejection counts at every review stage. After 3 consecutive rejections, the pipeline halts and escalates to the developer — preventing infinite rework loops and wasted computation. Human approval gates at plan review and code review ensure critical decisions stay under developer control, even in auto mode.",
        ko: "내장 회로 차단기가 모든 리뷰 단계의 거부 횟수를 모니터링합니다. 연속 3회 거부 후 파이프라인이 중단되고 개발자에게 에스컬레이션 — 무한 재작업 루프와 연산 낭비를 방지합니다. 계획 리뷰와 코드 리뷰의 사람 승인 게이트로 자동 모드에서도 핵심 결정이 개발자 통제 하에 유지됩니다.",
      },
      image: "/projects/kanban-pipeline/chronicle.webp",
    },
  ],

  architecture: {
    nodes: [
      { id: "cli", label: { en: "Claude Code CLI", ko: "Claude Code CLI" }, type: "client", x: 50, y: 50 },
      { id: "orchestrator", label: { en: "Skill Orchestrator", ko: "스킬 오케스트레이터" }, type: "server", x: 200, y: 50 },
      { id: "api", label: { en: "Kanban REST API", ko: "칸반 REST API" }, type: "server", x: 350, y: 50 },
      { id: "neon", label: { en: "Neon PostgreSQL", ko: "Neon PostgreSQL" }, type: "database", x: 350, y: 180 },
      { id: "agents", label: { en: "6 AI Agents", ko: "6개 AI 에이전트" }, type: "service", x: 50, y: 180 },
      { id: "board", label: { en: "Web Board UI", ko: "웹 보드 UI" }, type: "client", x: 200, y: 180 },
    ],
    connections: [
      { from: "cli", to: "orchestrator", label: { en: "Skill Invoke", ko: "스킬 호출" } },
      { from: "orchestrator", to: "api", label: { en: "HTTP", ko: "HTTP" } },
      { from: "orchestrator", to: "agents", label: { en: "Dispatch", ko: "디스패치" } },
      { from: "api", to: "neon", label: { en: "SQL", ko: "SQL" } },
      { from: "board", to: "api", label: { en: "REST", ko: "REST" } },
    ],
  },

  metrics: [
    {
      value: "6",
      label: { en: "AI Agents", ko: "AI 에이전트" },
      description: { en: "Planner, Critic, Builder, Shield, Inspector, Ranger", ko: "Planner, Critic, Builder, Shield, Inspector, Ranger" },
    },
    {
      value: "842",
      label: { en: "Tasks Processed", ko: "처리된 태스크" },
      description: { en: "Tasks orchestrated across 10+ projects in production", ko: "10개 이상 프로젝트에서 운영 중인 태스크 처리 수" },
    },
    {
      value: "L3",
      label: { en: "Pipeline Depth", ko: "파이프라인 깊이" },
      description: { en: "3 risk levels with configurable review gates", ko: "설정 가능한 리뷰 게이트의 3가지 리스크 레벨" },
    },
    {
      value: "3x",
      label: { en: "Circuit Breaker", ko: "회로 차단기" },
      description: { en: "Auto-stop after 3 consecutive rejections at any stage", ko: "어떤 단계에서든 연속 3회 거부 시 자동 정지" },
    },
  ],

  prevProject: {
    slug: "personal-finance",
    title: { en: "Personal Finance Tracker", ko: "가계부 트래커" },
  },
  nextProject: {
    slug: "code-review-suite",
    title: { en: "AI Code Review Suite", ko: "AI 코드 리뷰 스위트" },
  },
};
