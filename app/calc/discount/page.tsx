"use client";

import { useState } from "react";
import Link from "next/link";

export default function DiscountCalculator() {
  const [originalPrice, setOriginalPrice] = useState("");
  const [discountRate, setDiscountRate] = useState("");
  const [salePrice, setSalePrice] = useState("");

  const calculateFromRate = () => {
    const original = parseFloat(originalPrice);
    const rate = parseFloat(discountRate);

    if (isNaN(original) || isNaN(rate) || original <= 0 || rate < 0 || rate > 100) {
      return null;
    }

    const discountAmount = original * (rate / 100);
    const finalPrice = original - discountAmount;

    return { original, rate, discountAmount, finalPrice };
  };

  const calculateFromPrice = () => {
    const original = parseFloat(originalPrice);
    const sale = parseFloat(salePrice);

    if (isNaN(original) || isNaN(sale) || original <= 0 || sale < 0 || sale > original) {
      return null;
    }

    const discountAmount = original - sale;
    const rate = (discountAmount / original) * 100;

    return { original, rate, discountAmount, finalPrice: sale };
  };

  const result = discountRate ? calculateFromRate() : salePrice ? calculateFromPrice() : null;

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("ko-KR").format(Math.round(num));
  };

  const reset = () => {
    setOriginalPrice("");
    setDiscountRate("");
    setSalePrice("");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        <Link href="/" className="hover:text-primary-500">홈</Link>
        {" > "}
        <Link href="/calc" className="hover:text-primary-500">계산기</Link>
        {" > "}
        <span>할인율 계산기</span>
      </div>

      <h1 className="text-4xl font-bold mb-2">할인율 계산기</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        할인율, 할인가, 할인 금액을 계산하세요
      </p>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <div className="space-y-6">
          {/* Original Price */}
          <div>
            <label className="block text-sm font-medium mb-2">
              원가 (정상가)
            </label>
            <input
              type="number"
              value={originalPrice}
              onChange={(e) => setOriginalPrice(e.target.value)}
              placeholder="100000"
              className="input-field"
              min="0"
            />
          </div>

          {/* Discount Rate */}
          <div>
            <label className="block text-sm font-medium mb-2">
              할인율 (%)
            </label>
            <input
              type="number"
              value={discountRate}
              onChange={(e) => {
                setDiscountRate(e.target.value);
                setSalePrice("");
              }}
              placeholder="20"
              className="input-field"
              min="0"
              max="100"
              disabled={!!salePrice}
            />
            <p className="text-xs text-gray-500 mt-1">
              할인율 또는 할인가 중 하나만 입력하세요
            </p>
          </div>

          {/* Sale Price */}
          <div>
            <label className="block text-sm font-medium mb-2">
              할인가 (판매가)
            </label>
            <input
              type="number"
              value={salePrice}
              onChange={(e) => {
                setSalePrice(e.target.value);
                setDiscountRate("");
              }}
              placeholder="80000"
              className="input-field"
              min="0"
              disabled={!!discountRate}
            />
          </div>

          <button onClick={reset} className="btn-secondary w-full">
            초기화
          </button>

          {/* Result */}
          {result && (
            <div className="pt-6 border-t border-gray-200 dark:border-gray-700 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    원가
                  </div>
                  <div className="text-xl font-bold">
                    {formatNumber(result.original)}원
                  </div>
                </div>
                <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    할인율
                  </div>
                  <div className="text-xl font-bold text-red-600 dark:text-red-400">
                    {result.rate.toFixed(1)}%
                  </div>
                </div>
              </div>

              <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  할인 금액
                </div>
                <div className="text-xl font-bold text-orange-600 dark:text-orange-400">
                  {formatNumber(result.discountAmount)}원
                </div>
              </div>

              <div className="p-6 bg-primary-50 dark:bg-primary-900/20 rounded-lg text-center">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  최종 판매가
                </div>
                <div className="text-4xl font-bold text-primary-600 dark:text-primary-400">
                  {formatNumber(result.finalPrice)}원
                </div>
              </div>

              {/* Savings Info */}
              <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                💰 {formatNumber(result.discountAmount)}원 절약!
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Calculator */}
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 mt-6">
        <h2 className="text-xl font-semibold mb-4">⚡ 주요 할인율</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
          {[10, 20, 30, 40, 50, 60, 70, 80].map((rate) => (
            <button
              key={rate}
              onClick={() => {
                setDiscountRate(rate.toString());
                setSalePrice("");
              }}
              className="p-3 bg-white dark:bg-gray-700 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
            >
              <div className="font-semibold text-primary-600 dark:text-primary-400">
                {rate}% 할인
              </div>
              {originalPrice && (
                <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  {formatNumber(parseFloat(originalPrice) * (1 - rate / 100))}원
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 mt-6">
        <h2 className="text-xl font-semibold mb-4">💡 계산 공식</h2>
        <div className="space-y-2 text-gray-700 dark:text-gray-300">
          <p><strong>할인 금액:</strong> 원가 × (할인율 ÷ 100)</p>
          <p><strong>판매가:</strong> 원가 - 할인 금액</p>
          <p><strong>할인율:</strong> (원가 - 판매가) ÷ 원가 × 100</p>
        </div>
      </div>
    </div>
  );
}
