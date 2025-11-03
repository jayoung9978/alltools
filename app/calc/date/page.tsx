"use client";

import { useState } from "react";
import Link from "next/link";

export default function DateCalculator() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [days, setDays] = useState("");
  const [result, setResult] = useState<{
    days: number;
    years: number;
    months: number;
    remainDays: number;
  } | null>(null);
  const [futureDate, setFutureDate] = useState("");

  const calculateDifference = () => {
    if (!startDate || !endDate) return;

    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const years = Math.floor(diffDays / 365);
    const months = Math.floor((diffDays % 365) / 30);
    const remainDays = diffDays % 30;

    setResult({ days: diffDays, years, months, remainDays });
  };

  const calculateFutureDate = () => {
    if (!startDate || !days) return;

    const start = new Date(startDate);
    const daysToAdd = parseInt(days);
    const future = new Date(start.getTime() + daysToAdd * 24 * 60 * 60 * 1000);

    setFutureDate(future.toISOString().split('T')[0]);
  };

  const setToday = () => {
    const today = new Date().toISOString().split('T')[0];
    setStartDate(today);
  };

  const reset = () => {
    setStartDate("");
    setEndDate("");
    setDays("");
    setResult(null);
    setFutureDate("");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        <Link href="/" className="hover:text-primary-500">홈</Link>
        {" > "}
        <Link href="/calc" className="hover:text-primary-500">계산기</Link>
        {" > "}
        <span>날짜 계산기</span>
      </div>

      <h1 className="text-4xl font-bold mb-2">날짜 계산기</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        D-day 계산, 날짜 차이, 특정 날짜 이후 계산
      </p>

      {/* Date Difference Calculator */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-6">
        <h2 className="text-xl font-semibold mb-4">📅 날짜 차이 계산</h2>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">시작일</label>
            <div className="flex gap-2">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="input-field flex-1"
              />
              <button onClick={setToday} className="btn-secondary whitespace-nowrap">
                오늘
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">종료일</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="input-field"
            />
          </div>

          <button onClick={calculateDifference} className="btn-primary w-full">
            날짜 차이 계산
          </button>

          {result && (
            <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="text-center mb-4">
                <div className="text-5xl font-bold text-primary-500 mb-2">
                  {result.days}일
                </div>
                <div className="text-lg text-gray-600 dark:text-gray-400">
                  {result.years > 0 && `${result.years}년 `}
                  {result.months > 0 && `${result.months}개월 `}
                  {result.remainDays > 0 && `${result.remainDays}일`}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Future Date Calculator */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-6">
        <h2 className="text-xl font-semibold mb-4">➕ 특정 일수 후 날짜</h2>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">기준일</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">일수</label>
            <input
              type="number"
              value={days}
              onChange={(e) => setDays(e.target.value)}
              placeholder="100"
              className="input-field"
              min="0"
            />
          </div>

          <button onClick={calculateFutureDate} className="btn-primary w-full">
            날짜 계산
          </button>

          {futureDate && (
            <div className="pt-6 border-t border-gray-200 dark:border-gray-700 text-center">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {days}일 후
              </div>
              <div className="text-3xl font-bold text-primary-500">
                {new Date(futureDate).toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  weekday: 'long'
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      <button onClick={reset} className="btn-secondary w-full">
        전체 초기화
      </button>

      {/* Info */}
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 mt-6">
        <h2 className="text-xl font-semibold mb-4">💡 활용 예시</h2>
        <ul className="space-y-2 text-gray-700 dark:text-gray-300 list-disc list-inside">
          <li>D-day 계산 (시험일, 기념일 등)</li>
          <li>100일, 1000일 기념일 계산</li>
          <li>프로젝트 기간 계산</li>
          <li>휴가 일수 계산</li>
        </ul>
      </div>
    </div>
  );
}
