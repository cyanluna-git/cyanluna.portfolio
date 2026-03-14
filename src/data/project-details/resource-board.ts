import type { ProjectDetail } from "@/types/project-detail";

export const resourceBoard: ProjectDetail = {
  slug: "resource-board",
  vertical: "industrial",
  verticalColor: "#3B82F6",
  status: "active",
  title: {
    en: "Engineering Resource Board",
    ko: "엔지니어링 리소스 보드",
  },
  tagline: {
    en: "Unified project & resource planning for manufacturing engineering teams",
    ko: "제조 엔지니어링 팀을 위한 통합 프로젝트 & 리소스 플래닝",
  },
  heroImage: "/projects/resource-board/hero.png",

  painPoints: [
    {
      icon: "📊",
      title: {
        en: "Scattered Excel Trackers",
        ko: "흩어진 Excel 트래커",
      },
      description: {
        en: "Each team maintained separate Excel files for resource tracking, leading to version conflicts and outdated data across departments.",
        ko: "각 팀이 리소스 트래킹을 위해 별도의 Excel 파일을 관리하여 부서 간 버전 충돌과 데이터 불일치가 발생했습니다.",
      },
    },
    {
      icon: "🗂️",
      title: {
        en: "SharePoint Folder Chaos",
        ko: "SharePoint 폴더 혼란",
      },
      description: {
        en: "Project documents scattered across deeply nested SharePoint folders with inconsistent naming conventions, making resource data nearly impossible to find.",
        ko: "비일관적인 명명 규칙으로 깊게 중첩된 SharePoint 폴더에 프로젝트 문서가 분산되어 리소스 데이터를 찾기가 거의 불가능했습니다.",
      },
    },
    {
      icon: "⏳",
      title: {
        en: "Manual FTE Calculation",
        ko: "수동 FTE 계산",
      },
      description: {
        en: "Managers spent hours every month manually aggregating FTE allocations from multiple sources, often producing inconsistent headcount reports.",
        ko: "관리자들이 매월 여러 소스에서 FTE 배분을 수동으로 집계하는 데 수시간을 소요했고, 인원 보고서가 일관되지 않았습니다.",
      },
    },
    {
      icon: "✍️",
      title: {
        en: "Unstructured Work Logs",
        ko: "비구조화된 작업 기록",
      },
      description: {
        en: "Engineers logged work hours in free-form text or skipped logging entirely, making it impossible to analyze actual vs. planned resource usage.",
        ko: "엔지니어들이 작업 시간을 자유 형식 텍스트로 기록하거나 기록 자체를 생략하여, 실제 대비 계획 리소스 사용 분석이 불가능했습니다.",
      },
    },
  ],

  beforeAfter: [
    {
      before: {
        en: "Multiple Excel files per team with manual FTE rollup",
        ko: "팀별 다수의 Excel 파일과 수동 FTE 취합",
      },
      after: {
        en: "Single platform with real-time 12-month FTE matrix across all teams",
        ko: "모든 팀의 실시간 12개월 FTE 매트릭스를 제공하는 단일 플랫폼",
      },
    },
    {
      before: {
        en: "Free-text work logs with no structure or classification",
        ko: "구조나 분류 없는 자유 텍스트 작업 기록",
      },
      after: {
        en: "AI-powered NLP parser converts natural language to structured time records",
        ko: "AI NLP 파서가 자연어를 구조화된 시간 기록으로 자동 변환",
      },
    },
    {
      before: {
        en: "Milestone tracking via email threads and meeting notes",
        ko: "이메일 스레드와 회의록으로 마일스톤 추적",
      },
      after: {
        en: "Gate review dashboard with G3/G5/G6 progress visualization",
        ko: "G3/G5/G6 진행 시각화가 포함된 Gate 리뷰 대시보드",
      },
    },
  ],

  approach: {
    title: {
      en: "Easy Input, Detailed Classification",
      ko: "쉬운 입력, 정밀한 분류",
    },
    description: {
      en: "The core design philosophy is to minimize input friction while maximizing data granularity. Engineers write work logs in natural language — the AI parser handles classification by project, task type, and time allocation. The organization hierarchy (Division → Department → Team → Position) ensures every data point rolls up accurately from individual contributors to executive dashboards without manual aggregation.",
      ko: "핵심 설계 철학은 입력 부담을 최소화하면서 데이터 세분화를 극대화하는 것입니다. 엔지니어는 작업 기록을 자연어로 작성하면 AI 파서가 프로젝트, 업무 유형, 시간 배분을 자동 분류합니다. 조직 구조(사업부 → 부서 → 팀 → 포지션)를 통해 모든 데이터가 개별 기여자부터 경영진 대시보드까지 수동 집계 없이 정확하게 롤업됩니다.",
    },
  },

  features: [
    {
      title: {
        en: "Personal Dashboard",
        ko: "개인 대시보드",
      },
      description: {
        en: "Each engineer gets a personalized view showing their project allocations, upcoming milestones, and work log history. Quick-entry buttons make daily logging effortless.",
        ko: "각 엔지니어에게 프로젝트 배분, 예정 마일스톤, 작업 기록 이력을 보여주는 개인화된 뷰를 제공합니다. 빠른 입력 버튼으로 일일 기록이 간편합니다.",
      },
      image: "/projects/resource-board/feature-dashboard.png",
    },
    {
      title: {
        en: "Smart Worklog (AI NLP Input)",
        ko: "스마트 워크로그 (AI NLP 입력)",
      },
      description: {
        en: "Write work logs in natural language like 'Spent 3h on pump module testing, 2h design review for valve assembly.' The AI parser extracts projects, tasks, and hours automatically, converting free text into structured time records.",
        ko: "'펌프 모듈 테스트 3시간, 밸브 어셈블리 설계 리뷰 2시간'처럼 자연어로 작업 기록을 작성하면, AI 파서가 프로젝트, 업무, 시간을 자동 추출하여 구조화된 시간 기록으로 변환합니다.",
      },
      image: "/projects/resource-board/feature-worklog.png",
    },
    {
      title: {
        en: "Resource Matrix (12-Month FTE)",
        ko: "리소스 매트릭스 (12개월 FTE)",
      },
      description: {
        en: "A bird's-eye view of FTE allocation across all projects and teams for the next 12 months. Supports TBD position forecasting, helping managers plan hiring and reassignment before bottlenecks occur.",
        ko: "전체 프로젝트와 팀의 향후 12개월 FTE 배분을 한눈에 보여주는 뷰입니다. TBD 포지션 예측을 지원하여 관리자가 병목 발생 전에 채용 및 재배치를 계획할 수 있습니다.",
      },
      image: "/projects/resource-board/feature-matrix.png",
    },
    {
      title: {
        en: "FTE Analytics",
        ko: "FTE 분석",
      },
      description: {
        en: "Drill-down analytics comparing planned vs. actual FTE usage by department, project, and individual. Identifies over-allocated engineers and under-utilized capacity with visual heatmaps.",
        ko: "부서, 프로젝트, 개인별 계획 대비 실제 FTE 사용량을 비교하는 드릴다운 분석입니다. 시각적 히트맵으로 과배분된 엔지니어와 미활용 역량을 파악합니다.",
      },
      image: "/projects/resource-board/feature-analytics.png",
    },
    {
      title: {
        en: "Milestone Tracking",
        ko: "마일스톤 트래킹",
      },
      description: {
        en: "Gate review management for manufacturing project milestones (G3, G5, G6). Visual timeline showing gate status, blockers, and upcoming reviews with automated notification to stakeholders.",
        ko: "제조 프로젝트 마일스톤(G3, G5, G6)의 Gate 리뷰 관리입니다. 게이트 상태, 차단 요소, 예정 리뷰를 시각적 타임라인으로 보여주며 이해관계자에게 자동 알림을 보냅니다.",
      },
      image: "/projects/resource-board/feature-milestone.png",
    },
  ],

  architecture: {
    nodes: [
      { id: "browser", label: { en: "Browser", ko: "브라우저" }, type: "client", x: 50, y: 50 },
      { id: "react", label: { en: "React 19 SPA", ko: "React 19 SPA" }, type: "client", x: 200, y: 50 },
      { id: "fastapi", label: { en: "FastAPI", ko: "FastAPI" }, type: "server", x: 200, y: 180 },
      { id: "postgres", label: { en: "PostgreSQL", ko: "PostgreSQL" }, type: "database", x: 50, y: 180 },
      { id: "ai", label: { en: "AI Parser (Groq/Gemini)", ko: "AI 파서 (Groq/Gemini)" }, type: "service", x: 350, y: 180 },
      { id: "entra", label: { en: "Entra ID (SSO)", ko: "Entra ID (SSO)" }, type: "external", x: 50, y: 310 },
    ],
    connections: [
      { from: "browser", to: "react", label: { en: "SPA", ko: "SPA" } },
      { from: "react", to: "fastapi", label: { en: "REST API", ko: "REST API" } },
      { from: "fastapi", to: "postgres", label: { en: "SQL", ko: "SQL" } },
      { from: "fastapi", to: "ai", label: { en: "NLP Parse", ko: "NLP 파싱" } },
      { from: "fastapi", to: "entra", label: { en: "SAML 2.0", ko: "SAML 2.0" } },
    ],
  },

  metrics: [
    {
      value: "90%",
      label: { en: "Tracking Time Saved", ko: "트래킹 시간 절감" },
      description: { en: "Reduction in monthly FTE aggregation effort", ko: "월간 FTE 집계 작업 시간 단축" },
    },
    {
      value: "12mo",
      label: { en: "FTE Forecast Window", ko: "FTE 예측 기간" },
      description: { en: "Forward-looking resource allocation visibility", ko: "미래 리소스 배분 가시성 확보" },
    },
    {
      value: "5s",
      label: { en: "Log Entry Time", ko: "기록 입력 시간" },
      description: { en: "Natural language worklog via AI parser", ko: "AI 파서를 통한 자연어 작업 기록" },
    },
    {
      value: "4-tier",
      label: { en: "Org Hierarchy", ko: "조직 계층" },
      description: { en: "Division → Department → Team → Position", ko: "사업부 → 부서 → 팀 → 포지션" },
    },
  ],

  prevProject: {
    slug: "equipment-gateway",
    title: { en: "Equipment Gateway", ko: "장비 게이트웨이" },
  },
  nextProject: undefined,
};
