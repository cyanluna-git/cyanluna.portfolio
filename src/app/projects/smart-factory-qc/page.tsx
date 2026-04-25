import "./activeqc.css";
import ActiveQcPage from "./ActiveQcPage";

const SITE_URL = "https://cyanluna.com";
const SLUG = "smart-factory-qc";

export function generateMetadata() {
  return {
    title: "ActiveQC — Kill the Excel Checklist",
    description:
      "고부가가치 산업 설비의 출하 검수를 Excel에서 벗어나 자동화하는 Edge-Native Quality Execution Platform",
    openGraph: {
      title: "ActiveQC — Kill the Excel Checklist",
      description:
        "고부가가치 산업 설비의 출하 검수를 Excel에서 벗어나 자동화하는 Edge-Native Quality Execution Platform",
      url: `${SITE_URL}/projects/${SLUG}`,
      type: "article" as const,
    },
    twitter: {
      card: "summary_large_image" as const,
      title: "ActiveQC — Kill the Excel Checklist",
      description:
        "고부가가치 산업 설비의 출하 검수를 Excel에서 벗어나 자동화하는 Edge-Native Quality Execution Platform",
    },
    alternates: { canonical: `${SITE_URL}/projects/${SLUG}` },
  };
}

export default async function SmartFactoryQcPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const { lang } = await searchParams;
  const initialLang = lang === "ko" ? "ko" : "en";
  return <ActiveQcPage initialLang={initialLang} />;
}
