import Link from "next/link";
import { getToolsByCategory } from "@/lib/tools";

export const metadata = {
  title: "개발자 도구 - ASDW.KR",
  description: "정규식 테스터, Unix Timestamp 변환 등 개발에 유용한 도구 모음",
};

export default function DevPage() {
  const tools = getToolsByCategory("dev");

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        <Link href="/" className="hover:text-primary-500">홈</Link>
        {" > "}
        <span>개발자 도구</span>
      </div>

      <h1 className="text-4xl font-bold mb-4">💻 개발자 도구</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        개발 작업에 유용한 필수 도구들
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <Link
            key={tool.id}
            href={tool.href}
            className="tool-card group"
          >
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
              {tool.id === "regex" ? "🔍" : "⏰"}
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
