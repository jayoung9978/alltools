import Link from "next/link";
import { toolCategories } from "@/lib/tools";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center py-12">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary-500 to-blue-600 bg-clip-text text-transparent">
          ASDW 도구 모음
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          일상에 필요한 다양한 무료 웹 도구를 한곳에서
        </p>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="도구 검색..."
            className="input-field text-lg"
          />
        </div>
      </section>

      {/* Tool Categories */}
      <section className="py-8">
        <div className="grid gap-8">
          {toolCategories.map((category) => (
            <div key={category.id} className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{category.icon}</span>
                <div>
                  <h2 className="text-2xl font-bold">{category.name}</h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    {category.description}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.tools.map((tool) => (
                  <Link
                    key={tool.id}
                    href={tool.href}
                    className="tool-card"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold mb-2">
                          {tool.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {tool.description}
                        </p>
                      </div>
                      {tool.popular && (
                        <span className="text-xs bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 px-2 py-1 rounded">
                          인기
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-t border-gray-200 dark:border-gray-700 mt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-primary-500">20+</div>
            <div className="text-gray-600 dark:text-gray-400">도구</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary-500">100%</div>
            <div className="text-gray-600 dark:text-gray-400">무료</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary-500">24/7</div>
            <div className="text-gray-600 dark:text-gray-400">이용 가능</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary-500">광고 없음</div>
            <div className="text-gray-600 dark:text-gray-400">깔끔한 UI</div>
          </div>
        </div>
      </section>
    </div>
  );
}
