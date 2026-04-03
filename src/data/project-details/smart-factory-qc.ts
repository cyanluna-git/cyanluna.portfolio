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

  introduction: {
    badge: {
      en: "Generalized from a production OQC introduction flow",
      ko: "실제 OQC 소개 페이지 흐름을 일반화한 버전",
    },
    title: {
      en: "A digital inspection stack for commissioning and quality control",
      ko: "커미셔닝과 품질 관리를 위한 디지털 검사 스택",
    },
    subtitle: {
      en: "This project reframed equipment validation as a product problem: replace paper-heavy commissioning work with a system that guides execution, captures evidence, and scales from one line to multiple product families.",
      ko: "이 프로젝트는 장비 검증을 단순한 현장 업무가 아니라 제품 문제로 다시 정의했습니다. 종이 중심의 커미셔닝 과정을, 실행을 안내하고 증빙을 남기며 여러 제품군으로 확장 가능한 시스템으로 전환하는 것이 핵심이었습니다.",
    },
    pillars: [
      {
        label: { en: "Why 01", ko: "Why 01" },
        title: {
          en: "Manual commissioning does not scale",
          ko: "수작업 커미셔닝은 확장되지 않는다",
        },
        description: {
          en: "Large equipment test cycles relied on paper forms, spreadsheets, and operator memory. Progress visibility was weak, handovers were fragile, and even well-run teams lost time reconstructing what had already been checked.",
          ko: "대형 장비 테스트 사이클은 종이 양식, 스프레드시트, 작업자 기억에 의존했습니다. 진행 가시성이 약했고, 인수인계는 불안정했으며, 잘 운영되는 팀도 이미 확인한 내용을 다시 재구성하는 데 시간을 잃었습니다.",
        },
        stat: {
          en: "Paper + Excel + tribal memory",
          ko: "종이 + 엑셀 + 경험 의존",
        },
      },
      {
        label: { en: "Why 02", ko: "Why 02" },
        title: {
          en: "Quality varied with operator context",
          ko: "품질은 작업자 맥락에 따라 흔들렸다",
        },
        description: {
          en: "Without a structured execution system, pass/fail decisions depended too much on who ran the test, what shift they were on, and how familiar they were with the device. Standard work existed in documents, not in the runtime workflow.",
          ko: "구조화된 실행 시스템이 없으면 합격/불합격 판단이 테스트 수행자, 교대 상황, 장비 숙련도에 과도하게 좌우됩니다. 표준 작업은 문서에는 있었지만 실제 실행 흐름 안에는 없었습니다.",
        },
        stat: {
          en: "Procedure in documents, not in runtime",
          ko: "문서엔 절차가 있고 실행엔 없었다",
        },
      },
      {
        label: { en: "Why 03", ko: "Why 03" },
        title: {
          en: "Traceability was too slow for real operations",
          ko: "추적성 확보가 실제 운영 속도를 따라가지 못했다",
        },
        description: {
          en: "Audits, rework reviews, and recurring issue analysis all required digging through fragmented records. The real cost was not just paperwork, but the inability to respond quickly when a line or product family needed answers.",
          ko: "감사 대응, 재작업 리뷰, 반복 이슈 분석은 모두 흩어진 기록을 다시 뒤져야 했습니다. 문제는 문서 작업 자체보다, 라인이나 제품군이 답을 필요로 할 때 빠르게 대응할 수 없다는 점이었습니다.",
        },
        stat: {
          en: "Slow audit and slow feedback loops",
          ko: "느린 감사 대응과 느린 피드백 루프",
        },
      },
    ],
    layers: [
      {
        label: { en: "Presentation Layer", ko: "프레젠테이션 레이어" },
        description: {
          en: "Separate interfaces were designed for central coordination and on-site execution so the same system could serve planners, reviewers, and operators without forcing them into one generic screen.",
          ko: "중앙 운영과 현장 실행을 분리한 인터페이스를 설계해, 하나의 시스템이 기획자와 리뷰어, 작업자를 모두 지원하되 모두를 한 화면에 억지로 맞추지 않도록 했습니다.",
        },
        items: [
          {
            title: { en: "Central dashboard", ko: "중앙 대시보드" },
            description: {
              en: "Tracks progress, result quality, catalog state, and execution coverage from a single control surface.",
              ko: "진행 상태, 결과 품질, 카탈로그 상태, 실행 커버리지를 단일 제어 화면에서 추적합니다.",
            },
            meta: { en: "Web", ko: "Web" },
          },
          {
            title: { en: "Edge execution UI", ko: "엣지 실행 UI" },
            description: {
              en: "Guides on-site operators through structured inspection steps with evidence capture and pass/fail context.",
              ko: "현장 작업자를 구조화된 검사 단계로 안내하고, 증빙 캡처와 판정 맥락을 함께 제공합니다.",
            },
            meta: { en: "Operator", ko: "Operator" },
          },
        ],
      },
      {
        label: { en: "Application Layer", ko: "애플리케이션 레이어" },
        description: {
          en: "The runtime combined centralized catalog governance with locally executable test flows so inspection work could continue even when the network or site environment was imperfect.",
          ko: "런타임은 중앙 카탈로그 거버넌스와 로컬 실행 가능한 테스트 흐름을 결합해, 네트워크나 현장 환경이 완벽하지 않아도 검사 작업이 계속되도록 구성했습니다.",
        },
        items: [
          {
            title: { en: "Server API", ko: "서버 API" },
            description: {
              en: "Owns catalog definitions, user workflows, reporting, and the durable system record.",
              ko: "카탈로그 정의, 사용자 워크플로우, 리포팅, 시스템의 영속 기록을 담당합니다.",
            },
            meta: { en: "FastAPI", ko: "FastAPI" },
          },
          {
            title: { en: "Edge runner", ko: "엣지 러너" },
            description: {
              en: "Executes scenarios near the equipment, preserves local continuity, and syncs results back upstream.",
              ko: "장비 근처에서 시나리오를 실행하고, 로컬 연속성을 유지하며, 결과를 상위 시스템으로 동기화합니다.",
            },
            meta: { en: "Offline-first", ko: "Offline-first" },
          },
        ],
      },
      {
        label: { en: "Integration Layer", ko: "인테그레이션 레이어" },
        description: {
          en: "The gateway layer abstracted equipment communication so the inspection product could stay scenario-driven instead of being trapped in vendor-specific tooling.",
          ko: "게이트웨이 레이어가 장비 통신을 추상화해, 검사 제품이 벤더별 도구에 갇히지 않고 시나리오 중심으로 동작하도록 했습니다.",
        },
        items: [
          {
            title: { en: "Protocol bridge", ko: "프로토콜 브리지" },
            description: {
              en: "Connected BDD steps to actual device reads, writes, and events through Modbus and message-based integrations.",
              ko: "BDD 단계를 실제 장비 읽기/쓰기 및 이벤트와 연결해 Modbus와 메시지 기반 통신을 일관되게 묶었습니다.",
            },
            meta: { en: "Modbus / MQTT", ko: "Modbus / MQTT" },
          },
          {
            title: { en: "Evidence pipeline", ko: "증빙 파이프라인" },
            description: {
              en: "Turned every execution step into structured results, timestamps, and report-ready artifacts.",
              ko: "모든 실행 단계를 구조화된 결과, 타임스탬프, 보고서용 아티팩트로 변환했습니다.",
            },
            meta: { en: "Traceability", ko: "Traceability" },
          },
        ],
      },
      {
        label: { en: "Physical Layer", ko: "피지컬 레이어" },
        description: {
          en: "The architecture was designed around the reality that product families differ, but the inspection operating model can still be standardized.",
          ko: "이 아키텍처는 제품군은 달라도 검사 운영 모델은 표준화할 수 있다는 현실 위에서 설계되었습니다.",
        },
        items: [
          {
            title: { en: "Commissioning targets", ko: "커미셔닝 대상 장비" },
            description: {
              en: "Pump stacks, controllers, and line-side equipment that required repeatable acceptance and validation workflows.",
              ko: "반복 가능한 인수검사와 검증 워크플로우가 필요한 펌프 스택, 컨트롤러, 라인 장비를 대상으로 했습니다.",
            },
            meta: { en: "Device families", ko: "장비군" },
          },
          {
            title: { en: "Site operators", ko: "현장 작업자" },
            description: {
              en: "People on the floor who needed guidance, speed, and fewer chances to skip steps under pressure.",
              ko: "압박이 큰 현장에서 안내와 속도, 그리고 단계 누락 방지가 필요한 작업자들을 고려했습니다.",
            },
            meta: { en: "Execution reality", ko: "실행 현실" },
          },
        ],
      },
    ],
    capabilities: [
      {
        title: {
          en: "BDD-driven inspection design",
          ko: "BDD 기반 검사 설계",
        },
        description: {
          en: "Test logic moved from scattered documents into structured scenarios so quality teams could describe intent once and execute it consistently.",
          ko: "테스트 로직을 흩어진 문서에서 구조화된 시나리오로 옮겨, 품질팀이 의도를 한 번 정의하면 일관되게 실행할 수 있도록 했습니다.",
        },
      },
      {
        title: {
          en: "Guided on-site execution",
          ko: "가이드 기반 현장 실행",
        },
        description: {
          en: "Operators followed the same step-by-step workflow with embedded instructions, evidence capture, and live status instead of interpreting PDFs or printed sheets.",
          ko: "작업자는 PDF나 출력물을 해석하는 대신, 내장 지침과 증빙 캡처, 실시간 상태가 포함된 동일한 단계별 워크플로우를 따라갑니다.",
        },
      },
      {
        title: {
          en: "Real-time device verification",
          ko: "실시간 장비 검증",
        },
        description: {
          en: "The system validated live sensor values and control states during execution, turning quality checks into measurable runtime evidence.",
          ko: "시스템은 실행 중 실시간 센서 값과 제어 상태를 검증해, 품질 점검을 측정 가능한 런타임 증빙으로 전환했습니다.",
        },
      },
      {
        title: {
          en: "Edge-to-server synchronization",
          ko: "엣지-서버 동기화",
        },
        description: {
          en: "Definitions flowed outward and results flowed back, creating one operating loop instead of isolated local test PCs.",
          ko: "정의는 바깥으로 배포되고 결과는 다시 회수되어, 고립된 현장 PC가 아니라 하나의 운영 루프를 만들었습니다.",
        },
      },
      {
        title: {
          en: "Automated evidence reporting",
          ko: "자동 증빙 리포팅",
        },
        description: {
          en: "Execution history, timestamps, and proof artifacts were assembled into audit-ready outputs without reconstructing the story by hand.",
          ko: "실행 이력, 타임스탬프, 증빙 아티팩트를 손으로 다시 정리하지 않고도 감사 대응 가능한 결과물로 묶었습니다.",
        },
      },
      {
        title: {
          en: "Scalable inspection operating model",
          ko: "확장 가능한 검사 운영 모델",
        },
        description: {
          en: "The point was not one product screen, but a reusable operating model that could expand across device families, sites, and future enterprise integrations.",
          ko: "목표는 단일 제품 화면이 아니라, 장비군과 사이트, 향후 엔터프라이즈 연동으로 확장 가능한 재사용형 운영 모델을 만드는 것이었습니다.",
        },
      },
    ],
    screenshots: [
      {
        title: {
          en: "Dashboard Overview",
          ko: "대시보드 개요",
        },
        description: {
          en: "The control surface summarizes KPI signals, execution progress, and current system health in one place.",
          ko: "단일 제어 화면에서 KPI 신호, 실행 진행률, 현재 시스템 상태를 함께 읽을 수 있습니다.",
        },
        image: "/projects/smart-factory-qc/introduction/dashboard.png",
      },
      {
        title: {
          en: "Product Catalog",
          ko: "제품 카탈로그",
        },
        description: {
          en: "Business unit, generation, and product-line structures are managed as an inspection catalog rather than scattered configuration files.",
          ko: "사업부, 세대, 제품 라인 구조를 흩어진 설정 파일이 아니라 검사 카탈로그로 관리합니다.",
        },
        image: "/projects/smart-factory-qc/introduction/products.png",
      },
      {
        title: {
          en: "Fleet Monitoring",
          ko: "플릿 모니터링",
        },
        description: {
          en: "Edge PC status, synchronization health, and evidence integrity are tracked centrally instead of staying hidden on local test machines.",
          ko: "엣지 PC 상태와 동기화 건전성, 증빙 무결성을 로컬 테스트 PC에 숨겨두지 않고 중앙에서 추적합니다.",
        },
        image: "/projects/smart-factory-qc/introduction/fleet.png",
      },
      {
        title: {
          en: "User Management",
          ko: "사용자 관리",
        },
        description: {
          en: "Role-based accounts and operator permissions are governed from the same system that runs inspection workflows.",
          ko: "검사 워크플로우를 실행하는 동일한 시스템에서 역할 기반 계정과 작업자 권한을 관리합니다.",
        },
        image: "/projects/smart-factory-qc/introduction/users.png",
      },
    ],
    roadmap: [
      {
        label: { en: "Phase 1", ko: "Phase 1" },
        title: {
          en: "Digitize a commissioning-critical line",
          ko: "핵심 커미셔닝 라인 디지털화",
        },
        description: {
          en: "Start where paper overhead and test complexity are highest so the value of guided execution and evidence capture is immediately visible.",
          ko: "종이 업무 부담과 테스트 복잡도가 가장 높은 구간부터 시작해, 가이드 실행과 증빙 수집의 가치를 즉시 보여주는 단계입니다.",
        },
        status: "active",
      },
      {
        label: { en: "Phase 2", ko: "Phase 2" },
        title: {
          en: "Expand to adjacent equipment families",
          ko: "인접 장비군으로 확장",
        },
        description: {
          en: "Reuse the same inspection runtime and scenario model while adapting catalogs and device mappings for new products.",
          ko: "같은 검사 런타임과 시나리오 모델을 재사용하면서, 새 제품에 맞는 카탈로그와 장비 매핑만 조정하는 단계입니다.",
        },
        status: "planned",
      },
      {
        label: { en: "Phase 3", ko: "Phase 3" },
        title: {
          en: "Standardize cross-site operating patterns",
          ko: "사이트 간 운영 패턴 표준화",
        },
        description: {
          en: "Move from a successful local tool to a repeatable deployment pattern with shared governance, templates, and rollout rules.",
          ko: "성공한 현장 도구를 공유 거버넌스와 템플릿, 배포 규칙이 있는 반복 가능한 전개 패턴으로 전환합니다.",
        },
        status: "planned",
      },
      {
        label: { en: "Phase 4", ko: "Phase 4" },
        title: {
          en: "Connect into enterprise operations",
          ko: "엔터프라이즈 운영 체계와 연결",
        },
        description: {
          en: "Prepare the inspection platform to feed broader operational systems so execution data can support planning, traceability, and enterprise decision loops.",
          ko: "검사 플랫폼이 더 넓은 운영 시스템으로 데이터를 공급해, 실행 데이터가 플래닝과 추적성, 엔터프라이즈 의사결정 루프까지 이어지도록 준비하는 단계입니다.",
        },
        status: "future",
      },
    ],
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
