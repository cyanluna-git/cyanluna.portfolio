import type { ProjectDetail } from "@/types/project-detail";

export const assistHub: ProjectDetail = {
  slug: "assist-hub",
  vertical: "consumer",
  verticalColor: "#F59E0B",
  status: "active",
  title: {
    en: "Assist Hub",
    ko: "Assist Hub",
  },
  tagline: {
    en: "Personal academic workspace for MBA coursework management",
    ko: "MBA 학사 관리를 위한 개인 학습 워크스페이스",
  },
  heroImage: "/projects/assist-hub/dashboard.webp",

  painPoints: [
    {
      icon: "📚",
      title: {
        en: "Scattered Course Materials",
        ko: "흩어진 수업 자료",
      },
      description: {
        en: "Course materials were scattered across Google Classroom, email attachments, and local folders. Finding a specific reading or assignment required searching multiple platforms and remembering which course used which tool.",
        ko: "수업 자료가 Google Classroom, 이메일 첨부, 로컬 폴더에 분산되어 있었습니다. 특정 읽기 자료나 과제를 찾으려면 여러 플랫폼을 검색하고 어떤 수업이 어떤 도구를 사용했는지 기억해야 했습니다.",
      },
    },
    {
      icon: "🔔",
      title: {
        en: "Notification Overload",
        ko: "알림 과부하",
      },
      description: {
        en: "Important academic notifications were buried in Gmail alongside spam, SMS messages mixed with personal texts, and RSS feeds required separate reader apps. No unified bulletin board aggregated all information sources.",
        ko: "중요한 학사 알림이 Gmail에서 스팸 사이에 묻히고, SMS 메시지는 개인 문자와 섞이며, RSS 피드는 별도 리더 앱이 필요했습니다. 모든 정보 소스를 통합하는 게시판이 없었습니다.",
      },
    },
    {
      icon: "📅",
      title: {
        en: "Schedule Fragmentation",
        ko: "일정 분산",
      },
      description: {
        en: "Class schedules, assignment deadlines, and exam dates lived in different calendars and reminder apps. Synchronizing academic commitments with personal Google Calendar required manual duplication of every event.",
        ko: "수업 일정, 과제 마감, 시험 날짜가 서로 다른 캘린더와 알림 앱에 분산되어 있었습니다. 학사 일정을 개인 Google Calendar와 동기화하려면 모든 이벤트를 수동으로 복제해야 했습니다.",
      },
    },
  ],

  beforeAfter: [
    {
      before: {
        en: "Course materials scattered across Classroom, email, and local folders",
        ko: "수업 자료가 Classroom, 이메일, 로컬 폴더에 분산",
      },
      after: {
        en: "Unified materials library with Google Classroom API sync",
        ko: "Google Classroom API 동기화가 포함된 통합 자료 라이브러리",
      },
    },
    {
      before: {
        en: "Notifications buried across Gmail, SMS, and RSS feeds",
        ko: "Gmail, SMS, RSS 피드에 묻힌 알림",
      },
      after: {
        en: "Consolidated bulletin board aggregating SMS, Gmail, and RSS sources",
        ko: "SMS, Gmail, RSS 소스를 통합하는 게시판",
      },
    },
    {
      before: {
        en: "Manual schedule duplication between academic and personal calendars",
        ko: "학사 캘린더와 개인 캘린더 간 수동 일정 복제",
      },
      after: {
        en: "Integrated schedule with Google Calendar export and event management",
        ko: "Google Calendar 내보내기와 이벤트 관리가 포함된 통합 일정",
      },
    },
  ],

  approach: {
    title: {
      en: "Localhost-First Academic Dashboard",
      ko: "로컬호스트 우선 학사 대시보드",
    },
    description: {
      en: "A single-user localhost application designed as a personal academic command center. Integrates Google APIs (Classroom, Gmail, Calendar) to pull course materials, email notifications, and calendar events into one interface. Prisma ORM with SQLite provides zero-configuration local persistence. The bulletin board aggregates three notification channels (SMS registration records, Gmail sync, RSS feeds from GeekNews/HuggingFace/OpenAI) into a single timeline. Built with Next.js 16 App Router for fast navigation between dashboard widgets.",
      ko: "개인 학사 통합 관리 센터로 설계된 단일 사용자 로컬호스트 애플리케이션입니다. Google API(Classroom, Gmail, Calendar)를 연동하여 수업 자료, 이메일 알림, 캘린더 이벤트를 하나의 인터페이스로 가져옵니다. Prisma ORM과 SQLite로 제로 설정 로컬 데이터 저장을 제공합니다. 게시판은 세 가지 알림 채널(SMS 등록 기록, Gmail 동기화, GeekNews/HuggingFace/OpenAI RSS 피드)을 단일 타임라인으로 통합합니다. Next.js 16 App Router로 대시보드 위젯 간 빠른 네비게이션을 구현합니다.",
    },
  },

  features: [
    {
      title: {
        en: "Learning Console Dashboard",
        ko: "학습 콘솔 대시보드",
      },
      description: {
        en: "Central dashboard displaying current term info, today's tasks, reading queue, and summary queue. Shows the active course (AI/Strategic Management) with quick-access widgets for pending academic work.",
        ko: "현재 학기 정보, 오늘의 과제, 리딩 큐, 요약 큐를 표시하는 중앙 대시보드입니다. 진행 중인 수업(AI·전략경영)과 학사 작업 빠른 접근 위젯을 보여줍니다.",
      },
      image: "/projects/assist-hub/dashboard.webp",
    },
    {
      title: {
        en: "Materials Library",
        ko: "자료 라이브러리",
      },
      description: {
        en: "Centralized repository for all course materials synced from Google Classroom. Organizes readings, slides, and assignments by course and week with search and filter capabilities.",
        ko: "Google Classroom에서 동기화된 모든 수업 자료의 중앙 저장소입니다. 검색 및 필터 기능으로 수업별, 주차별 읽기 자료, 슬라이드, 과제를 정리합니다.",
      },
      image: "/projects/assist-hub/materials.webp",
    },
    {
      title: {
        en: "Multi-Source Bulletin",
        ko: "멀티 소스 게시판",
      },
      description: {
        en: "Unified notification board aggregating SMS registration records, Gmail inbox sync, and RSS feeds (GeekNews, HuggingFace Daily Papers, OpenAI News). All academic and tech news in one chronological timeline.",
        ko: "SMS 등록 기록, Gmail 수신함 동기화, RSS 피드(GeekNews, HuggingFace Daily Papers, OpenAI News)를 통합하는 알림 게시판입니다. 모든 학사 및 기술 뉴스를 하나의 시간순 타임라인으로 제공합니다.",
      },
      image: "/projects/assist-hub/bulletin.webp",
    },
    {
      title: {
        en: "Schedule & Calendar",
        ko: "일정 & 캘린더",
      },
      description: {
        en: "Academic schedule management with Google Calendar export integration. Supports manual event creation for classes, deadlines, and exams with calendar view for monthly overview.",
        ko: "Google Calendar 내보내기 연동이 포함된 학사 일정 관리입니다. 수업, 마감일, 시험에 대한 수동 이벤트 생성과 월간 캘린더 뷰를 지원합니다.",
      },
      image: "/projects/assist-hub/schedule.webp",
    },
  ],

  architecture: {
    nodes: [
      { id: "browser", label: { en: "Browser", ko: "브라우저" }, type: "client", x: 50, y: 50 },
      { id: "nextjs", label: { en: "Next.js 16 (App Router)", ko: "Next.js 16 (App Router)" }, type: "client", x: 200, y: 50 },
      { id: "prisma", label: { en: "Prisma + SQLite", ko: "Prisma + SQLite" }, type: "database", x: 50, y: 180 },
      { id: "google", label: { en: "Google APIs", ko: "Google APIs" }, type: "external", x: 350, y: 50 },
      { id: "rss", label: { en: "RSS Feeds", ko: "RSS 피드" }, type: "external", x: 350, y: 180 },
    ],
    connections: [
      { from: "browser", to: "nextjs", label: { en: "SPA", ko: "SPA" } },
      { from: "nextjs", to: "prisma", label: { en: "ORM Query", ko: "ORM 쿼리" } },
      { from: "nextjs", to: "google", label: { en: "Classroom/Gmail/Calendar", ko: "Classroom/Gmail/Calendar" } },
      { from: "nextjs", to: "rss", label: { en: "Feed Sync", ko: "피드 동기화" } },
    ],
  },

  metrics: [
    {
      value: "3-in-1",
      label: { en: "Notification Sources", ko: "알림 소스" },
      description: { en: "SMS + Gmail + RSS unified bulletin", ko: "SMS + Gmail + RSS 통합 게시판" },
    },
    {
      value: "API",
      label: { en: "Google Integration", ko: "Google 연동" },
      description: { en: "Classroom, Gmail, Calendar API sync", ko: "Classroom, Gmail, Calendar API 동기화" },
    },
    {
      value: "SQLite",
      label: { en: "Zero-Config DB", ko: "제로 설정 DB" },
      description: { en: "Local-first persistence with Prisma ORM", ko: "Prisma ORM 기반 로컬 우선 데이터 저장" },
    },
    {
      value: "1-user",
      label: { en: "Personal Tool", ko: "개인 도구" },
      description: { en: "Localhost-only academic workspace", ko: "로컬호스트 전용 학사 워크스페이스" },
    },
  ],

  prevProject: {
    slug: "personal-finance",
    title: { en: "Personal Finance Tracker", ko: "가계부 트래커" },
  },
  nextProject: {
    slug: "assist-11th",
    title: { en: "aSSiST 11th Community", ko: "aSSiST 11기 커뮤니티" },
  },
};
