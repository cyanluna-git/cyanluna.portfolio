import type { ProjectDetail } from "@/types/project-detail";

export const aiCyclingCoach: ProjectDetail = {
  slug: "ai-cycling-coach",
  vertical: "health",
  verticalColor: "#10B981",
  status: "live",
  title: {
    en: "AI Cycling Coach",
    ko: "AI 사이클링 코치",
  },
  tagline: {
    en: "AI-powered personalized cycling training",
    ko: "AI 기반 개인 맞춤 사이클링 트레이닝",
  },
  heroImage: "/projects/ai-cycling-coach/landing.webp",
  liveUrl: "https://ai-cycling-workout-planner.vercel.app/",

  painPoints: [
    {
      icon: "📋",
      title: {
        en: "Generic Training Plans",
        ko: "획일적인 훈련 계획",
      },
      description: {
        en: "Off-the-shelf training plans ignore individual fitness levels, recovery status, and personal goals. Athletes follow cookie-cutter programs that don't adapt to their actual performance data or daily readiness.",
        ko: "기성 훈련 계획은 개인의 체력 수준, 회복 상태, 개인 목표를 무시합니다. 선수들이 실제 퍼포먼스 데이터나 당일 컨디션에 적응하지 않는 천편일률적인 프로그램을 따릅니다.",
      },
    },
    {
      icon: "⚡",
      title: {
        en: "No Power Zone Analysis",
        ko: "파워 존 분석 부재",
      },
      description: {
        en: "Most cyclists train without understanding their power zones, leading to inefficient workouts that either undertrain or overtrain specific energy systems. Without zone-based insights, training stimulus is suboptimal.",
        ko: "대부분의 사이클리스트가 파워 존을 이해하지 못한 채 훈련하여, 특정 에너지 시스템을 과소 또는 과대 훈련하는 비효율적인 운동을 합니다. 존 기반 인사이트 없이는 훈련 자극이 최적이 아닙니다.",
      },
    },
    {
      icon: "📝",
      title: {
        en: "Manual Workout Planning",
        ko: "수동 운동 계획 수립",
      },
      description: {
        en: "Creating structured workouts with proper intervals, rest periods, and progressive overload requires deep coaching knowledge. Athletes spend hours designing workouts that a coach could prescribe in minutes.",
        ko: "적절한 인터벌, 휴식 기간, 점진적 과부하가 포함된 구조화된 운동을 만들려면 깊은 코칭 지식이 필요합니다. 선수들이 코치가 몇 분이면 처방할 수 있는 운동을 설계하는 데 수시간을 소요합니다.",
      },
    },
  ],

  beforeAfter: [
    {
      before: {
        en: "Generic training plans from blogs and YouTube videos",
        ko: "블로그와 YouTube 영상의 획일적인 훈련 계획",
      },
      after: {
        en: "AI-generated workouts personalized to your FTP, TSB, and daily readiness",
        ko: "FTP, TSB, 당일 컨디션에 맞춤화된 AI 생성 운동",
      },
    },
    {
      before: {
        en: "Manual conversion of workout ideas to Zwift-compatible format",
        ko: "운동 아이디어를 Zwift 호환 형식으로 수동 변환",
      },
      after: {
        en: "Instant ZWO file export — ride the AI-designed workout immediately on Zwift",
        ko: "즉시 ZWO 파일 내보내기 — AI가 설계한 운동을 Zwift에서 바로 라이딩",
      },
    },
    {
      before: {
        en: "Guessing training intensity without objective data analysis",
        ko: "객관적 데이터 분석 없이 훈련 강도를 추측",
      },
      after: {
        en: "TSB-based intensity filtering ensures optimal training stimulus every session",
        ko: "TSB 기반 강도 필터링으로 매 세션 최적의 훈련 자극 보장",
      },
    },
  ],

  approach: {
    title: {
      en: "Omakase Pattern: Curated AI Selection",
      ko: "오마카세 패턴: AI 큐레이션 선택",
    },
    description: {
      en: "Instead of generating workouts from scratch (which risks producing physiologically unsound sessions), the system uses an 'Omakase' pattern — pre-validated workout modules designed by coaching science are stored in a library, and the AI selects and assembles the optimal combination based on your current TSB (Training Stress Balance), FTP, weight, and wellness score. This ensures every workout is both scientifically valid and personally optimized. The output is a Zwift-compatible ZWO file you can ride immediately.",
      ko: "운동을 처음부터 생성하는 대신 (생리학적으로 부적절한 세션이 만들어질 위험이 있음), '오마카세' 패턴을 사용합니다 — 코칭 과학으로 설계된 사전 검증 운동 모듈이 라이브러리에 저장되고, AI가 현재 TSB(트레이닝 스트레스 밸런스), FTP, 체중, 컨디션 점수를 바탕으로 최적의 조합을 선택·조합합니다. 이를 통해 모든 운동이 과학적으로 유효하면서도 개인에게 최적화됩니다. 출력은 바로 라이딩 가능한 Zwift 호환 ZWO 파일입니다.",
    },
  },

  features: [
    {
      title: {
        en: "AI Workout Generator",
        ko: "AI 운동 생성기",
      },
      description: {
        en: "Select your training goal and available time, and the AI assembles a structured workout from pre-validated modules. Uses LLM intelligence to match workout intensity to your current fatigue level (TSB) and training phase, outputting a ride-ready ZWO file.",
        ko: "훈련 목표와 가용 시간을 선택하면 AI가 사전 검증된 모듈로 구조화된 운동을 조합합니다. LLM을 활용하여 현재 피로도(TSB)와 훈련 단계에 맞는 운동 강도를 매칭하고, 바로 라이딩 가능한 ZWO 파일을 출력합니다.",
      },
      image: "/projects/ai-cycling-coach/workout-generator.webp",
    },
    {
      title: {
        en: "Power Zone Analysis",
        ko: "파워 존 분석",
      },
      description: {
        en: "Automatically calculates and visualizes your 7 power zones based on FTP. Shows time-in-zone distribution across workouts, identifies training gaps, and recommends zone-specific sessions to build a balanced fitness profile.",
        ko: "FTP를 기반으로 7개 파워 존을 자동 계산하고 시각화합니다. 운동별 존 내 시간 분포를 보여주고, 훈련 갭을 식별하며, 균형 잡힌 체력 프로필을 구축하기 위한 존별 세션을 추천합니다.",
      },
      image: "/projects/ai-cycling-coach/fitness-card.webp",
    },
    {
      title: {
        en: "Training Calendar",
        ko: "트레이닝 캘린더",
      },
      description: {
        en: "Weekly periodization view showing planned vs. completed workouts, TSS (Training Stress Score) targets, and rest day recommendations. Syncs with Intervals.icu for automatic training data import and progress tracking.",
        ko: "계획 대비 완료된 운동, TSS(트레이닝 스트레스 스코어) 목표, 휴식일 추천을 보여주는 주간 주기화 뷰입니다. Intervals.icu와 동기화하여 자동 훈련 데이터 가져오기 및 진행 추적을 제공합니다.",
      },
      image: "/projects/ai-cycling-coach/weekly-plan.webp",
    },
    {
      title: {
        en: "Performance Tracking",
        ko: "퍼포먼스 트래킹",
      },
      description: {
        en: "Long-term performance trends with FTP progression, CTL/ATL/TSB charts, and power curve analysis. Tracks improvements across training blocks and provides data-driven insights for peak performance timing.",
        ko: "FTP 진행 추이, CTL/ATL/TSB 차트, 파워 커브 분석을 포함한 장기 퍼포먼스 트렌드입니다. 훈련 블록 전반의 향상을 추적하고 피크 퍼포먼스 타이밍에 대한 데이터 기반 인사이트를 제공합니다.",
      },
      image: "/projects/ai-cycling-coach/landing.webp",
    },
  ],

  architecture: {
    nodes: [
      { id: "browser", label: { en: "Browser", ko: "브라우저" }, type: "client", x: 50, y: 50 },
      { id: "nextjs", label: { en: "Next.js Frontend", ko: "Next.js 프론트엔드" }, type: "client", x: 200, y: 50 },
      { id: "fastapi", label: { en: "Python / FastAPI", ko: "Python / FastAPI" }, type: "server", x: 200, y: 180 },
      { id: "claude", label: { en: "Claude API", ko: "Claude API" }, type: "service", x: 350, y: 100 },
      { id: "strava", label: { en: "Strava API", ko: "Strava API" }, type: "external", x: 350, y: 260 },
      { id: "supabase", label: { en: "Supabase", ko: "Supabase" }, type: "database", x: 50, y: 180 },
    ],
    connections: [
      { from: "browser", to: "nextjs", label: { en: "SPA", ko: "SPA" } },
      { from: "nextjs", to: "fastapi", label: { en: "REST API", ko: "REST API" } },
      { from: "fastapi", to: "claude", label: { en: "LLM Prompt", ko: "LLM 프롬프트" } },
      { from: "fastapi", to: "strava", label: { en: "OAuth / Data", ko: "OAuth / 데이터" } },
      { from: "fastapi", to: "supabase", label: { en: "SQL", ko: "SQL" } },
    ],
  },

  metrics: [
    {
      value: "7",
      label: { en: "Power Zones", ko: "파워 존" },
      description: { en: "FTP-based zone calculation for personalized training", ko: "개인 맞춤 훈련을 위한 FTP 기반 존 계산" },
    },
    {
      value: "TSB",
      label: { en: "Readiness Score", ko: "준비도 점수" },
      description: { en: "Training Stress Balance for daily intensity guidance", ko: "일일 강도 가이드를 위한 트레이닝 스트레스 밸런스" },
    },
    {
      value: "ZWO",
      label: { en: "Instant Export", ko: "즉시 내보내기" },
      description: { en: "Zwift-compatible workout files generated on demand", ko: "요청 시 생성되는 Zwift 호환 운동 파일" },
    },
    {
      value: "Weekly",
      label: { en: "Periodization", ko: "주기화" },
      description: { en: "AI-planned weekly training structure with recovery days", ko: "회복일이 포함된 AI 계획 주간 훈련 구조" },
    },
  ],

  prevProject: {
    slug: "resource-board",
    title: { en: "Engineering Resource Board", ko: "엔지니어링 리소스 보드" },
  },
  nextProject: {
    slug: "cpet-platform",
    title: { en: "CPET Platform", ko: "CPET 플랫폼" },
  },
};
