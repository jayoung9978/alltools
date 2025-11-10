import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "진법 변환기 - 2진법 8진법 10진법 16진법 변환 | ASDW.KR",
  description:
    "2진법, 8진법, 10진법, 16진법을 상호 변환하는 무료 온라인 도구입니다. Binary, Octal, Decimal, Hexadecimal 진법 변환기로 프로그래밍, 색상 코드, 파일 권한 계산에 활용하세요.",
  keywords: [
    "진법 변환",
    "진법 변환기",
    "2진법",
    "8진법",
    "10진법",
    "16진법",
    "binary",
    "octal",
    "decimal",
    "hexadecimal",
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
  ],
  openGraph: {
    title: "진법 변환기 - 2진법 8진법 10진법 16진법 변환",
    description:
      "2진법, 8진법, 10진법, 16진법을 상호 변환하는 무료 온라인 도구. 프로그래밍, 색상 코드, 파일 권한 계산에 활용하세요.",
    type: "website",
    url: "https://asdw.kr/conv/number-base",
  },
  twitter: {
    card: "summary_large_image",
    title: "진법 변환기 - 2진법 8진법 10진법 16진법 변환",
    description:
      "2진법, 8진법, 10진법, 16진법을 상호 변환하는 무료 온라인 도구",
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
