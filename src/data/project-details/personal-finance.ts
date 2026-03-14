import type { ProjectDetail } from "@/types/project-detail";

export const personalFinance: ProjectDetail = {
  slug: "personal-finance",
  vertical: "consumer",
  verticalColor: "#F59E0B",
  status: "active",
  title: {
    en: "Personal Finance Tracker",
    ko: "가계부 트래커",
  },
  tagline: {
    en: "Personal asset management and investment portfolio tracking",
    ko: "개인 자산 관리와 투자 포트폴리오 추적",
  },
  heroImage: "/projects/personal-finance/hero.png",

  painPoints: [
    {
      icon: "🏦",
      title: {
        en: "Scattered Accounts",
        ko: "흩어진 계좌",
      },
      description: {
        en: "Financial data was spread across 7 different Korean banks and card companies, each with its own portal, file format (XLSX, HTML-disguised XLS, legacy OLE), and export process. Getting a complete picture required logging into every service individually.",
        ko: "금융 데이터가 7개 한국 은행과 카드사에 분산되어 있었고, 각각 별도의 포털, 파일 형식(XLSX, HTML 위장 XLS, 레거시 OLE), 내보내기 프로세스를 가졌습니다. 전체 그림을 파악하려면 모든 서비스에 개별 로그인이 필요했습니다.",
      },
    },
    {
      icon: "📊",
      title: {
        en: "No Unified View",
        ko: "통합 뷰 부재",
      },
      description: {
        en: "Without a single dashboard combining all accounts, it was impossible to see total spending, identify cross-card patterns, or understand the full financial picture. Each bank's own analytics only showed its own transactions.",
        ko: "모든 계좌를 결합한 단일 대시보드가 없어, 총 지출을 확인하거나, 카드 간 패턴을 식별하거나, 전체 재정 상황을 파악하는 것이 불가능했습니다. 각 은행의 자체 분석은 자사 거래만 보여주었습니다.",
      },
    },
    {
      icon: "✍️",
      title: {
        en: "Manual Tracking",
        ko: "수동 추적",
      },
      description: {
        en: "Categorizing expenses required manual effort — reviewing each transaction and assigning it to a spending category. Without automation, most people gave up on detailed tracking within weeks of starting.",
        ko: "지출 분류에 수동 작업이 필요했습니다 — 각 거래를 검토하고 지출 카테고리에 할당해야 했습니다. 자동화 없이는 대부분의 사람들이 시작한 지 수주 내에 상세 추적을 포기했습니다.",
      },
    },
  ],

  beforeAfter: [
    {
      before: {
        en: "Logging into 7 different bank portals to check spending",
        ko: "지출 확인을 위해 7개 은행 포털에 개별 로그인",
      },
      after: {
        en: "Single unified dashboard with all bank/card transactions aggregated",
        ko: "모든 은행/카드 거래가 집계된 단일 통합 대시보드",
      },
    },
    {
      before: {
        en: "Manual transaction categorization that nobody maintained",
        ko: "아무도 유지하지 않는 수동 거래 분류",
      },
      after: {
        en: "Keyword-based auto-classification of merchants into spending categories",
        ko: "키워드 기반 가맹점 → 지출 카테고리 자동 분류",
      },
    },
    {
      before: {
        en: "Incompatible file formats across different card companies",
        ko: "카드사마다 호환되지 않는 파일 형식",
      },
      after: {
        en: "7 parsers handling 3 file format families with auto-detection by filename",
        ko: "파일명 자동 감지로 3개 파일 형식 계열을 처리하는 7개 파서",
      },
    },
  ],

  approach: {
    title: {
      en: "Universal Parser + Auto-Classification",
      ko: "유니버설 파서 + 자동 분류",
    },
    description: {
      en: "The core challenge is that Korean banks export data in wildly different formats — standard XLSX, HTML files disguised as .xls, and legacy OLE compound documents. The platform handles this with a bank-specific parser registry that auto-detects the card company from the filename pattern and routes the file to the correct parser. Once parsed into a normalized schema, a keyword-based classification engine maps merchant names to spending categories using configurable rule sets. All data lands in a local SQLite database (Drizzle ORM), keeping sensitive financial data on-device with no cloud dependency. The Next.js frontend renders interactive dashboards with monthly and card-wise spending breakdowns.",
      ko: "핵심 과제는 한국 은행들이 극도로 다른 형식으로 데이터를 내보낸다는 것입니다 — 표준 XLSX, .xls로 위장된 HTML 파일, 레거시 OLE 복합 문서. 플랫폼은 파일명 패턴에서 카드사를 자동 감지하고 올바른 파서로 라우팅하는 은행별 파서 레지스트리로 이를 처리합니다. 정규화된 스키마로 파싱된 후, 키워드 기반 분류 엔진이 설정 가능한 규칙 세트를 사용하여 가맹점명을 지출 카테고리에 매핑합니다. 모든 데이터는 로컬 SQLite 데이터베이스(Drizzle ORM)에 저장되어, 클라우드 의존 없이 민감한 금융 데이터를 기기 내에 보관합니다. Next.js 프론트엔드가 월별 및 카드별 지출 분석이 포함된 인터랙티브 대시보드를 렌더링합니다.",
    },
  },

  features: [
    {
      title: {
        en: "Account Aggregation",
        ko: "계좌 통합",
      },
      description: {
        en: "Import credit card statements from 7 Korean banks with automatic format detection. Supports XLSX, HTML-disguised XLS, and legacy OLE formats. Auto-detects card company from filename and routes to the correct parser for seamless data ingestion.",
        ko: "자동 형식 감지로 7개 한국 은행의 신용카드 명세서를 가져옵니다. XLSX, HTML 위장 XLS, 레거시 OLE 형식을 지원합니다. 파일명에서 카드사를 자동 감지하고 올바른 파서로 라우팅하여 원활한 데이터 수집을 제공합니다.",
      },
      image: "/projects/personal-finance/feature-aggregation.png",
    },
    {
      title: {
        en: "Investment Portfolio Tracking",
        ko: "투자 포트폴리오 추적",
      },
      description: {
        en: "Track investment holdings across accounts with real-time valuation. Visualize asset allocation, sector exposure, and portfolio performance over time with interactive charts and rebalancing suggestions.",
        ko: "실시간 평가와 함께 계좌 전반의 투자 보유를 추적합니다. 인터랙티브 차트와 리밸런싱 제안으로 자산 배분, 섹터 노출, 포트폴리오 성과를 시각화합니다.",
      },
      image: "/projects/personal-finance/feature-portfolio.png",
    },
    {
      title: {
        en: "Expense Analytics",
        ko: "지출 분석",
      },
      description: {
        en: "Keyword-based auto-classification maps merchants to spending categories. Dashboard shows monthly spending trends, category breakdowns, card-wise distribution, and year-over-year comparisons with drill-down capability.",
        ko: "키워드 기반 자동 분류가 가맹점을 지출 카테고리에 매핑합니다. 대시보드가 월별 지출 추이, 카테고리 분석, 카드별 분포, 전년 대비 비교를 드릴다운 기능과 함께 보여줍니다.",
      },
      image: "/projects/personal-finance/feature-analytics.png",
    },
    {
      title: {
        en: "Budget Planning",
        ko: "예산 계획",
      },
      description: {
        en: "Set monthly budgets by category and track spending against targets in real-time. Visual progress bars show budget utilization, and alerts notify when approaching or exceeding category limits.",
        ko: "카테고리별 월 예산을 설정하고 실시간으로 목표 대비 지출을 추적합니다. 시각적 진행 바가 예산 활용도를 보여주고, 카테고리 한도에 근접하거나 초과 시 알림을 보냅니다.",
      },
      image: "/projects/personal-finance/feature-budget.png",
    },
  ],

  architecture: {
    nodes: [
      { id: "browser", label: { en: "Browser", ko: "브라우저" }, type: "client", x: 50, y: 50 },
      { id: "nextjs", label: { en: "Next.js 15", ko: "Next.js 15" }, type: "client", x: 200, y: 50 },
      { id: "drizzle", label: { en: "Drizzle ORM", ko: "Drizzle ORM" }, type: "server", x: 200, y: 180 },
      { id: "sqlite", label: { en: "SQLite", ko: "SQLite" }, type: "database", x: 50, y: 180 },
      { id: "parser", label: { en: "Bank Parser Registry", ko: "은행 파서 레지스트리" }, type: "service", x: 350, y: 180 },
      { id: "files", label: { en: "Bank Statement Files", ko: "은행 명세서 파일" }, type: "external", x: 350, y: 310 },
    ],
    connections: [
      { from: "browser", to: "nextjs", label: { en: "SPA", ko: "SPA" } },
      { from: "nextjs", to: "drizzle", label: { en: "ORM Query", ko: "ORM 쿼리" } },
      { from: "drizzle", to: "sqlite", label: { en: "SQL", ko: "SQL" } },
      { from: "nextjs", to: "parser", label: { en: "Import", ko: "가져오기" } },
      { from: "files", to: "parser", label: { en: "XLSX / XLS / OLE", ko: "XLSX / XLS / OLE" } },
    ],
  },

  metrics: [
    {
      value: "7",
      label: { en: "Bank Parsers", ko: "은행 파서" },
      description: { en: "Korean bank statement parsers with auto-detection", ko: "자동 감지 기능의 한국 은행 명세서 파서" },
    },
    {
      value: "3",
      label: { en: "File Format Families", ko: "파일 형식 계열" },
      description: { en: "XLSX, HTML-disguised XLS, and legacy OLE support", ko: "XLSX, HTML 위장 XLS, 레거시 OLE 지원" },
    },
    {
      value: "Auto",
      label: { en: "Classification", ko: "자동 분류" },
      description: { en: "Keyword-based merchant to category mapping", ko: "키워드 기반 가맹점 → 카테고리 매핑" },
    },
    {
      value: "Local",
      label: { en: "Privacy-First", ko: "프라이버시 우선" },
      description: { en: "All financial data stays on-device in SQLite", ko: "모든 금융 데이터가 SQLite에 기기 내 보관" },
    },
  ],

  prevProject: {
    slug: "today-bike",
    title: { en: "Today.Bike", ko: "Today.Bike" },
  },
  nextProject: {
    slug: "kanban-pipeline",
    title: { en: "AI Kanban Pipeline", ko: "AI 칸반 파이프라인" },
  },
};
