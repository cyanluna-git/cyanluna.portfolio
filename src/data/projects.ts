export type ProjectMedia = {
  type: "gif" | "video" | "image" | "sequence";
  src?: string;
  frames?: string[];
  poster?: string;
};

export const curationTracks = {
  enterprise: {
    label: { en: "Enterprise Systems", ko: "엔터프라이즈 시스템" },
    description: {
      en: "Operational systems that connect teams, equipment, and internal decision flows.",
      ko: "팀, 장비, 내부 의사결정 흐름을 연결하는 운영 시스템입니다.",
    },
  },
  ai: {
    label: { en: "AI Tooling", ko: "AI 툴링" },
    description: {
      en: "AI-native products and workflows that automate planning, review, and output generation.",
      ko: "계획, 리뷰, 산출물 생성을 자동화하는 AI 네이티브 제품과 워크플로우입니다.",
    },
  },
  data: {
    label: { en: "Data Products", ko: "데이터 제품" },
    description: {
      en: "Analytics-heavy products that turn messy inputs into usable insight.",
      ko: "복잡한 입력을 사용 가능한 인사이트로 바꾸는 분석 중심 제품입니다.",
    },
  },
  product: {
    label: { en: "Consumer Products", ko: "컨슈머 제품" },
    description: {
      en: "User-facing products built around concrete, repeated real-world workflows.",
      ko: "반복되는 실제 사용자 워크플로우를 중심으로 만든 사용자 대상 제품입니다.",
    },
  },
} as const;

