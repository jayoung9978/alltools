export interface Tool {
  id: string;
  name: string;
  description: string;
  href: string;
  popular?: boolean;
}

export interface ToolCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  subdomain: string;
  tools: Tool[];
}

export const toolCategories: ToolCategory[] = [
  {
    id: "calc",
    name: "계산기",
    description: "금융, 건강, 날짜 등 다양한 계산기",
    icon: "🔢",
    subdomain: "calc",
    tools: [
      {
        id: "loan",
        name: "대출 계산기",
        description: "원리금균등, 원금균등 상환 방식 계산",
        href: "/calc/loan",
        popular: true,
      },
      {
        id: "bmi",
        name: "BMI 계산기",
        description: "체질량지수와 비만도 판정",
        href: "/calc/bmi",
        popular: true,
      },
      {
        id: "date",
        name: "날짜 계산기",
        description: "D-day, 날짜 차이 계산",
        href: "/calc/date",
        popular: true,
      },
      {
        id: "vat",
        name: "부가세 계산기",
        description: "부가세 포함/제외 가격 계산",
        href: "/calc/vat",
      },
      {
        id: "pyeong",
        name: "평수 계산기",
        description: "평 ↔ ㎡ 변환",
        href: "/calc/pyeong",
      },
      {
        id: "discount",
        name: "할인율 계산기",
        description: "할인율, 할인가 계산",
        href: "/calc/discount",
      },
      {
        id: "countdown",
        name: "카운트다운 타이머",
        description: "D-day, 이벤트까지 남은 시간",
        href: "/calc/countdown",
      },
    ],
  },
  {
    id: "conv",
    name: "변환기",
    description: "단위, 색상, 데이터 형식 변환",
    icon: "🔄",
    subdomain: "conv",
    tools: [
      {
        id: "color",
        name: "색상 변환기",
        description: "HEX ↔ RGB ↔ HSL 변환",
        href: "/conv/color",
        popular: true,
      },
      {
        id: "base64",
        name: "Base64 변환",
        description: "텍스트 ↔ Base64 인코딩/디코딩",
        href: "/conv/base64",
      },
      {
        id: "unit",
        name: "단위 변환",
        description: "길이, 무게, 온도 등 단위 변환",
        href: "/conv/unit",
      },
      {
        id: "url",
        name: "URL 인코딩",
        description: "URL 인코딩/디코딩",
        href: "/conv/url",
      },
      {
        id: "json",
        name: "JSON Formatter",
        description: "JSON 정렬 및 압축",
        href: "/conv/json",
      },
      {
        id: "csv-json",
        name: "CSV ↔ JSON",
        description: "CSV와 JSON 상호 변환",
        href: "/conv/csv-json",
        popular: true,
      },
      {
        id: "image",
        name: "이미지 변환",
        description: "JPG, PNG, WEBP 포맷 변환",
        href: "/conv/image",
        popular: true,
      },
      {
        id: "data-size",
        name: "데이터 크기 변환",
        description: "B, KB, MB, GB 단위 변환",
        href: "/conv/data-size",
        popular: true,
      },
      {
        id: "number-base",
        name: "진법 변환",
        description: "2진법, 3진법, 8진법, 10진법, 12진법, 16진법, 20진법, 32진법, 36진법 변환",
        href: "/conv/number-base",
        popular: true,
      },
    ],
  },
  {
    id: "gen",
    name: "생성기",
    description: "QR코드, 비밀번호 등 생성 도구",
    icon: "⚡",
    subdomain: "gen",
    tools: [
      {
        id: "qr",
        name: "QR 코드 생성기",
        description: "URL, 텍스트, 연락처를 QR코드로 변환",
        href: "/gen/qr",
        popular: true,
      },
      {
        id: "password",
        name: "비밀번호 생성기",
        description: "안전한 랜덤 비밀번호 생성",
        href: "/gen/password",
        popular: true,
      },
      {
        id: "gradient",
        name: "그라데이션 생성기",
        description: "CSS 그라데이션 코드 생성",
        href: "/gen/gradient",
      },
      {
        id: "random",
        name: "랜덤 추첨기",
        description: "항목 중 랜덤 선택",
        href: "/gen/random",
      },
      {
        id: "favicon",
        name: "Favicon 패키지",
        description: "모든 플랫폼용 파비콘 생성",
        href: "/gen/favicon",
        popular: true,
      },
      {
        id: "tournament",
        name: "투표 & 선택",
        description: "항목 선택 또는 토너먼트 대결",
        href: "/gen/tournament",
        popular: true,
      },
      {
        id: "uuid",
        name: "UUID 생성기",
        description: "고유 식별자 생성 (v4)",
        href: "/gen/uuid",
        popular: true,
      },
    ],
  },
  {
    id: "text",
    name: "텍스트 도구",
    description: "텍스트 분석 및 편집 도구",
    icon: "📝",
    subdomain: "text",
    tools: [
      {
        id: "count",
        name: "글자수 세기",
        description: "글자수, 단어수, 바이트 계산",
        href: "/text/count",
        popular: true,
      },
      {
        id: "diff",
        name: "텍스트 비교",
        description: "두 텍스트의 차이점 비교",
        href: "/text/diff",
      },
      {
        id: "case",
        name: "대소문자 변환",
        description: "UPPER, lower, Capitalize 변환",
        href: "/text/case",
      },
      {
        id: "duplicate",
        name: "중복 제거",
        description: "중복된 줄 제거, 고유값만 추출",
        href: "/text/duplicate",
        popular: true,
      },
    ],
  },
  {
    id: "dev",
    name: "개발자 도구",
    description: "개발에 유용한 도구 모음",
    icon: "💻",
    subdomain: "dev",
    tools: [
      {
        id: "regex",
        name: "정규식 테스터",
        description: "정규표현식 테스트 및 검증",
        href: "/dev/regex",
      },
      {
        id: "timestamp",
        name: "Unix Timestamp",
        description: "Unix 타임스탬프 변환",
        href: "/dev/timestamp",
      },
      {
        id: "contrast",
        name: "색상 대비 검사",
        description: "WCAG 접근성 대비율 검사",
        href: "/dev/contrast",
        popular: true,
      },
    ],
  },
];

export function getAllTools(): Tool[] {
  return toolCategories.flatMap((category) => category.tools);
}

export function getToolsByCategory(categoryId: string): Tool[] {
  const category = toolCategories.find((c) => c.id === categoryId);
  return category?.tools || [];
}

export function getToolById(toolId: string): Tool | undefined {
  return getAllTools().find((tool) => tool.id === toolId);
}
