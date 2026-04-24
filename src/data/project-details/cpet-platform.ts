import type { ProjectDetail } from "@/types/project-detail";

export const cpetPlatform: ProjectDetail = {
  slug: "cpet-platform",
  vertical: "cycling",
  verticalColor: "#10B981",
  status: "active",
  title: {
    en: "CPET Platform",
    ko: "CPET 플랫폼",
  },
  tagline: {
    en: "Multi-source CPET analysis platform with INSCYD intake, cohort analytics, and research infrastructure",
    ko: "INSCYD 인테이크, 코호트 분석, 연구 인프라를 갖춘 멀티소스 CPET 분석 플랫폼",
  },
  heroImage: "/projects/cpet-platform/subjects.webp",

  painPoints: [
    {
      icon: "🗃️",
      title: {
        en: "Test data stayed isolated by source and by session",
        ko: "검사 데이터가 소스별·세션별로 고립돼 있었다",
      },
      description: {
        en: "COSMED exports, FIT files, ZWO plans, and INSCYD PDFs lived in separate tools with no shared model. Connecting a subject's lab test to their training context — or comparing one session against another — meant re-assembling context from scratch every time.",
        ko: "COSMED 내보내기, FIT 파일, ZWO 계획, INSCYD PDF가 각각 다른 도구에 저장됐고 공유 모델이 없었습니다. 피험자의 랩 테스트 결과를 훈련 맥락과 연결하거나, 두 세션을 비교하려면 매번 처음부터 맥락을 다시 조립해야 했습니다.",
      },
    },
    {
      icon: "📊",
      title: {
        en: "No cohort-level view of readiness or trends",
        ko: "코호트 수준에서 준비도나 추세를 볼 방법이 없었다",
      },
      description: {
        en: "Each report answered one subject's question. There was no way to read across the cohort — who had usable current-state data, who had enough longitudinal history to interpret trends, or where the group's VO2max and FatMax distribution stood at any given time.",
        ko: "각 리포트는 한 피험자의 질문에만 답했습니다. 코호트 전체를 읽는 방법이 없었습니다 — 현재 상태 데이터가 충분한 피험자가 누구인지, 변화 추세 해석이 가능한 피험자가 얼마나 되는지, 특정 시점의 VO2max·FatMax 분포가 어떤지를 파악할 수 없었습니다.",
      },
    },
    {
      icon: "🔬",
      title: {
        en: "INSCYD results lived outside the platform data model",
        ko: "INSCYD 결과가 플랫폼 데이터 모델 밖에 존재했다",
      },
      description: {
        en: "INSCYD PDFs were a rich source — VLamax, FatMax, body composition, training zone tables — but they had no path into the same workspace, snapshot, and feature-set model used for COSMED data. Interpretation had to be done manually, disconnected from the cohort.",
        ko: "INSCYD PDF는 VLamax, FatMax, 체성분, 훈련 구역 표 등 풍부한 소스였지만, COSMED 데이터에 사용되는 워크스페이스·snapshot·feature set 모델로 편입되는 경로가 없었습니다. 해석은 코호트와 단절된 상태에서 수동으로 이뤄졌습니다.",
      },
    },
  ],

  beforeAfter: [
    {
      before: {
        en: "Five source types processed in separate tools with no shared subject model",
        ko: "다섯 가지 소스 타입을 공유 피험자 모델 없이 각기 다른 도구로 처리",
      },
      after: {
        en: "Single structured intake flow with protocol context, source tags, and fingerprint — for all five source types including INSCYD PDF",
        ko: "프로토콜 컨텍스트, 소스 태그, 지문 포함 단일 구조화 인테이크 흐름 — INSCYD PDF 포함 다섯 가지 소스 타입 전체 지원",
      },
    },
    {
      before: {
        en: "Report generation answered one question per session, with no path to aggregation",
        ko: "리포트 생성이 세션별로 단 하나의 질문에만 답하며 집계로 이어지는 경로가 없었다",
      },
      after: {
        en: "Cohort analytics dashboard shows subjects with current state, repeat-measurement readiness, and VO2max/FatMax distribution across the full cohort",
        ko: "코호트 분석 대시보드가 현재 상태 데이터 보유 피험자, 반복 측정 준비도, 코호트 전체의 VO2max·FatMax 분포를 표시",
      },
    },
    {
      before: {
        en: "INSCYD PDFs, research notes, and cohort validation lived in separate places outside the platform",
        ko: "INSCYD PDF, 연구 노트, 코호트 검증이 플랫폼 밖 별도 장소에 흩어져 있었다",
      },
      after: {
        en: "Integrated platform: INSCYD standalone flow, protected research notes catalog, manage explorers for snapshots, feature sets, and duplicate detection",
        ko: "통합 플랫폼: INSCYD 독립 흐름, 보호된 연구 노트 카탈로그, 스냅숏·feature set·중복 탐지를 위한 관리 탐색기",
      },
    },
  ],

  approach: {
    title: {
      en: "Multi-source intake with protocol context, dual analysis paths, and a cohort analytics layer",
      ko: "프로토콜 컨텍스트를 갖춘 멀티소스 인테이크, 이중 분석 경로, 코호트 분석 레이어",
    },
    description: {
      en: "The platform is built on FastAPI, Jinja2, and HTMX with two SQLite layers — a central platform database and per-workspace analysis databases. File submissions carry protocol context (test purpose, target outputs, block intents) and are routed to either the COSMED pipeline or the INSCYD standalone flow. Both paths produce durable artifacts: workspace analysis tables, published HTML reports, and subject-linked metric snapshots. On top of that, a cohort analytics dashboard aggregates readiness KPIs and per-subject positioning widgets, a protected notes catalog serves research reference material, and a manage screen exposes snapshot and feature-set explorers for QA and experiment preparation.",
      ko: "플랫폼은 FastAPI, Jinja2, HTMX 위에 두 개의 SQLite 레이어로 구축됩니다 — 중앙 플랫폼 DB와 워크스페이스별 분석 DB. 파일 제출은 프로토콜 컨텍스트(검사 목적, 목표 출력값, 블럭 의도)를 담고 COSMED 파이프라인 또는 INSCYD 독립 흐름으로 라우팅됩니다. 두 경로 모두 영속 아티팩트를 생성합니다: 워크스페이스 분석 테이블, 발행 HTML 리포트, 피험자 연결 metric snapshot. 그 위에서 코호트 분석 대시보드가 준비도 KPI와 피험자별 positioning widget을 집계하고, 보호된 노트 카탈로그가 연구 참고 자료를 제공하며, 관리 화면이 QA와 실험 준비를 위한 snapshot·feature set 탐색기를 노출합니다.",
    },
  },

  introduction: {
    badge: {
      en: "Current CPET Platform v2 — accurate as of the active codebase",
      ko: "현재 CPET Platform v2 — 활성 코드베이스 기준으로 정확하게 정리",
    },
    title: {
      en: "One platform for five source types, dual analysis paths, and cohort-level readiness",
      ko: "다섯 가지 소스 타입, 이중 분석 경로, 코호트 수준 준비도를 위한 단일 플랫폼",
    },
    subtitle: {
      en: "The platform handles five source types — COSMED Excel, FIT, ZWO, lactate CSV, and INSCYD PDF — through a structured intake model with protocol context tagging. INSCYD PDFs flow through a dedicated standalone pipeline that extracts VLamax, FatMax, body composition, and training zones directly into the platform's subject and snapshot model. A cohort analytics dashboard reads across all subjects to surface readiness state, repeat-measurement coverage, and cohort distribution. Research notes and manage-screen explorers complete the research infrastructure layer.",
      ko: "플랫폼은 COSMED Excel, FIT, ZWO, 젖산 CSV, INSCYD PDF 등 다섯 가지 소스 타입을 프로토콜 컨텍스트 태깅을 포함한 구조화 인테이크 모델로 처리합니다. INSCYD PDF는 전용 독립 파이프라인을 통해 VLamax, FatMax, 체성분, 훈련 구역을 플랫폼의 피험자·snapshot 모델로 직접 추출합니다. 코호트 분석 대시보드는 모든 피험자를 가로질러 준비 상태, 반복 측정 커버리지, 코호트 분포를 제시합니다. 연구 노트와 관리 화면 탐색기가 연구 인프라 레이어를 완성합니다.",
    },
    pillars: [
      {
        label: { en: "Why 01", ko: "Why 01" },
        title: {
          en: "INSCYD needed a dedicated pipeline, not manual extraction",
          ko: "INSCYD에는 수동 추출이 아닌 전용 파이프라인이 필요했다",
        },
        description: {
          en: "INSCYD PDFs carry structured data — athlete identity, VLamax, VO2max, FatMax power, body composition, and full training zone tables. The platform now parses that structure directly, optionally combines it with a FIT file and ZWO plan, and generates a linked interpretation report in the same catalog as COSMED-derived outputs.",
          ko: "INSCYD PDF에는 선수 정보, VLamax, VO2max, FatMax 파워, 체성분, 전체 훈련 구역 표 등 구조화된 데이터가 담겨 있습니다. 플랫폼은 이제 그 구조를 직접 파싱하고, 선택적으로 FIT 파일과 ZWO 계획을 결합하며, COSMED 기반 출력물과 동일한 카탈로그에 연결된 해석 리포트를 생성합니다.",
        },
        stat: {
          en: "PDF → VLamax / FatMax / body composition → report",
          ko: "PDF → VLamax / FatMax / 체성분 → 리포트",
        },
      },
      {
        label: { en: "Why 02", ko: "Why 02" },
        title: {
          en: "Cohort readiness requires a cross-subject view, not per-report reads",
          ko: "코호트 준비도에는 리포트별 조회가 아닌 피험자 횡단 뷰가 필요하다",
        },
        description: {
          en: "The dashboard analytics layer was built around one question: who in this cohort has usable current-state data, and who has enough longitudinal history to interpret change? KPI cards, cohort map distribution, and per-subject drill-in panels answer that question without leaving the platform or opening individual reports.",
          ko: "대시보드 분석 레이어는 하나의 질문을 중심으로 구축됐습니다: 이 코호트에서 사용 가능한 현재 상태 데이터를 보유한 피험자는 누구이며, 변화를 해석할 만한 종적 이력이 충분한 피험자는 누구인가? KPI 카드, 코호트 맵 분포, 피험자별 드릴-인 패널이 플랫폼을 벗어나거나 개별 리포트를 열지 않고도 그 질문에 답합니다.",
        },
        stat: {
          en: "Cohort KPIs + distribution map + subject drill-in",
          ko: "코호트 KPI + 분포 맵 + 피험자 드릴-인",
        },
      },
      {
        label: { en: "Why 03", ko: "Why 03" },
        title: {
          en: "Research reference and QA infrastructure needed to live inside the platform",
          ko: "연구 참고 자료와 QA 인프라를 플랫폼 안에 통합해야 했다",
        },
        description: {
          en: "Research notes — clinical references, protocol reviews, lactate physiology papers — were managed outside the platform. Snapshot and feature-set validation had no persistent explorer view. Bringing both inside the platform as protected surfaces means analysis, research context, and QA operate within the same operational model.",
          ko: "임상 참고 문헌, 프로토콜 리뷰, 젖산 생리학 논문 등 연구 노트가 플랫폼 밖에서 관리됐습니다. Snapshot·feature set 검증에는 영속 탐색기 뷰가 없었습니다. 둘 모두를 보호된 표면으로 플랫폼 안에 통합하면 분석, 연구 맥락, QA가 동일한 운영 모델 안에서 이루어집니다.",
        },
        stat: {
          en: "Notes catalog + snapshot/feature explorer + duplicate detection",
          ko: "노트 카탈로그 + snapshot/feature 탐색기 + 중복 탐지",
        },
      },
    ],
    layers: [
      {
        label: { en: "Intake Layer", ko: "인테이크 레이어" },
        description: {
          en: "Structured submission intake with protocol context, source tagging, and submission fingerprinting — unified for all five source types.",
          ko: "프로토콜 컨텍스트, 소스 태깅, 제출 지문을 갖춘 구조화 제출 인테이크 — 다섯 가지 소스 타입 전체에 통합 적용.",
        },
        items: [
          {
            title: { en: "Protocol context tagging", ko: "프로토콜 컨텍스트 태깅" },
            description: {
              en: "Each upload carries test purpose (FatMax, thresholds, VO2max, FTP check, mixed), target outputs, and block intents — preserving the clinical question alongside the raw files.",
              ko: "각 업로드는 검사 목적(FatMax, 역치, VO2max, FTP 확인, 복합), 목표 출력값, 블럭 의도를 함께 저장해 원본 파일 옆에 임상 질문을 보존합니다.",
            },
            meta: { en: "protocol_context.py", ko: "protocol_context.py" },
          },
          {
            title: { en: "Submission fingerprinting and dedup", ko: "제출 지문 및 중복 제거" },
            description: {
              en: "File-content hashing produces a deterministic fingerprint per submission. Duplicate candidates are clustered and flagged in the manage screen for review before pipeline resources are spent.",
              ko: "파일 내용 해싱이 제출별 결정론적 지문을 생성합니다. 중복 후보는 관리 화면에서 클러스터링되고 플래그 표시되어, 파이프라인 리소스를 소모하기 전에 검토할 수 있습니다.",
            },
            meta: { en: "submission fingerprint", ko: "제출 지문" },
          },
        ],
      },
      {
        label: { en: "Pipeline Layer", ko: "파이프라인 레이어" },
        description: {
          en: "Two parallel analysis paths: the COSMED pipeline for metabolic test data, and the INSCYD standalone flow for PDF-sourced metrics.",
          ko: "두 개의 병렬 분석 경로: 대사 검사 데이터를 위한 COSMED 파이프라인과 PDF 기반 지표를 위한 INSCYD 독립 흐름.",
        },
        items: [
          {
            title: { en: "COSMED + FIT + ZWO + lactate pipeline", ko: "COSMED + FIT + ZWO + 젖산 파이프라인" },
            description: {
              en: "Parses COSMED Excel, FIT breath-by-breath segments, ZWO intervals, and lactate CSV into a shared analysis.db, then generates protocol-aware HTML report artifacts.",
              ko: "COSMED Excel, FIT 호흡별 세그먼트, ZWO 인터벌, 젖산 CSV를 공유 analysis.db로 파싱한 뒤 프로토콜 인식 HTML 리포트 아티팩트를 생성합니다.",
            },
            meta: { en: "pipeline/parsers + analysis.py", ko: "pipeline/parsers + analysis.py" },
          },
          {
            title: { en: "INSCYD standalone flow", ko: "INSCYD 독립 흐름" },
            description: {
              en: "inscyd_parser.py extracts VLamax, VO2max, FatMax, body composition, and training zones from the INSCYD PDF. inscyd_workspace.py optionally fuses a FIT session and ZWO plan. inscyd_report.py renders the interpretation report.",
              ko: "inscyd_parser.py가 INSCYD PDF에서 VLamax, VO2max, FatMax, 체성분, 훈련 구역을 추출합니다. inscyd_workspace.py가 선택적으로 FIT 세션과 ZWO 계획을 결합합니다. inscyd_report.py가 해석 리포트를 렌더링합니다.",
            },
            meta: { en: "inscyd_parser → inscyd_workspace → inscyd_report", ko: "inscyd_parser → inscyd_workspace → inscyd_report" },
          },
        ],
      },
      {
        label: { en: "Platform Layer", ko: "플랫폼 레이어" },
        description: {
          en: "The central platform database connects users, subjects, submissions, jobs, and the published report catalog. Dashboard and notes surfaces serve authenticated users.",
          ko: "중앙 플랫폼 DB가 사용자, 피험자, 제출물, job, 발행 리포트 카탈로그를 연결합니다. 대시보드와 노트 표면은 인증된 사용자에게 제공됩니다.",
        },
        items: [
          {
            title: { en: "Cohort analytics dashboard", ko: "코호트 분석 대시보드" },
            description: {
              en: "Two tabs: an analytics overview showing cohort readiness KPIs, metric coverage, cohort distribution, and per-subject drill-in; and a reports tab with the full published catalog.",
              ko: "두 개 탭: 코호트 준비도 KPI, 지표 커버리지, 코호트 분포, 피험자별 드릴-인을 보여주는 분석 개요 탭과 전체 발행 카탈로그를 담은 리포트 탭.",
            },
            meta: { en: "/dashboard", ko: "/dashboard" },
          },
          {
            title: { en: "Protected research notes catalog", ko: "보호된 연구 노트 카탈로그" },
            description: {
              en: "Markdown notes — clinical references, protocol reviews, physiology papers — rendered as protected HTML pages with CSP headers. Accessible only to authenticated users with notes-role access.",
              ko: "임상 참고 문헌, 프로토콜 리뷰, 생리학 논문 등 마크다운 노트를 CSP 헤더가 적용된 보호 HTML 페이지로 렌더링합니다. 노트 역할 접근 권한이 있는 인증 사용자만 열람 가능합니다.",
            },
            meta: { en: "/notes", ko: "/notes" },
          },
        ],
      },
      {
        label: { en: "Research Layer", ko: "연구 레이어" },
        description: {
          en: "The manage screen exposes snapshot and feature-set explorers, duplicate detection clusters, and subject linkage tooling for validation and experiment preparation.",
          ko: "관리 화면은 검증과 실험 준비를 위한 snapshot·feature set 탐색기, 중복 탐지 클러스터, 피험자 연결 도구를 노출합니다.",
        },
        items: [
          {
            title: { en: "Snapshot and feature-set explorers", ko: "Snapshot·feature set 탐색기" },
            description: {
              en: "Snapshot Explorer normalizes submission metrics into subject-centered rows with export (JSON/CSV). Feature Sets Explorer builds endurance-core and longitudinal-delta experiment rows without re-parsing reports.",
              ko: "Snapshot Explorer가 제출 지표를 피험자 중심 row로 정규화하고 JSON/CSV 내보내기를 제공합니다. Feature Sets Explorer는 리포트 재파싱 없이 endurance-core·longitudinal-delta 실험 row를 구성합니다.",
            },
            meta: { en: "subject_metric_snapshots + subject_feature_sets", ko: "subject_metric_snapshots + subject_feature_sets" },
          },
          {
            title: { en: "Duplicate detection and submission management", ko: "중복 탐지 및 제출 관리" },
            description: {
              en: "Submissions are fingerprinted on intake. Duplicate clusters are surfaced in the manage screen with group keys, source signatures, and inline review actions. User role management and subject linkage live alongside.",
              ko: "제출은 인테이크 시 지문이 생성됩니다. 중복 클러스터는 그룹 키, 소스 서명, 인라인 검토 액션과 함께 관리 화면에 노출됩니다. 사용자 역할 관리와 피험자 연결 도구가 함께 배치됩니다.",
            },
            meta: { en: "/manage → duplicates tab", ko: "/manage → duplicates 탭" },
          },
        ],
      },
    ],
    capabilities: [
      {
        title: {
          en: "INSCYD PDF intake and interpretation report",
          ko: "INSCYD PDF 인테이크 및 해석 리포트",
        },
        description: {
          en: "The INSCYD standalone flow parses the PDF directly — VLamax, VO2max, FatMax power and oxidation rate, body composition, and training zone table — optionally fuses a FIT file and ZWO plan, then generates a linked interpretation report published to the same catalog as COSMED-derived outputs.",
          ko: "INSCYD 독립 흐름이 PDF를 직접 파싱합니다 — VLamax, VO2max, FatMax 파워·산화율, 체성분, 훈련 구역 표 — 선택적으로 FIT 파일과 ZWO 계획을 결합하고, COSMED 기반 출력물과 동일한 카탈로그에 발행되는 연결 해석 리포트를 생성합니다.",
        },
        image: "/projects/cpet-platform/subject-tests.webp",
      },
      {
        title: {
          en: "Cohort analytics dashboard with subject drill-in",
          ko: "피험자 드릴-인을 갖춘 코호트 분석 대시보드",
        },
        description: {
          en: "The analytics tab shows cohort KPIs (subjects with usable current-state data, subjects with enough longitudinal history for trend interpretation), metric coverage for VO2max and FatMax, anonymized cohort distribution, and per-subject positioning widgets with current state and trend panels.",
          ko: "분석 탭은 코호트 KPI(사용 가능한 현재 상태 데이터 보유 피험자, 추세 해석이 가능한 종적 이력 보유 피험자), VO2max·FatMax 지표 커버리지, 익명화된 코호트 분포, 현재 상태·추세 패널을 갖춘 피험자별 positioning widget을 표시합니다.",
        },
        image: "/projects/cpet-platform/admin.webp",
      },
      {
        title: {
          en: "Protocol-aware structured upload",
          ko: "프로토콜 인식 구조화 업로드",
        },
        description: {
          en: "Each submission captures the clinical question alongside the raw files: test purpose (FatMax, threshold, VO2max, FTP check, or mixed), target output metrics, and per-block intents for interval sessions. This protocol context drives report emphasis and is preserved in the workspace for reruns.",
          ko: "각 제출은 원본 파일과 함께 임상 질문을 저장합니다: 검사 목적(FatMax, 역치, VO2max, FTP 확인, 복합), 목표 출력 지표, 인터벌 세션의 블럭별 의도. 이 프로토콜 컨텍스트가 리포트 강조점을 결정하고 재실행을 위해 워크스페이스에 보존됩니다.",
        },
        image: "/projects/cpet-platform/subject-detail.webp",
      },
      {
        title: {
          en: "Research notes and manage-screen explorers",
          ko: "연구 노트와 관리 화면 탐색기",
        },
        description: {
          en: "A protected notes catalog renders markdown reference material as secure HTML pages inside the platform. The manage screen exposes snapshot and feature-set explorers with comparison views and CSV/JSON export, duplicate clusters for submission review, and user role and subject linkage management.",
          ko: "보호된 노트 카탈로그가 마크다운 참고 자료를 플랫폼 내 안전한 HTML 페이지로 렌더링합니다. 관리 화면은 비교 뷰·CSV/JSON 내보내기를 갖춘 snapshot·feature set 탐색기, 제출 검토용 중복 클러스터, 사용자 역할·피험자 연결 관리를 노출합니다.",
        },
        image: "/projects/cpet-platform/cohort.webp",
      },
    ],
    screenshots: [
      {
        title: { en: "Cohort analytics overview", ko: "코호트 분석 개요" },
        description: {
          en: "The analytics tab opens with cohort readiness KPIs, VO2max and FatMax coverage meters, and an anonymized distribution summary — giving a cross-subject view without opening individual reports.",
          ko: "분석 탭은 코호트 준비도 KPI, VO2max·FatMax 커버리지 미터, 익명화된 분포 요약으로 열려 개별 리포트를 열지 않고 피험자 횡단 뷰를 제공합니다.",
        },
        image: "/projects/cpet-platform/admin.webp",
      },
      {
        title: { en: "Subject drill-in panel", ko: "피험자 드릴-인 패널" },
        description: {
          en: "Selecting a subject expands current-state cards (VO2max, FatMax, LT1), cohort positioning widgets with band labels, and a timeline panel showing repeat-measurement trend state.",
          ko: "피험자를 선택하면 현재 상태 카드(VO2max, FatMax, LT1), 밴드 레이블이 있는 코호트 positioning widget, 반복 측정 추세 상태를 보여주는 타임라인 패널이 펼쳐집니다.",
        },
        image: "/projects/cpet-platform/subjects.webp",
      },
      {
        title: { en: "Subject profile and trends", ko: "피험자 프로필과 추세" },
        description: {
          en: "User profiles surface linked subjects, fitness trend summaries, and body composition history — providing a persistent follow-up layer beyond one-time report viewing.",
          ko: "사용자 프로필은 연결된 피험자, 피트니스 추세 요약, 체성분 이력을 제공해 일회성 리포트 열람을 넘어서는 지속적인 후속 분석 레이어를 만듭니다.",
        },
        image: "/projects/cpet-platform/subject-detail.webp",
      },
      {
        title: { en: "Manage explorers and duplicate clusters", ko: "관리 탐색기와 중복 클러스터" },
        description: {
          en: "The manage screen provides snapshot explorer with export, feature-set explorer with comparison views, duplicate clusters for submission review, and user role and subject linkage controls.",
          ko: "관리 화면은 내보내기가 있는 snapshot 탐색기, 비교 뷰가 있는 feature set 탐색기, 제출 검토용 중복 클러스터, 사용자 역할·피험자 연결 제어를 제공합니다.",
        },
        image: "/projects/cpet-platform/cohort.webp",
      },
    ],
    roadmap: [
      {
        label: { en: "Active", ko: "Active" },
        title: {
          en: "Full platform runtime",
          ko: "전체 플랫폼 런타임",
        },
        description: {
          en: "INSCYD standalone flow, COSMED/FIT/ZWO/lactate pipeline, cohort analytics dashboard, protected notes catalog, and manage-screen explorers are all operational under the current v2 structure.",
          ko: "INSCYD 독립 흐름, COSMED/FIT/ZWO/젖산 파이프라인, 코호트 분석 대시보드, 보호된 노트 카탈로그, 관리 화면 탐색기가 현재 v2 구조 아래 모두 운영 중입니다.",
        },
        status: "active",
      },
      {
        label: { en: "Planned", ko: "Planned" },
        title: {
          en: "Validation harness and real CPET golden corpus",
          ko: "검증 harness와 실제 CPET 골든 코퍼스",
        },
        description: {
          en: "Synthetic population seeding, end-to-end readiness QA harnesses, and real CPET golden corpus intake are being framed to validate the full pipeline against known reference outputs.",
          ko: "synthetic population seeding, 엔드투엔드 readiness QA harness, 실제 CPET 골든 코퍼스 인테이크가 알려진 참조 출력값에 대해 전체 파이프라인을 검증하기 위해 설계되고 있습니다.",
        },
        status: "planned",
      },
      {
        label: { en: "Future", ko: "Future" },
        title: {
          en: "Cohort clustering and surrogate modeling",
          ko: "코호트 클러스터링과 surrogate modeling",
        },
        description: {
          en: "The snapshot and feature-set layers provide a stable base for future clustering experiments, surrogate physiological models, and broader physiology research workflows on top of the existing subject-centered read models.",
          ko: "snapshot·feature set 레이어는 기존 피험자 중심 read model 위에서 향후 클러스터링 실험, surrogate 생리 모델, 더 넓은 생리학 연구 워크플로우를 위한 안정적인 기반을 제공합니다.",
        },
        status: "future",
      },
    ],
  },

  features: [
    {
      title: {
        en: "INSCYD PDF to linked interpretation report",
        ko: "INSCYD PDF에서 연결 해석 리포트까지",
      },
      description: {
        en: "The dedicated INSCYD flow parses VLamax, VO2max, FatMax, body composition, and training zones from the PDF, optionally fuses a FIT file and ZWO plan, and publishes an interpretation report that links back into the platform's subject and snapshot model.",
        ko: "전용 INSCYD 흐름이 PDF에서 VLamax, VO2max, FatMax, 체성분, 훈련 구역을 파싱하고, 선택적으로 FIT 파일과 ZWO 계획을 결합하며, 플랫폼의 피험자·snapshot 모델로 연결되는 해석 리포트를 발행합니다.",
      },
      image: "/projects/cpet-platform/subject-tests.webp",
    },
    {
      title: {
        en: "Cohort analytics dashboard with positioning widgets",
        ko: "positioning widget을 갖춘 코호트 분석 대시보드",
      },
      description: {
        en: "The analytics view aggregates cohort readiness KPIs, VO2max and FatMax metric coverage, and an anonymized cohort distribution map. Selecting a subject expands current state cards, cohort positioning band labels, and a longitudinal trend panel.",
        ko: "분석 뷰가 코호트 준비도 KPI, VO2max·FatMax 지표 커버리지, 익명화된 코호트 분포 맵을 집계합니다. 피험자를 선택하면 현재 상태 카드, 코호트 positioning 밴드 레이블, 종적 추세 패널이 펼쳐집니다.",
      },
      image: "/projects/cpet-platform/admin.webp",
    },
    {
      title: {
        en: "Protocol-aware upload with clinical context preservation",
        ko: "임상 맥락 보존을 갖춘 프로토콜 인식 업로드",
      },
      description: {
        en: "Each submission carries test purpose, target outputs, and block intents alongside the raw files. That protocol context tags the workspace for deterministic reruns and drives report emphasis — so the platform knows whether a session was FatMax-focused or VO2max-focused without re-reading the file.",
        ko: "각 제출은 원본 파일과 함께 검사 목적, 목표 출력값, 블럭 의도를 담습니다. 해당 프로토콜 컨텍스트가 워크스페이스를 결정론적 재실행용으로 태깅하고 리포트 강조점을 결정합니다 — 플랫폼이 파일을 다시 읽지 않고도 세션이 FatMax 중심인지 VO2max 중심인지 알 수 있습니다.",
      },
      image: "/projects/cpet-platform/subject-detail.webp",
    },
    {
      title: {
        en: "Research notes, snapshot explorers, and duplicate detection",
        ko: "연구 노트, snapshot 탐색기, 중복 탐지",
      },
      description: {
        en: "Protected markdown notes serve clinical reference material inside the platform. The manage screen exposes snapshot and feature-set explorers with CSV/JSON export and comparison views. Duplicate clusters surface fingerprint-matched submissions for review before pipeline runs.",
        ko: "보호된 마크다운 노트가 플랫폼 내에서 임상 참고 자료를 제공합니다. 관리 화면은 CSV/JSON 내보내기·비교 뷰를 갖춘 snapshot·feature set 탐색기를 노출합니다. 중복 클러스터는 파이프라인 실행 전 지문 매칭된 제출물을 검토용으로 표시합니다.",
      },
      image: "/projects/cpet-platform/cohort.webp",
    },
  ],

  architecture: {
    nodes: [
      { id: "cosmed-sources", label: { en: "COSMED / FIT / ZWO / Lactate", ko: "COSMED / FIT / ZWO / 젖산" }, type: "external", x: 0, y: 0 },
      { id: "inscyd-pdf", label: { en: "INSCYD PDF", ko: "INSCYD PDF" }, type: "external", x: 0, y: 1 },
      { id: "app", label: { en: "FastAPI + Jinja2 + HTMX", ko: "FastAPI + Jinja2 + HTMX" }, type: "server", x: 1, y: 0 },
      { id: "platform-db", label: { en: "Platform SQLite DB", ko: "플랫폼 SQLite DB" }, type: "database", x: 2, y: 0 },
      { id: "channel", label: { en: "Bun Channel Webhook", ko: "Bun 채널 웹훅" }, type: "service", x: 3, y: 0 },
      { id: "cosmed-pipeline", label: { en: "COSMED Analysis Pipeline", ko: "COSMED 분석 파이프라인" }, type: "service", x: 4, y: 0 },
      { id: "inscyd-pipeline", label: { en: "INSCYD Standalone Pipeline", ko: "INSCYD 독립 파이프라인" }, type: "service", x: 4, y: 1 },
      { id: "analysis-db", label: { en: "Workspace analysis.db", ko: "워크스페이스 analysis.db" }, type: "database", x: 5, y: 0 },
      { id: "reports", label: { en: "Published HTML Reports", ko: "발행된 HTML 리포트" }, type: "service", x: 6, y: 0 },
      { id: "surfaces", label: { en: "Dashboard / Notes / Profile / Manage", ko: "대시보드 / 노트 / 프로필 / 관리" }, type: "client", x: 7, y: 0 },
    ],
    connections: [
      { from: "cosmed-sources", to: "app", label: { en: "Upload + protocol context", ko: "업로드 + 프로토콜 컨텍스트" } },
      { from: "inscyd-pdf", to: "app", label: { en: "PDF upload", ko: "PDF 업로드" } },
      { from: "app", to: "platform-db", label: { en: "Users / subjects / submissions", ko: "사용자 / 피험자 / 제출물" } },
      { from: "app", to: "channel", label: { en: "Submission event", ko: "제출 이벤트" } },
      { from: "channel", to: "cosmed-pipeline", label: { en: "Claude Code trigger", ko: "Claude Code 트리거" } },
      { from: "channel", to: "inscyd-pipeline", label: { en: "INSCYD trigger", ko: "INSCYD 트리거" } },
      { from: "cosmed-pipeline", to: "analysis-db", label: { en: "Derived analysis tables", ko: "파생 분석 테이블" } },
      { from: "cosmed-pipeline", to: "reports", label: { en: "Static report publish", ko: "정적 리포트 발행" } },
      { from: "inscyd-pipeline", to: "reports", label: { en: "Interpretation report", ko: "해석 리포트" } },
      { from: "reports", to: "app", label: { en: "Catalog sync", ko: "카탈로그 동기화" } },
      { from: "platform-db", to: "surfaces", label: { en: "Cohort analytics / manage", ko: "코호트 분석 / 관리" } },
      { from: "analysis-db", to: "surfaces", label: { en: "Snapshots / features", ko: "snapshot / feature" } },
      { from: "reports", to: "surfaces", label: { en: "Published artifacts", ko: "발행 아티팩트" } },
    ],
  },

  metrics: [
    {
      value: "5",
      label: { en: "Input Types", ko: "입력 타입" },
      description: { en: "COSMED Excel, FIT, ZWO, lactate CSV, and INSCYD PDF", ko: "COSMED Excel, FIT, ZWO, 젖산 CSV, INSCYD PDF" },
    },
    {
      value: "2",
      label: { en: "Analysis Paths", ko: "분석 경로" },
      description: { en: "COSMED metabolic pipeline and INSCYD standalone flow running in parallel", ko: "COSMED 대사 파이프라인과 INSCYD 독립 흐름이 병렬 운영" },
    },
    {
      value: "2",
      label: { en: "SQLite Layers", ko: "SQLite 레이어" },
      description: { en: "Central platform DB plus per-workspace analysis DB", ko: "중앙 플랫폼 DB와 워크스페이스별 analysis DB" },
    },
    {
      value: "4",
      label: { en: "Analytics Surfaces", ko: "분석 표면" },
      description: { en: "Cohort dashboard, subject drill-in, profile trends, and manage explorers", ko: "코호트 대시보드, 피험자 드릴-인, 프로필 추세, 관리 탐색기" },
    },
  ],

  prevProject: {
    slug: "ai-cycling-coach",
    title: { en: "AI Cycling Coach", ko: "AI 사이클링 코치" },
  },
  nextProject: {
    slug: "ride-analytics",
    title: { en: "Ride Analytics", ko: "라이드 분석" },
  },
};
