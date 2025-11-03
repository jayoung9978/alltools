"use client";

import { useState } from "react";
import Link from "next/link";

export default function BMICalculator() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState<number | null>(null);

  const calculateBMI = () => {
    const h = parseFloat(height);
    const w = parseFloat(weight);

    if (h > 0 && w > 0) {
      const heightInMeters = h / 100;
      const calculatedBMI = w / (heightInMeters * heightInMeters);
      setBmi(calculatedBMI);
    }
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { category: "저체중", color: "text-blue-600", bg: "bg-blue-50" };
    if (bmi < 23) return { category: "정상", color: "text-green-600", bg: "bg-green-50" };
    if (bmi < 25) return { category: "과체중", color: "text-yellow-600", bg: "bg-yellow-50" };
    if (bmi < 30) return { category: "비만", color: "text-orange-600", bg: "bg-orange-50" };
    return { category: "고도비만", color: "text-red-600", bg: "bg-red-50" };
  };

  const reset = () => {
    setHeight("");
    setWeight("");
    setBmi(null);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        <Link href="/" className="hover:text-primary-500">홈</Link>
        {" > "}
        <Link href="/calc" className="hover:text-primary-500">계산기</Link>
        {" > "}
        <span>BMI 계산기</span>
      </div>

      {/* Title */}
      <h1 className="text-4xl font-bold mb-2">BMI 계산기</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        체질량지수(Body Mass Index)를 계산하고 비만도를 확인하세요
      </p>

      {/* Calculator Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-6">
        <div className="space-y-6">
          {/* Height Input */}
          <div>
            <label className="block text-sm font-medium mb-2">
              키 (cm)
            </label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="170"
              className="input-field"
              min="0"
              step="0.1"
            />
          </div>

          {/* Weight Input */}
          <div>
            <label className="block text-sm font-medium mb-2">
              몸무게 (kg)
            </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="65"
              className="input-field"
              min="0"
              step="0.1"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={calculateBMI}
              className="btn-primary flex-1"
            >
              계산하기
            </button>
            <button
              onClick={reset}
              className="btn-secondary"
            >
              초기화
            </button>
          </div>
        </div>

        {/* Result */}
        {bmi !== null && (
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="text-center mb-6">
              <div className="text-5xl font-bold text-primary-500 mb-2">
                {bmi.toFixed(1)}
              </div>
              <div className={`inline-block px-4 py-2 rounded-lg ${getBMICategory(bmi).bg}`}>
                <span className={`text-lg font-semibold ${getBMICategory(bmi).color}`}>
                  {getBMICategory(bmi).category}
                </span>
              </div>
            </div>

            {/* BMI Range Guide */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center p-3 rounded bg-blue-50 dark:bg-blue-900/20">
                <span>저체중</span>
                <span className="font-medium">18.5 미만</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded bg-green-50 dark:bg-green-900/20">
                <span>정상</span>
                <span className="font-medium">18.5 ~ 22.9</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded bg-yellow-50 dark:bg-yellow-900/20">
                <span>과체중</span>
                <span className="font-medium">23.0 ~ 24.9</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded bg-orange-50 dark:bg-orange-900/20">
                <span>비만</span>
                <span className="font-medium">25.0 ~ 29.9</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded bg-red-50 dark:bg-red-900/20">
                <span>고도비만</span>
                <span className="font-medium">30.0 이상</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">💡 BMI란?</h2>
        <div className="space-y-3 text-gray-700 dark:text-gray-300">
          <p>
            <strong>BMI(체질량지수)</strong>는 키와 몸무게를 이용하여 비만도를 측정하는 지표입니다.
          </p>
          <p>
            <strong>계산 공식:</strong> BMI = 체중(kg) ÷ [신장(m)]²
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            ※ 본 계산기는 대한비만학회 기준(아시아-태평양 기준)을 적용합니다.
          </p>
        </div>
      </div>
    </div>
  );
}
