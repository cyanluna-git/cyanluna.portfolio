import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Private Workspace",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      "max-image-preview": "none",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function PrivacyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
