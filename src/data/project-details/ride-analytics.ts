import type { ProjectDetail } from "@/types/project-detail";

export const rideAnalytics: ProjectDetail = {
  slug: "ride-analytics",
  vertical: "cycling",
  verticalColor: "#10B981",
  status: "active",
  title: {
    en: "Ride Analytics",
    ko: "라이드 분석",
  },
  tagline: {
    en: "Cycling ride data analysis and course recommendations",
    ko: "자전거 라이딩 데이터 분석 및 코스 추천",
  },
  heroImage: "/projects/ride-analytics/home.webp",

  painPoints: [
    {
      icon: "🔀",
      title: {
        en: "Scattered Ride Data",
        ko: "흩어진 라이딩 데이터",
      },
      description: {
        en: "Ride data was fragmented across Strava, Garmin Connect, and local GPX files. No single platform provided a unified view of all riding history with consistent metrics and route information.",
        ko: "라이딩 데이터가 Strava, Garmin Connect, 로컬 GPX 파일에 분산되어 있었습니다. 일관된 메트릭과 경로 정보로 모든 라이딩 이력을 통합 조회할 수 있는 단일 플랫폼이 없었습니다.",
      },
    },
    {
      icon: "🗺️",
      title: {
        en: "No Route Analytics",
        ko: "경로 분석 부재",
      },
      description: {
        en: "Existing platforms showed individual ride maps but lacked aggregate route analysis — no heatmaps of frequently ridden roads, no segment-level performance comparison, and no data-driven route discovery.",
        ko: "기존 플랫폼은 개별 라이드 지도만 보여줄 뿐 집계된 경로 분석이 없었습니다 — 자주 달리는 도로의 히트맵, 구간별 성능 비교, 데이터 기반 경로 발견 기능이 없었습니다.",
      },
    },
    {
      icon: "👥",
      title: {
        en: "No Community Insights",
        ko: "커뮤니티 인사이트 부재",
      },
      description: {
        en: "Cyclists in the same region had no way to share route recommendations, compare performance on shared segments, or discover popular routes beyond word-of-mouth suggestions.",
        ko: "같은 지역의 사이클리스트들이 경로 추천을 공유하거나, 공통 구간의 성능을 비교하거나, 입소문 너머의 인기 경로를 발견할 방법이 없었습니다.",
      },
    },
  ],

  beforeAfter: [
    {
      before: {
        en: "Ride data scattered across multiple platforms and file formats",
        ko: "여러 플랫폼과 파일 형식에 분산된 라이딩 데이터",
      },
      after: {
        en: "Unified dashboard with 4-stage data pipeline aggregating all ride sources",
        ko: "모든 라이드 소스를 집계하는 4단계 데이터 파이프라인의 통합 대시보드",
      },
    },
    {
      before: {
        en: "Individual ride maps with no aggregate route intelligence",
        ko: "집계된 경로 인텔리전스 없는 개별 라이드 지도",
      },
      after: {
        en: "Route heatmaps and segment-level performance analysis on Kakao Maps",
        ko: "카카오맵 기반 경로 히트맵 및 구간별 성능 분석",
      },
    },
    {
      before: {
        en: "Discovering routes only through word-of-mouth or trial rides",
        ko: "입소문이나 시험 라이드로만 경로 발견",
      },
      after: {
        en: "Data-driven course recommendations based on riding patterns and preferences",
        ko: "라이딩 패턴과 선호도 기반 데이터 주도 코스 추천",
      },
    },
  ],

  approach: {
    title: {
      en: "Multi-Stage Data Pipeline Architecture",
      ko: "다단계 데이터 파이프라인 아키텍처",
    },
    description: {
      en: "Raw ride data flows through a 4-stage pipeline: Staging (ingest GPX/FIT files and normalize timestamps), Matching (identify repeated routes using GPS fingerprinting), Fingerprinting (extract segment-level features like elevation gain, average speed, and difficulty), and Curation (rank and recommend routes based on riding history and preferences). Each stage is idempotent and independently scalable. The pipeline processes EXIF metadata from ride photos to geo-tag images onto routes. Kakao Maps SDK renders the final visualization with performance overlays.",
      ko: "원시 라이드 데이터가 4단계 파이프라인을 거칩니다: 스테이징(GPX/FIT 파일 수집 및 타임스탬프 정규화), 매칭(GPS 핑거프린팅으로 반복 경로 식별), 핑거프린팅(고도 획득, 평균 속도, 난이도 등 구간 수준 특성 추출), 큐레이션(라이딩 이력과 선호도 기반 경로 순위 및 추천). 각 단계는 멱등적이고 독립적으로 확장 가능합니다. 파이프라인이 라이드 사진의 EXIF 메타데이터를 처리하여 경로에 이미지를 지오태깅합니다. 카카오맵 SDK가 성능 오버레이와 함께 최종 시각화를 렌더링합니다.",
    },
  },

  features: [
    {
      title: {
        en: "Ride Data Dashboard",
        ko: "라이드 데이터 대시보드",
      },
      description: {
        en: "Comprehensive dashboard showing all ride statistics — distance, elevation, power, heart rate — with filterable views by date range, route, and ride type. Server/client component boundary optimization ensures fast initial load with interactive drill-downs.",
        ko: "거리, 고도, 파워, 심박수 등 모든 라이드 통계를 보여주는 종합 대시보드입니다. 기간, 경로, 라이드 유형별 필터 가능한 뷰를 제공합니다. 서버/클라이언트 컴포넌트 경계 최적화로 빠른 초기 로딩과 인터랙티브 드릴다운을 보장합니다.",
      },
      image: "/projects/ride-analytics/courses.webp",
    },
    {
      title: {
        en: "Route Heatmap",
        ko: "경로 히트맵",
      },
      description: {
        en: "Aggregate visualization of all ride routes on Kakao Maps, with color intensity indicating ride frequency. Identify your most-ridden roads, discover unexplored areas nearby, and visualize seasonal riding pattern changes.",
        ko: "카카오맵에서 모든 라이드 경로의 집계 시각화로, 색상 강도가 라이드 빈도를 나타냅니다. 가장 자주 달리는 도로를 파악하고, 근처의 미개척 지역을 발견하며, 계절별 라이딩 패턴 변화를 시각화합니다.",
      },
      image: "/projects/ride-analytics/explore.webp",
    },
    {
      title: {
        en: "Performance Comparison",
        ko: "성능 비교",
      },
      description: {
        en: "Compare performance across rides on the same route — speed, power, and heart rate overlaid on the route map. Track segment-level improvements over time and identify sections where you're getting faster or slower.",
        ko: "같은 경로에서의 라이드 간 성능 비교 — 속도, 파워, 심박수를 경로 지도에 오버레이합니다. 시간에 따른 구간별 향상을 추적하고 빨라지거나 느려지는 구간을 식별합니다.",
      },
      image: "/projects/ride-analytics/course-detail.webp",
    },
    {
      title: {
        en: "Course Recommendation",
        ko: "코스 추천",
      },
      description: {
        en: "AI-powered course suggestions based on your riding history, fitness level, and preferences (distance, elevation, scenery). Analyzes curated route data to recommend new routes that match your training goals and exploration interests.",
        ko: "라이딩 이력, 체력 수준, 선호도(거리, 고도, 경치)를 바탕으로 한 AI 기반 코스 추천입니다. 큐레이션된 경로 데이터를 분석하여 훈련 목표와 탐험 관심사에 맞는 새로운 경로를 추천합니다.",
      },
      image: "/projects/ride-analytics/explore-selected.webp",
    },
  ],

  architecture: {
    nodes: [
      { id: "browser", label: { en: "Browser", ko: "브라우저" }, type: "client", x: 50, y: 50 },
      { id: "nextjs", label: { en: "Next.js 15 (RSC)", ko: "Next.js 15 (RSC)" }, type: "client", x: 200, y: 50 },
      { id: "python", label: { en: "Python Pipeline", ko: "Python 파이프라인" }, type: "server", x: 200, y: 180 },
      { id: "supabase", label: { en: "Supabase (PostgreSQL)", ko: "Supabase (PostgreSQL)" }, type: "database", x: 50, y: 180 },
      { id: "kakao", label: { en: "Kakao Maps SDK", ko: "카카오맵 SDK" }, type: "external", x: 350, y: 50 },
      { id: "gpx", label: { en: "GPX / FIT Files", ko: "GPX / FIT 파일" }, type: "external", x: 350, y: 260 },
    ],
    connections: [
      { from: "browser", to: "nextjs", label: { en: "SSR + CSR", ko: "SSR + CSR" } },
      { from: "nextjs", to: "supabase", label: { en: "Direct SQL", ko: "Direct SQL" } },
      { from: "nextjs", to: "kakao", label: { en: "Map Render", ko: "지도 렌더링" } },
      { from: "python", to: "supabase", label: { en: "Pipeline Write", ko: "파이프라인 쓰기" } },
      { from: "gpx", to: "python", label: { en: "File Ingest", ko: "파일 수집" } },
    ],
  },

  metrics: [
    {
      value: "4-stage",
      label: { en: "Data Pipeline", ko: "데이터 파이프라인" },
      description: { en: "Stage → Match → Fingerprint → Curate", ko: "스테이징 → 매칭 → 핑거프린팅 → 큐레이션" },
    },
    {
      value: "GPS",
      label: { en: "Route Fingerprinting", ko: "경로 핑거프린팅" },
      description: { en: "Automated repeated route detection via GPS matching", ko: "GPS 매칭을 통한 자동 반복 경로 감지" },
    },
    {
      value: "EXIF",
      label: { en: "Photo Geo-tagging", ko: "사진 지오태깅" },
      description: { en: "Ride photos auto-placed on routes via EXIF metadata", ko: "EXIF 메타데이터로 라이드 사진 경로에 자동 배치" },
    },
    {
      value: "RSC",
      label: { en: "Server Components", ko: "서버 컴포넌트" },
      description: { en: "Optimized server/client boundary for fast initial loads", ko: "빠른 초기 로딩을 위한 서버/클라이언트 경계 최적화" },
    },
  ],

  prevProject: {
    slug: "cpet-platform",
    title: { en: "CPET Platform", ko: "CPET 플랫폼" },
  },
  nextProject: {
    slug: "today-bike",
    title: { en: "Today.Bike", ko: "Today.Bike" },
  },
};
