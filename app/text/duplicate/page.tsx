"use client";

import { useState } from "react";
import Link from "next/link";

export default function DuplicateRemover() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [stats, setStats] = useState({
    original: 0,
    unique: 0,
    removed: 0,
  });
  const [options, setOptions] = useState({
    caseSensitive: false,
    trimWhitespace: true,
    sortResult: false,
  });

  const removeDuplicates = () => {
    if (!input.trim()) {
      alert("텍스트를 입력해주세요.");
      return;
    }

    let lines = input.split("\n");
    const originalCount = lines.length;

    // 옵션 적용
    if (options.trimWhitespace) {
      lines = lines.map((line) => line.trim());
    }

    // 중복 제거
    const seen = new Set<string>();
    const uniqueLines: string[] = [];

    lines.forEach((line) => {
      const compareLine = options.caseSensitive ? line : line.toLowerCase();

      if (!seen.has(compareLine)) {
        seen.add(compareLine);
        uniqueLines.push(line);
      }
    });

    // 정렬 옵션
    if (options.sortResult) {
      uniqueLines.sort();
    }

    const uniqueCount = uniqueLines.length;
    const removedCount = originalCount - uniqueCount;

    setResult(uniqueLines.join("\n"));
    setStats({
      original: originalCount,
      unique: uniqueCount,
      removed: removedCount,
    });
  };

  const copyResult = () => {
    navigator.clipboard.writeText(result);
    alert("복사되었습니다!");
  };

  const reset = () => {
    setInput("");
    setResult("");
    setStats({ original: 0, unique: 0, removed: 0 });
  };

  const loadExample = () => {
    setInput(
      "사과\n바나나\n사과\n딸기\n바나나\n포도\n사과\n키위\n딸기\n망고\n포도"
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        <Link href="/" className="hover:text-primary-500">
          홈
        </Link>
        {" > "}
        <Link href="/text" className="hover:text-primary-500">
          텍스트 도구
        </Link>
        {" > "}
        <span>중복 제거</span>
      </div>

      <h1 className="text-4xl font-bold mb-2">텍스트 중복 제거기</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        중복된 줄을 찾아 제거하고 고유값만 추출합니다
      </p>

      {/* Options */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">옵션</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={options.caseSensitive}
              onChange={(e) =>
                setOptions({ ...options, caseSensitive: e.target.checked })
              }
              className="w-4 h-4 text-primary-500"
            />
            <span className="text-sm">대소문자 구분</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={options.trimWhitespace}
              onChange={(e) =>
                setOptions({ ...options, trimWhitespace: e.target.checked })
              }
              className="w-4 h-4 text-primary-500"
            />
            <span className="text-sm">앞뒤 공백 제거</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={options.sortResult}
              onChange={(e) =>
                setOptions({ ...options, sortResult: e.target.checked })
              }
              className="w-4 h-4 text-primary-500"
            />
            <span className="text-sm">결과 정렬</span>
          </label>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">입력</h2>
            <button
              onClick={loadExample}
              className="text-xs text-primary-500 hover:text-primary-600"
            >
              예시 로드
            </button>
          </div>

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="한 줄에 하나씩 입력하세요&#10;예:&#10;사과&#10;바나나&#10;사과&#10;딸기"
            className="input-field min-h-[400px] font-mono text-sm"
          />

          <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            총 {input.split("\n").filter((l) => l.trim()).length}줄
          </div>

          <div className="mt-6 space-y-3">
            <button onClick={removeDuplicates} className="btn-primary w-full">
              🔍 중복 제거
            </button>
            <button onClick={reset} className="btn-secondary w-full">
              초기화
            </button>
          </div>
        </div>

        {/* Output */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">결과</h2>
            {result && (
              <button
                onClick={copyResult}
                className="text-xs text-primary-500 hover:text-primary-600"
              >
                📋 복사
              </button>
            )}
          </div>

          {result ? (
            <>
              <textarea
                value={result}
                readOnly
                className="input-field min-h-[400px] font-mono text-sm bg-gray-50 dark:bg-gray-700/50"
              />

              {/* Stats */}
              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {stats.original}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    원본 줄 수
                  </div>
                </div>

                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {stats.unique}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    고유 줄 수
                  </div>
                </div>

                <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                    {stats.removed}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    제거된 줄
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="min-h-[400px] flex items-center justify-center bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <div className="text-center text-gray-400">
                <div className="text-4xl mb-2">🔍</div>
                <div>중복 제거 버튼을</div>
                <div>눌러보세요</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 mt-6">
        <h2 className="text-xl font-semibold mb-4">💡 활용 예시</h2>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <h3 className="font-semibold mb-2">📋 데이터 정리</h3>
            <p className="text-gray-700 dark:text-gray-300">
              엑셀이나 데이터베이스에서 복사한 중복 항목 제거
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">📧 이메일 목록</h3>
            <p className="text-gray-700 dark:text-gray-300">
              여러 출처에서 모은 이메일 주소에서 중복 제거
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">🏷️ 태그 관리</h3>
            <p className="text-gray-700 dark:text-gray-300">
              블로그나 상품의 중복된 태그 정리
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">📝 리스트 정리</h3>
            <p className="text-gray-700 dark:text-gray-300">
              할일 목록이나 쇼핑 리스트의 중복 항목 제거
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
