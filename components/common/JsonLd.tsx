export default function JsonLd() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ASDW.KR",
    url: "https://asdw.kr",
    description: "대출 계산기, BMI 계산기, 단위 변환, QR코드 생성 등 무료 웹 도구 모음",
    inLanguage: "ko-KR",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://asdw.kr/?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "ASDW.KR",
    url: "https://asdw.kr",
    description: "대출 계산기, BMI 계산기, 단위 변환, QR코드 생성 등 20개 이상의 무료 웹 도구",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "KRW",
    },
    featureList: [
      "대출 계산기",
      "BMI 계산기",
      "단위 변환기",
      "진법 변환기",
      "데이터 크기 변환",
      "QR코드 생성기",
      "UUID 생성기",
      "비밀번호 생성기",
      "글자수 세기",
      "텍스트 비교",
      "중복 제거",
      "색상 대비 검사",
      "Base64 인코딩",
      "JSON 포맷터",
      "타임스탬프 변환",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
    </>
  );
}
