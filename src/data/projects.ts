export type Project = {
  id: string;
  title: { en: string; ko: string };
  tagline: { en: string; ko: string };
  description: { en: string; ko: string };
  vertical: "industrial" | "health" | "consumer" | "devtools";
  stack: string[];
  highlights: { en: string[]; ko: string[] };
  status: "live" | "active" | "beta";
  hasDetailPage: boolean;
  url?: string;
  repo?: string;
};

export const verticals = {
  industrial: {
    label: { en: "Industrial", ko: "Industrial" },
    color: "#3B82F6",
    description: {
      en: "Manufacturing automation & equipment management platforms",
      ko: "제조 자동화 및 장비 관리 플랫폼",
    },
  },
  health: {
    label: { en: "Health & Fitness", ko: "Health & Fitness" },
    color: "#10B981",
    description: {
      en: "Data-driven training & metabolic analysis tools",
      ko: "데이터 기반 트레이닝 및 대사 분석 도구",
    },
  },
  consumer: {
    label: { en: "Consumer", ko: "Consumer" },
    color: "#F59E0B",
    description: {
      en: "Everyday tools for real-world problems",
      ko: "실생활 문제를 해결하는 서비스",
    },
  },
  devtools: {
    label: { en: "Developer Tools", ko: "Developer Tools" },
    color: "#8B5CF6",
    description: {
      en: "AI-native engineering workflow & automation",
      ko: "AI 네이티브 엔지니어링 워크플로우 및 자동화",
    },
  },
} as const;

