import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://cyanlunaportfolio.vercel.app";
const TITLE = "CyanLuna — Engineering Portfolio";
const DESCRIPTION =
  "Full-stack engineer building manufacturing automation, health tech, and AI-native developer tools.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s — CyanLuna",
  },
  description: DESCRIPTION,
  keywords: [
    "full-stack engineer",
    "manufacturing automation",
    "health tech",
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

const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem('theme');if(t==='light'){document.documentElement.setAttribute('data-theme','light')}else if(!t&&window.matchMedia('(prefers-color-scheme:light)').matches){document.documentElement.setAttribute('data-theme','light')}}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased grain`}
      >
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
                jobTitle: "Full-Stack Engineer",
                description: DESCRIPTION,
                knowsAbout: [
                  "Manufacturing Automation",
                  "Health Tech",
                  "AI Developer Tools",
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
