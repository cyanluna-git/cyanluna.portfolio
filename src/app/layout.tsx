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

export const metadata: Metadata = {
  title: "CyanLuna — Engineering Portfolio",
  description:
    "Full-stack engineer building manufacturing automation, health tech, and AI-native developer tools.",
  openGraph: {
    title: "CyanLuna — Engineering Portfolio",
    description:
      "Full-stack engineer building manufacturing automation, health tech, and AI-native developer tools.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased grain`}
      >
        {children}
      </body>
    </html>
  );
}
