"use client";

import { useState } from "react";
import Link from "next/link";

type Unit = "B" | "KB" | "MB" | "GB" | "TB" | "PB";

const UNITS: { value: Unit; name: string; bytes: number }[] = [
  { value: "B", name: "Byte (B)", bytes: 1 },
  { value: "KB", name: "Kilobyte (KB)", bytes: 1024 },
  { value: "MB", name: "Megabyte (MB)", bytes: 1024 * 1024 },
  { value: "GB", name: "Gigabyte (GB)", bytes: 1024 * 1024 * 1024 },
  { value: "TB", name: "Terabyte (TB)", bytes: 1024 * 1024 * 1024 * 1024 },
  {
    value: "PB",
    name: "Petabyte (PB)",
    bytes: 1024 * 1024 * 1024 * 1024 * 1024,
  },
];

export default function DataSizeConverter() {
  const [inputValue, setInputValue] = useState("1");
  const [inputUnit, setInputUnit] = useState<Unit>("GB");
  const [results, setResults] = useState<Record<Unit, string>>({
    B: "0",
    KB: "0",
    MB: "0",
    GB: "0",
    TB: "0",
    PB: "0",
  });

  const convert = (value: string, fromUnit: Unit) => {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) {
      return;
    }

    const fromBytes = UNITS.find((u) => u.value === fromUnit)!.bytes;
    const totalBytes = numValue * fromBytes;

    const newResults: Record<Unit, string> = {
      B: "",
      KB: "",
      MB: "",
      GB: "",
      TB: "",
      PB: "",
    };

    UNITS.forEach(({ value, bytes }) => {
      const result = totalBytes / bytes;
      newResults[value] = formatNumber(result);
    });

    setResults(newResults);
  };

  const formatNumber = (num: number): string => {
    if (num === 0) return "0";
    if (num < 0.000001) return num.toExponential(2);
    if (num < 1) return num.toFixed(6).replace(/\.?0+$/, "");
    if (num < 1000) return num.toFixed(2).replace(/\.?0+$/, "");
    if (num < 1000000) return num.toLocaleString("en-US", { maximumFractionDigits: 2 });
    return num.toExponential(2);
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
    convert(value, inputUnit);
  };

  const handleUnitChange = (unit: Unit) => {
    setInputUnit(unit);
    convert(inputValue, unit);
  };

  const loadExample = (value: string, unit: Unit) => {
    setInputValue(value);
    setInputUnit(unit);
    convert(value, unit);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("복사되었습니다!");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        <Link href="/" className="hover:text-primary-500">
          홈
        </Link>
        {" > "}
        <Link href="/conv" className="hover:text-primary-500">
          변환기
        </Link>
        {" > "}
        <span>데이터 크기</span>
      </div>

      <h1 className="text-4xl font-bold mb-2">데이터 크기 변환기</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        B, KB, MB, GB, TB, PB 등 파일 크기 단위를 상호 변환합니다
      </p>

      {/* Input Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-6">
        <h2 className="text-xl font-semibold mb-4">입력</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">값</label>
            <input
              type="number"
              value={inputValue}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="숫자 입력"
              className="input-field text-lg"
              step="any"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">단위</label>
            <select
              value={inputUnit}
              onChange={(e) => handleUnitChange(e.target.value as Unit)}
              className="input-field text-lg"
            >
              {UNITS.map(({ value, name }) => (
                <option key={value} value={value}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick Examples */}
        <div className="mt-6">
          <h3 className="text-sm font-medium mb-2">빠른 예시</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <button
              onClick={() => loadExample("1", "KB")}
              className="btn-secondary text-sm py-2"
            >
              1 KB
            </button>
            <button
              onClick={() => loadExample("100", "MB")}
              className="btn-secondary text-sm py-2"
            >
              100 MB
            </button>
            <button
              onClick={() => loadExample("1", "GB")}
              className="btn-secondary text-sm py-2"
            >
              1 GB
            </button>
            <button
              onClick={() => loadExample("1", "TB")}
              className="btn-secondary text-sm py-2"
            >
              1 TB
            </button>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-6">
        <h2 className="text-xl font-semibold mb-4">변환 결과</h2>
        <div className="space-y-3">
          {UNITS.map(({ value, name, bytes }) => {
            const isInput = value === inputUnit;
            return (
              <div
                key={value}
                className={`p-4 rounded-lg border-2 transition-colors ${
                  isInput
                    ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20"
                    : "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      {name}
                    </div>
                    <div className="text-2xl font-mono font-semibold">
                      {results[value] || "0"}
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(results[value])}
                    className="text-primary-500 hover:text-primary-600 ml-4"
                    title="복사"
                  >
                    📋
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Info */}
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">💡 단위 설명</h2>
        <div className="grid md:grid-cols-2 gap-6 text-sm">
          <div>
            <h3 className="font-semibold mb-2">📊 기본 단위</h3>
            <ul className="text-gray-700 dark:text-gray-300 space-y-1">
              <li>• 1 Byte (B) = 8 bits</li>
              <li>• 1 Kilobyte (KB) = 1,024 Bytes</li>
              <li>• 1 Megabyte (MB) = 1,024 KB</li>
              <li>• 1 Gigabyte (GB) = 1,024 MB</li>
              <li>• 1 Terabyte (TB) = 1,024 GB</li>
              <li>• 1 Petabyte (PB) = 1,024 TB</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">📁 실제 사례</h3>
            <ul className="text-gray-700 dark:text-gray-300 space-y-1">
              <li>• 텍스트 파일: 수 KB</li>
              <li>• 고해상도 사진: 2-5 MB</li>
              <li>• 음악 파일 (MP3): 3-10 MB</li>
              <li>• 영화 (HD): 4-8 GB</li>
              <li>• 게임: 50-100 GB</li>
              <li>• 대용량 데이터베이스: TB 이상</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">💾 저장 장치</h3>
            <ul className="text-gray-700 dark:text-gray-300 space-y-1">
              <li>• USB 메모리: 8-128 GB</li>
              <li>• SSD: 256 GB - 2 TB</li>
              <li>• 하드 디스크: 1-18 TB</li>
              <li>• 클라우드 저장소: GB ~ PB</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">🔢 이진법 vs 십진법</h3>
            <p className="text-gray-700 dark:text-gray-300">
              컴퓨터는 1024 (2^10) 기반의 이진법을 사용합니다. 일부 제조사는
              1000 기반 십진법을 사용하여 용량이 다르게 표시될 수 있습니다.
            </p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h3 className="font-semibold mb-2 text-blue-900 dark:text-blue-300">
            📌 팁
          </h3>
          <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
            <li>
              • 스토리지 용량 계산 시: 제조사 표기와 실제 사용 가능 용량의
              차이를 확인하세요
            </li>
            <li>
              • 다운로드 시간 계산: 인터넷 속도(Mbps)를 고려하여 예상 시간을
              계산할 수 있습니다
            </li>
            <li>
              • 백업 계획: 필요한 저장 공간을 미리 계산하여 적절한 백업
              미디어를 선택하세요
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
