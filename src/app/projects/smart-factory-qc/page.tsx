export const metadata = {
  title: "OQC Platform — AI-Driven Smart Factory QC System",
  description:
    "반도체/디스플레이 공장의 OQC 프로세스를 디지털화. Edge Runner로 현장 검사를 실행하고, Manager로 SOP·결과·리포트를 통합 관리하는 풀스택 IIoT QC 플랫폼.",
  openGraph: {
    title: "OQC Platform — AI-Driven Smart Factory QC System — CyanLuna",
    description:
      "반도체/디스플레이 공장의 OQC 프로세스를 디지털화. Edge Runner로 현장 검사를 실행하고, Manager로 SOP·결과·리포트를 통합 관리하는 풀스택 IIoT QC 플랫폼.",
    url: "https://cyanluna.com/projects/smart-factory-qc",
    type: "article",
  },
  twitter: {
    card: "summary_large_image" as const,
    title: "OQC Platform — AI-Driven Smart Factory QC System",
    description:
      "반도체/디스플레이 공장의 OQC 프로세스를 디지털화. Edge Runner로 현장 검사를 실행하고, Manager로 SOP·결과·리포트를 통합 관리하는 풀스택 IIoT QC 플랫폼.",
  },
  alternates: {
    canonical: "https://cyanluna.com/projects/smart-factory-qc",
  },
};

export default function SmartFactoryQcSlidePage() {
  return (
    <iframe
      src="/demo/smart-factory-qc/slides.html"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        border: "none",
        display: "block",
      }}
      title="OQC Platform — AI-Driven Smart Factory QC System"
    />
  );
}
