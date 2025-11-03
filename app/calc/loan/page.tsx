"use client";

import { useState } from "react";
import Link from "next/link";

type RepaymentType = "equal-principal-interest" | "equal-principal" | "maturity";

interface LoanResult {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  schedule?: {
    month: number;
    principal: number;
    interest: number;
    payment: number;
    balance: number;
  }[];
}

export default function LoanCalculator() {
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("");
  const [months, setMonths] = useState("");
  const [type, setType] = useState<RepaymentType>("equal-principal-interest");
  const [result, setResult] = useState<LoanResult | null>(null);

  const calculateLoan = () => {
    const principal = parseFloat(amount);
    const annualRate = parseFloat(rate);
    const period = parseInt(months);

    if (principal <= 0 || annualRate < 0 || period <= 0) return;

    const monthlyRate = annualRate / 100 / 12;

    if (type === "equal-principal-interest") {
      // 원리금균등상환
      const monthlyPayment =
        principal * (monthlyRate * Math.pow(1 + monthlyRate, period)) /
        (Math.pow(1 + monthlyRate, period) - 1);

      const totalPayment = monthlyPayment * period;
      const totalInterest = totalPayment - principal;

      // 상환 스케줄 생성
      const schedule = [];
      let balance = principal;

      for (let i = 1; i <= period; i++) {
        const interest = balance * monthlyRate;
        const principalPayment = monthlyPayment - interest;
        balance -= principalPayment;

        schedule.push({
          month: i,
          principal: principalPayment,
          interest: interest,
          payment: monthlyPayment,
          balance: Math.max(0, balance),
        });
      }

      setResult({
        monthlyPayment,
        totalPayment,
        totalInterest,
        schedule, // 전체 스케줄 표시
      });
    } else if (type === "equal-principal") {
      // 원금균등상환
      const principalPayment = principal / period;
      let totalPayment = 0;
      const schedule = [];
      let balance = principal;

      for (let i = 1; i <= period; i++) {
        const interest = balance * monthlyRate;
        const payment = principalPayment + interest;
        totalPayment += payment;
        balance -= principalPayment;

        schedule.push({
          month: i,
          principal: principalPayment,
          interest: interest,
          payment: payment,
          balance: Math.max(0, balance),
        });
      }

      const totalInterest = totalPayment - principal;
      const firstMonthPayment = schedule[0].payment;

      setResult({
        monthlyPayment: firstMonthPayment,
        totalPayment,
        totalInterest,
        schedule,
      });
    } else {
      // 만기일시상환
      const monthlyInterest = principal * monthlyRate;
      const totalInterest = monthlyInterest * period;
      const totalPayment = principal + totalInterest;

      setResult({
        monthlyPayment: monthlyInterest,
        totalPayment,
        totalInterest,
      });
    }
  };

  const reset = () => {
    setAmount("");
    setRate("");
    setMonths("");
    setResult(null);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("ko-KR").format(Math.round(num));
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        <Link href="/" className="hover:text-primary-500">홈</Link>
        {" > "}
        <Link href="/calc" className="hover:text-primary-500">계산기</Link>
        {" > "}
        <span>대출 계산기</span>
      </div>

      {/* Title */}
      <h1 className="text-4xl font-bold mb-2">대출 계산기</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        원리금균등, 원금균등, 만기일시 상환 방식별 대출 이자를 계산하세요
      </p>

      {/* Calculator Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-6">
        <div className="space-y-6">
          {/* Loan Amount */}
          <div>
            <label className="block text-sm font-medium mb-2">
              대출 금액 (원)
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="50000000"
              className="input-field"
              min="0"
            />
          </div>

          {/* Interest Rate */}
          <div>
            <label className="block text-sm font-medium mb-2">
              연 이자율 (%)
            </label>
            <input
              type="number"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              placeholder="3.5"
              className="input-field"
              min="0"
              step="0.1"
            />
          </div>

          {/* Loan Period */}
          <div>
            <label className="block text-sm font-medium mb-2">
              대출 기간 (개월)
            </label>
            <input
              type="number"
              value={months}
              onChange={(e) => setMonths(e.target.value)}
              placeholder="60"
              className="input-field"
              min="1"
            />
          </div>

          {/* Repayment Type */}
          <div>
            <label className="block text-sm font-medium mb-2">
              상환 방식
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <button
                onClick={() => setType("equal-principal-interest")}
                className={`p-4 rounded-lg border-2 transition-all ${
                  type === "equal-principal-interest"
                    ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20"
                    : "border-gray-200 dark:border-gray-700"
                }`}
              >
                <div className="font-semibold mb-1">원리금균등</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  매월 동일한 금액 상환
                </div>
              </button>
              <button
                onClick={() => setType("equal-principal")}
                className={`p-4 rounded-lg border-2 transition-all ${
                  type === "equal-principal"
                    ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20"
                    : "border-gray-200 dark:border-gray-700"
                }`}
              >
                <div className="font-semibold mb-1">원금균등</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  원금 동일, 이자 감소
                </div>
              </button>
              <button
                onClick={() => setType("maturity")}
                className={`p-4 rounded-lg border-2 transition-all ${
                  type === "maturity"
                    ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20"
                    : "border-gray-200 dark:border-gray-700"
                }`}
              >
                <div className="font-semibold mb-1">만기일시</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  만기에 원금 일시 상환
                </div>
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button onClick={calculateLoan} className="btn-primary flex-1">
              계산하기
            </button>
            <button onClick={reset} className="btn-secondary">
              초기화
            </button>
          </div>
        </div>

        {/* Result */}
        {result && (
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  {type === "equal-principal" ? "첫 달 상환액" : type === "maturity" ? "월 이자" : "월 상환액"}
                </div>
                <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  {formatNumber(result.monthlyPayment)}원
                </div>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  총 상환액
                </div>
                <div className="text-2xl font-bold">
                  {formatNumber(result.totalPayment)}원
                </div>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  총 이자
                </div>
                <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                  {formatNumber(result.totalInterest)}원
                </div>
              </div>
            </div>

            {/* Payment Schedule */}
            {result.schedule && result.schedule.length > 0 && (
              <div>
                <h3 className="font-semibold mb-3">
                  상환 스케줄 (전체 {result.schedule.length}개월)
                </h3>
                <div className="overflow-x-auto max-h-96 overflow-y-auto border border-gray-200 dark:border-gray-700 rounded-lg">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 dark:bg-gray-700 sticky top-0">
                      <tr>
                        <th className="px-4 py-2 text-left">회차</th>
                        <th className="px-4 py-2 text-right">원금</th>
                        <th className="px-4 py-2 text-right">이자</th>
                        <th className="px-4 py-2 text-right">월 상환액</th>
                        <th className="px-4 py-2 text-right">잔액</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {result.schedule.map((item) => (
                        <tr key={item.month}>
                          <td className="px-4 py-2">{item.month}회</td>
                          <td className="px-4 py-2 text-right">
                            {formatNumber(item.principal)}
                          </td>
                          <td className="px-4 py-2 text-right">
                            {formatNumber(item.interest)}
                          </td>
                          <td className="px-4 py-2 text-right font-medium">
                            {formatNumber(item.payment)}
                          </td>
                          <td className="px-4 py-2 text-right text-gray-600 dark:text-gray-400">
                            {formatNumber(item.balance)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">💡 상환 방식 안내</h2>
        <div className="space-y-4 text-gray-700 dark:text-gray-300">
          <div>
            <strong>원리금균등상환:</strong> 매월 동일한 금액을 상환합니다. 초기 이자 부담이 크지만 월 상환액이 일정해 계획하기 쉽습니다.
          </div>
          <div>
            <strong>원금균등상환:</strong> 매월 동일한 원금과 감소하는 이자를 상환합니다. 초기 부담이 크지만 총 이자가 적습니다.
          </div>
          <div>
            <strong>만기일시상환:</strong> 매월 이자만 납부하고 만기에 원금을 일시 상환합니다. 월 부담은 적지만 만기 부담이 큽니다.
          </div>
        </div>
      </div>
    </div>
  );
}
