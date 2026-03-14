import type { ProjectDetail } from "@/types/project-detail";

export const smartFactoryQc: ProjectDetail = {
  slug: "smart-factory-qc",
  vertical: "industrial",
  verticalColor: "#3B82F6",
  status: "active",
  title: {
    en: "Smart Factory QC Platform",
    ko: "스마트 팩토리 QC 플랫폼",
  },
  tagline: {
    en: "BDD-driven quality control automation for manufacturing equipment",
    ko: "제조 장비를 위한 BDD 기반 품질 관리 자동화",
  },
  heroImage: "/projects/smart-factory-qc/hero.png",

  painPoints: [
    {
      icon: "📋",
      title: {
        en: "200+ Page Paper Checklists",
        ko: "200+ 페이지 종이 체크리스트",
      },
      description: {
        en: "QC engineers manually filled out paper checklists for every equipment test, leading to errors and lost records.",
        ko: "QC 엔지니어가 모든 장비 테스트마다 종이 체크리스트를 수동 작성하여 오류와 기록 분실이 발생했습니다.",
      },
    },
    {
      icon: "🔌",
      title: {
        en: "Disconnected Equipment Data",
        ko: "단절된 장비 데이터",
      },
      description: {
        en: "Equipment test results lived in separate systems with no unified view of pass/fail status across production lines.",
        ko: "장비 테스트 결과가 별도 시스템에 분산되어 생산 라인 전체의 합격/불합격 현황을 통합 조회할 수 없었습니다.",
      },
    },
    {
      icon: "⏱️",
      title: {
        en: "Slow Feedback Loops",
        ko: "느린 피드백 루프",
      },
      description: {
        en: "Test results took days to compile and review, delaying equipment shipment and customer acceptance.",
        ko: "테스트 결과 취합 및 검토에 수일이 소요되어 장비 출하 및 고객 검수가 지연되었습니다.",
      },
    },
  ],

  beforeAfter: [
    {
      before: {
        en: "Manual paper checklists with 200+ pages per equipment",
        ko: "장비당 200+ 페이지 수동 종이 체크리스트",
      },
      after: {
        en: "BDD scenarios with automated test execution and digital evidence",
        ko: "자동 실행 및 디지털 증빙이 포함된 BDD 시나리오",
      },
    },
    {
      before: {
        en: "Days to compile test reports across departments",
        ko: "부서 간 테스트 보고서 취합에 수일 소요",
      },
      after: {
        en: "Real-time dashboard with instant pass/fail visibility",
        ko: "즉시 합격/불합격 확인이 가능한 실시간 대시보드",
      },
    },
  ],

  approach: {
    title: {
      en: "BDD-Driven Test Automation",
      ko: "BDD 기반 테스트 자동화",
    },
    description: {
      en: "We adopted Behavior-Driven Development (Gherkin syntax) to let domain experts — not developers — define test procedures. Each scenario maps to real equipment actions via industrial protocols (Modbus TCP, Hostlink), executing tests and collecting structured evidence automatically.",
      ko: "도메인 전문가가 — 개발자가 아닌 — 테스트 절차를 정의할 수 있도록 BDD(Gherkin 구문)를 채택했습니다. 각 시나리오는 산업용 프로토콜(Modbus TCP, Hostlink)을 통해 실제 장비 동작에 매핑되어, 테스트를 자동 실행하고 구조화된 증빙을 수집합니다.",
    },
  },

  features: [
    {
      title: {
        en: "Gherkin Test Scenarios",
        ko: "Gherkin 테스트 시나리오",
      },
      description: {
        en: "Write test procedures in plain language (Given/When/Then). Non-technical QC engineers can author and review test scenarios without coding knowledge.",
        ko: "테스트 절차를 일반 언어(Given/When/Then)로 작성합니다. 비기술 QC 엔지니어도 코딩 없이 테스트 시나리오를 작성하고 검토할 수 있습니다.",
      },
      image: "/projects/smart-factory-qc/feature-gherkin.png",
    },
    {
      title: {
        en: "Real-Time Equipment Communication",
        ko: "실시간 장비 통신",
      },
      description: {
        en: "Direct connection to PLCs and controllers via Modbus TCP and Hostlink protocols. Read sensor values, trigger actions, and verify equipment responses in real time.",
        ko: "Modbus TCP 및 Hostlink 프로토콜로 PLC 및 컨트롤러에 직접 연결합니다. 센서 값 읽기, 동작 트리거, 장비 응답 실시간 검증이 가능합니다.",
      },
      image: "/projects/smart-factory-qc/feature-comms.png",
    },
    {
      title: {
        en: "Evidence Collection & Reporting",
        ko: "증빙 수집 & 리포팅",
      },
      description: {
        en: "Every test step automatically captures structured evidence: sensor readings, timestamps, screenshots, and pass/fail verdicts. Generates audit-ready reports instantly.",
        ko: "모든 테스트 단계에서 구조화된 증빙을 자동 캡처합니다: 센서 값, 타임스탬프, 스크린샷, 합격/불합격 판정. 감사 대응 보고서를 즉시 생성합니다.",
      },
      image: "/projects/smart-factory-qc/feature-evidence.png",
    },
    {
      title: {
        en: "Enterprise SSO Integration",
        ko: "엔터프라이즈 SSO 연동",
      },
      description: {
        en: "SAML 2.0 integration with Microsoft Entra ID for role-based access control. Engineers, supervisors, and auditors see exactly what they need.",
        ko: "Microsoft Entra ID와 SAML 2.0 연동으로 역할 기반 접근 제어를 제공합니다. 엔지니어, 관리자, 감사자가 각자 필요한 정보만 확인합니다.",
      },
      image: "/projects/smart-factory-qc/feature-sso.png",
    },
  ],

  architecture: {
    nodes: [
      { id: "browser", label: { en: "Browser", ko: "브라우저" }, type: "client", x: 50, y: 50 },
      { id: "react", label: { en: "React SPA", ko: "React SPA" }, type: "client", x: 200, y: 50 },
      { id: "fastapi", label: { en: "FastAPI", ko: "FastAPI" }, type: "server", x: 200, y: 180 },
      { id: "postgres", label: { en: "PostgreSQL", ko: "PostgreSQL" }, type: "database", x: 50, y: 180 },
      { id: "edge", label: { en: "Edge Agent", ko: "엣지 에이전트" }, type: "service", x: 350, y: 180 },
      { id: "plc", label: { en: "PLC / Controller", ko: "PLC / 컨트롤러" }, type: "external", x: 350, y: 310 },
      { id: "entra", label: { en: "Entra ID (SSO)", ko: "Entra ID (SSO)" }, type: "external", x: 50, y: 310 },
    ],
    connections: [
      { from: "browser", to: "react", label: { en: "SPA", ko: "SPA" } },
      { from: "react", to: "fastapi", label: { en: "REST API", ko: "REST API" } },
      { from: "fastapi", to: "postgres", label: { en: "SQL", ko: "SQL" } },
      { from: "fastapi", to: "edge", label: { en: "gRPC", ko: "gRPC" } },
      { from: "edge", to: "plc", label: { en: "Modbus TCP", ko: "Modbus TCP" } },
      { from: "fastapi", to: "entra", label: { en: "SAML 2.0", ko: "SAML 2.0" } },
    ],
  },

  metrics: [
    {
      value: "200+",
      label: { en: "Pages Eliminated", ko: "페이지 제거" },
      description: { en: "Paper checklists replaced per equipment", ko: "장비당 대체된 종이 체크리스트" },
    },
    {
      value: "80%",
      label: { en: "Time Saved", ko: "시간 절감" },
      description: { en: "Reduction in test report compilation time", ko: "테스트 보고서 취합 시간 단축" },
    },
    {
      value: "3",
      label: { en: "Protocols Supported", ko: "지원 프로토콜" },
      description: { en: "Modbus TCP, Hostlink, REST", ko: "Modbus TCP, Hostlink, REST" },
    },
    {
      value: "100%",
      label: { en: "Digital Evidence", ko: "디지털 증빙" },
      description: { en: "Every test step automatically recorded", ko: "모든 테스트 단계 자동 기록" },
    },
  ],

  prevProject: undefined,
  nextProject: {
    slug: "equipment-gateway",
    title: { en: "Equipment Gateway", ko: "장비 게이트웨이" },
  },
};
