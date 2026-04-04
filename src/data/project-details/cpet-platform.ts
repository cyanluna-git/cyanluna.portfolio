import type { ProjectDetail } from "@/types/project-detail";

export const cpetPlatform: ProjectDetail = {
  slug: "cpet-platform",
  vertical: "health",
  verticalColor: "#10B981",
  status: "active",
  title: {
    en: "CPET Platform",
    ko: "CPET 플랫폼",
  },
  tagline: {
    en: "Upload-to-publish platform for CPET analysis workflows",
    ko: "업로드부터 발행까지 잇는 CPET 분석 워크플로우 플랫폼",
  },
  heroImage: "/projects/cpet-platform/subjects.webp",

  painPoints: [
    {
      icon: "🗃️",
      title: {
        en: "Analysis stayed trapped in per-test folders",
        ko: "분석 결과가 검사별 폴더에 갇혀 있었다",
      },
      description: {
        en: "Generating one report was possible, but each submission remained an isolated artifact. Reusing the result for dashboard views, subject timelines, or cohort comparisons required rebuilding context from raw files again.",
        ko: "단일 리포트 생성은 가능했지만 각 제출은 고립된 아티팩트로 남았습니다. 대시보드, 피험자 타임라인, 코호트 비교에 재활용하려면 다시 원본 파일 맥락을 재조립해야 했습니다.",
      },
    },
    {
      icon: "🔗",
      title: {
        en: "Subject and report linkage was brittle",
        ko: "피험자와 리포트 연결이 불안정했다",
      },
      description: {
        en: "Uploads, derived metrics, and published reports needed a stable system record. Without that layer, duplicate handling, user linkage, and report ownership quickly became messy as the dataset grew.",
        ko: "업로드, 파생 지표, 발행 리포트에는 안정적인 시스템 기록이 필요했습니다. 그 레이어가 없으면 데이터가 늘어날수록 중복 처리, 사용자 연결, 리포트 소유 관계가 빠르게 복잡해졌습니다.",
      },
    },
    {
      icon: "🧪",
      title: {
        en: "Research-ready read models did not exist",
        ko: "연구용 read model이 없었다",
      },
      description: {
        en: "A one-off report is not enough when the goal is longitudinal analysis, feature engineering, or cohort validation. Snapshot and derived feature layers were needed so downstream analysis could operate on stable subject-centered rows instead of re-parsing reports.",
        ko: "종적 분석, feature engineering, 코호트 검증이 목표라면 일회성 리포트만으로는 부족합니다. 하위 분석이 리포트를 다시 파싱하는 대신 안정적인 피험자 중심 row를 다룰 수 있도록 snapshot과 파생 feature 레이어가 필요했습니다.",
      },
    },
  ],

  beforeAfter: [
    {
      before: {
        en: "Raw files and generated reports managed as isolated outputs",
        ko: "원본 파일과 생성 리포트를 고립된 산출물로 관리",
      },
      after: {
        en: "Workspace, job, report catalog, and published HTML linked as one runtime flow",
        ko: "워크스페이스, job, 리포트 카탈로그, 발행 HTML을 하나의 런타임 흐름으로 연결",
      },
    },
    {
      before: {
        en: "Each follow-up analysis rebuilt subject context manually",
        ko: "후속 분석마다 피험자 맥락을 수동으로 재구성",
      },
      after: {
        en: "Subject-linked snapshots and feature sets reusable across dashboard, profile, and explorer screens",
        ko: "snapshot과 feature set을 피험자 기준으로 연결해 대시보드, 프로필, 탐색 화면에서 재사용",
      },
    },
    {
      before: {
        en: "Report generation and platform validation lived in separate conversations",
        ko: "리포트 생성과 플랫폼 검증이 분리된 작업으로 존재",
      },
      after: {
        en: "Readiness harness, seeded demo data, and real corpus intake planned around the same platform model",
        ko: "같은 플랫폼 모델 위에서 readiness harness, seeded demo data, real corpus intake를 함께 설계",
      },
    },
  ],

  approach: {
    title: {
      en: "Platformized analysis pipeline with reusable read models",
      ko: "재사용 가능한 read model을 갖춘 플랫폼형 분석 파이프라인",
    },
    description: {
      en: "The current v2 architecture centers on FastAPI, Jinja2, and HTMX for the application layer, with SQLite used both as the platform database and as per-workspace analysis storage. File submissions create structured workspaces, the analysis pipeline generates `analysis.db` and static HTML reports, and published outputs flow back into the dashboard as cataloged artifacts. On top of that runtime, subject-linked metric snapshots and derived feature sets turn one-off analysis into reusable research and product surfaces.",
      ko: "현재 v2 아키텍처는 FastAPI, Jinja2, HTMX를 애플리케이션 레이어의 중심으로 두고, SQLite를 플랫폼 DB와 워크스페이스별 분석 저장소로 함께 사용합니다. 파일 제출은 구조화된 워크스페이스를 만들고, 분석 파이프라인은 `analysis.db`와 정적 HTML 리포트를 생성하며, 발행된 결과는 다시 대시보드 카탈로그로 편입됩니다. 그 위에서 피험자 기준 metric snapshot과 파생 feature set이 일회성 분석을 재사용 가능한 연구/제품 표면으로 바꿉니다.",
    },
  },

  introduction: {
    badge: {
      en: "Rewritten from the current CPET Platform v2 repository",
      ko: "현재 CPET Platform v2 저장소 기준으로 다시 정리한 소개",
    },
    title: {
      en: "From isolated reports to a reusable CPET analysis platform",
      ko: "고립된 리포트 생성에서 재사용 가능한 CPET 분석 플랫폼으로",
    },
    subtitle: {
      en: "The project is no longer just a visualization tool for metabolic test data. It now acts as a platform that connects file intake, analysis workspaces, report publishing, subject linkage, and research-ready snapshot layers in one operating model.",
      ko: "이 프로젝트는 더 이상 대사 검사 데이터를 시각화하는 단일 도구가 아닙니다. 파일 intake, 분석 워크스페이스, 리포트 발행, 피험자 연결, 연구용 snapshot 레이어를 하나의 운영 모델로 묶는 플랫폼으로 바뀌었습니다.",
    },
    pillars: [
      {
        label: { en: "Why 01", ko: "Why 01" },
        title: {
          en: "Upload-to-report was only the beginning",
          ko: "업로드-리포트만으로는 부족했다",
        },
        description: {
          en: "A generated report solves one moment, but real value appears when submissions become durable platform records. The redesign started from the need to keep uploads, jobs, reports, and users connected over time.",
          ko: "생성된 리포트는 한 시점의 문제만 해결합니다. 진짜 가치는 제출물이 지속 가능한 플랫폼 기록이 될 때 생깁니다. 이번 재설계는 업로드, job, 리포트, 사용자를 시간축 위에서 연결해야 한다는 필요에서 시작했습니다.",
        },
        stat: {
          en: "Submission -> job -> report -> catalog",
          ko: "Submission -> job -> report -> catalog",
        },
      },
      {
        label: { en: "Why 02", ko: "Why 02" },
        title: {
          en: "Subject-centered analysis needed a stable model",
          ko: "피험자 중심 분석에는 안정적인 모델이 필요했다",
        },
        description: {
          en: "Longitudinal interpretation, user linkage, and comparison views all break down if the system only knows files. The platform now promotes subjects, submissions, and published reports into first-class entities.",
          ko: "시스템이 파일만 알고 있으면 종적 해석, 사용자 연결, 비교 화면은 모두 쉽게 무너집니다. 이제 플랫폼은 피험자, 제출물, 발행 리포트를 1급 엔터티로 승격해 다룹니다.",
        },
        stat: {
          en: "Subject, submission, report as core records",
          ko: "피험자, 제출물, 리포트를 핵심 기록으로 관리",
        },
      },
      {
        label: { en: "Why 03", ko: "Why 03" },
        title: {
          en: "Research exploration had to be built into the product",
          ko: "연구 탐색 레이어를 제품 안에 넣어야 했다",
        },
        description: {
          en: "Snapshot Explorer and Feature Sets Explorer show the shift clearly: the platform is designed not only to publish reports, but also to validate and extend them as reusable rows for cohort and feature experiments.",
          ko: "Snapshot Explorer와 Feature Sets Explorer는 그 전환을 분명히 보여줍니다. 이 플랫폼은 리포트를 발행하는 데서 끝나지 않고, 이를 코호트 및 feature 실험용 재사용 row로 검증하고 확장하도록 설계됐습니다.",
        },
        stat: {
          en: "Report layer + research layer",
          ko: "리포트 레이어 + 연구 레이어",
        },
      },
    ],
    layers: [
      {
        label: { en: "Intake Layer", ko: "인테이크 레이어" },
        description: {
          en: "Submissions are treated as structured intake events rather than ad hoc uploads, preserving raw files and context together.",
          ko: "제출은 임의 업로드가 아니라 구조화된 intake 이벤트로 다뤄지며, 원본 파일과 설명 맥락을 함께 보존합니다.",
        },
        items: [
          {
            title: { en: "Multi-source file intake", ko: "다중 소스 파일 인테이크" },
            description: {
              en: "Accepts CPET, FIT, ZWO, CSV, and markdown-side metadata into a single workspace creation flow.",
              ko: "CPET, FIT, ZWO, CSV, markdown 기반 메타데이터를 하나의 워크스페이스 생성 흐름으로 수용합니다.",
            },
            meta: { en: "Upload + manifest", ko: "Upload + manifest" },
          },
          {
            title: { en: "Workspace bootstrap", ko: "워크스페이스 부트스트랩" },
            description: {
              en: "Each submission is stored under a dedicated workspace with raw assets kept intact for deterministic reruns.",
              ko: "각 제출은 전용 워크스페이스 아래 저장되고, 재실행을 위해 원본 자산이 그대로 보존됩니다.",
            },
            meta: { en: "data/workspaces", ko: "data/workspaces" },
          },
        ],
      },
      {
        label: { en: "Pipeline Layer", ko: "파이프라인 레이어" },
        description: {
          en: "Analysis is performed as a reproducible pipeline that emits both durable data artifacts and a human-readable report.",
          ko: "분석은 재현 가능한 파이프라인으로 수행되며, 영속 데이터 아티팩트와 사람이 읽을 수 있는 리포트를 함께 출력합니다.",
        },
        items: [
          {
            title: { en: "Analysis runner", ko: "분석 러너" },
            description: {
              en: "The pipeline parses source files, loads SQLite analysis tables, computes derived metrics, and generates report HTML.",
              ko: "파이프라인이 원본 파일을 파싱하고, SQLite 분석 테이블을 적재하며, 파생 지표를 계산하고, HTML 리포트를 생성합니다.",
            },
            meta: { en: "python -m pipeline", ko: "python -m pipeline" },
          },
          {
            title: { en: "Static publishing", ko: "정적 발행" },
            description: {
              en: "Generated reports are copied into a published directory so they can be browsed as stable HTML artifacts from the app.",
              ko: "생성된 리포트는 published 디렉터리로 복사되어 앱 안에서 안정적인 HTML 아티팩트로 열람됩니다.",
            },
            meta: { en: "published/<slug>", ko: "published/<slug>" },
          },
        ],
      },
      {
        label: { en: "Platform Layer", ko: "플랫폼 레이어" },
        description: {
          en: "A central SQLite platform database keeps users, subjects, submissions, and report catalog entries connected as product-level records.",
          ko: "중앙 SQLite 플랫폼 DB가 사용자, 피험자, 제출물, 리포트 카탈로그 엔트리를 제품 수준 기록으로 연결해 유지합니다.",
        },
        items: [
          {
            title: { en: "Dashboard and catalog", ko: "대시보드와 카탈로그" },
            description: {
              en: "Published reports flow back into dashboard views with search, duplicate checks, and linked report notes.",
              ko: "발행 리포트는 검색, 중복 확인, 메모 연결이 가능한 대시보드 뷰로 다시 편입됩니다.",
            },
            meta: { en: "Dashboard", ko: "Dashboard" },
          },
          {
            title: { en: "User and subject linkage", ko: "사용자-피험자 연결" },
            description: {
              en: "Google-auth users, onboarding state, linked subjects, and submission ownership create a stable operational model for follow-up analysis.",
              ko: "Google 로그인 사용자, 온보딩 상태, 연결된 피험자, 제출 소유 관계가 후속 분석을 위한 안정적인 운영 모델을 만듭니다.",
            },
            meta: { en: "Auth + profile", ko: "Auth + profile" },
          },
        ],
      },
      {
        label: { en: "Research Layer", ko: "연구 레이어" },
        description: {
          en: "Subject metric snapshots and derived feature sets push the platform beyond report viewing into validation, cohort reading, and experiment design.",
          ko: "subject metric snapshot과 파생 feature set은 이 플랫폼을 단순 리포트 뷰어를 넘어 검증, 코호트 해석, 실험 설계의 기반으로 확장합니다.",
        },
        items: [
          {
            title: { en: "Snapshot Explorer", ko: "Snapshot Explorer" },
            description: {
              en: "Normalizes submission-derived metrics into subject-centered rows that can be compared over time and across source kinds.",
              ko: "제출 기반 지표를 피험자 중심 row로 정규화해 시간축과 소스 종류를 가로질러 비교할 수 있게 합니다.",
            },
            meta: { en: "subject_metric_snapshots", ko: "subject_metric_snapshots" },
          },
          {
            title: { en: "Feature Sets Explorer", ko: "Feature Sets Explorer" },
            description: {
              en: "Builds reusable feature rows for endurance-core and longitudinal-delta style experiments without re-parsing reports.",
              ko: "리포트를 다시 파싱하지 않고도 endurance-core, longitudinal-delta 같은 실험용 feature row를 구성합니다.",
            },
            meta: { en: "subject_feature_sets", ko: "subject_feature_sets" },
          },
        ],
      },
    ],
    capabilities: [
      {
        title: {
          en: "Structured submission intake",
          ko: "구조화된 제출 인테이크",
        },
        description: {
          en: "Uploads create a workspace, file manifest, submission record, and downstream job instead of leaving files as disconnected attachments.",
          ko: "업로드는 파일을 분리된 첨부물로 남기는 대신 워크스페이스, 파일 매니페스트, 제출 기록, 후속 job을 함께 만듭니다.",
        },
        image: "/projects/cpet-platform/subject-tests.webp",
      },
      {
        title: {
          en: "Published HTML report catalog",
          ko: "발행 가능한 HTML 리포트 카탈로그",
        },
        description: {
          en: "The system turns analysis outputs into browsable HTML reports and feeds them back into a searchable dashboard catalog.",
          ko: "분석 결과를 열람 가능한 HTML 리포트로 전환하고, 이를 검색 가능한 대시보드 카탈로그로 다시 연결합니다.",
        },
        image: "/projects/cpet-platform/admin.webp",
      },
      {
        title: {
          en: "Subject-linked profile and trends",
          ko: "피험자 연결 프로필과 추이",
        },
        description: {
          en: "User profiles, linked subjects, and trend summaries provide a stable follow-up layer beyond one-time report viewing.",
          ko: "사용자 프로필, 연결된 피험자, 추이 요약이 일회성 리포트 열람을 넘어서는 후속 분석 레이어를 제공합니다.",
        },
        image: "/projects/cpet-platform/subject-detail.webp",
      },
      {
        title: {
          en: "Explorer views for validation and research",
          ko: "검증과 연구를 위한 탐색 뷰",
        },
        description: {
          en: "Manage surfaces expose snapshots, feature rows, duplicate clusters, and cohort-oriented validation views for platform QA and future experiments.",
          ko: "관리 화면은 snapshot, feature row, 중복 클러스터, 코호트 중심 검증 뷰를 제공해 플랫폼 QA와 후속 실험을 지원합니다.",
        },
        image: "/projects/cpet-platform/cohort.webp",
      },
    ],
    screenshots: [
      {
        title: { en: "Dashboard and report catalog", ko: "대시보드와 리포트 카탈로그" },
        description: {
          en: "The main dashboard acts as the entry point for published reports, notes, search, and linked analytics views.",
          ko: "메인 대시보드는 발행 리포트, 메모, 검색, 연결된 분석 뷰의 진입점 역할을 합니다.",
        },
        image: "/projects/cpet-platform/admin.webp",
      },
      {
        title: { en: "Subject explorer", ko: "피험자 탐색 화면" },
        description: {
          en: "Subject-level views connect test history, linked reports, and follow-up context instead of treating each report in isolation.",
          ko: "피험자 단위 화면은 검사 이력, 연결된 리포트, 후속 맥락을 하나로 묶어 각 리포트를 고립된 결과로 다루지 않게 합니다.",
        },
        image: "/projects/cpet-platform/subjects.webp",
      },
      {
        title: { en: "Profile and trend surface", ko: "프로필 및 추이 화면" },
        description: {
          en: "Linked profiles expose body composition and fitness trends so the platform can extend beyond one-off report delivery.",
          ko: "연결된 프로필은 체성분과 피트니스 추이를 보여줘, 플랫폼이 단발성 리포트 전달을 넘어 확장될 수 있게 합니다.",
        },
        image: "/projects/cpet-platform/subject-detail.webp",
      },
      {
        title: { en: "Cohort and validation reads", ko: "코호트 및 검증 뷰" },
        description: {
          en: "Explorer-style views make the platform usable for cohort interpretation and validation of derived features.",
          ko: "탐색기형 화면은 이 플랫폼을 코호트 해석과 파생 feature 검증에도 사용할 수 있게 만듭니다.",
        },
        image: "/projects/cpet-platform/cohort.webp",
      },
    ],
    roadmap: [
      {
        label: { en: "Active", ko: "Active" },
        title: {
          en: "Platform v2 runtime",
          ko: "플랫폼 v2 런타임",
        },
        description: {
          en: "FastAPI app, workspace pipeline, published HTML catalog, subject linkage, and explorer surfaces are already aligned under the current v2 structure.",
          ko: "FastAPI 앱, 워크스페이스 파이프라인, 발행 HTML 카탈로그, 피험자 연결, 탐색 화면이 현재 v2 구조 아래 정렬돼 있습니다.",
        },
        status: "active",
      },
      {
        label: { en: "Planned", ko: "Planned" },
        title: {
          en: "Readiness and real-corpus validation",
          ko: "readiness 및 real corpus 검증",
        },
        description: {
          en: "Synthetic population seeding, readiness QA harnesses, and real CPET golden corpus intake are being framed around the same platform model.",
          ko: "synthetic population seeding, readiness QA harness, real CPET golden corpus intake가 같은 플랫폼 모델 위에서 정리되고 있습니다.",
        },
        status: "planned",
      },
      {
        label: { en: "Future", ko: "Future" },
        title: {
          en: "Broader feature experimentation",
          ko: "더 넓은 feature 실험 레이어",
        },
        description: {
          en: "The snapshot and feature layers create a base for future clustering, surrogate modeling, and broader physiology research workflows.",
          ko: "snapshot과 feature 레이어는 향후 clustering, surrogate modeling, 더 넓은 생리학 연구 워크플로우의 기반이 됩니다.",
        },
        status: "future",
      },
    ],
  },

  features: [
    {
      title: {
        en: "Upload workspace and file manifest",
        ko: "업로드 워크스페이스와 파일 매니페스트",
      },
      description: {
        en: "Each submission is captured as a structured workspace with preserved raw assets, metadata, and job lifecycle rather than a loose file drop.",
        ko: "각 제출은 느슨한 파일 업로드가 아니라 원본 자산, 메타데이터, job 생명주기를 보존하는 구조화된 워크스페이스로 저장됩니다.",
      },
      image: "/projects/cpet-platform/subject-tests.webp",
    },
    {
      title: {
        en: "Static HTML publishing pipeline",
        ko: "정적 HTML 발행 파이프라인",
      },
      description: {
        en: "The pipeline emits analysis artifacts and a publishable report HTML, then syncs the result back into the application catalog.",
        ko: "파이프라인은 분석 아티팩트와 발행 가능한 HTML 리포트를 생성하고, 그 결과를 다시 애플리케이션 카탈로그에 동기화합니다.",
      },
      image: "/projects/cpet-platform/admin.webp",
    },
    {
      title: {
        en: "Subject profile and trend model",
        ko: "피험자 프로필 및 추이 모델",
      },
      description: {
        en: "Linked subjects, profile metadata, and fitness trend summaries provide a durable follow-up layer across multiple submissions.",
        ko: "연결된 피험자, 프로필 메타데이터, 피트니스 추이 요약이 여러 제출을 가로지르는 지속 가능한 후속 분석 레이어를 제공합니다.",
      },
      image: "/projects/cpet-platform/subject-detail.webp",
    },
    {
      title: {
        en: "Snapshot and feature explorers",
        ko: "snapshot 및 feature 탐색기",
      },
      description: {
        en: "Explorer screens expose materialized snapshot rows and derived feature sets for QA, comparison, and downstream experiment preparation.",
        ko: "탐색기 화면은 materialized snapshot row와 파생 feature set을 노출해 QA, 비교, 후속 실험 준비를 지원합니다.",
      },
      image: "/projects/cpet-platform/cohort.webp",
    },
  ],

  architecture: {
    nodes: [
      { id: "intake", label: { en: "Source Files", ko: "원본 소스 파일" }, type: "external", x: 0, y: 0 },
      { id: "app", label: { en: "FastAPI + Jinja2 + HTMX", ko: "FastAPI + Jinja2 + HTMX" }, type: "server", x: 1, y: 0 },
      { id: "platform-db", label: { en: "Platform SQLite DB", ko: "플랫폼 SQLite DB" }, type: "database", x: 2, y: 0 },
      { id: "channel", label: { en: "Bun Channel Webhook", ko: "Bun 채널 웹훅" }, type: "service", x: 3, y: 0 },
      { id: "pipeline", label: { en: "Python Analysis Pipeline", ko: "Python 분석 파이프라인" }, type: "service", x: 4, y: 0 },
      { id: "analysis-db", label: { en: "Workspace analysis.db", ko: "워크스페이스 analysis.db" }, type: "database", x: 5, y: 0 },
      { id: "reports", label: { en: "Published HTML Reports", ko: "발행된 HTML 리포트" }, type: "service", x: 6, y: 0 },
      { id: "explorers", label: { en: "Dashboard / Profile / Manage", ko: "대시보드 / 프로필 / 관리" }, type: "client", x: 7, y: 0 },
    ],
    connections: [
      { from: "intake", to: "app", label: { en: "Upload + metadata", ko: "업로드 + 메타데이터" } },
      { from: "app", to: "platform-db", label: { en: "Users / subjects / submissions", ko: "사용자 / 피험자 / 제출물" } },
      { from: "app", to: "channel", label: { en: "Submission event", ko: "제출 이벤트" } },
      { from: "channel", to: "pipeline", label: { en: "Claude Code trigger", ko: "Claude Code 트리거" } },
      { from: "pipeline", to: "analysis-db", label: { en: "Derived analysis tables", ko: "파생 분석 테이블" } },
      { from: "pipeline", to: "reports", label: { en: "Static report publish", ko: "정적 리포트 발행" } },
      { from: "reports", to: "app", label: { en: "Catalog sync", ko: "카탈로그 동기화" } },
      { from: "platform-db", to: "explorers", label: { en: "Dashboard views", ko: "대시보드 뷰" } },
      { from: "analysis-db", to: "explorers", label: { en: "Snapshots / features", ko: "snapshot / feature" } },
      { from: "reports", to: "explorers", label: { en: "Published artifacts", ko: "발행 아티팩트" } },
    ],
  },

  metrics: [
    {
      value: "5",
      label: { en: "Input Types", ko: "입력 타입" },
      description: { en: "FIT, ZWO, XLSX, CSV, and markdown-side metadata", ko: "FIT, ZWO, XLSX, CSV, markdown 기반 메타데이터" },
    },
    {
      value: "2",
      label: { en: "SQLite Layers", ko: "SQLite 레이어" },
      description: { en: "Platform DB plus per-workspace analysis DB", ko: "플랫폼 DB와 워크스페이스별 analysis DB" },
    },
    {
      value: "2",
      label: { en: "Research Read Models", ko: "연구 read model" },
      description: { en: "Metric snapshots and derived feature sets", ko: "metric snapshot과 파생 feature set" },
    },
    {
      value: "HTML",
      label: { en: "Publish Target", ko: "발행 형태" },
      description: { en: "Static reports synced back into the platform catalog", ko: "플랫폼 카탈로그로 다시 연결되는 정적 HTML 리포트" },
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
