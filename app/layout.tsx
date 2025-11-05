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
		"대출 계산기, BMI 계산기, CSV-JSON 변환, 이미지 변환, Favicon 생성기, 색상 대비 검사, 토너먼트 선택, QR코드 명함, UUID 생성 등 30개 이상의 무료 웹 도구를 제공합니다.",
	keywords: [
		"무료 도구",
		"웹 도구",
		"온라인 도구",
		"계산기",
		"대출 계산기",
		"이자 계산",
		"원리금 계산",
		"BMI 계산기",
		"체질량 지수",
		"비만도 계산",
		"카운트다운 타이머",
		"타이머",
		"단위 변환기",
		"데이터 크기 변환",
		"용량 변환",
		"CSV JSON 변환",
		"데이터 변환",
		"이미지 변환",
		"이미지 포맷 변환",
		"QR코드 생성",
		"QR코드 만들기",
		"명함 QR코드",
		"연락처 QR코드",
		"QR 명함",
		"전자명함",
		"디지털 명함",
		"스마트 명함",
		"vCard 생성기",
		"연락처 저장",
		"UUID 생성",
		"UUID 생성기",
		"고유 식별자",
		"GUID 생성",
		"UUID v4",
		"랜덤 UUID",
		"비밀번호 생성기",
		"랜덤 비밀번호",
		"Favicon 생성기",
		"파비콘 만들기",
		"파비콘 패키지",
		"아이콘 생성",
		"토너먼트 선택",
		"투표 도구",
		"랜덤 추첨",
		"선택 도구",
		"글자수 세기",
		"문자 개수",
		"텍스트 중복 제거",
		"중복 라인 제거",
		"텍스트 비교",
		"텍스트 차이",
		"색상 대비 검사",
		"WCAG 접근성",
		"컬러 대비",
		"웹 접근성",
		"Base64 인코딩",
		"Base64 변환",
		"JSON 포맷터",
		"JSON 정리",
		"타임스탬프 변환",
		"시간 변환",
	],
	authors: [{ name: "ASDW", url: "https://asdw.kr" }],
	creator: "ASDW",
	publisher: "ASDW",
	icons: {
		icon: [
			{ url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
			{ url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
		],
		apple: [
			{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
		],
	},
	manifest: "/manifest.json",
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
			"대출 계산기, BMI 계산기, CSV-JSON 변환, 이미지 변환, Favicon 생성기, 색상 대비 검사, QR코드 명함, UUID 생성 등 30개 이상의 무료 웹 도구",
		images: [{ url: "/og-image.png", width: 1200, height: 630 }],
	},
	twitter: {
		card: "summary_large_image",
		title: "ASDW.KR - 무료 웹 도구 모음",
		description:
			"대출 계산기, BMI 계산기, CSV-JSON 변환, 이미지 변환, Favicon 생성기, 색상 대비 검사, QR코드 명함, UUID 생성 등 30개 이상의 무료 웹 도구",
		images: ["/og-image.png"],
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
				{/* Google tag (gtag.js) */}
				<script
					async
					src="https://www.googletagmanager.com/gtag/js?id=G-2F7NR3L51L"
				></script>
				<script
					dangerouslySetInnerHTML={{
						__html: `
							window.dataLayer = window.dataLayer || [];
							function gtag(){dataLayer.push(arguments);}
							gtag('js', new Date());
							gtag('config', 'G-2F7NR3L51L');
						`,
					}}
				/>
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
				{/* Kakao Adfit */}
				<ins
					className="kakao_ad_area"
					style={{ display: "none" }}
					data-ad-unit="DAN-WhMFh69sj0ufY1Ty"
					data-ad-width="728"
					data-ad-height="90"
				></ins>
				<script
					type="text/javascript"
					src="//t1.daumcdn.net/kas/static/ba.min.js"
					async
				></script>
			</body>
		</html>
	);
}
