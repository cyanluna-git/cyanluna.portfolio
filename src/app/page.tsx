import type { Metadata } from "next";
import styles from "./curation.module.css";

export const metadata: Metadata = {
  title: "CyanLuna — Cycling projects",
  description: "A small collection of cycling tools: AI Cycling Coach and ARGO Intervals MCP.",
  alternates: { canonical: "https://cyanluna.com" },
  openGraph: { title: "CyanLuna — Cycling projects", description: "Cycling tools for planning and understanding your training.", url: "https://cyanluna.com", type: "website" },
  twitter: { card: "summary", title: "CyanLuna — Cycling projects", description: "Cycling tools for planning and understanding your training." },
};

const COACH_URL = "https://argo-coach.cyanluna.com";
const INTERVALS_MCP_URL = "https://argo-intervals-mcp-493794931426.asia-northeast3.run.app/mcp";

export default function Home(): React.JSX.Element {
  return (
    <main id="main-content" className={styles.page}>
      <div className={styles.wrap}>
        <header className={styles.header}><span className={styles.brand}>CYANLUNA</span><span>A small collection</span></header>
        <section className={styles.intro} aria-labelledby="title"><p className={styles.eyebrow}>Cycling / tools &amp; experiments</p><h1 id="title">A few things<br />for the ride.</h1><p>Tools for planning your training and understanding your cycling data.</p></section>
        <section className={styles.projects} aria-label="Cycling projects">
          <article className={styles.card}><span className={styles.number}>01 / WEB APP</span><h2>AI Cycling Coach</h2><p>AI-assisted workout planning with Intervals.icu integration and structured cycling workouts.</p><a className={styles.link} href={COACH_URL}>Open coach <span aria-hidden="true">↗</span></a><p className={styles.note}>The public app uses the new address. Sign-in and account linking on this domain are still being verified.</p></article>
          <article className={styles.card}><span className={styles.number}>02 / REMOTE MCP · BETA</span><h2>ARGO Intervals MCP</h2><p>Connect your Intervals.icu account to an AI assistant to explore activities, training metrics and your calendar.</p><details className={styles.details}><summary>Connection details</summary><p>Add this remote MCP server URL in your assistant’s connector settings, then authorize your own Intervals.icu account.</p><code>{INTERVALS_MCP_URL}</code><p className={styles.note}>Claude use has been verified. ChatGPT use has not been verified. This endpoint requires authorization and is not a regular web page.</p></details></article>
        </section>
        <footer className={styles.footer}><span>Gerald Park · Independent developer</span><nav aria-label="More information"><a href="/garmin-mcp/">Garmin pilot · pre-launch</a><a href="/privacy/">Privacy overview</a><a href="mailto:gerald.park@cyanluna.com">Contact</a></nav></footer>
      </div>
    </main>
  );
}
