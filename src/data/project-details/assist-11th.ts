import type { ProjectDetail } from "@/types/project-detail";

export const assist11th: ProjectDetail = {
  slug: "assist-11th",
  vertical: "consumer",
  verticalColor: "#F59E0B",
  status: "active",
  title: {
    en: "aSSiST 11th Community",
    ko: "aSSiST 11기 커뮤니티",
  },
  tagline: {
    en: "MBA cohort community platform with PWA support",
    ko: "PWA 지원 MBA 동기 커뮤니티 플랫폼",
  },
  heroImage: "/projects/assist-11th/home.webp",

  painPoints: [
    {
      icon: "💬",
      title: {
        en: "KakaoTalk-Only Communication",
        ko: "카카오톡 의존 소통",
      },
      description: {
        en: "All cohort communication happened in a single KakaoTalk group chat. Important announcements were buried under casual messages, and there was no way to organize discussions by topic, pin important content, or search through conversation history effectively.",
        ko: "모든 동기 소통이 하나의 카카오톡 단체 채팅방에서 이루어졌습니다. 중요한 공지가 일상 대화에 묻히고, 주제별 토론 정리, 중요 콘텐츠 고정, 대화 이력 검색이 사실상 불가능했습니다.",
      },
    },
    {
      icon: "📋",
      title: {
        en: "No Shared Knowledge Base",
        ko: "공유 지식 베이스 부재",
      },
      description: {
        en: "Thesis references, course notes, and industry contacts were shared informally and lost in chat history. There was no persistent, searchable repository for cohort knowledge that members could contribute to and reference later.",
        ko: "논문 레퍼런스, 수업 노트, 산업 연락처가 비공식적으로 공유되고 채팅 이력에서 사라졌습니다. 원우들이 기여하고 나중에 참조할 수 있는 지속적이고 검색 가능한 지식 저장소가 없었습니다.",
      },
    },
    {
      icon: "🗳️",
      title: {
        en: "Manual Event Coordination",
        ko: "수동 이벤트 조율",
      },
      description: {
        en: "Organizing group events, collecting RSVPs, and running polls required manual counting in chat threads. No structured tools existed for the student council to manage events, track attendance, or gather opinions efficiently.",
        ko: "그룹 이벤트 조직, 참석 확인 수집, 투표 실행이 채팅에서 수동 집계로 이루어졌습니다. 학생회가 이벤트 관리, 참석 추적, 의견 수렴을 효율적으로 할 수 있는 구조화된 도구가 없었습니다.",
      },
    },
  ],

  beforeAfter: [
    {
      before: {
        en: "All communication in a single KakaoTalk group chat",
        ko: "하나의 카카오톡 단체방에서 모든 소통",
      },
      after: {
        en: "Structured community with board categories (notice/free/column) and profiles",
        ko: "게시판 카테고리(공지/자유/칼럼)와 프로필이 있는 구조화된 커뮤니티",
      },
    },
    {
      before: {
        en: "Knowledge shared informally and lost in chat history",
        ko: "비공식적으로 공유되고 채팅 이력에서 유실되는 지식",
      },
      after: {
        en: "Persistent thesis repository, gallery, and IT news aggregation",
        ko: "지속적인 논문 저장소, 갤러리, IT 뉴스 집계",
      },
    },
    {
      before: {
        en: "Manual RSVP counting and poll tallying in chat",
        ko: "채팅에서 수동 참석 확인 집계와 투표 집계",
      },
      after: {
        en: "Built-in polls, event management, and lunch recommendation system",
        ko: "내장 투표, 이벤트 관리, 점심 추천 시스템",
      },
    },
  ],

  approach: {
    title: {
      en: "Full-Stack Community Platform with PWA",
      ko: "PWA 기반 풀스택 커뮤니티 플랫폼",
    },
    description: {
      en: "Built as a Progressive Web App for instant mobile access without app store distribution. Next.js 15 with Turbopack powers the server-rendered community pages. Drizzle ORM connects to Neon PostgreSQL (serverless) for scalable data storage without infrastructure management. Invitation-code registration ensures only verified cohort members can join. AWS S3 handles image uploads for the gallery, while Resend manages transactional emails. The lunch recommendation feature integrates Kakao Maps API to suggest nearby restaurants based on the university campus location.",
      ko: "앱스토어 배포 없이 즉시 모바일 접근이 가능한 프로그레시브 웹 앱으로 구축했습니다. Next.js 15와 Turbopack이 서버 렌더링 커뮤니티 페이지를 구동합니다. Drizzle ORM이 Neon PostgreSQL(서버리스)에 연결하여 인프라 관리 없이 확장 가능한 데이터 저장을 제공합니다. 초대 코드 등록으로 검증된 동기만 가입할 수 있습니다. AWS S3가 갤러리 이미지 업로드를 처리하고, Resend가 트랜잭션 이메일을 관리합니다. 점심 추천 기능은 카카오맵 API를 연동하여 대학 캠퍼스 위치 기반 주변 맛집을 추천합니다.",
    },
  },

  features: [
    {
      title: {
        en: "Community Dashboard",
        ko: "커뮤니티 대시보드",
      },
      description: {
        en: "Central hub showing latest posts, upcoming events, IT news feed, thesis papers, gallery photos, and active polls — all in a single glanceable view with quick-action shortcuts for writing posts, browsing profiles, and checking schedules.",
        ko: "최신 게시물, 예정 이벤트, IT 뉴스 피드, 논문, 갤러리 사진, 진행 중인 투표를 한눈에 보여주는 중앙 허브입니다. 글쓰기, 프로필 조회, 일정 확인 등의 빠른 액션 단축키를 제공합니다.",
      },
      image: "/projects/assist-11th/home.webp",
    },
    {
      title: {
        en: "Community Board",
        ko: "커뮤니티 게시판",
      },
      description: {
        en: "Three-category community board (Notice, Free, Column) where members can post updates, share insights, and engage in discussions. Supports comments, likes, and real-time interaction between cohort members.",
        ko: "원우들이 소식 공유, 인사이트 교류, 토론에 참여할 수 있는 3개 카테고리(공지, 자유, 칼럼) 커뮤니티 게시판입니다. 댓글, 좋아요, 원우 간 실시간 상호작용을 지원합니다.",
      },
      image: "/projects/assist-11th/posts.webp",
    },
    {
      title: {
        en: "Photo Gallery",
        ko: "사진 갤러리",
      },
      description: {
        en: "Shared photo gallery for cohort memories — class events, study sessions, social gatherings. Images uploaded to AWS S3 with date-grouped timeline view and full-screen lightbox browsing.",
        ko: "동기 추억을 위한 공유 사진 갤러리 — 수업 이벤트, 스터디, 친목 모임. AWS S3에 업로드된 이미지를 날짜별 타임라인 뷰와 전체 화면 라이트박스로 탐색합니다.",
      },
      image: "/projects/assist-11th/gallery.webp",
    },
    {
      title: {
        en: "Lunch Recommendation (Babzip)",
        ko: "점심 추천 (밥집)",
      },
      description: {
        en: "Location-aware restaurant recommendations near the university campus. Integrates Kakao Maps API to show nearby restaurants within 500m, with ratings, reviews, and real-time availability — helping cohort members decide where to eat between classes.",
        ko: "대학 캠퍼스 주변 위치 기반 맛집 추천입니다. 카카오맵 API를 연동하여 500m 이내 주변 식당을 평점, 리뷰, 실시간 정보와 함께 보여줍니다 — 원우들이 수업 사이에 어디서 먹을지 결정하는 데 도움을 줍니다.",
      },
      image: "/projects/assist-11th/lunch.webp",
    },
  ],

  architecture: {
    nodes: [
      { id: "pwa", label: { en: "PWA (Mobile/Desktop)", ko: "PWA (모바일/데스크톱)" }, type: "client", x: 50, y: 50 },
      { id: "nextjs", label: { en: "Next.js 15 (Turbopack)", ko: "Next.js 15 (Turbopack)" }, type: "client", x: 200, y: 50 },
      { id: "neon", label: { en: "Neon PostgreSQL", ko: "Neon PostgreSQL" }, type: "database", x: 50, y: 180 },
      { id: "s3", label: { en: "AWS S3", ko: "AWS S3" }, type: "external", x: 350, y: 50 },
      { id: "kakao", label: { en: "Kakao Maps API", ko: "카카오맵 API" }, type: "external", x: 350, y: 180 },
      { id: "resend", label: { en: "Resend (Email)", ko: "Resend (이메일)" }, type: "service", x: 200, y: 310 },
    ],
    connections: [
      { from: "pwa", to: "nextjs", label: { en: "SSR + CSR", ko: "SSR + CSR" } },
      { from: "nextjs", to: "neon", label: { en: "Drizzle ORM", ko: "Drizzle ORM" } },
      { from: "nextjs", to: "s3", label: { en: "Image Upload", ko: "이미지 업로드" } },
      { from: "nextjs", to: "kakao", label: { en: "Restaurant Search", ko: "맛집 검색" } },
      { from: "nextjs", to: "resend", label: { en: "Transactional Email", ko: "트랜잭션 이메일" } },
    ],
  },

  metrics: [
    {
      value: "PWA",
      label: { en: "Progressive Web App", ko: "프로그레시브 웹 앱" },
      description: { en: "Installable on mobile without app store", ko: "앱스토어 없이 모바일 설치 가능" },
    },
    {
      value: "Invite",
      label: { en: "Closed Community", ko: "폐쇄형 커뮤니티" },
      description: { en: "Invitation-code registration for verified members", ko: "초대 코드 기반 검증된 회원 등록" },
    },
    {
      value: "Kakao",
      label: { en: "Maps Integration", ko: "지도 연동" },
      description: { en: "Nearby restaurant recommendations via Kakao Maps", ko: "카카오맵 기반 주변 맛집 추천" },
    },
    {
      value: "10+",
      label: { en: "Community Features", ko: "커뮤니티 기능" },
      description: { en: "Posts, gallery, polls, events, groups, lunch, thesis", ko: "게시판, 갤러리, 투표, 이벤트, 소모임, 점심, 논문" },
    },
  ],

  prevProject: {
    slug: "assist-hub",
    title: { en: "Assist Hub", ko: "Assist Hub" },
  },
  nextProject: {
    slug: "kanban-pipeline",
    title: { en: "AI Kanban Pipeline", ko: "AI 칸반 파이프라인" },
  },
};
