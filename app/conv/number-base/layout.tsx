import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "진법 변환기 - 2진법 3진법 8진법 10진법 12진법 16진법 32진법 36진법 변환 | ASDW.KR",
  description:
    "2진법, 3진법, 8진법, 10진법, 12진법, 16진법, 32진법, 36진법을 상호 변환하는 무료 온라인 도구입니다. Binary, Ternary, Octal, Decimal, Duodecimal, Hexadecimal, Base32, Base36 진법 변환기로 프로그래밍, 색상 코드, 파일 권한, URL 단축, 데이터 인코딩에 활용하세요.",
  keywords: [
    "진법 변환",
    "진법 변환기",
    "2진법",
    "3진법",
    "8진법",
    "10진법",
    "12진법",
    "16진법",
    "32진법",
    "36진법",
    "binary",
    "ternary",
    "octal",
    "decimal",
    "duodecimal",
    "hexadecimal",
    "base32",
    "base36",
    "hex 변환",
    "2진수 변환",
    "16진수 변환",
    "진수 변환",
    "숫자 변환",
    "진법 계산기",
    "프로그래밍 도구",
    "개발자 도구",
    "색상 코드 변환",
    "비트 연산",
    "URL 단축",
    "데이터 인코딩",
    "Google Authenticator",
    "YouTube ID",
  ],
  openGraph: {
    title: "진법 변환기 - 2진법 3진법 8진법 10진법 12진법 16진법 32진법 36진법 변환",
    description:
      "2진법, 3진법, 8진법, 10진법, 12진법, 16진법, 32진법, 36진법을 상호 변환하는 무료 온라인 도구. 프로그래밍, 색상 코드, 파일 권한, URL 단축, 데이터 인코딩에 활용하세요.",
    type: "website",
    url: "https://asdw.kr/conv/number-base",
  },
  twitter: {
    card: "summary_large_image",
    title: "진법 변환기 - 2진법 3진법 8진법 10진법 12진법 16진법 32진법 36진법 변환",
    description:
      "2진법, 3진법, 8진법, 10진법, 12진법, 16진법, 32진법, 36진법을 상호 변환하는 무료 온라인 도구. URL 단축, 데이터 인코딩 등 다양한 용도로 활용하세요.",
  },
  alternates: {
    canonical: "https://asdw.kr/conv/number-base",
  },
};

export default function NumberBaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
