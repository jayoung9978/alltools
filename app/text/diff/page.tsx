"use client";

import { useState } from "react";
import Link from "next/link";

export default function TextDiff() {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [diffResult, setDiffResult] = useState<{
    type: "added" | "removed" | "unchanged";
    value: string;
  }[]>([]);

  const calculateDiff = () => {
    const lines1 = text1.split("\n");
    const lines2 = text2.split("\n");

    const result: {
      type: "added" | "removed" | "unchanged";
      value: string;
    }[] = [];

    const maxLen = Math.max(lines1.length, lines2.length);

    for (let i = 0; i < maxLen; i++) {
      const line1 = lines1[i] || "";
      const line2 = lines2[i] || "";

      if (line1 === line2) {
        result.push({ type: "unchanged", value: line1 });
      } else {
        if (line1 && !lines2.includes(line1)) {
          result.push({ type: "removed", value: line1 });
        }
        if (line2 && !lines1.includes(line2)) {
          result.push({ type: "added", value: line2 });
        }
      }
    }

    setDiffResult(result);
  };

  const loadExample = () => {
    setText1("안녕하세요\n이것은 원본 텍스트입니다\n비교해보세요\n세번째 줄");
    setText2("안녕하세요\n이것은 수정된 텍스트입니다\n비교해보세요\n네번째 줄\n새로운 줄");
  };

  const clear = () => {
    setText1("");
    setText2("");
    setDiffResult([]);
  };

  const swap = () => {
    const temp = text1;
    setText1(text2);
    setText2(temp);
  };

  const getStats = () => {
    const added = diffResult.filter((d) => d.type === "added").length;
    const removed = diffResult.filter((d) => d.type === "removed").length;
    const unchanged = diffResult.filter((d) => d.type === "unchanged").length;
    return { added, removed, unchanged };
  };

  const stats = getStats();

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        <Link href="/" className="hover:text-primary-500">홈</Link>
        {" > "}
        <Link href="/text" className="hover:text-primary-500">텍스트 도구</Link>
        {" > "}
        <span>텍스트 Diff</span>
      </div>

      <h1 className="text-4xl font-bold mb-2">텍스트 Diff</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        두 텍스트의 차이점을 비교하세요
      </p>

      <div className="space-y-6">
        {/* Controls */}
        <div className="flex flex-wrap gap-3">
          <button onClick={calculateDiff} className="btn-primary">
            🔍 비교하기
          </button>
          <button onClick={swap} className="btn-secondary">
            ⇄ 텍스트 바꾸기
          </button>
          <button onClick={loadExample} className="btn-secondary">
            📝 예시 로드
          </button>
          <button onClick={clear} className="btn-secondary">
            🗑️ 지우기
          </button>
        </div>

        {/* Input Areas */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">📄 원본 텍스트</h2>
            <textarea
              value={text1}
              onChange={(e) => setText1(e.target.value)}
              placeholder="원본 텍스트를 입력하세요..."
              className="input-field min-h-[400px] font-mono text-sm"
            />
            <div className="text-sm text-gray-500 mt-2">
              {text1.split("\n").length} 줄, {text1.length} 글자
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">📄 비교 텍스트</h2>
            <textarea
              value={text2}
              onChange={(e) => setText2(e.target.value)}
              placeholder="비교할 텍스트를 입력하세요..."
              className="input-field min-h-[400px] font-mono text-sm"
            />
            <div className="text-sm text-gray-500 mt-2">
              {text2.split("\n").length} 줄, {text2.length} 글자
            </div>
          </div>
        </div>

        {/* Diff Result */}
        {diffResult.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">📊 비교 결과</h2>
              <div className="flex gap-4 text-sm">
                <span className="text-green-600 dark:text-green-400">
                  ✚ 추가: {stats.added}
                </span>
                <span className="text-red-600 dark:text-red-400">
                  ✖ 삭제: {stats.removed}
                </span>
                <span className="text-gray-600 dark:text-gray-400">
                  ✓ 동일: {stats.unchanged}
                </span>
              </div>
            </div>

            <div className="space-y-1 max-h-[500px] overflow-y-auto bg-gray-50 dark:bg-gray-900 rounded-lg p-4 font-mono text-sm">
              {diffResult.map((diff, index) => (
                <div
                  key={index}
                  className={`px-3 py-1 rounded ${
                    diff.type === "added"
                      ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200"
                      : diff.type === "removed"
                      ? "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200"
                      : "bg-transparent text-gray-700 dark:text-gray-300"
                  }`}
                >
                  <span className="inline-block w-6 mr-2 text-gray-400">
                    {diff.type === "added" ? "+" : diff.type === "removed" ? "-" : " "}
                  </span>
                  {diff.value || " "}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Legend */}
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">💡 사용 가이드</h2>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span className="font-semibold">추가된 줄</span>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                비교 텍스트에 새로 추가된 내용
              </p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <span className="font-semibold">삭제된 줄</span>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                원본에는 있지만 삭제된 내용
              </p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
                <span className="font-semibold">동일한 줄</span>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                양쪽에서 변경되지 않은 내용
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
