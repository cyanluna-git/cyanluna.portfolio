import type { ProjectDetail } from "@/types/project-detail";

export const moru: ProjectDetail = {
  slug: "moru",
  vertical: "industrial",
  verticalColor: "#06b6d4",
  status: "active",
  title: {
    en: "Moru — AI-Driven IIoT Engineering Platform",
    ko: "Moru — AI 기반 IIoT 엔지니어링 플랫폼",
  },
  tagline: {
    en: "Say what the system should do — AI assembles verified Rust control logic, validates it with BDD e2e tests, and gates deployment through a Cloud Digital Twin.",
    ko: "시스템이 해야 할 동작을 말하면 — AI가 검증된 Rust 제어 로직을 조립하고, BDD e2e 테스트로 Verification하여, Cloud Digital Twin을 통해 배포를 게이팅합니다.",
  },

  painPoints: [
    {
      icon: "📋",
      title: {
        en: "Control Logic Built From Scratch Every Time",
        ko: "매번 처음부터 작성하는 제어 로직",
      },
      description: {
        en: "Engineers manually map thousands of memory addresses in Excel and hand-code control sequences without abstraction or reuse. Each new device integration restarts from zero, burning weeks of engineering time on repetitive boilerplate.",
        ko: "엔지니어들이 수천 개의 메모리 주소를 엑셀로 수작업 매핑하고, 추상화·재사용 없이 제어 시퀀스를 직접 코딩합니다. 새 장비 연동마다 처음부터 시작해 반복적인 보일러플레이트에 수주가 소모됩니다.",
      },
    },
    {
      icon: "🔒",
      title: {
        en: "Vendor Lock-In and Closed Architectures",
        ko: "벤더 종속과 폐쇄적 아키텍처",
      },
      description: {
        en: "Traditional PLCs and embedded controllers tie teams to proprietary hardware, rigid ladder logic languages, and expensive toolchains. Switching vendors or adding modern web monitoring requires starting over entirely.",
        ko: "기존 PLC와 임베디드 제어기는 독점 하드웨어, 경직된 래더 로직, 고가 툴체인에 팀을 종속시킵니다. 벤더 변경이나 모던 웹 모니터링 추가는 처음부터 다시 시작해야 합니다.",
      },
    },
    {
      icon: "🤖",
      title: {
        en: "LLM-Generated Code With No Safety Net",
        ko: "안전망 없는 LLM 생성 코드",
      },
      description: {
        en: "Using raw LLMs to generate control logic produces black-box output — no traceability, no structured verification, no guarantee the logic behaves correctly under real conditions. A valve opening when it should close is not a compile error.",
        ko: "LLM으로 직접 제어 로직을 생성하면 블랙박스 결과만 나옵니다 — 추적 불가, 구조화된 검증 없음, 실제 조건에서의 올바른 동작 보장 없음. 닫아야 할 밸브를 여는 로직 오류는 컴파일 에러가 아닙니다.",
      },
    },
  ],

  beforeAfter: [
    {
      before: {
        en: "Weeks spent hand-mapping device registers in Excel, then manually coding control sequences from scratch",
        ko: "장치 레지스터를 엑셀로 수작업 매핑하고 제어 시퀀스를 처음부터 직접 코딩하는 데 수주 소모",
      },
      after: {
        en: "Natural language requirement → AI assembles verified modules from Infrastructure Framework → cargo build passes in minutes",
        ko: "자연어 요구사항 → AI가 Infrastructure Framework에서 검증된 모듈 조립 → 수분 내 cargo build 통과",
      },
    },
    {
      before: {
        en: "Deploy to real hardware and hope it works — no structured pre-deployment logic validation",
        ko: "실물 하드웨어에 배포하고 작동을 기대 — 배포 전 구조화된 로직 검증 없음",
      },
      after: {
        en: "BDD scenarios auto-derived from requirements run end-to-end in Cloud Digital Twin before any hardware deployment",
        ko: "요구사항에서 자동 도출한 BDD 시나리오가 하드웨어 배포 전 Cloud Digital Twin에서 e2e 실행",
      },
    },
    {
      before: {
        en: "Proprietary PLC hardware ($150K+/line) with closed toolchains and vendor lock-in",
        ko: "폐쇄 툴체인과 벤더 종속이 있는 독점 PLC 하드웨어 (라인당 1억+)",
      },
      after: {
        en: "RevPi edge appliance ($300–500) running open-architecture Rust runtime with full SaaS subscription model",
        ko: "오픈 아키텍처 Rust 런타임을 실행하는 RevPi 엣지 어플라이언스 ($300~500) + SaaS 구독 모델",
      },
    },
  ],

  approach: {
    title: {
      en: "Infrastructure Framework + Kanban Harness: Constrained AI Engineering",
      ko: "Infrastructure Framework + Kanban Harness: 제한된 AI 엔지니어링",
    },
    description: {
      en: "Moru's core insight: LLMs are powerful but unconstrained. The solution is not to restrict LLMs — it's to give them a pre-validated toolkit (Infrastructure Framework) and a deterministic execution loop (Kanban Harness) so their output is always traceable, verifiable, and safe. The LLM assembles from proven building blocks rather than generating from scratch. BDD-derived e2e tests in the Cloud Digital Twin catch logic errors before any hardware sees the code.",
      ko: "Moru의 핵심 인사이트: LLM은 강력하지만 제약이 없습니다. 해결책은 LLM을 제한하는 것이 아니라 — 사전 검증된 도구모음(Infrastructure Framework)과 결정론적 실행 루프(Kanban Harness)를 제공하여 출력이 항상 추적 가능하고, 검증 가능하며, 안전하도록 하는 것입니다. LLM은 처음부터 생성하는 대신 검증된 빌딩 블록을 조립합니다. Cloud Digital Twin의 BDD 기반 e2e 테스트가 하드웨어가 코드를 보기 전에 로직 오류를 잡아냅니다.",
    },
  },

  introduction: {
    badge: {
      en: "AI-Driven IIoT · Smart Farm · Robotics · SME OEM",
      ko: "AI 기반 IIoT · 스마트팜 · 로보틱스 · 중소 설비 OEM",
    },
    title: {
      en: "Control logic that writes and verifies itself",
      ko: "스스로 작성하고 검증하는 제어 로직",
    },
    subtitle: {
      en: "An AI engineering system where LLMs operate inside a Kanban-controlled verification loop — producing Rust control code that is syntactically safe, logically verified, and traceable from requirement to deployment.",
      ko: "LLM이 Kanban 제어 검증 루프 안에서 작동하는 AI 엔지니어링 시스템 — 문법적으로 안전하고, 논리적으로 검증되며, 요구사항에서 배포까지 추적 가능한 Rust 제어 코드를 생성합니다.",
    },
    pillars: [
      {
        label: { en: "Infrastructure Framework", ko: "인프라 프레임워크" },
        title: { en: "Assemble, not generate from scratch", ko: "처음부터 생성이 아닌 조립" },
        description: {
          en: "Pre-validated Rust modules (sensor drivers, actuator interfaces, SFC engine, communication adapters) that the LLM assembles. Constrains the solution space — less surface area for hallucination.",
          ko: "LLM이 조립하는 사전 검증된 Rust 모듈 (센서 드라이버, 액추에이터 인터페이스, SFC 엔진, 통신 어댑터). 솔루션 공간을 제한하여 환각의 여지를 줄입니다.",
        },
        stat: { en: "Lego-block assembly", ko: "레고 블록 조립" },
      },
      {
        label: { en: "Kanban Harness", ko: "칸반 하네스" },
        title: { en: "Deterministic AI process control", ko: "결정론적 AI 프로세스 제어" },
        description: {
          en: "LLM is a Worker. Kanban Board is the State Machine. TODO → DOING → VERIFY → DONE/FAIL. On FAIL, an error-analysis Task is auto-created and LLM retries. All prompts, code, and failures are logged.",
          ko: "LLM은 Worker. Kanban Board는 State Machine. TODO → DOING → VERIFY → DONE/FAIL. FAIL 시 오류 분석 Task 자동 생성 후 LLM 재시도. 모든 프롬프트, 코드, 실패가 로깅됩니다.",
        },
        stat: { en: "Self-Healing Loop", ko: "자가 복구 루프" },
      },
      {
        label: { en: "BDD Verification", ko: "BDD 검증" },
        title: { en: "Requirements → e2e tests → deployment gate", ko: "요구사항 → e2e 테스트 → 배포 게이트" },
        description: {
          en: "BDD scenarios are auto-derived from requirements and run end-to-end in the Cloud Digital Twin before any hardware deployment. Catches logic errors ('valve opens when it should close') that compile-time checks cannot.",
          ko: "BDD 시나리오가 요구사항에서 자동 도출되어 하드웨어 배포 전 Cloud Digital Twin에서 e2e 실행됩니다. 컴파일 시간 검사가 잡지 못하는 로직 오류 ('닫아야 할 때 밸브가 열림')를 포착합니다.",
        },
        stat: { en: "Requirement-level Verification", ko: "요구사항 레벨 Verification" },
      },
    ],
    layers: [
      {
        label: { en: "5-Layer Safety Net", ko: "5중 안전망" },
        description: {
          en: "Structural defense-in-depth that catches different failure modes at each layer",
          ko: "각 레이어에서 서로 다른 실패 모드를 포착하는 구조적 심층 방어",
        },
        items: [
          {
            title: { en: "① Infrastructure Framework", ko: "① 인프라 프레임워크" },
            description: { en: "Pre-validated modules constrain LLM solution space — reduces hallucination surface area", ko: "사전 검증된 모듈이 LLM 솔루션 공간 제한 — 환각 표면적 감소" },
            meta: { en: "Before generation", ko: "생성 전" },
          },
          {
            title: { en: "② Rust Compile Harness", ko: "② Rust 컴파일 하네스" },
            description: { en: "Ownership/Borrow Checker eliminates memory leaks, data races, null dereferences at compile time", ko: "소유권/대여 검사기가 컴파일 타임에 메모리 누수, 데이터 레이스, 널 역참조 제거" },
            meta: { en: "Compile time", ko: "컴파일 타임" },
          },
          {
            title: { en: "③ Kanban Self-Healing Loop", ko: "③ 칸반 자가 복구 루프" },
            description: { en: "FAIL → auto error-analysis Task → LLM retry → re-verify. Unmanned 24h engineering cycle", ko: "FAIL → 자동 오류 분석 Task → LLM 재시도 → 재검증. 무인 24시간 엔지니어링 사이클" },
            meta: { en: "Generation loop", ko: "생성 루프" },
          },
          {
            title: { en: "④ BDD e2e Verification", ko: "④ BDD e2e Verification" },
            description: { en: "Requirements-derived BDD scenarios run in Cloud Digital Twin — logic errors caught before any hardware sees the code", ko: "요구사항 기반 BDD 시나리오가 Cloud Digital Twin에서 실행 — 하드웨어가 코드를 보기 전에 로직 오류 포착" },
            meta: { en: "Pre-deployment", ko: "배포 전" },
          },
          {
            title: { en: "⑤ Human-in-the-Loop", ko: "⑤ Human-in-the-Loop" },
            description: { en: "Engineer reviews Verification results in Web HMI and explicitly approves before real hardware deployment — architecturally un-bypassable", ko: "엔지니어가 Web HMI에서 Verification 결과 검토 후 실 하드웨어 배포 전 명시적 승인 — 아키텍처적으로 우회 불가" },
            meta: { en: "Final gate", ko: "최종 게이트" },
          },
        ],
      },
    ],
    capabilities: [
      {
        title: { en: "Natural Language to Rust Control Logic", ko: "자연어 → Rust 제어 로직" },
        description: { en: "Describe what the system should do. AI designs the system, gets human approval on the design, then generates Rust control modules using pre-validated Infrastructure Framework building blocks.", ko: "시스템이 해야 할 동작을 설명합니다. AI가 시스템을 설계하고, 인간 승인을 받은 후, 사전 검증된 인프라 프레임워크 블록을 사용하여 Rust 제어 모듈을 생성합니다." },
      },
      {
        title: { en: "Cloud Digital Twin", ko: "클라우드 디지털 트윈" },
        description: { en: "Fullstack containerized virtual factory (Runtime + Mock Fieldbus + Gateway + Web HMI + InfluxDB) accessible from a single browser URL. BDD e2e tests run here before any real deployment. sim ↔ prod transparent switching via single env var.", ko: "단일 브라우저 URL로 접근 가능한 풀스택 컨테이너 가상 공장 (Runtime + Mock Fieldbus + Gateway + Web HMI + InfluxDB). 실제 배포 전 BDD e2e 테스트가 여기서 실행됩니다. 환경 변수 하나로 sim ↔ prod 투명 전환." },
      },
      {
        title: { en: "Open Architecture Edge Appliance", ko: "오픈 아키텍처 엣지 어플라이언스" },
        description: { en: "RevPi (CM5) runs Rust-native runtime + Web HMI + Protocol Gateway on a single $300–500 industrial edge device. KC/CE certified. MQTT-native for modern IIoT, Modbus/OPC-UA bridge for legacy equipment.", ko: "RevPi(CM5)가 $300~500 산업용 엣지 디바이스 하나에서 Rust 네이티브 런타임 + Web HMI + 프로토콜 게이트웨이를 실행합니다. KC/CE 인증. 현대 IIoT에는 MQTT 네이티브, 레거시 장비에는 Modbus/OPC-UA 브릿지." },
      },
    ],
    roadmap: [
      {
        label: { en: "MVP1", ko: "MVP1" },
        title: { en: "Rust Runtime + Infrastructure Framework", ko: "Rust 런타임 + 인프라 프레임워크" },
        description: { en: "WaterSystem PoC with 103 passing tests, SFC engine, I/O abstraction, Modbus TCP, Web HMI (axum). Infrastructure Framework building blocks validated.", ko: "103개 통과 테스트, SFC 엔진, I/O 추상화, Modbus TCP, Web HMI(axum)로 WaterSystem PoC. Infrastructure Framework 빌딩 블록 검증 완료." },
        status: "active",
      },
      {
        label: { en: "MVP2", ko: "MVP2" },
        title: { en: "Kanban Harness + AI Agent", ko: "칸반 하네스 + AI 에이전트" },
        description: { en: "LLM integration, Kanban State Machine (TODO→VERIFY→DONE/FAIL), Self-Healing Loop, natural language → Rust code generation pipeline.", ko: "LLM 연동, 칸반 상태 머신(TODO→VERIFY→DONE/FAIL), 자가 복구 루프, 자연어 → Rust 코드 생성 파이프라인." },
        status: "planned",
      },
      {
        label: { en: "MVP3", ko: "MVP3" },
        title: { en: "Cloud Digital Twin + BDD Verification", ko: "클라우드 디지털 트윈 + BDD Verification" },
        description: { en: "Standalone cloud digital twin infrastructure, BDD scenario auto-derivation from requirements, e2e test pipeline, independent IR demo environment.", ko: "독립형 클라우드 디지털 트윈 인프라, 요구사항에서 BDD 시나리오 자동 도출, e2e 테스트 파이프라인, 독립 IR 데모 환경." },
        status: "planned",
      },
      {
        label: { en: "MVP4", ko: "MVP4" },
        title: { en: "RevPi Edge Appliance + SaaS", ko: "RevPi 엣지 어플라이언스 + SaaS" },
        description: { en: "Full RevPi hardware integration, HIL demo kit, airgap deployment automation, SaaS billing with Base + Outcome-based variable fee model.", ko: "전체 RevPi 하드웨어 연동, HIL 데모 키트, 에어갭 배포 자동화, Base + 성과 기반 변동 요금 SaaS 과금." },
        status: "future",
      },
    ],
  },

  features: [
    {
      title: { en: "Infrastructure Framework — Lego-Block Control Modules", ko: "인프라 프레임워크 — 레고 블록 제어 모듈" },
      description: { en: "Pre-validated Rust crates covering SFC sequence engine, I/O abstraction (Simulated/Real), alert management, tag-based memory, and fieldbus adapters. LLM assembles from these — never generates from zero.", ko: "SFC 시퀀스 엔진, I/O 추상화(시뮬레이션/실물), 알람 관리, 태그 기반 메모리, 필드버스 어댑터를 다루는 사전 검증된 Rust 크레이트. LLM이 이들로부터 조립 — 처음부터 생성하지 않음." },
    },
    {
      title: { en: "Kanban Harness — Deterministic AI Loop", ko: "칸반 하네스 — 결정론적 AI 루프" },
      description: { en: "TODO→DOING→VERIFY→DONE/FAIL state machine with automatic Self-Healing: on FAIL, an error-analysis Task is auto-created, LLM regenerates, and the loop retries. Full audit log of every prompt, code revision, and failure reason.", ko: "FAIL 시 자동 자가 복구가 있는 TODO→DOING→VERIFY→DONE/FAIL 상태 머신: 오류 분석 Task 자동 생성, LLM 재생성, 루프 재시도. 모든 프롬프트, 코드 수정, 실패 이유의 전체 감사 로그." },
    },
    {
      title: { en: "BDD e2e Verification in Cloud Digital Twin", ko: "클라우드 디지털 트윈에서 BDD e2e Verification" },
      description: { en: "Requirements automatically translated into BDD scenarios. Scenarios run end-to-end inside the Cloud Digital Twin (containerized virtual factory) before any hardware sees the code. sim↔prod transparent switching via single env var.", ko: "요구사항이 자동으로 BDD 시나리오로 변환됩니다. 하드웨어가 코드를 보기 전에 클라우드 디지털 트윈(컨테이너화된 가상 공장) 내에서 e2e 시나리오가 실행됩니다. 환경 변수 하나로 sim↔prod 투명 전환." },
    },
    {
      title: { en: "Open Architecture Edge — RevPi + Rust Runtime", ko: "오픈 아키텍처 엣지 — RevPi + Rust 런타임" },
      description: { en: "RevPi (CM5, KC/CE certified) runs Rust-native control runtime, Web HMI, and protocol gateway on a single $300–500 industrial device. MQTT-native for modern IIoT; Modbus TCP/OPC-UA bridge for legacy equipment. Airgap deployment supported.", ko: "RevPi(CM5, KC/CE 인증)가 $300~500 산업용 디바이스 하나에서 Rust 네이티브 제어 런타임, Web HMI, 프로토콜 게이트웨이를 실행합니다. 현대 IIoT에는 MQTT 네이티브; 레거시 장비에는 Modbus TCP/OPC-UA 브릿지. 에어갭 배포 지원." },
    },
  ],

  architecture: {
    nodes: [
      { id: "nlui",     label: { en: "Natural Language UI", ko: "자연어 UI" },          type: "client",   x: 10,  y: 10  },
      { id: "llm",      label: { en: "LLM Worker",          ko: "LLM 워커" },            type: "service",  x: 50,  y: 10  },
      { id: "kanban",   label: { en: "Kanban Harness",       ko: "칸반 하네스" },         type: "service",  x: 90,  y: 10  },
      { id: "infra",    label: { en: "Infrastructure FW",    ko: "인프라 FW" },           type: "service",  x: 10,  y: 50  },
      { id: "rust",     label: { en: "Rust Runtime",         ko: "Rust 런타임" },         type: "server",   x: 50,  y: 50  },
      { id: "twin",     label: { en: "Cloud Digital Twin",   ko: "클라우드 디지털 트윈" }, type: "external", x: 90,  y: 50  },
      { id: "hmi",      label: { en: "Web HMI",              ko: "Web HMI" },             type: "client",   x: 10,  y: 90  },
      { id: "edge",     label: { en: "RevPi Edge",           ko: "RevPi 엣지" },          type: "server",   x: 50,  y: 90  },
      { id: "field",    label: { en: "Field Devices",        ko: "현장 장치" },           type: "external", x: 90,  y: 90  },
    ],
    connections: [
      { from: "nlui",   to: "llm",    label: { en: "requirements",   ko: "요구사항" } },
      { from: "llm",    to: "kanban", label: { en: "generated code",  ko: "생성 코드" } },
      { from: "infra",  to: "llm",    label: { en: "module library",  ko: "모듈 라이브러리" } },
      { from: "kanban", to: "rust",   label: { en: "cargo build",     ko: "cargo build" } },
      { from: "kanban", to: "twin",   label: { en: "BDD e2e tests",   ko: "BDD e2e 테스트" } },
      { from: "rust",   to: "edge",   label: { en: "deploy (prod)",   ko: "배포 (prod)" } },
      { from: "twin",   to: "rust",   label: { en: "sim↔prod gate",   ko: "sim↔prod 게이트" } },
      { from: "hmi",    to: "edge",   label: { en: "real-time ctrl",  ko: "실시간 제어" } },
      { from: "edge",   to: "field",  label: { en: "MQTT/Modbus",     ko: "MQTT/Modbus" } },
    ],
  },

  metrics: [
    {
      value: "5",
      label: { en: "Safety Layers", ko: "안전망 레이어" },
      description: { en: "Infrastructure FW → Rust Compile → Kanban Loop → BDD Verification → Human Approval", ko: "인프라 FW → Rust 컴파일 → 칸반 루프 → BDD Verification → Human Approval" },
    },
    {
      value: "103",
      label: { en: "Tests Passing", ko: "통과 테스트" },
      description: { en: "MVP1 WaterSystem PoC — SFC engine, I/O abstraction, Modbus TCP, Web HMI", ko: "MVP1 WaterSystem PoC — SFC 엔진, I/O 추상화, Modbus TCP, Web HMI" },
    },
    {
      value: "$470B",
      label: { en: "Smart Farm Market 2030", ko: "스마트팜 시장 2030" },
      description: { en: "Primary target: smart farm + IIoT + robotics — greenfield, open-tech-friendly", ko: "1차 타겟: 스마트팜 + IIoT + 로보틱스 — 그린필드, 신기술 친화적" },
    },
    {
      value: "0",
      label: { en: "Real Hardware Needed to Demo", ko: "데모에 필요한 실물 하드웨어" },
      description: { en: "Cloud Digital Twin runs full e2e demo from browser. Already built and operated once.", ko: "클라우드 디지털 트윈이 브라우저에서 전체 e2e 데모 실행. 이미 1회 구축·운영 완료." },
    },
  ],

  prevProject: { slug: "kanban-pipeline", title: { en: "AI Kanban Pipeline", ko: "AI 칸반 파이프라인" } },
  nextProject: { slug: "smart-factory-qc", title: { en: "Smart Factory QC Platform", ko: "스마트 팩토리 QC 플랫폼" } },
};
