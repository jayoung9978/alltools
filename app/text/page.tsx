import Link from "next/link";
import { getToolsByCategory } from "@/lib/tools";

export const metadata = {
  title: "텍스트 도구 - ASDW.KR",
  description: "글자수 세기, 텍스트 비교, 대소문자 변환 등 유용한 텍스트 도구 모음",
};

export default function TextPage() {
  const tools = getToolsByCategory("text");

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        <Link href="/" className="hover:text-primary-500">홈</Link>
        {" > "}
        <span>텍스트 도구</span>
      </div>

      <h1 className="text-4xl font-bold mb-4">📝 텍스트 도구</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        텍스트 처리와 분석을 위한 유용한 도구들
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <Link
            key={tool.id}
            href={tool.path}
            className="tool-card group"
          >
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
              {tool.icon}
            </div>
            <h2 className="text-xl font-semibold mb-2">{tool.name}</h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {tool.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
