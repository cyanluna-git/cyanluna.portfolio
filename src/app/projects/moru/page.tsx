import { getProjectHtmlUrl } from "@/lib/project-html-blob";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Moru — AI-Driven IIoT Engineering Platform",
  description:
    "자연어로 제어 로직을 말하면 Rust 코드로 조립하고, BDD 검증 + Human Approval을 거쳐 현장에 배포하는 AI 제어 엔지니어링 에이전트.",
  openGraph: {
    title: "Moru — AI-Driven IIoT Engineering Platform — CyanLuna",
    description:
      "자연어로 제어 로직을 말하면 Rust 코드로 조립하고, BDD 검증 + Human Approval을 거쳐 현장에 배포하는 AI 제어 엔지니어링 에이전트.",
    url: "https://cyanluna.com/projects/moru",
    type: "article",
  },
  twitter: {
    card: "summary_large_image" as const,
    title: "Moru — AI-Driven IIoT Engineering Platform",
    description:
      "자연어로 제어 로직을 말하면 Rust 코드로 조립하고, BDD 검증 + Human Approval을 거쳐 현장에 배포하는 AI 제어 엔지니어링 에이전트.",
  },
  alternates: {
    canonical: "https://cyanluna.com/projects/moru",
  },
};

export default async function MoruSlidePage() {
  let blobUrl: string | null = null;
  try {
    blobUrl = await getProjectHtmlUrl("moru");
  } catch {
    // blob unavailable — fall through to static
  }

  const src = blobUrl ? "/api/projects/moru/html" : "/demo/moru/slides.html";

  return (
    <iframe
      src={src}
      {...(blobUrl ? { sandbox: "allow-scripts" } : {})}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        border: "none",
        display: "block",
      }}
      title="Moru — AI-Driven IIoT Engineering Platform"
    />
  );
}
