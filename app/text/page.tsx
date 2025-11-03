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
      {/* Breadcrumb */}
      <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        <Link href="/" className="hover:text-primary-500">홈</Link>
        {" > "}
        <span>텍스트 도구</span>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
          <span className="text-4xl">📝</span>
          텍스트 도구
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          텍스트 처리와 분석을 위한 유용한 도구들
        </p>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <Link
            key={tool.id}
            href={tool.href}
            className="tool-card group"
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-xl font-semibold group-hover:text-primary-500 transition-colors">
                {tool.name}
              </h3>
              {tool.popular && (
                <span className="text-xs bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 px-2 py-1 rounded">
                  인기
                </span>
              )}
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              {tool.description}
            </p>
          </Link>
        ))}
      </div>

      {/* Coming Soon */}
      <div className="mt-12 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl text-center">
        <p className="text-gray-600 dark:text-gray-400">
          더 많은 텍스트 도구가 곧 추가될 예정입니다! 🚀
        </p>
      </div>
    </div>
  );
}
