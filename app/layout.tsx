import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/common/JsonLd";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://asdw.kr"),
  title: {
    default: "ASDW.KR - 무료 웹 도구 모음",
    template: "%s | ASDW.KR",
  },
  description:
    "대출 계산기, BMI 계산기, 단위 변환, QR코드 생성, 비밀번호 생성기 등 20개 이상의 무료 웹 도구를 제공합니다.",
  keywords: [
    "무료 도구",
    "웹 도구",
    "계산기",
    "대출 계산기",
    "BMI 계산기",
    "단위 변환기",
    "QR코드 생성",
    "비밀번호 생성기",
    "글자수 세기",
    "텍스트 비교",
    "Base64 인코딩",
    "JSON 포맷터",
    "타임스탬프 변환",
    "온라인 도구",
  ],
  authors: [{ name: "ASDW", url: "https://asdw.kr" }],
  creator: "ASDW",
  publisher: "ASDW",
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
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://asdw.kr",
    siteName: "ASDW.KR",
    title: "ASDW.KR - 무료 웹 도구 모음",
    description:
      "대출 계산기, BMI 계산기, 단위 변환, QR코드 생성 등 20개 이상의 무료 웹 도구",
  },
  twitter: {
    card: "summary_large_image",
    title: "ASDW.KR - 무료 웹 도구 모음",
    description:
      "대출 계산기, BMI 계산기, 단위 변환, QR코드 생성 등 20개 이상의 무료 웹 도구",
  },
  verification: {
    // 나중에 Google Search Console에서 받은 verification code 추가
    // google: "your-google-site-verification-code",
  },
  alternates: {
    canonical: "https://asdw.kr",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <JsonLd />
        {/* Google AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4943284524590783"
          crossOrigin="anonymous"
        ></script>
      </head>
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
