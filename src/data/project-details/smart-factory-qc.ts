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
    en: "From paper checklists to automated quality control",
    ko: "종이 체크리스트를 자동화된 품질 관리로",
  },
  heroImage: "/projects/smart-factory-qc/hero.png",

  painPoints: [
    {
      icon: "📋",
      title: {
        en: "Paper-Based QC Processes",
        ko: "종이 기반 QC 프로세스",
      },
      description: {
        en: "QC engineers relied on stacks of paper checklists for every equipment test cycle. Handwritten records were prone to errors, difficult to search, and frequently lost or damaged on the factory floor.",
        ko: "QC 엔지니어들이 모든 장비 테스트 주기마다 종이 체크리스트에 의존했습니다. 수기 기록은 오류가 발생하기 쉽고, 검색이 어려우며, 공장 현장에서 자주 분실되거나 손상되었습니다.",
      },
    },
    {
      icon: "📊",
      title: {
        en: "No Centralized Result Tracking",
        ko: "결과 추적 체계 부재",
      },
      description: {
        en: "Test results were scattered across individual notebooks and local files with no unified system. Tracking pass/fail trends or auditing historical results required manually digging through paper archives.",
        ko: "테스트 결과가 개인 노트와 로컬 파일에 분산되어 통합 시스템이 없었습니다. 합격/불합격 추이를 추적하거나 과거 결과를 감사하려면 종이 아카이브를 수작업으로 뒤져야 했습니다.",
      },
    },
    {
      icon: "🔌",
      title: {
        en: "Manual Equipment Communication",
        ko: "수동 장비 통신",
      },
      description: {
        en: "Engineers manually read sensor values and toggled equipment states through vendor-specific tools. Each protocol required separate software, making end-to-end test automation impossible.",
        ko: "엔지니어들이 벤더별 도구를 통해 센서 값을 수동으로 읽고 장비 상태를 전환했습니다. 각 프로토콜마다 별도 소프트웨어가 필요하여 엔드투엔드 테스트 자동화가 불가능했습니다.",
      },
    },
  ],

  beforeAfter: [
    {
      before: {
        en: "Paper checklists filled out by hand for every test cycle",
        ko: "매 테스트 주기마다 수작업으로 작성하는 종이 체크리스트",
      },
      after: {
        en: "Digital BDD scenarios with structured data capture and searchable history",
        ko: "구조화된 데이터 캡처와 검색 가능한 이력을 갖춘 디지털 BDD 시나리오",
      },
    },
    {
      before: {
        en: "Manual sensor reading and equipment control via vendor tools",
        ko: "벤더 도구를 통한 수동 센서 읽기 및 장비 제어",
      },
      after: {
        en: "Automated equipment communication via Modbus/MQTT with real-time verification",
        ko: "Modbus/MQTT를 통한 자동 장비 통신과 실시간 검증",
      },
    },
  ],

  approach: {
    title: {
      en: "BDD-Driven Test Automation",
      ko: "BDD 기반 테스트 자동화",
    },
    description: {
      en: "We adopted Behavior-Driven Development (Gherkin syntax) as the foundation for test automation. Domain experts — not developers — define test procedures in plain language using Given/When/Then steps. Each scenario maps directly to real equipment actions through industrial protocols (Modbus TCP, MQTT), executing tests and collecting structured evidence automatically. This approach bridges the gap between domain knowledge and software automation, ensuring test coverage matches actual manufacturing requirements.",
      ko: "BDD(Gherkin 구문)를 테스트 자동화의 기반으로 채택했습니다. 개발자가 아닌 도메인 전문가가 Given/When/Then 단계를 사용하여 일반 언어로 테스트 절차를 정의합니다. 각 시나리오는 산업용 프로토콜(Modbus TCP, MQTT)을 통해 실제 장비 동작에 직접 매핑되어, 테스트를 자동 실행하고 구조화된 증빙을 수집합니다. 이 접근 방식은 도메인 지식과 소프트웨어 자동화 사이의 간극을 해소하여, 테스트 커버리지가 실제 제조 요구사항에 부합하도록 합니다.",
    },
  },

  features: [
    {
      title: {
        en: "BDD Scenario Editor & Auto-generation",
        ko: "BDD 시나리오 에디터 & 자동 생성",
      },
      description: {
        en: "Write test procedures in plain Gherkin language (Given/When/Then). Non-technical QC engineers can author and review test scenarios without coding. The system auto-generates step definitions that map to equipment control commands, reducing scenario setup time from hours to minutes.",
        ko: "Gherkin 언어(Given/When/Then)로 테스트 절차를 작성합니다. 비기술 QC 엔지니어도 코딩 없이 테스트 시나리오를 작성하고 검토할 수 있습니다. 시스템이 장비 제어 명령에 매핑되는 스텝 정의를 자동 생성하여 시나리오 설정 시간을 수시간에서 수분으로 단축합니다.",
      },
      image: "/projects/smart-factory-qc/feature-bdd-editor.png",
    },
    {
      title: {
        en: "Equipment Communication (Modbus/MQTT)",
        ko: "장비 통신 (Modbus/MQTT)",
      },
      description: {
        en: "Unified communication layer connecting to PLCs and controllers via Modbus TCP and MQTT protocols. Read sensor values, write control registers, and subscribe to real-time equipment events through a single abstraction — no vendor-specific tools required.",
        ko: "Modbus TCP 및 MQTT 프로토콜로 PLC 및 컨트롤러에 연결하는 통합 통신 레이어입니다. 단일 추상화를 통해 센서 값 읽기, 제어 레지스터 쓰기, 실시간 장비 이벤트 구독이 가능하며 벤더별 도구가 필요 없습니다.",
      },
      image: "/projects/smart-factory-qc/feature-equipment-comm.png",
    },
    {
      title: {
        en: "Real-time Test Execution",
        ko: "실시간 테스트 실행",
      },
      description: {
        en: "Execute BDD scenarios against live equipment with real-time progress tracking. Each step shows live sensor readings, pass/fail verdicts, and captured evidence as the test runs. Engineers can monitor multiple test sessions simultaneously from a single control panel.",
        ko: "실제 장비에 대해 BDD 시나리오를 실행하며 실시간 진행 상황을 추적합니다. 각 단계에서 실시간 센서 값, 합격/불합격 판정, 캡처된 증빙이 테스트 실행 중에 표시됩니다. 엔지니어가 단일 제어 패널에서 여러 테스트 세션을 동시에 모니터링할 수 있습니다.",
      },
      image: "/projects/smart-factory-qc/feature-test-execution.png",
    },
    {
      title: {
        en: "Result Dashboard & Reports",
        ko: "결과 대시보드 & 리포트",
      },
      description: {
        en: "Comprehensive dashboard showing test pass rates, trend analysis, and equipment health across production lines. Auto-generates audit-ready PDF reports with full evidence trails including sensor readings, timestamps, and step-by-step test results.",
        ko: "생산 라인 전체의 테스트 합격률, 추이 분석, 장비 상태를 보여주는 종합 대시보드입니다. 센서 값, 타임스탬프, 단계별 테스트 결과를 포함한 전체 증빙 이력이 담긴 감사 대응 PDF 보고서를 자동 생성합니다.",
      },
      image: "/projects/smart-factory-qc/feature-dashboard.png",
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
      { id: "mqtt", label: { en: "MQTT Broker", ko: "MQTT 브로커" }, type: "service", x: 500, y: 180 },
    ],
    connections: [
      { from: "browser", to: "react", label: { en: "SPA", ko: "SPA" } },
      { from: "react", to: "fastapi", label: { en: "REST API", ko: "REST API" } },
      { from: "fastapi", to: "postgres", label: { en: "SQL", ko: "SQL" } },
      { from: "fastapi", to: "edge", label: { en: "WebSocket", ko: "WebSocket" } },
      { from: "edge", to: "plc", label: { en: "Modbus TCP", ko: "Modbus TCP" } },
      { from: "edge", to: "mqtt", label: { en: "MQTT", ko: "MQTT" } },
      { from: "mqtt", to: "fastapi", label: { en: "Subscribe", ko: "구독" } },
    ],
  },

  metrics: [
    {
      value: "95%",
      label: { en: "Paper Eliminated", ko: "종이 제거" },
      description: { en: "Paper-based QC checklists replaced with digital workflows", ko: "종이 기반 QC 체크리스트를 디지털 워크플로우로 대체" },
    },
    {
      value: "80%",
      label: { en: "Report Time Saved", ko: "보고서 시간 절감" },
      description: { en: "Reduction in test report compilation and review time", ko: "테스트 보고서 취합 및 검토 시간 단축" },
    },
    {
      value: "2x",
      label: { en: "Test Throughput", ko: "테스트 처리량" },
      description: { en: "Equipment tests completed per shift with automation", ko: "자동화를 통한 교대당 장비 테스트 완료 수" },
    },
    {
      value: "100%",
      label: { en: "Digital Traceability", ko: "디지털 추적성" },
      description: { en: "Every test step recorded with full evidence trail", ko: "모든 테스트 단계를 전체 증빙 이력과 함께 기록" },
    },
  ],

  prevProject: undefined,
  nextProject: {
    slug: "equipment-gateway",
    title: { en: "Equipment Gateway", ko: "장비 게이트웨이" },
  },
};
