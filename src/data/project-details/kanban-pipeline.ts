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
  heroImage: "/projects/kanban-pipeline/hero.png",

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
        en: "Manual Task Tracking",
        ko: "수동 태스크 추적",
      },
      description: {
        en: "Tracking what needs to be done, what's in progress, and what's blocked requires manual bookkeeping that distracts from actual development. Status updates become stale within hours.",
        ko: "해야 할 일, 진행 중인 일, 차단된 일을 추적하려면 실제 개발에서 주의를 분산시키는 수동 관리가 필요합니다. 상태 업데이트는 몇 시간 내에 구식이 됩니다.",
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
        en: "Auto code review + circuit breaker stops bad code after 3 rejections",
        ko: "자동 코드 리뷰 + 3회 거부 시 회로 차단기로 불량 코드 차단",
      },
    },
    {
      before: {
        en: "Task status manually updated and constantly stale",
        ko: "수동으로 업데이트하고 항상 구식인 태스크 상태",
      },
      after: {
        en: "Tasks flow automatically through 7 columns as agents complete work",
        ko: "에이전트가 작업을 완료하면 7개 컬럼을 자동으로 흐르는 태스크",
      },
    },
  ],

  approach: {
    title: {
      en: "Multi-Agent Kanban Orchestration",
      ko: "멀티 에이전트 칸반 오케스트레이션",
    },
    description: {
      en: "The pipeline models software development as a 7-column kanban board (Request → Plan → Plan Review → Implement → Code Review → Test → Done) where 6 specialized AI agents each own a column. The Planner decomposes requirements into implementation plans, the Critic reviews plans for feasibility, the Builder generates code, the Shield performs code review with architectural checks, the Inspector runs tests, and the Ranger handles deployment tasks. A circuit breaker automatically halts the pipeline after 3 consecutive rejections at any review stage, preventing infinite loops. Human-in-the-loop approval gates at plan review and code review ensure critical decisions remain under developer control. Built on Neon PostgreSQL with a REST API consumed by Claude Code skills.",
      ko: "파이프라인은 소프트웨어 개발을 7-컬럼 칸반 보드(요청 → 계획 → 계획 리뷰 → 구현 → 코드 리뷰 → 테스트 → 완료)로 모델링하며, 6개 전문 AI 에이전트가 각 컬럼을 담당합니다. Planner가 요구사항을 구현 계획으로 분해하고, Critic이 계획의 실현 가능성을 리뷰하고, Builder가 코드를 생성하고, Shield가 아키텍처 검사로 코드 리뷰를 수행하고, Inspector가 테스트를 실행하고, Ranger가 배포 작업을 처리합니다. 회로 차단기는 리뷰 단계에서 연속 3회 거부 시 자동으로 파이프라인을 중단하여 무한 루프를 방지합니다. 계획 리뷰와 코드 리뷰의 사람 승인 게이트로 핵심 결정이 개발자 통제 하에 유지됩니다. Neon PostgreSQL 기반으로 Claude Code 스킬이 소비하는 REST API로 구축되었습니다.",
    },
  },

  features: [
    {
      title: {
        en: "7-Column Pipeline",
        ko: "7-컬럼 파이프라인",
      },
      description: {
        en: "Tasks flow through Request → Plan → Plan Review → Implement → Code Review → Test → Done. Each transition is triggered by an agent completing its work and updating the task status via the kanban API. The pipeline supports 3 levels: Quick (L1) skips reviews, Standard (L2) includes plan review, and Full (L3) activates all gates.",
        ko: "태스크가 요청 → 계획 → 계획 리뷰 → 구현 → 코드 리뷰 → 테스트 → 완료를 거칩니다. 각 전환은 에이전트가 작업을 완료하고 칸반 API를 통해 태스크 상태를 업데이트하면 트리거됩니다. Quick(L1)은 리뷰 생략, Standard(L2)는 계획 리뷰 포함, Full(L3)은 모든 게이트 활성화의 3단계를 지원합니다.",
      },
      image: "/projects/kanban-pipeline/feature-pipeline.png",
    },
    {
      title: {
        en: "Multi-Agent Orchestration",
        ko: "멀티 에이전트 오케스트레이션",
      },
      description: {
        en: "Six specialized agents — Planner, Critic, Builder, Shield, Inspector, and Ranger — each have distinct responsibilities and skill sets. Agents communicate through the shared kanban state, with each agent pulling tasks from its designated column and pushing completed work to the next.",
        ko: "Planner, Critic, Builder, Shield, Inspector, Ranger 6개 전문 에이전트가 각각 고유한 책임과 스킬 세트를 가집니다. 에이전트는 공유 칸반 상태를 통해 소통하며, 각 에이전트가 담당 컬럼에서 태스크를 가져와 완료된 작업을 다음 컬럼으로 넘깁니다.",
      },
      image: "/projects/kanban-pipeline/feature-agents.png",
    },
    {
      title: {
        en: "Auto Code Review",
        ko: "자동 코드 리뷰",
      },
      description: {
        en: "The Shield agent performs automated code review on every implementation, checking for architectural consistency, test coverage, security issues, and code style. Review results are stored as structured feedback attached to the task, creating a review trail for every change.",
        ko: "Shield 에이전트가 모든 구현에 자동 코드 리뷰를 수행하여 아키텍처 일관성, 테스트 커버리지, 보안 이슈, 코드 스타일을 검사합니다. 리뷰 결과가 구조화된 피드백으로 태스크에 첨부되어 모든 변경의 리뷰 이력을 생성합니다.",
      },
      image: "/projects/kanban-pipeline/feature-review.png",
    },
    {
      title: {
        en: "Circuit Breaker Safety",
        ko: "회로 차단기 안전장치",
      },
      description: {
        en: "A built-in circuit breaker monitors rejection counts at review stages. After 3 consecutive rejections, the pipeline automatically halts and escalates to the developer, preventing infinite rework loops and wasted computation. Human approval gates at plan review and code review provide additional safety.",
        ko: "내장 회로 차단기가 리뷰 단계의 거부 횟수를 모니터링합니다. 연속 3회 거부 후 파이프라인이 자동으로 중단되고 개발자에게 에스컬레이션하여 무한 재작업 루프와 연산 낭비를 방지합니다. 계획 리뷰와 코드 리뷰의 사람 승인 게이트가 추가 안전장치를 제공합니다.",
      },
      image: "/projects/kanban-pipeline/feature-circuit-breaker.png",
    },
  ],

  architecture: {
    nodes: [
      { id: "skills", label: { en: "Claude Code Skills", ko: "Claude Code 스킬" }, type: "client", x: 50, y: 50 },
      { id: "api", label: { en: "Kanban REST API", ko: "칸반 REST API" }, type: "server", x: 200, y: 50 },
      { id: "neon", label: { en: "Neon PostgreSQL", ko: "Neon PostgreSQL" }, type: "database", x: 200, y: 180 },
      { id: "planner", label: { en: "Planner Agent", ko: "Planner 에이전트" }, type: "service", x: 50, y: 180 },
      { id: "builder", label: { en: "Builder Agent", ko: "Builder 에이전트" }, type: "service", x: 350, y: 50 },
      { id: "shield", label: { en: "Shield Agent", ko: "Shield 에이전트" }, type: "service", x: 350, y: 180 },
    ],
    connections: [
      { from: "skills", to: "api", label: { en: "HTTP", ko: "HTTP" } },
      { from: "api", to: "neon", label: { en: "SQL", ko: "SQL" } },
      { from: "planner", to: "api", label: { en: "Plan Tasks", ko: "태스크 계획" } },
      { from: "builder", to: "api", label: { en: "Implement", ko: "구현" } },
      { from: "shield", to: "api", label: { en: "Review", ko: "리뷰" } },
    ],
  },

  metrics: [
    {
      value: "7",
      label: { en: "Pipeline Columns", ko: "파이프라인 컬럼" },
      description: { en: "Automated pipeline from request to done", ko: "요청에서 완료까지 자동화된 파이프라인" },
    },
    {
      value: "6",
      label: { en: "AI Agents", ko: "AI 에이전트" },
      description: { en: "Specialized agents for each pipeline stage", ko: "각 파이프라인 단계별 전문 에이전트" },
    },
    {
      value: "L3",
      label: { en: "Pipeline Depth", ko: "파이프라인 깊이" },
      description: { en: "Full pipeline with all review gates active", ko: "모든 리뷰 게이트가 활성화된 풀 파이프라인" },
    },
    {
      value: "3x",
      label: { en: "Circuit Breaker", ko: "회로 차단기" },
      description: { en: "Auto-stop after 3 consecutive rejections", ko: "연속 3회 거부 시 자동 정지" },
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
