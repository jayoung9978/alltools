"use client";

import { useState } from "react";
import Link from "next/link";
import { toolCategories } from "@/lib/tools";

export default function SearchableTools() {
  const [searchQuery, setSearchQuery] = useState("");

  // 검색어로 도구 필터링
  const filteredCategories = toolCategories.map((category) => ({
    ...category,
    tools: category.tools.filter(
      (tool) =>
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter((category) => category.tools.length > 0);

  const hasResults = filteredCategories.length > 0;

  return (
    <>
      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-12">
        <input
          type="text"
          placeholder="도구 검색..."
          className="input-field text-lg"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Tool Categories */}
      {hasResults ? (
        <>
          <div className="grid gap-8">
            {filteredCategories.map((category) => (
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

          {/* Stats Section - 검색어가 없을 때만 표시 */}
          {!searchQuery && (
            <section className="py-12 border-t border-gray-200 dark:border-gray-700 mt-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-primary-500">29+</div>
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
                  <div className="text-3xl font-bold text-primary-500">깔끔한 UI</div>
                  <div className="text-gray-600 dark:text-gray-400">사용 편의성</div>
                </div>
              </div>
            </section>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500 dark:text-gray-400">
            "{searchQuery}"에 대한 검색 결과가 없습니다.
          </p>
          <button
            onClick={() => setSearchQuery("")}
            className="btn-primary mt-4"
          >
            전체 도구 보기
          </button>
        </div>
      )}
    </>
  );
}
