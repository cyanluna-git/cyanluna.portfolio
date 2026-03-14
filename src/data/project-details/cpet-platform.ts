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
    en: "Digital transformation of cardiopulmonary exercise test data",
    ko: "심폐운동부하검사 데이터의 디지털 전환",
  },
  heroImage: "/projects/cpet-platform/hero.png",

  painPoints: [
    {
      icon: "📄",
      title: {
        en: "Paper-Based CPET Reports",
        ko: "종이 기반 CPET 리포트",
      },
      description: {
        en: "Cardiopulmonary exercise test results were printed on paper or saved as static PDFs, making it impossible to search, compare, or digitally process the data for longitudinal analysis.",
        ko: "심폐운동부하검사 결과가 종이에 인쇄되거나 정적 PDF로 저장되어, 종적 분석을 위한 검색, 비교, 디지털 처리가 불가능했습니다.",
      },
    },
    {
      icon: "📉",
      title: {
        en: "No Trend Analysis",
        ko: "추이 분석 부재",
      },
      description: {
        en: "Without digitized historical data, clinicians couldn't track patient progress over multiple tests. Comparing VO2max improvements or fat oxidation changes across months required manually pulling archived files.",
        ko: "디지털화된 이력 데이터 없이 임상의가 여러 검사에 걸친 환자 경과를 추적할 수 없었습니다. 수개월간의 VO2max 향상이나 지방 산화 변화를 비교하려면 보관된 파일을 수동으로 찾아야 했습니다.",
      },
    },
    {
      icon: "✍️",
      title: {
        en: "Manual Data Entry",
        ko: "수동 데이터 입력",
      },
      description: {
        en: "Breath-by-breath metabolic data from COSMED K5 equipment was manually transcribed into spreadsheets, introducing transcription errors and consuming valuable clinical time.",
        ko: "COSMED K5 장비의 호흡별 대사 데이터를 수동으로 스프레드시트에 옮겨 적어, 전사 오류가 발생하고 귀중한 임상 시간이 소모되었습니다.",
      },
    },
  ],

  beforeAfter: [
    {
      before: {
        en: "Paper printouts and static PDFs for CPET results",
        ko: "CPET 결과를 종이 출력물과 정적 PDF로 관리",
      },
      after: {
        en: "Digital reports with interactive charts and automated analysis",
        ko: "인터랙티브 차트와 자동 분석이 포함된 디지털 리포트",
      },
    },
    {
      before: {
        en: "Manual spreadsheet transcription of breath-by-breath data",
        ko: "호흡별 데이터를 수동으로 스프레드시트에 전사",
      },
      after: {
        en: "Direct data import from COSMED K5 with automated processing pipeline",
        ko: "COSMED K5에서 직접 데이터 가져오기 및 자동 처리 파이프라인",
      },
    },
    {
      before: {
        en: "No way to compare patient results across multiple test sessions",
        ko: "여러 검사 세션에 걸친 환자 결과 비교 방법 없음",
      },
      after: {
        en: "Longitudinal trend analysis with VO2max and FATMAX progression tracking",
        ko: "VO2max 및 FATMAX 진행 추적이 포함된 종적 추이 분석",
      },
    },
  ],

  approach: {
    title: {
      en: "Structured Data Pipeline for Clinical Precision",
      ko: "임상 정밀도를 위한 구조화된 데이터 파이프라인",
    },
    description: {
      en: "The platform ingests raw breath-by-breath data from COSMED K5 equipment and processes it through a standardized pipeline: parsing raw CSV exports, applying smoothing algorithms (30-second rolling averages), calculating derived metrics (VO2max, VT1/VT2, FATMAX), and generating publication-quality reports. TimescaleDB hypertables store time-series data efficiently, enabling sub-second queries across thousands of data points per test. UUID-based patient identification with encrypted subject names ensures HIPAA-compliant data handling throughout the pipeline.",
      ko: "플랫폼이 COSMED K5 장비의 원시 호흡별 데이터를 수집하여 표준화된 파이프라인으로 처리합니다: 원시 CSV 내보내기 파싱, 평활 알고리즘 적용(30초 이동 평균), 파생 메트릭 계산(VO2max, VT1/VT2, FATMAX), 출판 품질의 리포트 생성. TimescaleDB 하이퍼테이블이 시계열 데이터를 효율적으로 저장하여 검사당 수천 개 데이터 포인트에 대한 서브초 쿼리를 가능하게 합니다. 암호화된 피검자명과 UUID 기반 환자 식별로 파이프라인 전체에서 의료 데이터 규정을 준수합니다.",
    },
  },

  features: [
    {
      title: {
        en: "Test Data Entry",
        ko: "검사 데이터 입력",
      },
      description: {
        en: "Streamlined interface for importing breath-by-breath metabolic data from COSMED K5 exports. Supports multiple test protocols (Bruce, Ramp) with automatic parameter detection and validation of physiological ranges.",
        ko: "COSMED K5 내보내기에서 호흡별 대사 데이터를 가져오기 위한 간소화된 인터페이스입니다. 다중 검사 프로토콜(Bruce, Ramp)을 지원하며 생리학적 범위의 자동 매개변수 감지 및 유효성 검증을 제공합니다.",
      },
      image: "/projects/cpet-platform/feature-data-entry.png",
    },
    {
      title: {
        en: "Automated Report Generation",
        ko: "자동 리포트 생성",
      },
      description: {
        en: "One-click generation of comprehensive CPET reports including VO2max, ventilatory thresholds (VT1/VT2), FATMAX zone, and exercise prescription. Exports to PDF with publication-quality charts and clinical interpretation guidelines.",
        ko: "VO2max, 환기 역치(VT1/VT2), FATMAX 존, 운동 처방이 포함된 종합 CPET 리포트를 원클릭으로 생성합니다. 출판 품질의 차트와 임상 해석 가이드라인이 포함된 PDF로 내보냅니다.",
      },
      image: "/projects/cpet-platform/feature-report.png",
    },
    {
      title: {
        en: "Patient Trend Analysis",
        ko: "환자 추이 분석",
      },
      description: {
        en: "Longitudinal visualization of patient progress across multiple CPET sessions. Track VO2max improvements, fat oxidation rate changes, and ventilatory threshold shifts over weeks and months with interactive comparison charts.",
        ko: "여러 CPET 세션에 걸친 환자 경과의 종적 시각화입니다. 인터랙티브 비교 차트로 수주 및 수개월간의 VO2max 향상, 지방 산화율 변화, 환기 역치 이동을 추적합니다.",
      },
      image: "/projects/cpet-platform/feature-trend.png",
    },
    {
      title: {
        en: "Multi-Protocol Support (Bruce, Ramp)",
        ko: "멀티 프로토콜 지원 (Bruce, Ramp)",
      },
      description: {
        en: "Supports industry-standard exercise protocols including Bruce (staged treadmill) and Ramp (continuous incremental). Protocol-specific analysis templates ensure accurate threshold detection regardless of test methodology.",
        ko: "Bruce(단계별 트레드밀) 및 Ramp(연속 증분) 등 산업 표준 운동 프로토콜을 지원합니다. 프로토콜별 분석 템플릿으로 검사 방법에 관계없이 정확한 역치 감지를 보장합니다.",
      },
      image: "/projects/cpet-platform/feature-protocol.png",
    },
  ],

  architecture: {
    nodes: [
      { id: "browser", label: { en: "Browser", ko: "브라우저" }, type: "client", x: 50, y: 50 },
      { id: "nextjs", label: { en: "Next.js Frontend", ko: "Next.js 프론트엔드" }, type: "client", x: 200, y: 50 },
      { id: "fastapi", label: { en: "FastAPI", ko: "FastAPI" }, type: "server", x: 200, y: 180 },
      { id: "postgres", label: { en: "PostgreSQL + TimescaleDB", ko: "PostgreSQL + TimescaleDB" }, type: "database", x: 50, y: 180 },
      { id: "pdf", label: { en: "PDF Generation", ko: "PDF 생성" }, type: "service", x: 350, y: 180 },
      { id: "cosmed", label: { en: "COSMED K5 Data", ko: "COSMED K5 데이터" }, type: "external", x: 350, y: 310 },
    ],
    connections: [
      { from: "browser", to: "nextjs", label: { en: "SPA", ko: "SPA" } },
      { from: "nextjs", to: "fastapi", label: { en: "REST API", ko: "REST API" } },
      { from: "fastapi", to: "postgres", label: { en: "Time-series SQL", ko: "시계열 SQL" } },
      { from: "fastapi", to: "pdf", label: { en: "Report Export", ko: "리포트 내보내기" } },
      { from: "cosmed", to: "fastapi", label: { en: "CSV Import", ko: "CSV 가져오기" } },
    ],
  },

  metrics: [
    {
      value: "B×B",
      label: { en: "Breath-by-Breath", ko: "호흡별 분석" },
      description: { en: "High-frequency metabolic data processing from COSMED K5", ko: "COSMED K5의 고빈도 대사 데이터 처리" },
    },
    {
      value: "PDF",
      label: { en: "Digital Reports", ko: "디지털 리포트" },
      description: { en: "Automated publication-quality CPET reports", ko: "자동 생성 출판 품질 CPET 리포트" },
    },
    {
      value: "2+",
      label: { en: "Test Protocols", ko: "검사 프로토콜" },
      description: { en: "Bruce and Ramp protocols with protocol-specific analysis", ko: "프로토콜별 분석이 포함된 Bruce 및 Ramp 프로토콜" },
    },
    {
      value: "UUID",
      label: { en: "Patient Tracking", ko: "환자 추적" },
      description: { en: "Encrypted identification for compliant longitudinal tracking", ko: "규정 준수 종적 추적을 위한 암호화 식별" },
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
