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

  introduction: {
    badge: {
      en: "Generalized from the live Engineering Operation Board introduction",
      ko: "실제 Engineering Operation Board 소개 흐름을 일반화한 버전",
    },
    title: {
      en: "An operating layer for engineering planning and execution",
      ko: "엔지니어링 계획과 실행을 잇는 운영 레이어",
    },
    subtitle: {
      en: "This project reframed resource planning as an operating-system problem: connect worklogs, FTE planning, project visibility, and reporting so managers can move from file reconstruction to real operational judgment.",
      ko: "이 프로젝트는 리소스 플래닝을 단순한 관리 화면이 아니라 운영체계 문제로 다시 정의했습니다. 워크로그, FTE 계획, 프로젝트 가시성, 리포팅을 연결해 매니저가 파일 재구성 대신 실제 운영 판단을 할 수 있게 만드는 것이 핵심이었습니다.",
    },
    pillars: [
      {
        label: { en: "Why 01", ko: "Why 01" },
        title: {
          en: "Engineering data was scattered across tools",
          ko: "엔지니어링 데이터가 도구별로 흩어져 있었다",
        },
        description: {
          en: "Daily worklogs, resource plans, milestone status, and cost context all lived in different systems. Even simple reporting required collecting fragments from SharePoint, Excel, and mail threads before any decision could begin.",
          ko: "일일 워크로그, 리소스 계획, 마일스톤 상태, 비용 맥락이 서로 다른 시스템에 흩어져 있었습니다. 간단한 보고조차 SharePoint, Excel, 메일 스레드의 조각을 다시 모아야 비로소 판단을 시작할 수 있었습니다.",
        },
        stat: {
          en: "SharePoint + Excel + email",
          ko: "SharePoint + Excel + 이메일",
        },
      },
      {
        label: { en: "Why 02", ko: "Why 02" },
        title: {
          en: "Managers spent energy rebuilding context",
          ko: "매니저들은 판단보다 맥락 재구성에 에너지를 썼다",
        },
        description: {
          en: "The real pain was not only manual entry. It was the repeated work of rebuilding plan-versus-actual context every month, with no stable runtime view of capacity, allocation, or delivery risk.",
          ko: "진짜 문제는 단순 입력 수고만이 아니었습니다. 매달 계획 대비 실적의 맥락을 다시 조립해야 했고, 용량과 배정, 납기 리스크를 안정적으로 보는 실행 화면이 없었다는 점이 더 컸습니다.",
        },
        stat: {
          en: "Reporting delayed operational decisions",
          ko: "리포팅이 운영 판단을 늦췄다",
        },
      },
      {
        label: { en: "Why 03", ko: "Why 03" },
        title: {
          en: "A single screen was not enough",
          ko: "단일 화면 하나만으로는 풀리지 않았다",
        },
        description: {
          en: "The solution needed to behave like an operating layer, not just a dashboard. Inputs had to become structured records, planning had to become a shared matrix, and reporting had to turn into a live management signal.",
          ko: "해결책은 단순 대시보드가 아니라 운영 레이어처럼 작동해야 했습니다. 입력은 구조화된 기록이 되고, 계획은 공유 가능한 매트릭스가 되며, 보고는 실시간 관리 신호로 바뀌어야 했습니다.",
        },
        stat: {
          en: "Input → plan → execution → report",
          ko: "입력 → 계획 → 실행 → 리포트",
        },
      },
    ],
    layers: [
      {
        label: { en: "Presentation Layer", ko: "프레젠테이션 레이어" },
        description: {
          en: "The product separates personal action surfaces from management visibility so the same system serves individual contributors and decision makers without turning into one overloaded screen.",
          ko: "이 제품은 개인 실행 화면과 관리 가시성 화면을 분리해, 하나의 시스템이 실무자와 의사결정자를 모두 지원하되 과도하게 무거운 단일 화면이 되지 않도록 했습니다.",
        },
        items: [
          {
            title: { en: "Personal work surface", ko: "개인 작업 화면" },
            description: {
              en: "Engineers log work quickly, review their allocations, and keep execution records close to the actual workday.",
              ko: "엔지니어는 빠르게 작업을 기록하고 배정을 확인하며, 실행 기록을 실제 업무 흐름 가까이에 유지합니다.",
            },
            meta: { en: "Input", ko: "Input" },
          },
          {
            title: { en: "Management dashboard", ko: "관리 대시보드" },
            description: {
              en: "Managers read capacity, project pressure, and reporting signals from a shared operating view rather than from stitched spreadsheets.",
              ko: "매니저는 짜깁기된 스프레드시트 대신 공유된 운영 뷰에서 용량과 프로젝트 압력, 리포트 신호를 읽습니다.",
            },
            meta: { en: "Visibility", ko: "Visibility" },
          },
        ],
      },
      {
        label: { en: "Application Layer", ko: "애플리케이션 레이어" },
        description: {
          en: "Business logic ties together worklogs, FTE allocation, project lifecycle, and financial classification so planning and execution do not drift into separate systems.",
          ko: "비즈니스 로직은 워크로그, FTE 배정, 프로젝트 수명주기, 재무 분류를 하나로 묶어 계획과 실행이 서로 다른 시스템으로 흩어지지 않게 합니다.",
        },
        items: [
          {
            title: { en: "Operations API", ko: "운영 API" },
            description: {
              en: "Handles user flows, permissions, planning rules, and reporting endpoints as one coherent runtime.",
              ko: "사용자 흐름, 권한, 계획 규칙, 리포팅 엔드포인트를 하나의 런타임으로 묶어 처리합니다.",
            },
            meta: { en: "FastAPI", ko: "FastAPI" },
          },
          {
            title: { en: "Classification services", ko: "분류 서비스" },
            description: {
              en: "Transforms raw work inputs into structured operational data that can support reporting, recharge, and planning decisions.",
              ko: "원시 업무 입력을 리포팅, 리차지, 계획 판단에 활용할 수 있는 구조화된 운영 데이터로 변환합니다.",
            },
            meta: { en: "Rules + AI", ko: "Rules + AI" },
          },
        ],
      },
      {
        label: { en: "Data Layer", ko: "데이터 레이어" },
        description: {
          en: "The data model keeps organization hierarchy, project hierarchy, allocations, worklogs, and financial dimensions in one place so analysis does not require export-and-merge cycles.",
          ko: "데이터 모델은 조직 계층, 프로젝트 계층, 배정, 워크로그, 재무 차원을 한곳에 유지해 분석이 내보내기와 수동 병합에 의존하지 않도록 합니다.",
        },
        items: [
          {
            title: { en: "Unified planning store", ko: "통합 계획 저장소" },
            description: {
              en: "FTE plans, TBD positions, and actual work records stay comparable over time instead of living in disconnected monthly files.",
              ko: "FTE 계획, TBD 포지션, 실제 작업 기록이 서로 다른 월별 파일이 아니라 시간축 위에서 비교 가능한 상태로 유지됩니다.",
            },
            meta: { en: "PostgreSQL", ko: "PostgreSQL" },
          },
          {
            title: { en: "Reporting-ready dimensions", ko: "리포트 지향 차원 모델" },
            description: {
              en: "Funding, IO, activity, and cost context are attached early so operational records can flow into management and finance conversations.",
              ko: "펀딩, IO, 활동, 비용 맥락을 초기에 붙여 운영 기록이 관리와 재무 대화로 자연스럽게 이어지게 했습니다.",
            },
            meta: { en: "Dimensions", ko: "Dimensions" },
          },
        ],
      },
      {
        label: { en: "Expansion Layer", ko: "확장 레이어" },
        description: {
          en: "The platform is shaped to become a broader operating surface rather than a closed internal tracker, leaving room for adjacent systems and enterprise integrations.",
          ko: "이 플랫폼은 닫힌 내부 트래커가 아니라 더 넓은 운영 표면으로 확장될 수 있도록 설계돼, 인접 시스템과 엔터프라이즈 연동을 수용할 여지를 남겨두었습니다.",
        },
        items: [
          {
            title: { en: "Connected operations surface", ko: "연결형 운영 표면" },
            description: {
              en: "Designed to sit alongside OQC and other execution systems as one shared operating map for planning and delivery.",
              ko: "OQC와 다른 실행 시스템 옆에서 계획과 납기를 위한 공유 운영 지도 역할을 하도록 구성했습니다.",
            },
            meta: { en: "OQC-EOB", ko: "OQC-EOB" },
          },
          {
            title: { en: "Enterprise-ready interfaces", ko: "엔터프라이즈 대응 인터페이스" },
            description: {
              en: "Prepared for future links with Microsoft 365, SAP, and other enterprise systems once the operational model proves stable.",
              ko: "운영 모델이 안정화되면 Microsoft 365, SAP, 기타 엔터프라이즈 시스템과 이어질 수 있도록 준비했습니다.",
            },
            meta: { en: "Planned", ko: "Planned" },
          },
        ],
      },
    ],
    capabilities: [
      {
        title: {
          en: "Structured worklog intake",
          ko: "구조화된 워크로그 입력",
        },
        description: {
          en: "Natural-language work entries become reusable operational records instead of dead-end text, reducing input friction without sacrificing downstream reporting value.",
          ko: "자연어 작업 입력을 막다른 텍스트가 아니라 재사용 가능한 운영 기록으로 바꿔, 입력 부담은 줄이면서도 후속 리포팅 가치는 유지합니다.",
        },
      },
      {
        title: {
          en: "Shared FTE planning matrix",
          ko: "공유형 FTE 계획 매트릭스",
        },
        description: {
          en: "Capacity planning, vacancies, and future allocation scenarios can be discussed in one matrix instead of scattered team-specific spreadsheets.",
          ko: "용량 계획과 공석, 향후 배정 시나리오를 팀별로 흩어진 시트가 아니라 하나의 매트릭스에서 논의할 수 있습니다.",
        },
      },
      {
        title: {
          en: "Project and milestone visibility",
          ko: "프로젝트와 마일스톤 가시성",
        },
        description: {
          en: "Project lifecycle and execution pressure become visible in the same operating context as resource allocation.",
          ko: "프로젝트 수명주기와 실행 압력이 리소스 배정과 같은 운영 맥락 안에서 함께 보이도록 했습니다.",
        },
      },
      {
        title: {
          en: "Plan-versus-actual analytics",
          ko: "계획 대비 실적 분석",
        },
        description: {
          en: "Managers can move from raw entries to actionable variance signals across department, project, and individual levels.",
          ko: "매니저는 원시 기록에서 출발해 부서, 프로젝트, 개인 수준의 실행 차이 신호까지 바로 볼 수 있습니다.",
        },
      },
      {
        title: {
          en: "Operational reporting loop",
          ko: "운영 리포팅 루프",
        },
        description: {
          en: "Reporting is generated from live operational data, which shortens the path between what happened and what leaders can decide next.",
          ko: "리포트가 살아있는 운영 데이터에서 바로 생성되어, 실제 발생한 일과 다음 판단 사이의 거리를 줄입니다.",
        },
      },
      {
        title: {
          en: "Enterprise translation path",
          ko: "엔터프라이즈 번역 경로",
        },
        description: {
          en: "The same operating model can expand toward Microsoft 365, SAP, and adjacent enterprise environments without rebuilding the product story from scratch.",
          ko: "같은 운영 모델을 기반으로 Microsoft 365, SAP, 인접 엔터프라이즈 환경까지 확장할 수 있어 제품 서사를 처음부터 다시 만들 필요가 없습니다.",
        },
      },
    ],
    roadmap: [
      {
        label: { en: "Phase 1", ko: "Phase 1" },
        title: {
          en: "Replace fragmented team trackers",
          ko: "파편화된 팀 트래커 대체",
        },
        description: {
          en: "Start with the highest-friction planning and reporting workflows so the value of a shared operational base is immediately visible.",
          ko: "마찰이 가장 큰 계획과 리포팅 흐름부터 대체해, 공유 운영 기반의 가치가 즉시 드러나도록 하는 단계입니다.",
        },
        status: "active",
      },
      {
        label: { en: "Phase 2", ko: "Phase 2" },
        title: {
          en: "Deepen analytics and management signals",
          ko: "분석과 관리 신호 심화",
        },
        description: {
          en: "Turn the platform from a tracker into a stronger decision surface with trend analysis, variance drill-downs, and capacity signals.",
          ko: "추세 분석과 차이 드릴다운, 용량 신호를 붙여 단순 트래커를 더 강한 의사결정 표면으로 전환합니다.",
        },
        status: "planned",
      },
      {
        label: { en: "Phase 3", ko: "Phase 3" },
        title: {
          en: "Connect adjacent operating systems",
          ko: "인접 운영 시스템 연결",
        },
        description: {
          en: "Shape the board as part of a broader execution map alongside quality and delivery systems such as OQC.",
          ko: "이 보드를 OQC 같은 품질·실행 시스템과 나란히 놓이는 더 큰 실행 지도 일부로 확장합니다.",
        },
        status: "planned",
      },
      {
        label: { en: "Phase 4", ko: "Phase 4" },
        title: {
          en: "Expand into enterprise integrations",
          ko: "엔터프라이즈 연동으로 확장",
        },
        description: {
          en: "Prepare the operating model to connect with Microsoft 365, SAP, and other enterprise systems once adoption and governance mature.",
          ko: "도입과 거버넌스가 안정되면 Microsoft 365, SAP, 기타 엔터프라이즈 시스템과 연결될 수 있도록 운영 모델을 확장합니다.",
        },
        status: "future",
      },
    ],
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
  nextProject: {
    slug: "ai-cycling-coach",
    title: { en: "AI Cycling Coach", ko: "AI 사이클링 코치" },
  },
};
