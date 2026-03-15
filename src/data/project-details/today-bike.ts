import type { ProjectDetail } from "@/types/project-detail";

export const todayBike: ProjectDetail = {
  slug: "today-bike",
  vertical: "consumer",
  verticalColor: "#6366F1",
  status: "beta",
  title: {
    en: "Today.Bike",
    ko: "Today.Bike",
  },
  tagline: {
    en: "Bicycle service management platform — from intake to delivery",
    ko: "접수부터 출고까지, 자전거 서비스 관리 플랫폼",
  },
  heroImage: "/projects/today-bike/home.webp",

  painPoints: [
    {
      icon: "📋",
      title: {
        en: "Paper-Based Service Tracking",
        ko: "종이 기반 서비스 관리",
      },
      description: {
        en: "Most bicycle shops still track service orders on whiteboards or paper logbooks. Orders get lost between stages, mechanics can't see what's queued, and owners have no visibility into shop throughput. A single misplaced note means a customer's bike sits untouched for days.",
        ko: "대부분의 자전거 매장은 여전히 화이트보드나 종이 장부로 서비스 주문을 추적합니다. 단계 사이에서 주문이 분실되고, 정비사는 대기열을 볼 수 없으며, 대표는 매장 처리량을 파악할 수 없습니다. 메모 하나를 잃어버리면 고객의 자전거가 며칠이나 방치됩니다.",
      },
    },
    {
      icon: "📞",
      title: {
        en: "Phone-Call Status Updates",
        ko: "전화 기반 진행 확인",
      },
      description: {
        en: "Every customer calls to ask 'Is my bike ready?' — interrupting mechanics mid-repair. There's no self-service portal, no automated notifications, and no way for customers to track progress on their own. The shop phone becomes a bottleneck.",
        ko: "모든 고객이 '제 자전거 다 됐나요?'라고 전화합니다 — 수리 중인 정비사의 작업을 중단시킵니다. 셀프서비스 포털도, 자동 알림도, 고객이 스스로 진행 상황을 추적할 방법도 없습니다. 매장 전화가 병목이 됩니다.",
      },
    },
    {
      icon: "🔍",
      title: {
        en: "No Service History",
        ko: "정비 이력 부재",
      },
      description: {
        en: "When a customer returns for a second visit, the shop has no record of what was done before. Parts replaced, adjustments made, recurring issues — all lost. Without a service history tied to each bicycle, every visit starts from zero.",
        ko: "고객이 재방문하면 이전에 어떤 작업을 했는지 기록이 없습니다. 교체한 부품, 조정 내용, 반복 문제 — 모두 소실됩니다. 각 자전거에 연결된 정비 이력 없이, 매번 처음부터 시작합니다.",
      },
    },
  ],

  beforeAfter: [
    {
      before: {
        en: "Whiteboard with sticky notes tracking 20+ service orders",
        ko: "20건 이상의 서비스 주문을 포스트잇으로 추적하는 화이트보드",
      },
      after: {
        en: "Digital kanban board with drag-and-drop across 4 service stages",
        ko: "4개 서비스 단계를 드래그 앤 드롭으로 관리하는 디지털 칸반 보드",
      },
    },
    {
      before: {
        en: "Customers calling the shop repeatedly to check repair status",
        ko: "수리 상태 확인을 위해 매장에 반복 전화하는 고객",
      },
      after: {
        en: "Customer portal with real-time status tracking via Kakao login",
        ko: "카카오 로그인으로 실시간 진행 상황을 확인하는 고객 포털",
      },
    },
    {
      before: {
        en: "No proof of work quality — just 'trust us, it's fixed'",
        ko: "작업 품질 증명 불가 — '다 고쳤습니다' 말뿐",
      },
      after: {
        en: "Before & After photo gallery documenting every transformation",
        ko: "모든 정비 과정을 기록하는 Before & After 사진 갤러리",
      },
    },
  ],

  approach: {
    title: {
      en: "Shop Operations as a Service Pipeline",
      ko: "매장 운영의 서비스 파이프라인화",
    },
    description: {
      en: "The platform models the entire bicycle service lifecycle as a structured pipeline — reception, diagnosis, repair, and delivery — each with its own checklist and photo documentation points. Every bicycle gets a digital passport (QR code) that links to its complete service history. The admin panel provides a kanban view where mechanics drag orders between stages, while the customer-facing portal lets owners track their bike's status in real-time via Kakao OAuth login. Built with Rails 8 for rapid full-stack iteration, SQLite for zero-ops deployment, and Stimulus for lightweight interactivity without the overhead of a JavaScript framework.",
      ko: "플랫폼은 자전거 서비스 전체 수명주기를 구조화된 파이프라인으로 모델링합니다 — 접수, 진단, 수리, 출고 — 각 단계마다 체크리스트와 사진 기록 포인트가 있습니다. 모든 자전거에 QR 코드 기반 디지털 여권이 부여되어 완전한 정비 이력과 연결됩니다. 관리자 패널은 정비사가 주문을 단계 간 드래그하는 칸반 뷰를 제공하고, 고객 포털에서는 카카오 OAuth 로그인으로 자전거 상태를 실시간 추적할 수 있습니다. Rails 8로 빠른 풀스택 반복 개발, SQLite로 운영 부담 없는 배포, Stimulus로 JavaScript 프레임워크 부담 없는 경량 인터랙티비티를 구현했습니다.",
    },
  },

  features: [
    {
      title: {
        en: "Service Workflow Engine",
        ko: "서비스 워크플로우 엔진",
      },
      description: {
        en: "Six service types (overhaul, repair, fitting, upgrade, parts, rental) each with step-by-step processes. From initial condition assessment and full disassembly to cleaning, greasing, reassembly, and final test ride — every step is documented with photos and notes. Customers see exactly what was done and why.",
        ko: "6가지 서비스 유형(분해정비, 수리, 피팅, 업그레이드, 파츠, 대여) 각각에 단계별 프로세스가 있습니다. 초기 상태 점검과 완전 분해부터 세척, 그리싱, 재조립, 최종 테스트 라이딩까지 — 모든 단계가 사진과 메모로 기록됩니다. 고객은 무엇을, 왜 했는지 정확히 확인할 수 있습니다.",
      },
      image: "/projects/today-bike/service-overhaul.webp",
    },
    {
      title: {
        en: "Before & After Gallery",
        ko: "Before & After 갤러리",
      },
      description: {
        en: "Every service order captures the bicycle's condition before and after work. The gallery becomes a living portfolio of the shop's craftsmanship — showing potential customers the quality of transformation they can expect. Each entry links to the specific bicycle model, service type, and date for complete traceability.",
        ko: "모든 서비스 주문에서 작업 전후 자전거 상태를 촬영합니다. 갤러리는 매장 장인정신의 살아있는 포트폴리오가 되어, 잠재 고객에게 기대할 수 있는 변화의 품질을 보여줍니다. 각 항목은 특정 자전거 모델, 서비스 유형, 날짜와 연결되어 완전한 추적이 가능합니다.",
      },
      image: "/projects/today-bike/gallery.webp",
    },
    {
      title: {
        en: "Operations Dashboard",
        ko: "운영 대시보드",
      },
      description: {
        en: "Real-time overview of shop operations: total customers, registered bicycles, active service orders, and completion rates. The kanban board visualizes the service pipeline with cards flowing through reception, diagnosis, in-progress, and delivery columns. Quick actions let staff create new orders, register customers, or add bicycles in one click.",
        ko: "매장 운영의 실시간 개요: 총 고객수, 등록 자전거, 활성 서비스 주문, 완료율. 칸반 보드가 서비스 파이프라인을 시각화하여 접수, 진단, 작업중, 출고 열로 카드가 흐릅니다. 빠른 실행 버튼으로 직원이 새 주문 생성, 고객 등록, 자전거 추가를 원클릭으로 처리합니다.",
      },
      image: "/projects/today-bike/admin-kanban.webp",
    },
    {
      title: {
        en: "Products & Parts Catalog",
        ko: "제품 & 파츠 카탈로그",
      },
      description: {
        en: "Integrated product catalog for parts, accessories, apparel, nutrition, and supplies. Categories with filtering let customers browse available items online. Each product links to service orders where it was used, creating a complete chain from part to repair to bicycle.",
        ko: "파츠, 액세서리, 의류, 보급식, 기타 용품을 위한 통합 제품 카탈로그. 카테고리 필터링으로 고객이 온라인에서 이용 가능한 제품을 탐색할 수 있습니다. 각 제품은 사용된 서비스 주문과 연결되어 부품에서 수리, 자전거까지 완전한 체인을 만듭니다.",
      },
      image: "/projects/today-bike/products.webp",
    },
  ],

  architecture: {
    nodes: [
      { id: "browser", label: { en: "Browser", ko: "브라우저" }, type: "client", x: 50, y: 50 },
      { id: "rails", label: { en: "Rails 8", ko: "Rails 8" }, type: "server", x: 200, y: 50 },
      { id: "sqlite", label: { en: "SQLite", ko: "SQLite" }, type: "database", x: 50, y: 180 },
      { id: "stimulus", label: { en: "Stimulus + Turbo", ko: "Stimulus + Turbo" }, type: "client", x: 350, y: 50 },
      { id: "kakao", label: { en: "Kakao OAuth", ko: "카카오 OAuth" }, type: "external", x: 350, y: 180 },
      { id: "storage", label: { en: "Active Storage", ko: "Active Storage" }, type: "service", x: 200, y: 180 },
    ],
    connections: [
      { from: "browser", to: "rails", label: { en: "Turbo Stream", ko: "Turbo Stream" } },
      { from: "rails", to: "sqlite", label: { en: "Active Record", ko: "Active Record" } },
      { from: "rails", to: "stimulus", label: { en: "Hotwire", ko: "Hotwire" } },
      { from: "rails", to: "kakao", label: { en: "OAuth 2.0", ko: "OAuth 2.0" } },
      { from: "rails", to: "storage", label: { en: "Photo Upload", ko: "사진 업로드" } },
    ],
  },

  metrics: [
    {
      value: "20",
      label: { en: "Domain Models", ko: "도메인 모델" },
      description: { en: "Covering full shop operations from customers to invoices", ko: "고객부터 청구서까지 전체 매장 운영을 커버" },
    },
    {
      value: "6",
      label: { en: "Service Types", ko: "서비스 유형" },
      description: { en: "Overhaul, repair, fitting, upgrade, parts, and rental workflows", ko: "분해정비, 수리, 피팅, 업그레이드, 파츠, 대여 워크플로우" },
    },
    {
      value: "QR",
      label: { en: "Bicycle Passport", ko: "자전거 여권" },
      description: { en: "QR code linking each bicycle to its complete service history", ko: "각 자전거를 완전한 정비 이력에 연결하는 QR 코드" },
    },
    {
      value: "Live",
      label: { en: "Production", ko: "운영 중" },
      description: { en: "Running at asan.bike serving a real bicycle shop", ko: "asan.bike에서 실제 자전거 매장에 서비스 중" },
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
