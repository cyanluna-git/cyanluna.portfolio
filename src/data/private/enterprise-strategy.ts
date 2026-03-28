import type {
  EnterpriseStrategyWorkspaceData,
  StrategyStatusMeta,
} from "@/types/enterprise-strategy";

export const STRATEGY_STATUS_META: Record<string, StrategyStatusMeta> = {
  implemented: {
    label: "구현 근거",
    tone: "border-emerald-500/25 bg-emerald-500/10 text-emerald-200",
  },
  linked: {
    label: "근거 연결",
    tone: "border-sky-500/25 bg-sky-500/10 text-sky-200",
  },
  roadmap: {
    label: "로드맵",
    tone: "border-amber-500/25 bg-amber-500/10 text-amber-200",
  },
  validation: {
    label: "검증 필요",
    tone: "border-rose-500/25 bg-rose-500/10 text-rose-200",
  },
};

export const enterpriseStrategyWorkspaceData: EnterpriseStrategyWorkspaceData = {
  updatedAt: "2026-03-28",
  title: "엔터프라이즈 전략 워크스페이스",
  subtitle:
    "기존 포트폴리오 근거를 묶어 제조 오케스트레이션 전략으로 재구성하고, 구현된 사실과 앞으로의 가설을 분리해 정리한 문서.",
  note:
    "이 페이지는 공개용 케이스 스터디가 아니라 개인 전략 정리용 워크스페이스다. 현재 레포에서 증명 가능한 자산과 다음 단계 가설을 명시적으로 구분해서 본다.",
  summaryCards: [
    {
      label: "근거 자산",
      value: "3개",
      note: "QC, 설비 데이터, 리소스 계획",
    },
    {
      label: "구현 레이어",
      value: "실행",
      note: "각 축이 독립적인 포트폴리오 근거로 이미 존재함",
    },
    {
      label: "노출 범위",
      value: "개인 전용",
      note: "나만 보는 전략 정리용 전용 라우트",
    },
    {
      label: "핵심 리스크",
      value: "서사 과장",
      note: "엔터프라이즈 통합 주장 범위가 현재 레포 근거를 앞설 수 있음",
    },
  ],
  narratives: [
    {
      eyebrow: "왜 이 문서가 필요한가",
      title: "포트폴리오에는 이미 씨앗이 있지만, 아직 하나의 엔터프라이즈 이야기로 묶여 있지는 않다.",
      body:
        "`docs/myplan.md`의 핵심 재료는 공상에 가깝지 않다. 품질 실행, 설비 텔레메트리, 엔지니어링 리소스 가시성은 이미 이 레포 안에서 각각 별도의 산업 도메인 근거로 존재한다. 부족한 것은 세 개의 인접 프로젝트를 하나의 제조 오케스트레이션 방향으로 묶어 설명하는 전략 레이어다.",
    },
    {
      eyebrow: "반드시 정직해야 하는 부분",
      title: "이 문서는 전략 대시보드이지, 통합 플랫폼이 이미 출하됐다는 증거가 아니다.",
      body:
        "SAP OData 연동, Saga/Outbox 기반 신뢰성, 내부 확산 시나리오, 스핀오프 가능성은 모두 충분히 plausible한 다음 단계다. 다만 이 레포에는 아직 구현되어 있지 않다. 이 구분을 문서 안에서 끝까지 유지해야 전체 서사가 설득력을 가진다.",
    },
  ],
  assessment: {
    title: "현재 전략과 포지션 평가",
    summary:
      "전략 방향은 좋고 포지션도 분명하다. 다만 지금 가장 강한 포지션은 일반 SaaS 창업자보다는 제조·산업 도메인에서 OT, IT, AI를 연결하는 엔터프라이즈 DX 빌더에 가깝다.",
    strengths: [
      "제조 실행, 설비 데이터, 리소스 운영을 각각 실제 산출물로 보여줄 수 있다.",
      "PLC, 장비, 백엔드, 프론트, UI까지 한 사람이 관통한다는 점이 희소하다.",
      "AI를 단순히 활용하는 수준이 아니라 개발 프로세스와 시스템을 설계하는 사람으로 읽힌다.",
    ],
    gaps: [
      "아직은 통합된 엔터프라이즈 플랫폼의 실행 근거보다 잘 연결될 수 있는 개별 증거가 더 강하다.",
      "스케일, 신뢰성, 조직 확산, 팀 리딩 임팩트는 실제보다 바깥으로 덜 드러난다.",
      "서사를 잘못 잡으면 야심은 크지만 증거는 분산된 사람처럼 읽힐 수 있다.",
    ],
    positioning: [
      "한국 시장에서는 제조 DX, 스마트팩토리, 산업 소프트웨어 영역의 매우 강한 시니어에서 스태프 후보로 읽힌다.",
      "글로벌 시장에서는 범용 플랫폼 엔지니어보다 industrial software와 AI-native tooling에 강한 특화 시니어 포지션이 더 설득력 있다.",
      "창업 서사는 열려 있지만, 현재는 내부 운영 플랫폼을 만드는 사람이라는 포지션이 더 직접적이고 신뢰도가 높다.",
      "한 문장으로 정리하면: 제조 현장의 실행 데이터와 운영 의사결정을 실제 제품으로 연결하는 AI-네이티브 풀스택 엔지니어.",
    ],
  },
  evidenceItems: [
    {
      id: "qc",
      title: "디지털 품질 실행 기반",
      status: "implemented",
      summary:
        "Smart Factory QC는 품질 실행 축을 이미 실체가 있는 근거로 보여준다. BDD 기반 테스트 자동화, 실시간 설비 통신, 결과 대시보드까지 품질 실행의 핵심 흐름이 구현돼 있다.",
      proof:
        "이 자산은 사후 집계가 아니라 검사 시점의 실행 데이터를 잡아낸다는 점에서 엔터프라이즈 전략의 가장 강한 운영 근거가 된다.",
      links: [
        { label: "Smart Factory QC", href: "/projects/smart-factory-qc" },
      ],
    },
    {
      id: "gateway",
      title: "설비 텔레메트리 및 모니터링 레이어",
      status: "implemented",
      summary:
        "Equipment Gateway는 설비 정의, 프로토콜 추상화, 실시간 모니터링이 더 넓은 제조 플랫폼의 데이터 수집 레이어로 동작할 수 있음을 이미 보여준다.",
      proof:
        "전략에서 말하는 인사이트 대시보드 측면의 근거로는 충분하지만, 이것만으로 엔터프라이즈 오케스트레이션이 완성됐다고 말할 수는 없다.",
      links: [
        { label: "Equipment Gateway", href: "/projects/equipment-gateway" },
      ],
    },
    {
      id: "resource",
      title: "엔지니어링 리소스 및 계획 가시성",
      status: "implemented",
      summary:
        "Engineering Resource Board는 FTE 예측, worklog 분류, 마일스톤 추적, 관리 시야를 통해 리소스 계획 축을 이미 담당하고 있다.",
      proof:
        "인력 운영과 병목 관리 서사를 지지하는 근거이지만, 아직은 런타임 통합 모듈이 아니라 별도의 제품 근거에 가깝다.",
      links: [
        { label: "Engineering Resource Board", href: "/projects/resource-board" },
      ],
    },
    {
      id: "orchestration",
      title: "제조 오케스트레이션 레이어",
      status: "roadmap",
      summary:
        "`docs/myplan.md`에서 말하는 중심 오케스트레이션 레이어는 방향성 자체는 일관되지만, 이 레포 안에서 공통 런타임으로 구현되어 있지는 않다.",
      proof:
        "이 부분은 세 개의 기존 근거를 하나로 엮는 목표 운영 모델로 봐야 한다. 현재 통합이 이미 존재한다는 증거처럼 취급하면 안 된다.",
      links: [
        { label: "전략 구조 보기", href: "/privacy/enterprise_strategy#architecture" },
      ],
    },
    {
      id: "enterprise-integrations",
      title: "SAP 및 분산 신뢰성 주장",
      status: "validation",
      summary:
        "SAP OData, Saga 오케스트레이션, Outbox 전달 보장, 엔터프라이즈 확산 메커니즘은 아직 가설 단계이며 별도 검증 작업이 필요하다.",
      proof:
        "이 항목들은 전략의 야심을 설명해주기 때문에 문서에서 보이지 않아서는 안 된다. 다만 코드나 운영 근거가 생기기 전까지는 검증 대상으로 남아 있어야 한다.",
      links: [],
    },
  ],
  architectureLayers: [
    {
      id: "proof",
      name: "현재 근거 레이어",
      status: "implemented",
      description:
        "세 개의 산업 도메인 제품이 검사, 텔레메트리, 리소스 가시성에 대한 도메인 이해를 각각 증명하고 있다.",
      notes: [
        "품질 실행은 Smart Factory QC로 이미 존재한다.",
        "설비 모니터링은 Equipment Gateway로 이미 존재한다.",
        "리소스 계획은 Engineering Resource Board로 이미 존재한다.",
      ],
    },
    {
      id: "control",
      name: "목표 오케스트레이션 레이어",
      status: "roadmap",
      description:
        "향후 control plane은 품질 이벤트, 설비 상태, 인력 의사결정을 하나의 운영 루프로 연결하는 역할을 맡게 된다.",
      notes: [
        "현재 런타임이 아니라 목표 아키텍처로 표현해야 한다.",
        "이벤트 흐름, 책임 주체, 상태 전이를 명확한 언어로 적어야 한다.",
        "모듈 간 자동화가 이미 출하된 것처럼 읽히지 않게 해야 한다.",
      ],
    },
    {
      id: "enterprise",
      name: "엔터프라이즈 통합 레이어",
      status: "validation",
      description:
        "SAP 연동, 신뢰성 패턴, 내부 확산 메커니즘은 여전히 미래 검증 항목이다.",
      notes: [
        "SAP OData는 이 레포에 구현되어 있지 않다.",
        "Saga / Outbox / event-bus 신뢰성 패턴도 이 레포에 구현되어 있지 않다.",
        "글로벌 확장과 수상 실적 활용은 코드 근거가 아니라 전략적 동작에 가깝다.",
      ],
    },
  ],
  roadmap: [
    {
      id: "seed",
      phase: "1단계",
      window: "지금",
      objective: "이미 구현된 것과 제안 단계인 것을 서사적으로 더 명확히 분리한다.",
      moves: [
        "세 개의 기존 근거를 하나의 전략 스택으로 보여준다.",
        "근거가 부족한 엔터프라이즈 주장은 로드맵 또는 검증 대상으로 표시한다.",
        "긴 플랜 문서를 탐색 가능한 내부 대시보드로 바꾼다.",
      ],
    },
    {
      id: "bridge",
      phase: "2단계",
      window: "다음 증명 사이클",
      objective: "오케스트레이션 서사를 더 구체적으로 보이게 만드는 통합 근거를 하나 추가한다.",
      moves: [
        "산업 프로젝트들 사이에 공유 이벤트 계약을 정의한다.",
        "예를 들어 품질 이슈에서 인력 조치로 이어지는 cross-surface workflow를 하나 프로토타입한다.",
        "운영 데이터 흐름을 책임 주체와 실패 상태까지 포함해 문서화한다.",
      ],
    },
    {
      id: "validate",
      phase: "3단계",
      window: "이후",
      objective: "엔터프라이즈 주장을 실행 근거로 제시하기 전에 먼저 검증한다.",
      moves: [
        "경계가 명확한 인터페이스나 mock contract로 SAP 연동 가정을 검증한다.",
        "retry-safe event persistence 같은 신뢰성 패턴을 하나 실제로 입증한다.",
        "아키텍처 설명을 넘어 land-and-expand 서사를 지지할 운영 근거를 모은다.",
      ],
    },
  ],
  pathOptions: [
    {
      id: "internal",
      name: "내부 엔터프라이즈 DX 운영자 포지션",
      status: "linked",
      thesis:
        "현재 근거들을 내부 운영 플랫폼으로 연결하고, 제조 실행 신뢰도를 기반으로 조직 내 영향력을 키우려는 목적이라면 가장 잘 맞는 방향이다.",
      pros: [
        "현재 포트폴리오 자산이 가장 직접적으로 지지하는 방향이다.",
        "개인 전략 근거를 조직 단위 실행 서사로 확장하기 좋다.",
        "엔터프라이즈 검증 전 SaaS 서사를 과장할 위험을 줄여준다.",
      ],
      risks: [
        "정치적 후원과 비코드 영역의 검증이 필요하다.",
        "개별 제품 소개를 넘어서는 통합 근거가 없으면 서사가 멈출 수 있다.",
      ],
    },
    {
      id: "spinout",
      name: "향후 SaaS 스핀아웃 가설",
      status: "roadmap",
      thesis:
        "오케스트레이션 레이어와 엔터프라이즈 통합 가정이 서사를 넘어 실제로 검증된 이후에야 장기 옵션으로 성립할 수 있다.",
      pros: [
        "현재의 불확실성을 숨기지 않으면서도 사업화 분기를 명시할 수 있다.",
        "전략적 upside를 문서 안에서 계속 보이게 유지할 수 있다.",
      ],
      risks: [
        "현재 레포만으로는 진짜 multi-tenant 엔터프라이즈 플랫폼을 주장하기 어렵다.",
        "go-to-market과 anchor customer 근거는 여전히 비어 있다.",
      ],
    },
  ],
  validationChecklist: [
    "이 대시보드가 SAP, Saga, Outbox가 이미 구현됐다고 읽히지 않는다.",
    "모든 '구현 근거' 블록이 실제 포트폴리오 프로젝트 페이지와 연결된다.",
    "오케스트레이션 서사가 세 개의 분리된 카드가 아니라 하나의 전략으로 읽힌다.",
    "PDF export나 공개 발행 없이도 브라우저에서 바로 활용할 수 있다.",
  ],
};