export const projects: Project[] = [
  // ── Industrial ──
  {
    id: "smart-factory-qc",
    title: {
      en: "Smart Factory QC Platform",
      ko: "스마트 팩토리 QC 플랫폼",
    },
    tagline: {
      en: "Automated quality control for manufacturing equipment",
      ko: "제조 장비 자동화 품질 관리",
    },
    description: {
      en: "End-to-end quality control automation that replaces manual test checklists with BDD-driven test scenarios. Operators define test procedures in plain language (Gherkin), and the platform executes them against real equipment via industrial protocols, collecting structured pass/fail evidence automatically.",
      ko: "수동 테스트 체크리스트를 BDD 기반 자동 시나리오로 대체하는 품질 관리 자동화 플랫폼. Gherkin으로 테스트 절차를 정의하면, 산업용 프로토콜로 실장비에 실행하여 합격/불합격 증빙을 자동 수집합니다.",
    },
    vertical: "industrial",
    stack: ["React", "FastAPI", "PostgreSQL", "Modbus TCP", "BDD/Gherkin"],
    hasDetailPage: true,
    highlights: {
      en: [
        "BDD scenarios replace 200+ page paper checklists",
        "Real-time device communication via Modbus TCP & Hostlink",
        "Role-based access with SAML 2.0 / Entra ID SSO",
        "Edge-to-cloud architecture for on-premise + remote execution",
      ],
      ko: [
        "BDD 시나리오로 200+ 페이지 종이 체크리스트 대체",
        "Modbus TCP & Hostlink 실시간 장비 통신",
        "SAML 2.0 / Entra ID SSO 역할 기반 접근 제어",
        "Edge-to-Cloud 아키텍처로 온프레미스 + 원격 실행",
      ],
    },
    status: "active",
  },
  {
    id: "equipment-gateway",
    title: {
      en: "Equipment Gateway",
      ko: "장비 게이트웨이",
    },
    tagline: {
      en: "Industrial IoT gateway with real-time monitoring",
      ko: "실시간 모니터링 산업용 IoT 게이트웨이",
    },
    description: {
      en: "Configuration-driven gateway that auto-generates REST APIs from YAML product definitions. Connects to manufacturing equipment via Modbus TCP, polls device registers at configurable intervals (100ms~1s), and streams time-series data to InfluxDB for visualization and alerting.",
      ko: "YAML 제품 정의서로부터 REST API를 자동 생성하는 설정 기반 게이트웨이. Modbus TCP로 제조 장비에 연결하고, 설정 가능한 주기(100ms~1s)로 레지스터를 폴링하여 InfluxDB에 시계열 데이터를 저장합니다.",
    },
    vertical: "industrial",
    stack: ["React", "FastAPI", "InfluxDB", "Modbus TCP", "ReactFlow"],
    hasDetailPage: false,
    highlights: {
      en: [
        "YAML-driven API generation — zero backend code per product",
        "3-tier polling (100ms / 500ms / 1s) with register auto-merging",
        "Entity Store with in-memory state + change detection",
        "Visual flow editor for equipment topology",
      ],
      ko: [
        "YAML 기반 API 자동 생성 — 제품별 백엔드 코드 불필요",
        "3단계 폴링 (100ms / 500ms / 1s) + 레지스터 자동 병합",
        "인메모리 상태 + 변경 감지 Entity Store",
        "장비 토폴로지 시각적 플로우 에디터",
      ],
    },
    status: "active",
  },
  {
    id: "resource-board",
    title: {
      en: "Engineering Resource Board",
      ko: "엔지니어링 리소스 보드",
    },
    tagline: {
      en: "Project & resource planning for manufacturing teams",
      ko: "제조 팀을 위한 프로젝트 & 리소스 플래닝",
    },
    description: {
      en: "Replaces SharePoint and Excel-based resource tracking with a unified platform. Manages organization hierarchy, project milestones, FTE allocation, and worklog tracking. AI-powered worklog parser converts free-text entries into structured time records.",
      ko: "SharePoint와 Excel 기반 리소스 트래킹을 통합 플랫폼으로 대체합니다. 조직 구조, 프로젝트 마일스톤, FTE 배분, 작업 기록 관리를 제공합니다. AI 워크로그 파서로 자유 텍스트를 구조화된 시간 기록으로 변환합니다.",
    },
    vertical: "industrial",
    stack: ["React 19", "FastAPI", "PostgreSQL", "SAML 2.0", "AI (Groq/Gemini)"],
    hasDetailPage: true,
    highlights: {
      en: [
        "Org hierarchy: Division → Department → Team → Position",
        "FTE allocation with TBD position forecasting",
        "AI worklog parser — free text to structured records",
        "Gate review management (G3, G5, G6 milestones)",
      ],
      ko: [
        "조직 구조: 사업부 → 부서 → 팀 → 포지션",
        "TBD 포지션 예측이 포함된 FTE 배분",
        "AI 워크로그 파서 — 자유 텍스트를 구조화 기록으로",
        "Gate 리뷰 관리 (G3, G5, G6 마일스톤)",
      ],
    },
    status: "active",
  },

  // ── Health & Fitness ──
  {
    id: "ai-cycling-coach",
    title: {
      en: "AI Cycling Coach",
      ko: "AI 사이클링 코치",
    },
    tagline: {
      en: "LLM-powered personalized workout generation",
      ko: "LLM 기반 개인 맞춤 운동 생성",
    },
    description: {
      en: "Generates personalized cycling workout plans using your training history. Uses TSB (Training Stress Balance) and athlete context (FTP, weight, wellness) to select from pre-validated workout modules, then outputs Zwift-compatible ZWO files you can ride immediately.",
      ko: "훈련 이력을 바탕으로 개인 맞춤 사이클링 운동 플랜을 생성합니다. TSB(트레이닝 스트레스 밸런스)와 선수 컨텍스트(FTP, 체중, 컨디션)로 사전 검증된 운동 모듈을 선택하고, 바로 라이딩 가능한 Zwift ZWO 파일을 출력합니다.",
    },
    vertical: "health",
    stack: ["React 19", "FastAPI", "Supabase", "Groq/Gemini LLM", "Vercel"],
    hasDetailPage: false,
    highlights: {
      en: [
        "Omakase pattern: validated modules → AI selection → ZWO output",
        "TSB-based intensity filtering (-60 to +60 range)",
        "Intervals.icu integration for training data sync",
        "Deployed: Vercel (FE) + Cloud Run (BE)",
      ],
      ko: [
        "오마카세 패턴: 검증된 모듈 → AI 선택 → ZWO 출력",
        "TSB 기반 강도 필터링 (-60 ~ +60 범위)",
        "Intervals.icu 연동으로 훈련 데이터 동기화",
        "배포: Vercel (FE) + Cloud Run (BE)",
      ],
    },
    status: "live",
  },
  {
    id: "cpet-platform",
    title: {
      en: "CPET Platform",
      ko: "CPET 플랫폼",
    },
    tagline: {
      en: "Cardiopulmonary exercise test analysis",
      ko: "심폐운동부하 검사 분석",
    },
    description: {
      en: "Processes breath-by-breath metabolic data from COSMED K5 equipment. Provides FATMAX and VO2MAX analysis with interactive visualizations. Uses TimescaleDB for efficient time-series storage and querying of high-frequency physiological measurements.",
      ko: "COSMED K5 장비의 호흡별 대사 데이터를 처리합니다. 인터랙티브 시각화와 함께 FATMAX 및 VO2MAX 분석을 제공합니다. TimescaleDB로 고빈도 생리학 측정 데이터를 효율적으로 저장/조회합니다.",
    },
    vertical: "health",
    stack: ["React", "FastAPI", "PostgreSQL", "TimescaleDB", "Recharts"],
    hasDetailPage: false,
    highlights: {
      en: [
        "Breath-by-breath metabolic data processing",
        "FATMAX & VO2MAX analysis with interactive charts",
        "TimescaleDB hypertables for time-series efficiency",
        "UUID-based identification with encrypted subject names",
      ],
      ko: [
        "호흡별(breath-by-breath) 대사 데이터 처리",
        "인터랙티브 차트의 FATMAX & VO2MAX 분석",
        "TimescaleDB 하이퍼테이블로 시계열 효율성",
        "암호화된 피검자명 + UUID 기반 식별",
      ],
    },
    status: "active",
  },
  {
    id: "ride-analytics",
    title: {
      en: "Ride Analytics",
      ko: "라이드 분석",
    },
    tagline: {
      en: "Cycling data visualization & route mapping",
      ko: "사이클링 데이터 시각화 및 경로 매핑",
    },
    description: {
      en: "Aggregates cycling ride data through a multi-stage pipeline (staging → matching → fingerprinting → curation), then visualizes routes on interactive maps with performance statistics and trend analysis.",
      ko: "다단계 파이프라인(스테이징 → 매칭 → 핑거프린팅 → 큐레이션)으로 사이클링 라이드 데이터를 집계하고, 인터랙티브 지도에 경로와 성능 통계를 시각화합니다.",
    },
    vertical: "health",
    stack: ["Next.js 15", "React 19", "Supabase", "Kakao Maps SDK", "Recharts"],
    hasDetailPage: false,
    highlights: {
      en: [
        "4-stage data pipeline: stage → match → fingerprint → curate",
        "Route visualization on Kakao Maps",
        "EXIF & GeoJSON processing for ride photos",
        "Server/Client component boundary optimization",
      ],
      ko: [
        "4단계 데이터 파이프라인: 스테이징 → 매칭 → 핑거프린팅 → 큐레이션",
        "카카오맵 기반 경로 시각화",
        "라이드 사진 EXIF & GeoJSON 처리",
        "서버/클라이언트 컴포넌트 경계 최적화",
      ],
    },
    status: "active",
  },

  // ── Consumer ──
  {
    id: "today-bike",
    title: {
      en: "Today.Bike",
      ko: "Today.Bike",
    },
    tagline: {
      en: "Bicycle service management platform",
      ko: "자전거 서비스 관리 플랫폼",
    },
    description: {
      en: "Full-service platform for bicycle shops — from intake to delivery. Manages service workflows (6 types), customer portal with Kakao OAuth, and QR-based bicycle passports. Built with Rails 8 for rapid iteration with 20 domain models.",
      ko: "자전거 매장의 접수부터 출고까지 전 과정을 관리하는 플랫폼. 6가지 서비스 유형의 워크플로우, 카카오 OAuth 고객 포털, QR 기반 자전거 여권을 제공합니다. Rails 8로 20개 도메인 모델을 빠르게 구축했습니다.",
    },
    vertical: "consumer",
    stack: ["Ruby on Rails 8", "SQLite", "Tailwind CSS", "Stimulus", "Kakao OAuth"],
    hasDetailPage: false,
    highlights: {
      en: [
        "Service workflow: intake → diagnosis → repair → delivery",
        "QR-based bicycle passport system",
        "Customer self-service portal with Kakao OAuth",
        "20 domain models covering full shop operations",
      ],
      ko: [
        "서비스 워크플로우: 접수 → 진단 → 수리 → 출고",
        "QR 기반 자전거 여권 시스템",
        "카카오 OAuth 고객 셀프서비스 포털",
        "매장 운영 전체를 커버하는 20개 도메인 모델",
      ],
    },
    status: "beta",
  },
  {
    id: "personal-finance",
    title: {
      en: "Personal Finance Tracker",
      ko: "가계부 트래커",
    },
    tagline: {
      en: "Multi-bank statement parser & expense analytics",
      ko: "멀티 은행 명세서 파서 & 지출 분석",
    },
    description: {
      en: "Consolidates credit card statements from 7 Korean banks — each with different file formats (XLSX, HTML-disguised XLS, legacy OLE) — into a unified SQLite database. Auto-classifies merchants into spending categories with keyword-based rules.",
      ko: "7개 한국 카드사의 서로 다른 파일 포맷(XLSX, HTML 위장 XLS, 레거시 OLE)을 통합 SQLite 데이터베이스로 합칩니다. 키워드 기반 규칙으로 가맹점을 지출 카테고리로 자동 분류합니다.",
    },
    vertical: "consumer",
    stack: ["Next.js 15", "Drizzle ORM", "SQLite", "Tailwind CSS"],
    hasDetailPage: false,
    highlights: {
      en: [
        "7 bank parsers handling 3 different file format families",
        "Auto-detection of card company by filename",
        "Keyword-based merchant → category classification",
        "Dashboard with monthly/card-wise spending breakdown",
      ],
      ko: [
        "3가지 파일 포맷 계열을 처리하는 7개 은행 파서",
        "파일명 기반 카드사 자동 감지",
        "키워드 기반 가맹점 → 카테고리 자동 분류",
        "월별/카드별 지출 분석 대시보드",
      ],
    },
    status: "active",
  },

  // ── Developer Tools ──
  {
    id: "kanban-pipeline",
    title: {
      en: "AI Kanban Pipeline",
      ko: "AI 칸반 파이프라인",
    },
    tagline: {
      en: "6-agent AI team for autonomous task execution",
      ko: "자율 태스크 실행을 위한 6-에이전트 AI 팀",
    },
    description: {
      en: "A 7-column kanban system with 6 specialized AI agents (Planner, Critic, Builder, Shield, Inspector, Ranger) that autonomously plan, implement, test, and review code changes. Tasks flow through the pipeline with built-in circuit breakers and human approval gates.",
      ko: "6개 전문 AI 에이전트(Planner, Critic, Builder, Shield, Inspector, Ranger)가 코드 변경을 자율적으로 계획, 구현, 테스트, 리뷰하는 7-컬럼 칸반 시스템. 회로 차단기와 사람 승인 게이트가 내장된 파이프라인으로 태스크가 흐릅니다.",
    },
    vertical: "devtools",
    stack: ["Neon PostgreSQL", "Claude Code", "REST API", "Multi-agent"],
    hasDetailPage: false,
    highlights: {
      en: [
        "6 agents: Planner → Critic → Builder → Shield → Inspector → Ranger",
        "3 pipeline levels: Quick (L1) / Standard (L2) / Full (L3)",
        "Circuit breaker: auto-stop after 3 rejections",
        "Human-in-the-loop approval at plan review & code review",
      ],
      ko: [
        "6개 에이전트: Planner → Critic → Builder → Shield → Inspector → Ranger",
        "3단계 파이프라인: Quick (L1) / Standard (L2) / Full (L3)",
        "회로 차단기: 3회 거부 시 자동 정지",
        "계획 리뷰 & 코드 리뷰에서 사람 승인",
      ],
    },
    status: "live",
  },
  {
    id: "code-review-suite",
    title: {
      en: "AI Code Review Suite",
      ko: "AI 코드 리뷰 스위트",
    },
    tagline: {
      en: "Domain-aware automated PR review",
      ko: "도메인 인식 자동 PR 리뷰",
    },
    description: {
      en: "Automated code review system that analyzes Bitbucket PRs with domain-specific lenses — backend (API design, DB, security), frontend (components, state, accessibility), and PLC (CODESYS architecture, sequence deadlocks). Posts structured review comments directly to the PR.",
      ko: "Bitbucket PR을 도메인별 관점으로 분석하는 자동 코드 리뷰 시스템 — 백엔드(API 설계, DB, 보안), 프론트엔드(컴포넌트, 상태, 접근성), PLC(CODESYS 아키텍처, 시퀀스 데드락). 구조화된 리뷰 코멘트를 PR에 직접 게시합니다.",
    },
    vertical: "devtools",
    stack: ["Python", "Claude API", "Bitbucket API", "Markdown"],
    hasDetailPage: false,
    highlights: {
      en: [
        "3 domain lenses: Backend / Frontend / PLC",
        "Auto-detects review domain from file extensions",
        "Structured comments posted directly to Bitbucket PR",
        "Standalone skill — works in any project with env vars",
      ],
      ko: [
        "3가지 도메인 렌즈: Backend / Frontend / PLC",
        "파일 확장자로 리뷰 도메인 자동 감지",
        "Bitbucket PR에 구조화된 코멘트 직접 게시",
        "독립 실행 스킬 — 환경 변수만으로 모든 프로젝트에서 동작",
      ],
    },
    status: "live",
  },
  {
    id: "javis",
    title: {
      en: "Javis",
      ko: "Javis",
    },
    tagline: {
      en: "AI project management bridge for Jira & Confluence",
      ko: "Jira & Confluence AI 프로젝트 관리 브릿지",
    },
    description: {
      en: "Bridges the gap between Jira/Confluence and local development workflows. Provides bidirectional sync, AI-powered risk detection (5 risk types), sprint analytics, and Slack integration. Functions as a local-first project management copilot.",
      ko: "Jira/Confluence와 로컬 개발 워크플로우 간의 간극을 잇는 브릿지. 양방향 동기화, AI 기반 리스크 감지(5가지 유형), 스프린트 분석, Slack 연동을 제공합니다. 로컬 우선 프로젝트 관리 코파일럿으로 기능합니다.",
    },
    vertical: "devtools",
    stack: ["Next.js", "PostgreSQL", "Claude API", "Jira/Confluence API", "Slack API"],
    hasDetailPage: false,
    highlights: {
      en: [
        "Bidirectional incremental sync: Jira ↔ DB ↔ Confluence",
        "5 AI risk types: delay, blocker, velocity drop, dependency, resource",
        "8 skills: init, story, dev, report, risk, sprint, sync, deploy",
        "Slack integration: outbound alerts + inbound commands",
      ],
      ko: [
        "양방향 증분 동기화: Jira ↔ DB ↔ Confluence",
        "5가지 AI 리스크: 지연, 차단, 속도 저하, 의존성, 리소스",
        "8개 스킬: init, story, dev, report, risk, sprint, sync, deploy",
        "Slack 연동: 아웃바운드 알림 + 인바운드 커맨드",
      ],
    },
    status: "active",
  },
];

export const stats = {
  projects: 12,
  techStacks: 15,
  domains: 4,
  agents: 6,
};
