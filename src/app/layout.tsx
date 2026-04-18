import type { Metadata } from "next";
import { IBM_Plex_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";

const uiSans = IBM_Plex_Sans({
  variable: "--font-ui",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://cyanluna.com";
const TITLE = "CyanLuna — AI-Native Problem Solver";
const DESCRIPTION =
  "AI-native full-stack engineer building manufacturing DX, operational data systems, and fast internal tools through deep problem discovery and rapid solution delivery.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s — CyanLuna",
  },
  description: DESCRIPTION,
  keywords: [
    "AI-native problem solver",
    "full-stack engineer",
    "manufacturing DX",
    "manufacturing automation",
    "operational tooling",
    "data visualization",
    "internal tools",
    "AI developer tools",
    "React",
    "Next.js",
    "FastAPI",
    "portfolio",
    "CyanLuna",
  ],
  authors: [{ name: "CyanLuna" }],
  creator: "CyanLuna",
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "CyanLuna Portfolio",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'){document.documentElement.setAttribute('data-theme','dark')}else{document.documentElement.removeAttribute('data-theme')}}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body
        className={`${uiSans.variable} ${geistMono.variable} antialiased grain`}
      >
        <div className="page-grid" aria-hidden="true" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfilePage",
              mainEntity: {
                "@type": "Person",
                name: "CyanLuna",
                url: SITE_URL,
                jobTitle: "AI-Native Full-Stack Engineer",
                description: DESCRIPTION,
                knowsAbout: [
                  "Manufacturing DX",
                  "Operational Data Systems",
                  "AI-Native Tooling",
                  "Data Visualization",
                  "Internal Tools",
                  "React",
                  "Next.js",
                  "FastAPI",
                  "PostgreSQL",
                ],
                sameAs: [],
              },
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
