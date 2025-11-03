"use client";

import { useState } from "react";
import Link from "next/link";

export default function PyeongCalculator() {
  const [value, setValue] = useState("");
  const [mode, setMode] = useState<"toSquare" | "toPyeong">("toSquare");

  // 1평 = 3.3058㎡
  const conversionRate = 3.3058;

  const calculate = () => {
    const num = parseFloat(value);
    if (isNaN(num) || num <= 0) return null;

    if (mode === "toSquare") {
      return num * conversionRate;
    } else {
      return num / conversionRate;
    }
  };

  const result = calculate();

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        <Link href="/" className="hover:text-primary-500">홈</Link>
        {" > "}
        <Link href="/calc" className="hover:text-primary-500">계산기</Link>
        {" > "}
        <span>평수 계산기</span>
      </div>

      <h1 className="text-4xl font-bold mb-2">평수 계산기</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        평(坪) ↔ 제곱미터(㎡) 변환 계산기
      </p>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <div className="space-y-6">
          {/* Mode Selection */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setMode("toSquare")}
              className={`p-4 rounded-lg border-2 transition-all ${
                mode === "toSquare"
                  ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20"
                  : "border-gray-200 dark:border-gray-700"
              }`}
            >
              <div className="font-semibold mb-1">평 → ㎡</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                평을 제곱미터로
              </div>
            </button>
            <button
              onClick={() => setMode("toPyeong")}
              className={`p-4 rounded-lg border-2 transition-all ${
                mode === "toPyeong"
                  ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20"
                  : "border-gray-200 dark:border-gray-700"
              }`}
            >
              <div className="font-semibold mb-1">㎡ → 평</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                제곱미터를 평으로
              </div>
            </button>
          </div>

          {/* Input */}
          <div>
            <label className="block text-sm font-medium mb-2">
              {mode === "toSquare" ? "평(坪)" : "제곱미터(㎡)"}
            </label>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={mode === "toSquare" ? "30" : "100"}
              className="input-field text-lg"
              min="0"
              step="0.01"
            />
          </div>

          {/* Result */}
          {result !== null && (
            <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="text-center p-6 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  변환 결과
                </div>
                <div className="text-4xl font-bold text-primary-600 dark:text-primary-400">
                  {result.toFixed(2)}
                  <span className="text-2xl ml-2">
                    {mode === "toSquare" ? "㎡" : "평"}
                  </span>
                </div>
              </div>

              {/* Quick Reference */}
              <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
                <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded">
                  <div className="text-gray-600 dark:text-gray-400 mb-1">입력값</div>
                  <div className="font-semibold">
                    {parseFloat(value).toFixed(2)} {mode === "toSquare" ? "평" : "㎡"}
                  </div>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded">
                  <div className="text-gray-600 dark:text-gray-400 mb-1">변환값</div>
                  <div className="font-semibold">
                    {result.toFixed(2)} {mode === "toSquare" ? "㎡" : "평"}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Reference Table */}
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 mt-6">
        <h2 className="text-xl font-semibold mb-4">📏 평수 환산표</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-white dark:bg-gray-700">
              <tr>
                <th className="px-4 py-2 text-left">평(坪)</th>
                <th className="px-4 py-2 text-right">제곱미터(㎡)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
              {[10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((pyeong) => (
                <tr key={pyeong}>
                  <td className="px-4 py-2">{pyeong}평</td>
                  <td className="px-4 py-2 text-right font-medium">
                    {(pyeong * conversionRate).toFixed(2)}㎡
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-600 dark:text-gray-400 mt-4">
          ※ 1평 = 3.3058㎡ (정확한 환산 기준)
        </p>
      </div>
    </div>
  );
}
