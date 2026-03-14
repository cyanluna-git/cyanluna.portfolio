import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Private",
  robots: {
    index: false,
    follow: false,
  },
};

export default function PrivacyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
