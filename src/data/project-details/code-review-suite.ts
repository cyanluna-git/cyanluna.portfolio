import type { ProjectDetail } from "@/types/project-detail";

export const codeReviewSuite: ProjectDetail = {
  slug: "code-review-suite",
  vertical: "aiagents",
  verticalColor: "#8B5CF6",
  status: "live",
  title: {
    en: "AI Code Review Suite",
    ko: "AI 코드 리뷰 스위트",
  },
  tagline: {
    en: "Automated code review for Bitbucket PRs across all domains",
    ko: "모든 도메인의 Bitbucket PR을 위한 자동 코드 리뷰",
  },
  heroImage: "/projects/code-review-suite/hero.png",

  painPoints: [
    {
      icon: "⏳",
      title: {
        en: "Manual Code Review Bottleneck",
        ko: "수동 코드 리뷰 병목",
      },
      description: {
        en: "Code reviews pile up in the queue because reviewers are busy with their own work. PRs sit for hours or days waiting for human attention, blocking merges and slowing the entire team's velocity.",
        ko: "리뷰어들이 자신의 작업에 바쁘기 때문에 코드 리뷰가 대기열에 쌓입니다. PR이 사람의 관심을 기다리며 몇 시간 또는 며칠씩 방치되어 머지를 차단하고 팀 전체의 속도를 저하시킵니다.",
      },
    },
    {
      icon: "🔍",
      title: {
        en: "Domain-Blind Reviews",
        ko: "도메인 무관 리뷰",
      },
      description: {
        en: "Generic code review checklists miss domain-specific concerns. A backend API review needs different checks (SQL injection, N+1 queries) than a PLC review (sequence deadlocks, CODESYS architecture). One-size-fits-all reviews catch syntax but miss substance.",
        ko: "일반적인 코드 리뷰 체크리스트는 도메인별 관심사를 놓칩니다. 백엔드 API 리뷰는 PLC 리뷰(시퀀스 데드락, CODESYS 아키텍처)와 다른 검사(SQL 인젝션, N+1 쿼리)가 필요합니다. 획일화된 리뷰는 구문은 잡지만 본질을 놓칩니다.",
      },
    },
    {
      icon: "📝",
      title: {
        en: "No Structured Feedback",
        ko: "구조화되지 않은 피드백",
      },
      description: {
        en: "Review comments are scattered across PR threads with no consistent format. Critical issues blend in with nitpicks, making it hard to prioritize fixes. There's no way to track review quality or patterns across the team.",
        ko: "리뷰 코멘트가 일관된 형식 없이 PR 스레드에 흩어져 있습니다. 중요한 이슈가 사소한 지적과 섞여 수정 우선순위를 정하기 어렵습니다. 팀 전체의 리뷰 품질이나 패턴을 추적할 방법이 없습니다.",
      },
    },
  ],

  beforeAfter: [
    {
      before: {
        en: "PRs waiting hours/days for human reviewer availability",
        ko: "사람 리뷰어 가용성을 기다리며 수시간/수일 대기하는 PR",
      },
      after: {
        en: "Automated review posted within minutes of PR creation",
        ko: "PR 생성 후 수분 내에 자동 리뷰 게시",
      },
    },
    {
      before: {
        en: "Same generic checklist applied to backend, frontend, and PLC code",
        ko: "백엔드, 프론트엔드, PLC 코드에 동일한 일반 체크리스트 적용",
      },
      after: {
        en: "Domain-specific review lenses auto-selected by file extension analysis",
        ko: "파일 확장자 분석으로 도메인별 리뷰 렌즈 자동 선택",
      },
    },
    {
      before: {
        en: "Unstructured comments mixed across PR threads",
        ko: "PR 스레드에 혼재된 비구조화 코멘트",
      },
      after: {
        en: "Structured Markdown report with severity levels posted directly to PR",
        ko: "심각도 수준이 포함된 구조화된 Markdown 리포트를 PR에 직접 게시",
      },
    },
  ],

  approach: {
    title: {
      en: "Domain-Aware AI Review Engine",
      ko: "도메인 인식 AI 리뷰 엔진",
    },
    description: {
      en: "The system analyzes Bitbucket PR diffs and auto-detects the review domain from file extensions — .py/.sql files trigger backend review (API design, database patterns, security), .tsx/.css files trigger frontend review (component architecture, state management, accessibility), and .st/.pou files trigger PLC review (CODESYS structure, sequence deadlock detection). Each domain has its own review template with domain-specific checklist items and severity levels. The AI model receives the diff along with the domain-specific prompt, producing a structured Markdown review that gets posted as a PR comment via the Bitbucket API. The skill operates standalone — it works in any project with just environment variables configured, requiring no project-specific setup.",
      ko: "시스템이 Bitbucket PR diff를 분석하고 파일 확장자에서 리뷰 도메인을 자동 감지합니다 — .py/.sql 파일은 백엔드 리뷰(API 설계, DB 패턴, 보안), .tsx/.css 파일은 프론트엔드 리뷰(컴포넌트 아키텍처, 상태 관리, 접근성), .st/.pou 파일은 PLC 리뷰(CODESYS 구조, 시퀀스 데드락 감지)를 트리거합니다. 각 도메인은 도메인별 체크리스트 항목과 심각도 수준을 가진 자체 리뷰 템플릿이 있습니다. AI 모델이 diff와 도메인별 프롬프트를 받아 구조화된 Markdown 리뷰를 생성하고 Bitbucket API를 통해 PR 코멘트로 게시합니다. 이 스킬은 독립 실행형으로 — 환경 변수만 설정하면 프로젝트별 설정 없이 모든 프로젝트에서 동작합니다.",
    },
  },

  features: [
    {
      title: {
        en: "Auto-Detect Domain",
        ko: "도메인 자동 감지",
      },
      description: {
        en: "Analyzes file extensions in the PR diff to automatically determine the review domain. Backend (.py, .sql, .go), Frontend (.tsx, .css, .html), and PLC (.st, .pou) each activate specialized review templates with domain-specific checklist items and focus areas.",
        ko: "PR diff의 파일 확장자를 분석하여 리뷰 도메인을 자동으로 판별합니다. 백엔드(.py, .sql, .go), 프론트엔드(.tsx, .css, .html), PLC(.st, .pou) 각각이 도메인별 체크리스트 항목과 집중 영역이 포함된 전문 리뷰 템플릿을 활성화합니다.",
      },
      image: "/projects/code-review-suite/feature-domain.png",
    },
    {
      title: {
        en: "Structured Review Template",
        ko: "구조화된 리뷰 템플릿",
      },
      description: {
        en: "Reviews follow a consistent Markdown template with sections for summary, critical issues, suggestions, and nitpicks. Each finding includes severity level (critical/warning/info), file location, and actionable fix suggestion, making it easy to prioritize and resolve feedback.",
        ko: "리뷰가 요약, 치명적 이슈, 제안, 사소한 지적 섹션이 포함된 일관된 Markdown 템플릿을 따릅니다. 각 발견 사항에 심각도(치명적/경고/정보), 파일 위치, 실행 가능한 수정 제안이 포함되어 피드백의 우선순위 지정과 해결이 용이합니다.",
      },
      image: "/projects/code-review-suite/feature-template.png",
    },
    {
      title: {
        en: "Bitbucket Integration",
        ko: "Bitbucket 연동",
      },
      description: {
        en: "Fetches PR details and diffs via the Bitbucket REST API, then posts the structured review as a PR comment. Supports both Bitbucket Cloud and Server. The review appears inline with the PR conversation, requiring no context switch for developers.",
        ko: "Bitbucket REST API를 통해 PR 상세와 diff를 가져온 후 구조화된 리뷰를 PR 코멘트로 게시합니다. Bitbucket Cloud와 Server 모두 지원합니다. 리뷰가 PR 대화에 인라인으로 표시되어 개발자의 컨텍스트 전환이 필요 없습니다.",
      },
      image: "/projects/code-review-suite/feature-bitbucket.png",
    },
    {
      title: {
        en: "Multi-Language Support",
        ko: "다중 언어 지원",
      },
      description: {
        en: "Handles code in Python, TypeScript, Go, SQL, Structured Text, and more. The AI model adapts its review focus based on the language — checking for type safety in TypeScript, memory management in Go, and timing hazards in PLC code.",
        ko: "Python, TypeScript, Go, SQL, Structured Text 등의 코드를 처리합니다. AI 모델이 언어에 따라 리뷰 초점을 조정합니다 — TypeScript의 타입 안전성, Go의 메모리 관리, PLC 코드의 타이밍 위험을 검사합니다.",
      },
      image: "/projects/code-review-suite/feature-multilang.png",
    },
  ],

  architecture: {
    nodes: [
      { id: "skill", label: { en: "Claude Code Skill", ko: "Claude Code 스킬" }, type: "client", x: 50, y: 50 },
      { id: "bitbucket", label: { en: "Bitbucket API", ko: "Bitbucket API" }, type: "external", x: 200, y: 50 },
      { id: "ai", label: { en: "AI Model", ko: "AI 모델" }, type: "service", x: 200, y: 180 },
      { id: "report", label: { en: "Markdown Report", ko: "Markdown 리포트" }, type: "server", x: 350, y: 180 },
      { id: "pr", label: { en: "PR Comment", ko: "PR 코멘트" }, type: "external", x: 350, y: 50 },
    ],
    connections: [
      { from: "skill", to: "bitbucket", label: { en: "Fetch PR Diff", ko: "PR Diff 조회" } },
      { from: "bitbucket", to: "ai", label: { en: "Diff + Context", ko: "Diff + 컨텍스트" } },
      { from: "ai", to: "report", label: { en: "Structured Review", ko: "구조화 리뷰" } },
      { from: "report", to: "pr", label: { en: "Post Comment", ko: "코멘트 게시" } },
    ],
  },

  metrics: [
    {
      value: "3",
      label: { en: "Domain Lenses", ko: "도메인 렌즈" },
      description: { en: "Backend, Frontend, and PLC specialized reviews", ko: "백엔드, 프론트엔드, PLC 전문 리뷰" },
    },
    {
      value: "Auto",
      label: { en: "Domain Detection", ko: "도메인 감지" },
      description: { en: "File extension analysis determines review type", ko: "파일 확장자 분석으로 리뷰 유형 결정" },
    },
    {
      value: "6+",
      label: { en: "Languages", ko: "지원 언어" },
      description: { en: "Python, TypeScript, Go, SQL, ST, and more", ko: "Python, TypeScript, Go, SQL, ST 등" },
    },
    {
      value: "0",
      label: { en: "Setup Required", ko: "설정 불필요" },
      description: { en: "Standalone skill — env vars only, no project config", ko: "독립 실행 스킬 — 환경 변수만, 프로젝트 설정 불필요" },
    },
  ],

  prevProject: {
    slug: "kanban-pipeline",
    title: { en: "AI Kanban Pipeline", ko: "AI 칸반 파이프라인" },
  },
  nextProject: {
    slug: "javis",
    title: { en: "Javis", ko: "Javis" },
  },
};
