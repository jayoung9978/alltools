"use client";

import { useState } from "react";
import Link from "next/link";

export default function VATCalculator() {
  const [amount, setAmount] = useState("");
  const [mode, setMode] = useState<"add" | "remove">("add");

  const vatRate = 0.1; // 10%

  const calculate = () => {
    const num = parseFloat(amount);
    if (isNaN(num) || num <= 0) return null;

    if (mode === "add") {
      // 부가세 포함
      const vat = num * vatRate;
      const total = num + vat;
      return { original: num, vat, total };
    } else {
      // 부가세 제외
      const original = num / 1.1;
      const vat = num - original;
      return { original, vat, total: num };
    }
  };

  const result = calculate();

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("ko-KR").format(Math.round(num));
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        <Link href="/" className="hover:text-primary-500">홈</Link>
        {" > "}
        <Link href="/calc" className="hover:text-primary-500">계산기</Link>
        {" > "}
        <span>부가세 계산기</span>
      </div>

      <h1 className="text-4xl font-bold mb-2">부가세 계산기</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        부가세 10% 포함/제외 금액을 계산하세요
      </p>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <div className="space-y-6">
          {/* Mode Selection */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setMode("add")}
              className={`p-4 rounded-lg border-2 transition-all ${
                mode === "add"
                  ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20"
                  : "border-gray-200 dark:border-gray-700"
              }`}
            >
              <div className="font-semibold mb-1">부가세 포함</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                공급가액 → 부가세 포함 가격
              </div>
            </button>
            <button
              onClick={() => setMode("remove")}
              className={`p-4 rounded-lg border-2 transition-all ${
                mode === "remove"
                  ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20"
                  : "border-gray-200 dark:border-gray-700"
              }`}
            >
              <div className="font-semibold mb-1">부가세 제외</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                부가세 포함 가격 → 공급가액
              </div>
            </button>
          </div>

          {/* Amount Input */}
          <div>
            <label className="block text-sm font-medium mb-2">
              {mode === "add" ? "공급가액 (부가세 제외)" : "총 금액 (부가세 포함)"}
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="100000"
              className="input-field text-lg"
              min="0"
            />
          </div>

          {/* Result */}
          {result && (
            <div className="pt-6 border-t border-gray-200 dark:border-gray-700 space-y-4">
              <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <span className="text-gray-600 dark:text-gray-400">공급가액</span>
                <span className="text-xl font-bold">
                  {formatNumber(result.original)}원
                </span>
              </div>
              <div className="flex justify-between items-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <span className="text-gray-600 dark:text-gray-400">부가세 (10%)</span>
                <span className="text-xl font-bold text-red-600 dark:text-red-400">
                  {formatNumber(result.vat)}원
                </span>
              </div>
              <div className="flex justify-between items-center p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                <span className="text-gray-600 dark:text-gray-400">합계</span>
                <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  {formatNumber(result.total)}원
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 mt-6">
        <h2 className="text-xl font-semibold mb-4">💡 부가가치세란?</h2>
        <div className="space-y-3 text-gray-700 dark:text-gray-300">
          <p>부가가치세(VAT)는 상품이나 서비스의 거래 과정에서 발생하는 부가가치에 대해 부과되는 세금입니다.</p>
          <p><strong>세율:</strong> 10% (한국 기준)</p>
          <p><strong>계산식:</strong></p>
          <ul className="list-disc list-inside space-y-1 text-sm ml-4">
            <li>부가세 = 공급가액 × 0.1</li>
            <li>총 금액 = 공급가액 + 부가세</li>
            <li>공급가액 = 총 금액 ÷ 1.1</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
