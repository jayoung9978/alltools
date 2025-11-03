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
    </div>
  );
}
