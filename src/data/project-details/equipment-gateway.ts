import type { ProjectDetail } from "@/types/project-detail";

export const equipmentGateway: ProjectDetail = {
  slug: "equipment-gateway",
  vertical: "industrial",
  verticalColor: "#3B82F6",
  status: "active",
  title: {
    en: "Equipment Gateway",
    ko: "장비 게이트웨이",
  },
  tagline: {
    en: "Auto-generate equipment APIs from a single YAML config",
    ko: "YAML 하나로 장비 API를 자동 생성",
  },
  heroImage: "/projects/equipment-gateway/hero.png",

  painPoints: [
    {
      icon: "🔀",
      title: {
        en: "Protocol Fragmentation",
        ko: "프로토콜 파편화",
      },
      description: {
        en: "Manufacturing floors use a mix of Modbus TCP, OPC-UA, and MQTT devices from different vendors. Each protocol requires its own library, connection logic, and data parsing — making integration a recurring engineering bottleneck.",
        ko: "제조 현장에는 서로 다른 벤더의 Modbus TCP, OPC-UA, MQTT 장비가 혼재합니다. 각 프로토콜마다 별도의 라이브러리, 연결 로직, 데이터 파싱이 필요하여 통합 작업이 반복적인 엔지니어링 병목이 됩니다.",
      },
    },
    {
      icon: "⌨️",
      title: {
        en: "Manual API Development Per Equipment",
        ko: "장비별 수동 API 개발",
      },
      description: {
        en: "Every new equipment model required developers to write custom REST endpoints, register mappings, and polling logic from scratch. Adding a single product type could take days of boilerplate coding and testing.",
        ko: "새 장비 모델이 추가될 때마다 개발자가 REST 엔드포인트, 레지스터 매핑, 폴링 로직을 처음부터 직접 작성해야 했습니다. 단일 제품 유형 추가에도 수일간의 보일러플레이트 코딩과 테스트가 소요되었습니다.",
      },
    },
    {
      icon: "📡",
      title: {
        en: "No Unified Monitoring",
        ko: "통합 모니터링 부재",
      },
      description: {
        en: "Equipment status was checked through vendor-specific tools or manual inspections. There was no single dashboard to visualize real-time health, detect anomalies, or track historical trends across all connected devices.",
        ko: "장비 상태를 벤더별 도구나 수동 점검으로 확인했습니다. 연결된 모든 장비의 실시간 상태를 시각화하고, 이상을 감지하며, 이력 추이를 추적할 수 있는 단일 대시보드가 없었습니다.",
      },
    },
  ],

  beforeAfter: [
    {
      before: {
        en: "Custom backend code written for every new equipment model",
        ko: "새 장비 모델마다 맞춤 백엔드 코드 작성",
      },
      after: {
        en: "Add a YAML file and REST APIs are auto-generated — zero backend code per product",
        ko: "YAML 파일 하나 추가로 REST API 자동 생성 — 제품별 백엔드 코드 불필요",
      },
    },
    {
      before: {
        en: "Separate tools and scripts per communication protocol",
        ko: "통신 프로토콜별 별도 도구와 스크립트",
      },
      after: {
        en: "Unified protocol adapter layer handling Modbus TCP, OPC-UA, and MQTT transparently",
        ko: "Modbus TCP, OPC-UA, MQTT를 투명하게 처리하는 통합 프로토콜 어댑터 레이어",
      },
    },
    {
      before: {
        en: "Equipment status checked manually or via vendor-specific software",
        ko: "장비 상태를 수동 또는 벤더별 소프트웨어로 확인",
      },
      after: {
        en: "Real-time monitoring dashboard with time-series visualization and alerting",
        ko: "시계열 시각화와 알림이 포함된 실시간 모니터링 대시보드",
      },
    },
  ],

  approach: {
    title: {
      en: "Configuration-Driven Architecture",
      ko: "설정 기반 아키텍처",
    },
    description: {
      en: "Instead of writing code for each equipment type, the gateway reads YAML configuration files that define equipment models — registers, data types, polling intervals, and API endpoints. A code-generation layer transforms these definitions into fully functional REST APIs at startup. Protocol adapters abstract away communication differences, so the same YAML schema works whether the device speaks Modbus TCP, OPC-UA, or MQTT. This approach turns equipment onboarding from a development task into a configuration task, enabling operations engineers to add new products without writing a single line of code.",
      ko: "장비 유형마다 코드를 작성하는 대신, 게이트웨이가 장비 모델을 정의하는 YAML 설정 파일 — 레지스터, 데이터 타입, 폴링 주기, API 엔드포인트 — 을 읽습니다. 코드 생성 레이어가 시작 시 이 정의를 완전한 REST API로 변환합니다. 프로토콜 어댑터가 통신 차이를 추상화하여 장비가 Modbus TCP, OPC-UA, MQTT 중 무엇을 사용하든 동일한 YAML 스키마가 동작합니다. 이 접근 방식은 장비 온보딩을 개발 작업에서 설정 작업으로 전환하여, 운영 엔지니어가 코드 한 줄 없이 새 제품을 추가할 수 있게 합니다.",
    },
  },

  features: [
    {
      title: {
        en: "YAML-Driven Equipment Config",
        ko: "YAML 기반 장비 설정",
      },
      description: {
        en: "Define equipment models declaratively in YAML — register addresses, data types (INT16, FLOAT32, BOOL), scaling factors, and polling tiers. The gateway parses these definitions at startup and auto-generates typed REST endpoints, entity schemas, and polling schedules. No backend code changes needed to onboard a new product.",
        ko: "YAML로 장비 모델을 선언적으로 정의합니다 — 레지스터 주소, 데이터 타입(INT16, FLOAT32, BOOL), 스케일링 팩터, 폴링 티어. 게이트웨이가 시작 시 이 정의를 파싱하여 타입이 지정된 REST 엔드포인트, 엔티티 스키마, 폴링 스케줄을 자동 생성합니다. 새 제품 온보딩에 백엔드 코드 변경이 필요 없습니다.",
      },
      image: "/projects/equipment-gateway/feature-yaml-config.png",
    },
    {
      title: {
        en: "Multi-Protocol Support",
        ko: "멀티 프로토콜 지원",
      },
      description: {
        en: "Pluggable protocol adapter architecture supporting Modbus TCP, OPC-UA, and MQTT out of the box. Each adapter implements a common interface for read/write operations, so equipment definitions remain protocol-agnostic. Adding a new protocol means implementing one adapter — all existing YAML configs work automatically.",
        ko: "Modbus TCP, OPC-UA, MQTT를 기본 지원하는 플러거블 프로토콜 어댑터 아키텍처입니다. 각 어댑터가 읽기/쓰기 작업의 공통 인터페이스를 구현하여 장비 정의가 프로토콜에 독립적입니다. 새 프로토콜 추가는 어댑터 하나만 구현하면 되며, 기존 YAML 설정은 자동으로 동작합니다.",
      },
      image: "/projects/equipment-gateway/feature-multi-protocol.png",
    },
    {
      title: {
        en: "Auto-Generated REST API",
        ko: "자동 생성 REST API",
      },
      description: {
        en: "REST endpoints are dynamically generated from YAML definitions — GET for current values, POST for write commands, and WebSocket streams for real-time updates. The Entity Store maintains in-memory state with change detection, serving cached responses in microseconds while 3-tier polling (100ms / 500ms / 1s) keeps data fresh from the equipment.",
        ko: "YAML 정의로부터 REST 엔드포인트가 동적으로 생성됩니다 — 현재 값 조회 GET, 쓰기 명령 POST, 실시간 업데이트 WebSocket 스트림. Entity Store가 변경 감지와 함께 인메모리 상태를 유지하여 마이크로초 단위로 캐시된 응답을 제공하며, 3단계 폴링(100ms / 500ms / 1s)이 장비에서 데이터를 최신 상태로 유지합니다.",
      },
      image: "/projects/equipment-gateway/feature-auto-api.png",
    },
    {
      title: {
        en: "Real-time Equipment Monitoring Dashboard",
        ko: "실시간 장비 모니터링 대시보드",
      },
      description: {
        en: "Visual dashboard built with ReactFlow showing live equipment topology and real-time sensor values. Time-series data streams into InfluxDB for historical trend analysis, anomaly detection, and configurable alerting thresholds. Engineers can monitor entire production lines from a single screen.",
        ko: "ReactFlow로 구축된 시각적 대시보드가 실시간 장비 토폴로지와 센서 값을 보여줍니다. 시계열 데이터가 InfluxDB에 스트리밍되어 이력 추이 분석, 이상 감지, 설정 가능한 알림 임계값을 제공합니다. 엔지니어가 단일 화면에서 전체 생산 라인을 모니터링할 수 있습니다.",
      },
      image: "/projects/equipment-gateway/feature-monitoring.png",
    },
  ],

  architecture: {
    nodes: [
      { id: "browser", label: { en: "Browser", ko: "브라우저" }, type: "client", x: 50, y: 50 },
      { id: "react", label: { en: "React + ReactFlow", ko: "React + ReactFlow" }, type: "client", x: 200, y: 50 },
      { id: "fastapi", label: { en: "FastAPI Gateway", ko: "FastAPI 게이트웨이" }, type: "server", x: 200, y: 180 },
      { id: "yaml", label: { en: "YAML Config", ko: "YAML 설정" }, type: "service", x: 50, y: 180 },
      { id: "influx", label: { en: "InfluxDB", ko: "InfluxDB" }, type: "database", x: 50, y: 310 },
      { id: "modbus", label: { en: "Modbus TCP Adapter", ko: "Modbus TCP 어댑터" }, type: "service", x: 350, y: 180 },
      { id: "opcua", label: { en: "OPC-UA Adapter", ko: "OPC-UA 어댑터" }, type: "service", x: 350, y: 260 },
      { id: "mqtt", label: { en: "MQTT Adapter", ko: "MQTT 어댑터" }, type: "service", x: 350, y: 340 },
      { id: "equipment", label: { en: "Equipment / PLC", ko: "장비 / PLC" }, type: "external", x: 500, y: 260 },
    ],
    connections: [
      { from: "browser", to: "react", label: { en: "SPA", ko: "SPA" } },
      { from: "react", to: "fastapi", label: { en: "REST / WS", ko: "REST / WS" } },
      { from: "yaml", to: "fastapi", label: { en: "Config Load", ko: "설정 로드" } },
      { from: "fastapi", to: "influx", label: { en: "Time-series", ko: "시계열" } },
      { from: "fastapi", to: "modbus", label: { en: "Poll", ko: "폴링" } },
      { from: "fastapi", to: "opcua", label: { en: "Poll", ko: "폴링" } },
      { from: "fastapi", to: "mqtt", label: { en: "Subscribe", ko: "구독" } },
      { from: "modbus", to: "equipment", label: { en: "Modbus TCP", ko: "Modbus TCP" } },
      { from: "opcua", to: "equipment", label: { en: "OPC-UA", ko: "OPC-UA" } },
      { from: "mqtt", to: "equipment", label: { en: "MQTT", ko: "MQTT" } },
    ],
  },

  metrics: [
    {
      value: "0",
      label: { en: "Lines of Code Per Product", ko: "제품별 코드 라인 수" },
      description: { en: "New equipment types onboarded with YAML config only", ko: "YAML 설정만으로 새 장비 유형 온보딩" },
    },
    {
      value: "100ms",
      label: { en: "Min Polling Interval", ko: "최소 폴링 주기" },
      description: { en: "3-tier polling with register auto-merging for efficiency", ko: "효율성을 위한 레지스터 자동 병합 3단계 폴링" },
    },
    {
      value: "3",
      label: { en: "Protocols Supported", ko: "지원 프로토콜 수" },
      description: { en: "Modbus TCP, OPC-UA, and MQTT via pluggable adapters", ko: "플러거블 어댑터로 Modbus TCP, OPC-UA, MQTT 지원" },
    },
    {
      value: "24/7",
      label: { en: "Continuous Monitoring", ko: "상시 모니터링" },
      description: { en: "Real-time equipment health tracking with alerting", ko: "알림 기능이 포함된 실시간 장비 상태 추적" },
    },
  ],

  prevProject: {
    slug: "smart-factory-qc",
    title: { en: "Smart Factory QC Platform", ko: "스마트 팩토리 QC 플랫폼" },
  },
  nextProject: {
    slug: "resource-board",
    title: { en: "Engineering Resource Board", ko: "엔지니어링 리소스 보드" },
  },
};
