import type { ProjectDetail } from "@/types/project-detail";

export const javis: ProjectDetail = {
  slug: "javis",
  vertical: "aiagents",
  verticalColor: "#8B5CF6",
  status: "active",
  title: {
    en: "Javis",
    ko: "Javis",
  },
  tagline: {
    en: "AI bridge connecting Jira and development workflows",
    ko: "Jira와 개발 워크플로우를 잇는 AI 브릿지",
  },
  heroImage: "/projects/javis/hero.png",

  painPoints: [
    {
      icon: "🏝️",
      title: {
        en: "Jira/Confluence Data Silos",
        ko: "Jira/Confluence 데이터 사일로",
      },
      description: {
        en: "Jira stories, Confluence docs, and local development context live in completely separate systems. Developers constantly alt-tab between tools to cross-reference requirements, specifications, and code — losing context at every switch.",
        ko: "Jira 스토리, Confluence 문서, 로컬 개발 컨텍스트가 완전히 분리된 시스템에 존재합니다. 개발자가 요구사항, 스펙, 코드를 교차 참조하기 위해 끊임없이 도구 간 전환하며 — 매 전환마다 컨텍스트를 잃습니다.",
      },
    },
    {
      icon: "📊",
      title: {
        en: "Manual Sprint Tracking",
        ko: "수동 스프린트 추적",
      },
      description: {
        en: "Sprint progress, velocity metrics, and risk indicators are compiled manually from Jira data. By the time a status report is assembled, it's already outdated. Sprint retrospectives lack data-driven insights.",
        ko: "스프린트 진행률, 속도 지표, 리스크 지표를 Jira 데이터에서 수동으로 집계합니다. 상태 보고서가 완성될 즈음이면 이미 구식입니다. 스프린트 회고에 데이터 기반 인사이트가 부족합니다.",
      },
    },
    {
      icon: "🔗",
      title: {
        en: "No Dev Context in Jira",
        ko: "Jira에 개발 컨텍스트 부재",
      },
      description: {
        en: "Jira tickets lack technical context — implementation notes, architectural decisions, and dependency information live in developers' heads or scattered across chat messages. New team members struggle to understand the full picture behind each story.",
        ko: "Jira 티켓에 기술적 컨텍스트가 없습니다 — 구현 노트, 아키텍처 결정, 의존성 정보가 개발자의 머릿속이나 채팅 메시지에 흩어져 있습니다. 새 팀원이 각 스토리의 전체 그림을 이해하기 어렵습니다.",
      },
    },
  ],

  beforeAfter: [
    {
      before: {
        en: "Alt-tabbing between Jira, Confluence, and IDE to cross-reference",
        ko: "교차 참조를 위해 Jira, Confluence, IDE 간 전환",
      },
      after: {
        en: "Bidirectional sync keeps Jira, Confluence, and local DB in sync",
        ko: "양방향 동기화로 Jira, Confluence, 로컬 DB를 동기화 유지",
      },
    },
    {
      before: {
        en: "Manually compiling sprint metrics from Jira exports",
        ko: "Jira 내보내기에서 수동으로 스프린트 지표 집계",
      },
      after: {
        en: "AI-powered sprint dashboard with risk analysis and velocity trends",
        ko: "리스크 분석과 속도 추이가 포함된 AI 기반 스프린트 대시보드",
      },
    },
    {
      before: {
        en: "Technical context lost in chat threads and developer memory",
        ko: "채팅 스레드와 개발자 기억 속에 사라지는 기술 컨텍스트",
      },
      after: {
        en: "Structured story management with dev context synced back to Jira",
        ko: "개발 컨텍스트를 Jira에 동기화하는 구조화된 스토리 관리",
      },
    },
  ],

  approach: {
    title: {
      en: "Local-First AI Project Copilot",
      ko: "로컬 우선 AI 프로젝트 코파일럿",
    },
    description: {
      en: "Javis bridges Jira/Confluence and local development by maintaining a synchronized local SQLite database that mirrors project data from both platforms. The system provides 8 Claude Code skills (init, story, dev, report, risk, sprint, sync, deploy) that developers invoke from their terminal. AI-powered risk detection monitors 5 risk types (delay, blocker, velocity drop, dependency, resource) using sprint and story data. Bidirectional incremental sync ensures changes flow both ways — updates made locally propagate to Jira, and Jira changes sync back to the local DB. Sprint dashboards, story management, and Confluence report generation all work from the local-first data store, keeping developers in their IDE while staying connected to the broader project management ecosystem. Slack integration provides outbound alerts for risk notifications and inbound commands for quick status checks.",
      ko: "Javis는 두 플랫폼의 프로젝트 데이터를 미러링하는 동기화된 로컬 SQLite 데이터베이스를 유지하여 Jira/Confluence와 로컬 개발을 연결합니다. 시스템은 개발자가 터미널에서 호출하는 8개 Claude Code 스킬(init, story, dev, report, risk, sprint, sync, deploy)을 제공합니다. AI 기반 리스크 감지가 스프린트와 스토리 데이터를 사용하여 5가지 리스크 유형(지연, 차단, 속도 저하, 의존성, 리소스)을 모니터링합니다. 양방향 증분 동기화로 변경이 양쪽으로 흐릅니다 — 로컬에서 만든 업데이트가 Jira에 전파되고, Jira 변경이 로컬 DB로 동기화됩니다. 스프린트 대시보드, 스토리 관리, Confluence 보고서 생성이 모두 로컬 우선 데이터 스토어에서 작동하여 개발자가 IDE에 머물면서 더 넓은 프로젝트 관리 생태계와 연결됩니다. Slack 연동은 리스크 알림을 위한 아웃바운드 알림과 빠른 상태 확인을 위한 인바운드 커맨드를 제공합니다.",
    },
  },

  features: [
    {
      title: {
        en: "Sprint Dashboard",
        ko: "스프린트 대시보드",
      },
      description: {
        en: "Real-time sprint overview with velocity trends, burndown charts, and completion forecasting. Aggregates data from Jira sprints with local development context to provide a complete picture of sprint health without leaving the terminal.",
        ko: "속도 추이, 번다운 차트, 완료 예측이 포함된 실시간 스프린트 개요. Jira 스프린트 데이터를 로컬 개발 컨텍스트와 집계하여 터미널을 벗어나지 않고 스프린트 건강 상태의 전체 그림을 제공합니다.",
      },
      image: "/projects/javis/feature-sprint.png",
    },
    {
      title: {
        en: "Story Management",
        ko: "스토리 관리",
      },
      description: {
        en: "Create, update, and enrich Jira stories with technical context from the development environment. Implementation notes, architectural decisions, and dependency mappings are captured locally and synced back to Jira, preserving dev knowledge in the project management layer.",
        ko: "개발 환경의 기술 컨텍스트로 Jira 스토리를 생성, 업데이트, 보강합니다. 구현 노트, 아키텍처 결정, 의존성 매핑이 로컬에 캡처되고 Jira에 동기화되어 프로젝트 관리 레이어에 개발 지식을 보존합니다.",
      },
      image: "/projects/javis/feature-story.png",
    },
    {
      title: {
        en: "Risk Analysis",
        ko: "리스크 분석",
      },
      description: {
        en: "AI monitors 5 risk types across the sprint: delay risks (stories behind schedule), blockers (unresolved dependencies), velocity drops (declining throughput), dependency risks (cross-team bottlenecks), and resource risks (overallocated team members). Alerts are sent via Slack when risk thresholds are exceeded.",
        ko: "AI가 스프린트 전반의 5가지 리스크를 모니터링합니다: 지연 리스크(일정 지연 스토리), 차단 리스크(미해결 의존성), 속도 저하(처리량 감소), 의존성 리스크(팀 간 병목), 리소스 리스크(과할당 팀원). 리스크 임계값 초과 시 Slack으로 알림을 보냅니다.",
      },
      image: "/projects/javis/feature-risk.png",
    },
    {
      title: {
        en: "Data Sync (Jira ↔ Local DB)",
        ko: "데이터 동기화 (Jira ↔ 로컬 DB)",
      },
      description: {
        en: "Bidirectional incremental sync between Jira and the local SQLite database. Only changed records are transferred using JQL-based delta queries and local change tracking. Confluence pages are also synced for documentation context, creating a unified local-first data layer.",
        ko: "Jira와 로컬 SQLite 데이터베이스 간 양방향 증분 동기화. JQL 기반 델타 쿼리와 로컬 변경 추적을 사용하여 변경된 레코드만 전송합니다. Confluence 페이지도 문서 컨텍스트를 위해 동기화되어 통합된 로컬 우선 데이터 레이어를 생성합니다.",
      },
      image: "/projects/javis/feature-sync.png",
    },
  ],

  architecture: {
    nodes: [
      { id: "skills", label: { en: "Claude Code Skills", ko: "Claude Code 스킬" }, type: "client", x: 50, y: 50 },
      { id: "sqlite", label: { en: "Local SQLite", ko: "로컬 SQLite" }, type: "database", x: 200, y: 50 },
      { id: "jira", label: { en: "Jira REST API", ko: "Jira REST API" }, type: "external", x: 350, y: 50 },
      { id: "confluence", label: { en: "Confluence API", ko: "Confluence API" }, type: "external", x: 350, y: 180 },
      { id: "nextjs", label: { en: "Next.js Dashboard", ko: "Next.js 대시보드" }, type: "client", x: 50, y: 180 },
      { id: "slack", label: { en: "Slack API", ko: "Slack API" }, type: "external", x: 200, y: 180 },
    ],
    connections: [
      { from: "skills", to: "sqlite", label: { en: "Read/Write", ko: "읽기/쓰기" } },
      { from: "sqlite", to: "jira", label: { en: "Bidirectional Sync", ko: "양방향 동기화" } },
      { from: "sqlite", to: "confluence", label: { en: "Sync", ko: "동기화" } },
      { from: "nextjs", to: "sqlite", label: { en: "Query", ko: "쿼리" } },
      { from: "sqlite", to: "slack", label: { en: "Alerts", ko: "알림" } },
    ],
  },

  metrics: [
    {
      value: "8",
      label: { en: "CLI Skills", ko: "CLI 스킬" },
      description: { en: "init, story, dev, report, risk, sprint, sync, deploy", ko: "init, story, dev, report, risk, sprint, sync, deploy" },
    },
    {
      value: "5",
      label: { en: "Risk Types", ko: "리스크 유형" },
      description: { en: "Delay, blocker, velocity, dependency, resource", ko: "지연, 차단, 속도, 의존성, 리소스" },
    },
    {
      value: "Bi",
      label: { en: "Sync Direction", ko: "동기화 방향" },
      description: { en: "Bidirectional incremental sync with Jira & Confluence", ko: "Jira & Confluence 양방향 증분 동기화" },
    },
    {
      value: "Local",
      label: { en: "Data-First", ko: "데이터 우선" },
      description: { en: "SQLite local-first with cloud sync on demand", ko: "SQLite 로컬 우선 + 온디맨드 클라우드 동기화" },
    },
  ],

  prevProject: {
    slug: "code-review-suite",
    title: { en: "AI Code Review Suite", ko: "AI 코드 리뷰 스위트" },
  },
  nextProject: undefined,
};
