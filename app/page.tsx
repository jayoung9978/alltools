import SearchableTools from "@/components/home/SearchableTools";

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
      </section>

      {/* Searchable Tool Categories */}
      <section className="py-8">
        <SearchableTools />
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
