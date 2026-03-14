import type { ProjectDetail } from "@/types/project-detail";

export const todayBike: ProjectDetail = {
  slug: "today-bike",
  vertical: "consumer",
  verticalColor: "#F59E0B",
  status: "beta",
  title: {
    en: "Today.Bike",
    ko: "Today.Bike",
  },
  tagline: {
    en: "All-in-one platform for today's bicycle ride",
    ko: "오늘의 자전거 라이딩을 위한 올인원 플랫폼",
  },
  heroImage: "/projects/today-bike/hero.png",

  painPoints: [
    {
      icon: "🌤️",
      title: {
        en: "Weather Checking Across Apps",
        ko: "여러 앱에서 날씨 확인",
      },
      description: {
        en: "Cyclists had to check multiple weather apps before every ride — one for temperature, another for wind, yet another for precipitation probability. No single view answered the simple question: 'Should I ride today?'",
        ko: "사이클리스트가 매 라이딩 전 여러 날씨 앱을 확인해야 했습니다 — 온도용 앱, 바람용 앱, 강수 확률용 앱. '오늘 라이딩해도 될까?'라는 단순한 질문에 답하는 단일 뷰가 없었습니다.",
      },
    },
    {
      icon: "🌬️",
      title: {
        en: "No Ride-Specific Weather",
        ko: "라이딩 특화 날씨 정보 부재",
      },
      description: {
        en: "Generic weather forecasts don't address cycling-specific concerns: headwind direction relative to route, feels-like temperature at 30km/h speed, or the narrow time window where conditions are rideable.",
        ko: "일반 날씨 예보는 사이클링 특화 관심사를 다루지 않습니다: 경로 대비 역풍 방향, 30km/h 속도에서의 체감 온도, 라이딩 가능한 좁은 시간대 등을 고려하지 않습니다.",
      },
    },
    {
      icon: "📱",
      title: {
        en: "Scattered Cycling Info",
        ko: "분산된 사이클링 정보",
      },
      description: {
        en: "Weather, route conditions, air quality, sunrise/sunset times, and community ride plans were scattered across different apps and websites. No central hub aggregated all pre-ride information in one place.",
        ko: "날씨, 경로 상태, 대기질, 일출/일몰 시간, 커뮤니티 라이드 계획이 여러 앱과 웹사이트에 분산되어 있었습니다. 모든 사전 라이딩 정보를 한 곳에 모아주는 중앙 허브가 없었습니다.",
      },
    },
  ],

  beforeAfter: [
    {
      before: {
        en: "Checking 3-4 apps for weather, wind, and air quality before riding",
        ko: "라이딩 전 날씨, 바람, 대기질을 3-4개 앱에서 확인",
      },
      after: {
        en: "Single ride-ready dashboard with all conditions at a glance",
        ko: "한눈에 모든 조건을 볼 수 있는 단일 라이드 레디 대시보드",
      },
    },
    {
      before: {
        en: "Generic weather forecasts not tailored for cycling",
        ko: "사이클링에 맞춤화되지 않은 일반 날씨 예보",
      },
      after: {
        en: "Cycling-specific metrics: wind impact, feels-like at speed, ride window",
        ko: "사이클링 특화 메트릭: 바람 영향, 속도별 체감 온도, 라이딩 적정 시간대",
      },
    },
    {
      before: {
        en: "No way to know if planned route has favorable weather conditions",
        ko: "계획한 경로의 날씨 조건이 유리한지 알 방법 없음",
      },
      after: {
        en: "Route-specific weather forecast showing conditions along the entire path",
        ko: "전체 경로를 따라 조건을 보여주는 경로별 날씨 예보",
      },
    },
  ],

  approach: {
    title: {
      en: "Ride-First Weather Intelligence",
      ko: "라이딩 우선 날씨 인텔리전스",
    },
    description: {
      en: "Instead of showing raw weather data and letting cyclists interpret it, the platform processes meteorological data through a cycling-specific lens. Wind speed and direction are translated into headwind/tailwind impact for popular routes. Temperature is adjusted for wind chill at riding speed. Precipitation probability is mapped to ride-window recommendations ('Best window: 7-10 AM'). The Flutter app delivers this as a mobile-first experience with push notifications when conditions become favorable, while the FastAPI backend aggregates multiple weather data sources and caches results for sub-second response times.",
      ko: "원시 날씨 데이터를 보여주고 사이클리스트가 해석하게 하는 대신, 플랫폼이 기상 데이터를 사이클링 특화 관점으로 처리합니다. 풍속과 풍향을 인기 경로에 대한 역풍/순풍 영향으로 변환합니다. 온도는 라이딩 속도에서의 체감 온도로 보정됩니다. 강수 확률은 라이딩 시간대 추천('최적 시간대: 오전 7-10시')으로 매핑됩니다. Flutter 앱이 조건이 유리해지면 푸시 알림과 함께 모바일 우선 경험을 제공하며, FastAPI 백엔드가 여러 날씨 데이터 소스를 집계하고 결과를 캐싱하여 서브초 응답 시간을 보장합니다.",
    },
  },

  features: [
    {
      title: {
        en: "Ride-Ready Weather Dashboard",
        ko: "라이드 레디 날씨 대시보드",
      },
      description: {
        en: "A single screen that answers 'Should I ride today?' with a clear go/no-go indicator. Shows current conditions, hourly forecast, and optimal ride windows with cycling-specific interpretations of wind, temperature, and precipitation.",
        ko: "'오늘 라이딩해도 될까?'에 명확한 Go/No-Go 지표로 답하는 단일 화면입니다. 현재 조건, 시간별 예보, 바람/온도/강수의 사이클링 특화 해석과 함께 최적 라이딩 시간대를 보여줍니다.",
      },
      image: "/projects/today-bike/feature-weather-dashboard.png",
    },
    {
      title: {
        en: "Wind / Temperature Analysis",
        ko: "바람 / 온도 분석",
      },
      description: {
        en: "Detailed wind rose showing direction and intensity throughout the day, overlaid with popular route directions to indicate headwind/tailwind conditions. Temperature chart includes feels-like adjustments at typical cycling speeds (25-35 km/h).",
        ko: "하루 종일 방향과 강도를 보여주는 상세 풍배도에 인기 경로 방향을 오버레이하여 역풍/순풍 조건을 표시합니다. 온도 차트에는 일반적인 사이클링 속도(25-35 km/h)에서의 체감 온도 보정이 포함됩니다.",
      },
      image: "/projects/today-bike/feature-wind-temp.png",
    },
    {
      title: {
        en: "Route Weather Forecast",
        ko: "경로 날씨 예보",
      },
      description: {
        en: "Select a route and see weather conditions along the entire path — not just at the start point. Accounts for elevation changes, coastal vs. inland differences, and time-of-arrival at each waypoint based on estimated riding speed.",
        ko: "경로를 선택하면 출발점뿐만 아니라 전체 경로를 따라 날씨 조건을 확인할 수 있습니다. 고도 변화, 해안가 대 내륙 차이, 예상 라이딩 속도 기반 각 중간 지점 도착 시간을 고려합니다.",
      },
      image: "/projects/today-bike/feature-route-weather.png",
    },
    {
      title: {
        en: "Community Feed",
        ko: "커뮤니티 피드",
      },
      description: {
        en: "Real-time feed of ride reports from the cycling community — current road conditions, wind reports, group ride announcements, and photo updates. Filter by region and route to get hyper-local intelligence before heading out.",
        ko: "사이클링 커뮤니티의 실시간 라이드 리포트 피드 — 현재 도로 상태, 바람 리포트, 그룹 라이드 공지, 사진 업데이트. 지역과 경로별 필터로 출발 전 초지역적 인텔리전스를 확인할 수 있습니다.",
      },
      image: "/projects/today-bike/feature-community.png",
    },
  ],

  architecture: {
    nodes: [
      { id: "mobile", label: { en: "Mobile App", ko: "모바일 앱" }, type: "client", x: 50, y: 50 },
      { id: "flutter", label: { en: "Flutter", ko: "Flutter" }, type: "client", x: 200, y: 50 },
      { id: "fastapi", label: { en: "FastAPI", ko: "FastAPI" }, type: "server", x: 200, y: 180 },
      { id: "weather", label: { en: "Weather API", ko: "Weather API" }, type: "external", x: 350, y: 100 },
      { id: "firebase", label: { en: "Firebase", ko: "Firebase" }, type: "database", x: 50, y: 180 },
      { id: "push", label: { en: "Push Notifications", ko: "푸시 알림" }, type: "service", x: 350, y: 260 },
    ],
    connections: [
      { from: "mobile", to: "flutter", label: { en: "Native", ko: "네이티브" } },
      { from: "flutter", to: "fastapi", label: { en: "REST API", ko: "REST API" } },
      { from: "fastapi", to: "weather", label: { en: "Forecast Data", ko: "예보 데이터" } },
      { from: "fastapi", to: "firebase", label: { en: "User / Cache", ko: "사용자 / 캐시" } },
      { from: "fastapi", to: "push", label: { en: "Ride Alert", ko: "라이드 알림" } },
    ],
  },

  metrics: [
    {
      value: "Go/No",
      label: { en: "Ride Decision", ko: "라이드 결정" },
      description: { en: "Instant ride-readiness indicator based on all conditions", ko: "모든 조건을 종합한 즉시 라이딩 가능 여부 지표" },
    },
    {
      value: "360°",
      label: { en: "Wind Analysis", ko: "바람 분석" },
      description: { en: "Full wind rose with route-relative headwind/tailwind", ko: "경로 대비 역풍/순풍이 포함된 전체 풍배도" },
    },
    {
      value: "Route",
      label: { en: "Path Forecast", ko: "경로 예보" },
      description: { en: "Weather conditions along entire route, not just start point", ko: "출발점뿐 아니라 전체 경로를 따른 날씨 조건" },
    },
    {
      value: "Push",
      label: { en: "Ride Alerts", ko: "라이드 알림" },
      description: { en: "Notifications when weather window becomes favorable", ko: "날씨 조건이 유리해지면 알림 발송" },
    },
  ],

  prevProject: {
    slug: "ride-analytics",
    title: { en: "Ride Analytics", ko: "라이드 분석" },
  },
  nextProject: {
    slug: "personal-finance",
    title: { en: "Personal Finance Tracker", ko: "가계부 트래커" },
  },
};
