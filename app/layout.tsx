import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ASDW.KR - 무료 웹 도구 모음",
  description: "계산기, 변환기, 생성기 등 다양한 무료 웹 도구를 제공합니다.",
  keywords: ["도구", "계산기", "변환기", "생성기", "무료", "온라인"],
  authors: [{ name: "ASDW" }],
  openGraph: {
    title: "ASDW.KR - 무료 웹 도구 모음",
    description: "계산기, 변환기, 생성기 등 다양한 무료 웹 도구를 제공합니다.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
