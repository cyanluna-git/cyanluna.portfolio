import type { FounderWorkspaceData } from "@/types/founder-program";

export const founderWorkspaceData: FounderWorkspaceData = {
  updatedAt: "2026-03-21",
  note:
    "모집요강과 세부 자격은 해마다 바뀔 수 있으므로, 실제 지원 전에는 각 프로그램의 당해년도 공고문과 운영기관 안내를 다시 확인해야 한다.",
  strategyRules: [
    "직장을 유지하는 동안에는 법인 설립보다 고객 검증, 문제 정의, MVP, 특허/IP 정리, 사업계획서 초안 축적을 우선한다.",
    "정부지원사업은 프로그램별 제출 양식은 달라도 핵심 논리는 겹친다. 문제-고객-차별성-실행력-대표자 적합성 자료를 공통 자산으로 관리한다.",
    "회사 재직 상태에서는 겸업 금지, 발명·소스코드 귀속, 경쟁업종 제한을 먼저 점검하고 민감한 내용은 회사 자산과 분리한다.",
    "예비 단계에서 바로 TIPS를 노리기보다, 예비창업/대학/사관학교/초기패키지에서 실적과 추천 네트워크를 쌓은 뒤 투자 연계형으로 이동한다.",
  ],
  timeline: [
    {
      id: "wave-1",
      label: "Wave 1. 재직 중 준비",
      period: "지금 ~ 법인 설립 전",
      focus: "문제 검증, 고객 인터뷰, IP 정리, 사업계획서 공통 자산 만들기",
    },
    {
      id: "wave-2",
      label: "Wave 2. 법인/개인사업 전환 판단",
      period: "예비창업 선정 직전 ~ 초기 사업화",
      focus: "대표자 전환 시점, 사업자 형태, 전업 전환 필요성, 초기 매출/PoC",
    },
    {
      id: "wave-3",
      label: "Wave 3. 투자·스케일업",
      period: "초기 사업화 이후",
      focus: "민간 투자, 운영사 네트워크, TIPS 진입, 후속 패키지 연계",
    },
  ],
  documentTemplates: [
    {
      id: "core-deck",
      title: "공통 사업계획서 코어",
      purpose: "프로그램별 양식이 달라도 재사용할 수 있는 기본 서사와 수치 패키지",
      bullets: [
        "왜 이 문제를 풀어야 하는지와 고객 세그먼트",
        "현재 대안 대비 차별성",
        "6개월/12개월 실행 계획",
        "대표자 역량과 팀 공백",
      ],
    },
    {
      id: "customer-proof",
      title: "고객 검증 팩",
      purpose: "재직 중에도 쌓을 수 있는 증거 자료",
      bullets: [
        "인터뷰 로그와 핵심 인사이트",
        "문제 빈도/비용 추정",
        "초기 관심 고객 리스트",
        "파일럿 또는 유료 전환 가능성 메모",
      ],
    },
    {
      id: "execution-proof",
      title: "실행 증빙 팩",
      purpose: "개발형 창업자 강점을 서류에서 증명하는 자료",
      bullets: [
        "MVP 화면/데모 링크",
        "기술 아키텍처 초안",
        "IP/특허 검토 현황",
        "로드맵과 개발 마일스톤",
      ],
    },
    {
      id: "operator-pack",
      title: "운영사/심사 대응 팩",
      purpose: "사관학교·TIPS·투자심사에서 반복되는 질의를 대비하는 자료",
      bullets: [
        "시장 규모와 진입 전략",
        "규제/겸업/법률 이슈 정리",
        "경쟁사 맵과 포지셔닝",
        "자금 사용 계획과 후속 투자 논리",
      ],
    },
  ],
  programs: [
    {
      slug: "ip-seed",
      name: "IP 디딤돌 / IP창업존",
      operator: "한국발명진흥회·지역지식재산센터",
      order: 1,
      stage: "idea",
      typicalWindow: "상시 또는 지역별 기수제",
      employmentCompatibility: "friendly",
      employmentNote:
        "재직 상태에서도 비교적 접근하기 쉽다. 아이디어 구체화와 특허/브랜드 기초 작업에 적합하다.",
      summary:
        "예비창업자를 대상으로 아이디어 고도화, IP 상담, 교육, 권리화 기초를 지원하는 초기 준비 트랙.",
      positioning:
        "직장 유지 상태에서 가장 부담이 낮은 준비형 프로그램으로, 다른 정부지원사업 서류의 토대를 만드는 역할에 가깝다.",
      strategy: [
        "제품보다 문제 정의와 특허 포인트를 먼저 분리해서 적는다.",
        "회사 업무와 독립된 아이디어 출처·개발 로그를 남긴다.",
        "특허/상표/브랜드 후보를 공통 사업계획서 코어와 함께 정리한다.",
      ],
      documents: [
        {
          id: "ip-seed-concept",
          title: "아이디어 개요 1장",
          description: "문제, 대상 고객, 해결 방식, 차별성만 짧게 정리한 노트",
          recommendedWhen: "now",
        },
        {
          id: "ip-seed-novelty",
          title: "선행기술/경쟁 서비스 메모",
          description: "기존 대안 대비 무엇이 다른지와 회피 포인트를 정리",
          recommendedWhen: "now",
        },
      ],
      actions: [
        {
          id: "ip-seed-action-1",
          title: "지역 IP창업존/센터 일정 확인",
          description: "거주지 또는 생활권 기준 교육·상담 루트를 정한다.",
          horizon: "now",
        },
        {
          id: "ip-seed-action-2",
          title: "특허 포인트 3개로 분해",
          description: "기능 자체보다 데이터, 알고리즘, 워크플로우 포인트를 나눈다.",
          horizon: "next",
        },
      ],
      cautionSignals: [
        "교육 수료만으로 충분하지 않다. 이후 예비창업 패키지용 서사로 이어지게 자료를 재활용해야 한다.",
      ],
      sources: [
        {
          label: "ALLIPS IP 지원사업 메인",
          url: "https://www.allips.or.kr/",
          checkedAt: "2026-03-21",
        },
      ],
    },
    {
      slug: "pre-startup-package",
      name: "예비창업패키지",
      operator: "K-Startup / 창업진흥원 계열 주관기관",
      order: 2,
      stage: "pre-incorporation",
      typicalWindow: "연초 통합공고 이후 주기별 공고 확인",
      employmentCompatibility: "friendly",
      employmentNote:
        "예비 단계에서 재직 중 준비가 가능하지만, 최종 선정 이후 사업 전개 시 겸업·대표자 책임 범위를 다시 점검해야 한다.",
      summary:
        "사업자 등록 전 단계의 예비창업자를 대상으로 사업화 자금과 교육·멘토링을 제공하는 대표적인 예비창업 지원 트랙.",
      positioning:
        "재직 상태에서 가장 먼저 노려볼 메인 루트. 사업계획서와 고객 검증 자료를 가장 정교하게 만들 필요가 있다.",
      strategy: [
        "‘당장 퇴사할지’보다 ‘선정 시 어떤 조건에서 전환할지’를 미리 정리한다.",
        "정부지원형 서류는 기술 설명보다 고객 문제, 시장 검증, 실행 가능성 비중이 높다.",
        "사업비 집행과 정산 리스크를 감안해 개발 범위와 외주 범위를 현실적으로 적는다.",
      ],
      documents: [
        {
          id: "pre-startup-plan",
          title: "사업계획서 메인 초안",
          description: "문제, 고객, 솔루션, BM, 실행계획, 대표자 역량을 담은 기본 서류",
          recommendedWhen: "now",
        },
        {
          id: "pre-startup-proof",
          title: "고객 검증/PoC 증빙",
          description: "인터뷰 로그, 관심 고객, 데모 반응, 파일럿 메모",
          recommendedWhen: "next",
        },
      ],
      actions: [
        {
          id: "pre-startup-action-1",
          title: "공통 사업계획서 코어 작성",
          description: "다른 프로그램에도 재활용할 수 있는 기본 서사를 먼저 만든다.",
          horizon: "now",
        },
        {
          id: "pre-startup-action-2",
          title: "겸업/회사 자산 분리 체크",
          description: "고용계약, 발명 규정, 사이드프로젝트 제한을 확인한다.",
          horizon: "now",
        },
      ],
      cautionSignals: [
        "‘아이템 설명’만 있고 실제 고객 증거가 약하면 서류 경쟁력이 크게 떨어진다.",
        "재직 상태에서는 시간 사용 계획과 전환 시나리오를 질문받을 가능성이 높다.",
      ],
      sources: [
        {
          label: "K-Startup 메인 공지/상담 섹션",
          url: "https://www.k-startup.go.kr/web/main/mainSection4.do",
          checkedAt: "2026-03-21",
        },
      ],
    },
    {
      slug: "startup-centered-university",
      name: "창업중심대학 예비창업 트랙",
      operator: "K-Startup / 창업중심대학 주관 대학",
      order: 3,
      stage: "pre-incorporation",
      typicalWindow: "권역·유형별 연간 공고 확인",
      employmentCompatibility: "friendly",
      employmentNote:
        "생애최초 청년 예비창업형 등 세부 유형에 따라 연령·권역 조건이 있으므로 재직 여부보다 지원 유형 일치 여부가 먼저다.",
      summary:
        "권역, 산업, 청년·생애최초 조건 등 세부 유형에 맞춰 예비창업자와 초기창업기업을 지원하는 대학 거점형 사업.",
      positioning:
        "예비창업패키지와 유사하지만 권역·연령·특화산업과의 정합성이 중요하다. 네트워크와 대학 연계 자원이 장점이다.",
      strategy: [
        "거주지/활동권역과 신청 가능 대학을 먼저 좁힌다.",
        "생애최초·청년형이면 대표자 스토리와 학습 곡선, 실행력 프레임을 강조한다.",
        "대학 특화 산업과 연결되는 문제 정의를 만든다.",
      ],
      documents: [
        {
          id: "csu-fit",
          title: "권역·유형 적합성 메모",
          description: "어느 대학의 어떤 트랙에 왜 맞는지를 정리한 한 장짜리 메모",
          recommendedWhen: "now",
        },
        {
          id: "csu-story",
          title: "대표자 성장 스토리",
          description: "생애최초/청년 예비창업형에 맞는 동기, 학습, 실행력 내러티브",
          recommendedWhen: "next",
        },
      ],
      actions: [
        {
          id: "cusu-action-1",
          title: "지원 가능한 대학 3곳 추리기",
          description: "권역, 연령, 산업 연계 조건으로 후보를 좁힌다.",
          horizon: "now",
        },
        {
          id: "cusu-action-2",
          title: "예창패 서류와 차별화 포인트 정리",
          description: "대학 네트워크·권역 연계성 강조 문장을 따로 만든다.",
          horizon: "next",
        },
      ],
      cautionSignals: [
        "예비창업패키지와 거의 같은 서류를 내면 대학 트랙의 적합성이 약해 보일 수 있다.",
      ],
      sources: [
        {
          label: "K-Startup 창업중심대학 교육/안내 예시",
          url: "https://www.k-startup.go.kr/edu/home/package/NPTYPE_001/NPTYPE_00101/PKG_0000002968/detail",
          checkedAt: "2026-03-21",
        },
      ],
    },
    {
      slug: "pre-startup-corporate-spinout",
      name: "예비창업패키지 사내벤처 특화",
      operator: "K-Startup / 사내벤처 특화 운영기관",
      order: 4,
      stage: "pre-incorporation",
      typicalWindow: "연간 공고 확인",
      employmentCompatibility: "conditional",
      employmentNote:
        "현 직장과의 연계가 있는 경우만 현실적인 루트다. 회사 승인, IP 귀속, 분사 조건을 먼저 확인해야 한다.",
      summary:
        "사내벤처팀 또는 분사 준비팀을 대상으로 하는 예비창업패키지 특화 유형.",
      positioning:
        "현재 회사와 직접 연결 가능한 아이템이면 강력하지만, 그렇지 않다면 일반 예비창업 패키지보다 준비 난도가 높다.",
      strategy: [
        "현 직장 기술/고객/자산을 활용한다면 귀속 문제를 서류보다 먼저 정리한다.",
        "사내 승인 여부와 분사 시점, 회사 협력 구조를 문서로 남긴다.",
      ],
      documents: [
        {
          id: "spinout-approval",
          title: "사내벤처 승인/분사 조건 메모",
          description: "회사와 합의된 범위, IP, 겸업, 분사 일정 정리",
          recommendedWhen: "now",
        },
      ],
      actions: [
        {
          id: "spinout-action-1",
          title: "사내벤처 해당 여부 판단",
          description: "회사와 공식 프로그램 또는 승인 루트가 있는지 확인한다.",
          horizon: "now",
        },
      ],
      cautionSignals: [
        "회사 자산을 기반으로 하면서 승인 문서가 없으면 오히려 리스크가 커진다.",
      ],
      sources: [
        {
          label: "K-Startup 카드뉴스/상담 예시",
          url: "https://www.k-startup.go.kr/web/main/mainSection4.do",
          checkedAt: "2026-03-21",
        },
      ],
    },
    {
      slug: "young-entrepreneur-academy",
      name: "청년창업사관학교",
      operator: "중소벤처기업진흥공단",
      order: 5,
      stage: "incorporation",
      typicalWindow: "연초 모집 공고 중심",
      employmentCompatibility: "transition-required",
      employmentNote:
        "기본적으로 창업기업 대표 대상이어서, 재직을 유지한 채 준비는 가능하지만 실제 입교·집행 단계에서는 전업 전환 판단이 필요하다.",
      summary:
        "만 39세 이하, 창업 후 3년 이내 대표자를 대상으로 교육·코칭·사업화 전 과정을 패키지로 지원하는 대표 사관학교형 프로그램.",
      positioning:
        "전업 전환을 본격적으로 고민할 시점의 메인 트랙. 단순 아이디어 단계보다 실제 사업자 운영 준비가 필요하다.",
      strategy: [
        "법인/개인사업자 전환 시점과 대표자 체계를 먼저 설계한다.",
        "기술창업·제조·지식서비스 강점과 대표자 실행력을 전면에 둔다.",
        "재직 중이라면 선정 이후 역할 전환 계획을 미리 적어둔다.",
      ],
      documents: [
        {
          id: "academy-business",
          title: "사업자 전환 계획서",
          description: "대표자, 지분, 전환 시기, 주요 일정, 자금 집행 계획",
          recommendedWhen: "next",
        },
        {
          id: "academy-demo",
          title: "MVP/개발 증빙",
          description: "기술창업자로서 실행력을 보여주는 데모와 화면, 기술 구조",
          recommendedWhen: "next",
        },
      ],
      actions: [
        {
          id: "academy-action-1",
          title: "전업 전환 조건 정의",
          description: "매출, 투자, 선정 여부 중 어떤 조건에서 직장 전환할지 명확히 적는다.",
          horizon: "next",
        },
      ],
      cautionSignals: [
        "재직 유지 상태로는 프로그램 운영 요구와 충돌할 수 있어 전환 시나리오가 필요하다.",
      ],
      sources: [
        {
          label: "청년창업사관학교 사업소개",
          url: "https://start.kosmes.or.kr/yh_ysi010_001.do",
          checkedAt: "2026-03-21",
        },
      ],
    },
    {
      slug: "initial-startup-package",
      name: "초기창업패키지",
      operator: "K-Startup / 창업진흥원 계열 주관기관",
      order: 6,
      stage: "post-incorporation",
      typicalWindow: "창업 3년 이내 대상 공고 확인",
      employmentCompatibility: "transition-required",
      employmentNote:
        "이미 사업자를 가진 초기 창업기업 대표 단계가 중심이므로, 직장 유지보다 창업 운영 체제로 넘어간 뒤 검토하는 것이 현실적이다.",
      summary:
        "초기 창업기업의 시장 진입, 사업화, 판로 확대에 초점을 둔 후속 패키지.",
      positioning:
        "예비 단계가 아니라 법인/사업자를 운영하기 시작한 뒤 다음 성장 자금으로 이어붙이는 트랙.",
      strategy: [
        "예비 단계에서 만든 사업계획서를 실제 매출/고객지표 중심으로 업데이트한다.",
        "정부지원사업 이력과 집행 경험을 정리해 후속 지원의 신뢰도를 높인다.",
      ],
      documents: [
        {
          id: "initial-metrics",
          title: "초기 성과 대시보드",
          description: "매출, PoC, 계약, 사용자 반응, KPI 변화를 한 장에 정리",
          recommendedWhen: "later",
        },
      ],
      actions: [
        {
          id: "initial-action-1",
          title: "예비 단계 산출물 재정리",
          description: "고객 검증 자료를 매출/실행 중심 자료로 업데이트한다.",
          horizon: "later",
        },
      ],
      cautionSignals: [
        "직장 유지 전략 페이지의 직접 목표라기보다 전환 이후 후속 루트로 봐야 한다.",
      ],
      sources: [
        {
          label: "K-Startup 메인",
          url: "https://www.k-startup.go.kr/",
          checkedAt: "2026-03-21",
        },
      ],
    },
    {
      slug: "tips",
      name: "TIPS",
      operator: "팁스타운 / TIPS 운영사 네트워크",
      order: 7,
      stage: "investment-ready",
      typicalWindow: "운영사 투자심사는 상시, 추천 이후 정부 연계",
      employmentCompatibility: "transition-required",
      employmentNote:
        "재직 중 정보 수집과 운영사 네트워킹은 가능하지만, 실제 진입은 투자·추천·창업팀 체계가 갖춰진 뒤에 보는 것이 맞다.",
      summary:
        "운영사의 투자와 추천을 전제로 R&D 및 사업화 자금을 연계하는 민간투자주도형 기술창업 지원 프로그램.",
      positioning:
        "예비 단계의 직접 목표가 아니라, 예비/초기 프로그램과 고객·투자 트랙션을 쌓은 뒤 들어가는 상위 단계.",
      strategy: [
        "정부지원금 신청 관점이 아니라 운영사가 왜 투자·추천해야 하는지를 먼저 설계한다.",
        "문제-시장-팀-기술 우위뿐 아니라 후속투자 그림까지 같이 준비한다.",
        "예비창업 단계에서는 TIPS 운영사 네트워크를 미리 관찰하고, 당장 지원보다 소개 가능한 멘토/투자 루트를 쌓는다.",
      ],
      documents: [
        {
          id: "tips-deck",
          title: "투자자용 덱",
          description: "시장, 팀, 기술 우위, 성장 가설, 자금 사용 계획을 담은 덱",
          recommendedWhen: "later",
        },
        {
          id: "tips-rnd",
          title: "기술 로드맵/R&D 메모",
          description: "왜 기술 과제가 필요한지와 2~3년 로드맵을 설명하는 문서",
          recommendedWhen: "later",
        },
      ],
      actions: [
        {
          id: "tips-action-1",
          title: "운영사 후보군 관찰",
          description: "도메인과 맞는 운영사, 포트폴리오, 파트너를 정리한다.",
          horizon: "later",
        },
      ],
      cautionSignals: [
        "운영사 투자·추천이 선행 조건이라 일반 정부지원사업처럼 단독 지원하는 구조가 아니다.",
      ],
      sources: [
        {
          label: "TIPS 소개/FAQ",
          url: "https://www.jointips.or.kr/about.php",
          checkedAt: "2026-03-21",
        },
      ],
    },
  ],
};