export type CurationTrack = keyof typeof curationTracks;
export type ProjectAudience = "leadership" | "ops" | "engineering" | "product";
export type ProjectProof = "system" | "automation" | "analytics" | "agentic";

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
  media?: ProjectMedia;
  url?: string;
  repo?: string;
  curation: {
    featuredRank?: number;
    track: CurationTrack;
    audience: ProjectAudience[];
    proof: ProjectProof;
    quickPitch: { en: string; ko: string };
    whyStartHere: { en: string; ko: string };
  };
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
    id: "moru",
    title: {
      en: "Moru — LLM Control Engineering Agent",
      ko: "모루 — LLM 제어 엔지니어링 에이전트",
    },
    tagline: {
      en: "AI agent that writes, tests, and self-heals industrial control logic",
      ko: "산업용 제어 로직을 작성·검증·자동복구하는 AI 에이전트",
    },
    description: {
      en: "LLM-powered agent that turns natural language requirements into verified, hardware-ready control logic. A 5-layer safety net — pre-validated Rust module library, compiler harness, Kanban self-healing loop, BDD e2e verification in a Cloud Digital Twin, and Human-in-the-Loop approval — replaces months of manual PLC programming with hours of AI-assisted specification.",
      ko: "자연어 요구사항을 검증된 하드웨어 제어 로직으로 변환하는 LLM 에이전트. 사전 검증된 Rust 모듈 라이브러리, 컴파일 하네스, 칸반 자기복구 루프, Cloud Digital Twin BDD e2e 검증, Human-in-the-Loop 승인의 5중 안전망으로 수개월의 수동 PLC 프로그래밍을 수시간의 AI 보조 사양 작성으로 대체합니다.",
    },
    vertical: "industrial",
    stack: ["Rust", "LLM (Claude)", "BDD/Gherkin", "Docker", "Next.js"],
    hasDetailPage: true,
    highlights: {
      en: [
        "5-layer safety net: Infrastructure → Compile → Kanban → BDD e2e → Human-in-the-Loop",
        "Pre-validated Rust module library constrains LLM solution space",
        "Cloud Digital Twin for zero-hardware BDD verification before deployment",
        "Kanban self-healing loop: auto-analysis and retry on FAIL state",
      ],
      ko: [
        "5중 안전망: 인프라 → 컴파일 → 칸반 → BDD e2e → Human-in-the-Loop",
        "사전 검증된 Rust 모듈 라이브러리로 LLM 솔루션 공간 제약",
        "배포 전 하드웨어 없이 BDD 검증하는 Cloud Digital Twin",
        "FAIL 상태 자동 분석 및 재시도하는 칸반 자기복구 루프",
      ],
    },
    status: "active",
    url: "/demo/moru/",
    curation: {
      featuredRank: 1,
      track: "ai",
      audience: ["leadership", "engineering"],
      proof: "agentic",
      quickPitch: {
        en: "AI agent replacing months of PLC programming with hours — 5-layer safety net included.",
        ko: "5중 안전망으로 수개월의 PLC 프로그래밍을 수시간으로 단축하는 AI 에이전트입니다.",
      },
      whyStartHere: {
        en: "Shows how I combine LLM agents with industrial safety constraints — not just prompt engineering.",
        ko: "LLM 에이전트와 산업용 안전 제약을 결합하는 방식을 보여줍니다 — 단순 프롬프트 엔지니어링을 넘어서.",
      },
    },
  },
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
    curation: {
      featuredRank: 2,
      track: "enterprise",
      audience: ["leadership", "ops", "engineering"],
      proof: "system",
      quickPitch: {
        en: "Industrial QC execution platform connecting UI, APIs, identity, and device protocols.",
        ko: "UI, API, 인증, 장비 프로토콜을 연결한 산업용 QC 실행 플랫폼입니다.",
      },
      whyStartHere: {
        en: "Best first proof if you want to see enterprise-grade system design in a manufacturing context.",
        ko: "제조 맥락에서 엔터프라이즈급 시스템 설계를 보려면 가장 먼저 볼 만한 프로젝트입니다.",
      },
    },
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
    hasDetailPage: true,
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
    curation: {
      track: "enterprise",
      audience: ["ops", "engineering"],
      proof: "automation",
      quickPitch: {
        en: "Protocol-heavy gateway that turns raw equipment registers into usable APIs and topology views.",
        ko: "원시 장비 레지스터를 API와 토폴로지 뷰로 바꾸는 프로토콜 중심 게이트웨이입니다.",
      },
      whyStartHere: {
        en: "Shows how I work at the protocol and polling layer instead of stopping at dashboards.",
        ko: "대시보드 단계에서 멈추지 않고 프로토콜과 폴링 레이어까지 다루는 방식을 보여줍니다.",
      },
    },
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
    curation: {
      featuredRank: 5,
      track: "enterprise",
      audience: ["leadership", "ops", "product"],
      proof: "system",
      quickPitch: {
        en: "Internal operating system for engineering capacity, milestones, worklogs, and planning.",
        ko: "엔지니어링 캐파시티, 마일스톤, 워크로그, 계획을 묶는 내부 운영 시스템입니다.",
      },
      whyStartHere: {
        en: "A strong entry if you want to see my internal tools and enterprise operations thinking.",
        ko: "내부 도구와 엔터프라이즈 운영 관점을 보고 싶을 때 좋은 시작점입니다.",
      },
    },
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
    hasDetailPage: true,
    media: {
      type: "sequence",
      frames: [
        "/projects/ai-cycling-coach/landing.webp",
        "/projects/ai-cycling-coach/workout-generator.webp",
        "/projects/ai-cycling-coach/weekly-plan.webp",
        "/projects/ai-cycling-coach/fitness-card.webp",
      ],
    },
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
    curation: {
      featuredRank: 3,
      track: "ai",
      audience: ["product", "engineering"],
      proof: "agentic",
      quickPitch: {
        en: "Production AI coach that converts training context into ride-ready workouts.",
        ko: "훈련 컨텍스트를 바로 라이딩 가능한 운동으로 바꾸는 프로덕션 AI 코치입니다.",
      },
      whyStartHere: {
        en: "Best health-side proof for AI orchestration, managed deployment, and real output generation.",
        ko: "AI 오케스트레이션, 매니지드 배포, 실제 산출물 생성을 함께 보여주는 헬스 도메인 대표 사례입니다.",
      },
    },
  },
  {
    id: "cpet-platform",
    title: {
      en: "CPET Platform",
      ko: "CPET 플랫폼",
    },
    tagline: {
      en: "Upload-to-publish CPET analysis platform",
      ko: "업로드부터 발행까지 잇는 CPET 분석 플랫폼",
    },
    description: {
      en: "Rebuilt as a CPET Platform v2 that accepts multi-source submissions, runs a SQLite-based analysis pipeline, publishes static HTML reports, and exposes subject-linked snapshots and feature explorers for follow-up research.",
      ko: "다중 소스 제출을 받아 SQLite 기반 분석 파이프라인을 실행하고, 정적 HTML 리포트를 발행하며, 피험자 연결 snapshot과 feature 탐색기를 제공하는 CPET Platform v2로 재구성했습니다.",
    },
    vertical: "health",
    stack: ["FastAPI", "Jinja2", "HTMX", "SQLite", "Python Pipeline"],
    hasDetailPage: true,
    media: {
      type: "sequence",
      frames: [
        "/projects/cpet-platform/subjects.webp",
        "/projects/cpet-platform/admin.webp",
        "/projects/cpet-platform/subject-detail.webp",
        "/projects/cpet-platform/cohort.webp",
      ],
    },
    highlights: {
      en: [
        "Submission workspace and file-manifest driven intake",
        "SQLite platform DB plus per-workspace analysis artifacts",
        "Published HTML reports synced back into the dashboard catalog",
        "Snapshot and feature-set explorers for cohort-ready follow-up analysis",
      ],
      ko: [
        "워크스페이스와 파일 매니페스트 기반 제출 인테이크",
        "플랫폼 DB와 워크스페이스별 분석 아티팩트를 나눈 SQLite 구조",
        "대시보드 카탈로그로 다시 연결되는 발행형 HTML 리포트",
        "코호트 후속 분석을 위한 snapshot 및 feature-set 탐색기",
      ],
    },
    status: "active",
    curation: {
      featuredRank: 6,
      track: "data",
      audience: ["engineering", "product"],
      proof: "analytics",
      quickPitch: {
        en: "A CPET analysis platform that turns uploaded test files into publishable reports and reusable subject-level research rows.",
        ko: "업로드된 검사 파일을 발행 가능한 리포트와 재사용 가능한 피험자 단위 연구 row로 바꾸는 CPET 분석 플랫폼입니다.",
      },
      whyStartHere: {
        en: "A strong example of how I move from one-off scientific analysis to a durable platform model with catalog, profiles, and research layers.",
        ko: "일회성 과학 분석을 카탈로그, 프로필, 연구 레이어를 갖춘 지속 가능한 플랫폼 모델로 확장하는 방식을 보여주는 사례입니다.",
      },
    },
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
    hasDetailPage: true,
    media: {
      type: "sequence",
      frames: [
        "/projects/ride-analytics/home.webp",
        "/projects/ride-analytics/explore.webp",
        "/projects/ride-analytics/course-detail.webp",
        "/projects/ride-analytics/upload.webp",
      ],
    },
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
    curation: {
      track: "data",
      audience: ["product", "engineering"],
      proof: "analytics",
      quickPitch: {
        en: "Route and ride analytics product built on a multi-stage data curation pipeline.",
        ko: "다단계 데이터 큐레이션 파이프라인 위에 구축한 경로·라이드 분석 제품입니다.",
      },
      whyStartHere: {
        en: "Useful if you want to see end-user mapping UX built on top of a careful data pipeline.",
        ko: "정교한 데이터 파이프라인 위에 얹힌 사용자용 맵 UX를 보고 싶을 때 적합합니다.",
      },
    },
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
    hasDetailPage: true,
    media: {
      type: "sequence",
      frames: [
        "/projects/today-bike/home.webp",
        "/projects/today-bike/admin-dashboard.webp",
        "/projects/today-bike/admin-kanban.webp",
        "/projects/today-bike/service-overhaul.webp",
      ],
    },
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
    curation: {
      track: "product",
      audience: ["ops", "product"],
      proof: "system",
      quickPitch: {
        en: "Service operations product for bicycle-shop workflows from intake to delivery.",
        ko: "자전거 매장 운영 흐름을 접수부터 출고까지 다루는 서비스 운영 제품입니다.",
      },
      whyStartHere: {
        en: "Shows I can package dense real-world workflows into a clean consumer-facing product.",
        ko: "복잡한 실제 워크플로우를 사용자용 제품으로 정리하는 능력을 보여줍니다.",
      },
    },
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
    hasDetailPage: true,
    media: {
      type: "sequence",
      frames: [
        "/projects/personal-finance/dashboard.webp",
        "/projects/personal-finance/cards.webp",
        "/projects/personal-finance/transactions.webp",
        "/projects/personal-finance/trips.webp",
      ],
    },
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
    curation: {
      track: "data",
      audience: ["product", "leadership"],
      proof: "analytics",
      quickPitch: {
        en: "Parser-driven finance dashboard built from messy multi-bank statement inputs.",
        ko: "여러 카드사 명세서를 정리해 만든 파서 중심 금융 대시보드입니다.",
      },
      whyStartHere: {
        en: "Good proof if you want to see format normalization and practical analytics instead of polished marketing UI only.",
        ko: "겉보기보다 포맷 정규화와 실용 분석 문제 해결을 보고 싶을 때 적합합니다.",
      },
    },
  },

  {
    id: "assist-hub",
    title: {
      en: "Assist Hub",
      ko: "Assist Hub",
    },
    tagline: {
      en: "Personal academic workspace for MBA",
      ko: "MBA 학사 관리 개인 워크스페이스",
    },
    description: {
      en: "Single-user localhost application that consolidates Google Classroom materials, multi-source notifications (SMS, Gmail, RSS), and academic schedules into one dashboard. Built with Next.js 16 and Prisma + SQLite for zero-configuration local persistence.",
      ko: "Google Classroom 자료, 멀티 소스 알림(SMS, Gmail, RSS), 학사 일정을 하나의 대시보드로 통합하는 단일 사용자 로컬호스트 애플리케이션입니다. Next.js 16과 Prisma + SQLite로 제로 설정 로컬 데이터 저장을 제공합니다.",
    },
    vertical: "consumer",
    stack: ["Next.js 16", "Prisma", "SQLite", "Google APIs", "Tailwind CSS"],
    hasDetailPage: true,
    media: {
      type: "sequence",
      frames: [
        "/projects/assist-hub/dashboard.webp",
        "/projects/assist-hub/bulletin.webp",
        "/projects/assist-hub/materials.webp",
        "/projects/assist-hub/schedule.webp",
      ],
    },
    highlights: {
      en: [
        "3-in-1 bulletin: SMS + Gmail + RSS aggregation",
        "Google Classroom/Gmail/Calendar API integration",
        "Zero-config SQLite local persistence",
        "Learning console with reading & summary queues",
      ],
      ko: [
        "3-in-1 게시판: SMS + Gmail + RSS 통합",
        "Google Classroom/Gmail/Calendar API 연동",
        "제로 설정 SQLite 로컬 데이터 저장",
        "리딩 큐 & 요약 큐가 포함된 학습 콘솔",
      ],
    },
    status: "active",
    curation: {
      track: "product",
      audience: ["product", "ops"],
      proof: "system",
      quickPitch: {
        en: "Personal operating workspace that unifies class materials, notifications, and schedules.",
        ko: "수업 자료, 알림, 일정을 하나로 묶는 개인 운영 워크스페이스입니다.",
      },
      whyStartHere: {
        en: "Useful for seeing how I compress fragmented information into one practical interface.",
        ko: "흩어진 정보를 하나의 실용 인터페이스로 압축하는 방식을 보여줍니다.",
      },
    },
  },
  {
    id: "assist-11th",
    title: {
      en: "aSSiST 11th Community",
      ko: "aSSiST 11기 커뮤니티",
    },
    tagline: {
      en: "MBA cohort community platform",
      ko: "MBA 동기 커뮤니티 플랫폼",
    },
    description: {
      en: "Full-featured community platform for MBA cohort members. Features community boards (notice/free/column), photo gallery, polls, study groups, lunch recommendations with Kakao Maps, thesis repository, and student council management — all as a PWA for mobile-first access.",
      ko: "MBA 동기를 위한 풀 기능 커뮤니티 플랫폼입니다. 커뮤니티 게시판(공지/자유/칼럼), 사진 갤러리, 투표, 소모임, 카카오맵 기반 점심 추천, 논문 저장소, 학생회 관리를 PWA로 모바일 우선 접근을 제공합니다.",
    },
    vertical: "consumer",
    stack: ["Next.js 15", "Drizzle ORM", "Neon PostgreSQL", "AWS S3", "Kakao Maps"],
    hasDetailPage: true,
    media: {
      type: "sequence",
      frames: [
        "/projects/assist-11th/home.webp",
        "/projects/assist-11th/posts.webp",
        "/projects/assist-11th/gallery.webp",
        "/projects/assist-11th/lunch.webp",
      ],
    },
    highlights: {
      en: [
        "PWA: installable on mobile without app store",
        "Invitation-code closed community registration",
        "Kakao Maps lunch recommendation (Babzip)",
        "10+ features: posts, gallery, polls, events, groups, thesis",
      ],
      ko: [
        "PWA: 앱스토어 없이 모바일 설치 가능",
        "초대 코드 기반 폐쇄형 커뮤니티 등록",
        "카카오맵 점심 추천 (밥집)",
        "10+ 기능: 게시판, 갤러리, 투표, 이벤트, 소모임, 논문",
      ],
    },
    status: "active",
    curation: {
      track: "product",
      audience: ["product", "leadership"],
      proof: "system",
      quickPitch: {
        en: "Feature-dense cohort community product built as a mobile-first PWA.",
        ko: "모바일 우선 PWA로 구축한 기능 밀도 높은 코호트 커뮤니티 제품입니다.",
      },
      whyStartHere: {
        en: "Shows product-range breadth when you want to see community, operations, and content tools in one build.",
        ko: "커뮤니티, 운영, 콘텐츠 도구가 한 제품에 어떻게 묶이는지 보고 싶을 때 적합합니다.",
      },
    },
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
    hasDetailPage: true,
    media: {
      type: "sequence",
      frames: [
        "/projects/kanban-pipeline/board.webp",
        "/projects/kanban-pipeline/task-detail.webp",
        "/projects/kanban-pipeline/list-view.webp",
        "/projects/kanban-pipeline/chronicle.webp",
      ],
    },
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
    curation: {
      featuredRank: 4,
      track: "ai",
      audience: ["leadership", "engineering"],
      proof: "agentic",
      quickPitch: {
        en: "Multi-agent delivery system that plans, implements, reviews, and tests code changes.",
        ko: "코드 변경을 계획, 구현, 리뷰, 테스트까지 이어주는 멀티에이전트 전달 시스템입니다.",
      },
      whyStartHere: {
        en: "Best proof if you want to understand my AI-native engineering workflow and orchestration style.",
        ko: "AI 네이티브 엔지니어링 워크플로우와 오케스트레이션 스타일을 보기에 가장 좋은 사례입니다.",
      },
    },
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
    hasDetailPage: true,
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
    curation: {
      track: "ai",
      audience: ["engineering", "leadership"],
      proof: "automation",
      quickPitch: {
        en: "Domain-aware PR review automation across backend, frontend, and PLC codebases.",
        ko: "백엔드, 프론트엔드, PLC 코드를 가로지르는 도메인 인식 PR 리뷰 자동화입니다.",
      },
      whyStartHere: {
        en: "Shows practical AI application in a real engineering feedback loop, not just a demo agent.",
        ko: "데모용 에이전트가 아니라 실제 엔지니어링 피드백 루프에 AI를 적용한 사례입니다.",
      },
    },
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
    hasDetailPage: true,
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
    curation: {
      track: "ai",
      audience: ["leadership", "product", "engineering"],
      proof: "agentic",
      quickPitch: {
        en: "AI PM bridge that turns Jira and Confluence data into a local-first operating workflow.",
        ko: "Jira와 Confluence 데이터를 로컬 우선 운영 흐름으로 바꾸는 AI PM 브리지입니다.",
      },
      whyStartHere: {
        en: "A good bridge case if you want to see enterprise coordination problems translated into AI tooling.",
        ko: "엔터프라이즈 협업 문제를 AI 툴링으로 번역한 사례를 보고 싶을 때 적합합니다.",
      },
    },
  },
];

export const featuredProjects = [...projects]
  .filter((project) => typeof project.curation.featuredRank === "number")
  .sort((a, b) => (a.curation.featuredRank ?? Number.MAX_SAFE_INTEGER) - (b.curation.featuredRank ?? Number.MAX_SAFE_INTEGER));

export const stats = {
  projects: 15,
  techStacks: 15,
  domains: 4,
  agents: 6,
};
