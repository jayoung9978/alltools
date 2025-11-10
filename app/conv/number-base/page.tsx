"use client";

import { useState } from "react";
import Link from "next/link";

type Base = "binary" | "octal" | "decimal" | "hexadecimal";

interface BaseInfo {
  key: Base;
  name: string;
  base: number;
  description: string;
  placeholder: string;
  pattern: RegExp;
}

const BASES: BaseInfo[] = [
  {
    key: "binary",
    name: "2진법 (Binary)",
    base: 2,
    description: "0과 1로만 표현",
    placeholder: "예: 1010",
    pattern: /^[01]+$/,
  },
  {
    key: "octal",
    name: "8진법 (Octal)",
    base: 8,
    description: "0-7로 표현",
    placeholder: "예: 12",
    pattern: /^[0-7]+$/,
  },
  {
    key: "decimal",
    name: "10진법 (Decimal)",
    base: 10,
    description: "0-9로 표현",
    placeholder: "예: 10",
    pattern: /^[0-9]+$/,
  },
  {
    key: "hexadecimal",
    name: "16진법 (Hexadecimal)",
    base: 16,
    description: "0-9, A-F로 표현",
    placeholder: "예: A",
    pattern: /^[0-9A-Fa-f]+$/,
  },
];

export default function NumberBaseConverter() {
  const [inputValue, setInputValue] = useState("10");
  const [inputBase, setInputBase] = useState<Base>("decimal");
  const [results, setResults] = useState<Record<Base, string>>({
    binary: "1010",
    octal: "12",
    decimal: "10",
    hexadecimal: "A",
  });
  const [error, setError] = useState("");

  const convert = (value: string, fromBase: Base) => {
    if (!value.trim()) {
      setError("");
      setResults({
        binary: "",
        octal: "",
        decimal: "",
        hexadecimal: "",
      });
      return;
    }

    const baseInfo = BASES.find((b) => b.key === fromBase)!;

    // Validate input
    if (!baseInfo.pattern.test(value)) {
      setError(`${baseInfo.name}에 유효하지 않은 문자가 포함되어 있습니다.`);
      return;
    }

    setError("");

    try {
      // Convert to decimal first
      const decimalValue = parseInt(value, baseInfo.base);

      if (isNaN(decimalValue)) {
        setError("변환할 수 없는 값입니다.");
        return;
      }

      // Convert from decimal to all bases
      const newResults: Record<Base, string> = {
        binary: decimalValue.toString(2),
        octal: decimalValue.toString(8),
        decimal: decimalValue.toString(10),
        hexadecimal: decimalValue.toString(16).toUpperCase(),
      };

      setResults(newResults);
    } catch (err) {
      setError("변환 중 오류가 발생했습니다.");
    }
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
    convert(value, inputBase);
  };

  const handleBaseChange = (base: Base) => {
    setInputBase(base);
    convert(inputValue, base);
  };

  const loadExample = (value: string, base: Base) => {
    setInputValue(value);
    setInputBase(base);
    convert(value, base);
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
        <span>진법 변환</span>
      </div>

      <h1 className="text-4xl font-bold mb-2">진법 변환기</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        2진법, 8진법, 10진법, 16진법을 상호 변환합니다
      </p>

      {/* Input Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-6">
        <h2 className="text-xl font-semibold mb-4">입력</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">값</label>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => handleInputChange(e.target.value.toUpperCase())}
              placeholder={
                BASES.find((b) => b.key === inputBase)?.placeholder
              }
              className={`input-field text-lg font-mono ${
                error ? "border-red-500" : ""
              }`}
            />
            {error && (
              <p className="text-red-500 text-sm mt-2">{error}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">입력 진법</label>
            <select
              value={inputBase}
              onChange={(e) => handleBaseChange(e.target.value as Base)}
              className="input-field text-lg"
            >
              {BASES.map(({ key, name }) => (
                <option key={key} value={key}>
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
              onClick={() => loadExample("1010", "binary")}
              className="btn-secondary text-sm py-2"
            >
              1010 (2진법)
            </button>
            <button
              onClick={() => loadExample("12", "octal")}
              className="btn-secondary text-sm py-2"
            >
              12 (8진법)
            </button>
            <button
              onClick={() => loadExample("255", "decimal")}
              className="btn-secondary text-sm py-2"
            >
              255 (10진법)
            </button>
            <button
              onClick={() => loadExample("FF", "hexadecimal")}
              className="btn-secondary text-sm py-2"
            >
              FF (16진법)
            </button>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-6">
        <h2 className="text-xl font-semibold mb-4">변환 결과</h2>
        <div className="space-y-3">
          {BASES.map(({ key, name, description }) => {
            const isInput = key === inputBase;
            return (
              <div
                key={key}
                className={`p-4 rounded-lg border-2 transition-colors ${
                  isInput
                    ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20"
                    : "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold">{name}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {description}
                      </span>
                    </div>
                    <div className="text-2xl font-mono font-semibold break-all">
                      {results[key] || "0"}
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(results[key] || "0")}
                    className="text-primary-500 hover:text-primary-600 ml-4 text-2xl"
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
        <h2 className="text-xl font-semibold mb-4">💡 진법 설명</h2>
        <div className="grid md:grid-cols-2 gap-6 text-sm">
          <div>
            <h3 className="font-semibold mb-2">🔢 진법이란?</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              수를 표현하는 방법으로, 사용하는 숫자의 개수에 따라 구분됩니다.
            </p>
            <ul className="text-gray-700 dark:text-gray-300 space-y-1">
              <li>• 2진법: 컴퓨터가 사용하는 기본 체계</li>
              <li>• 8진법: 유닉스 파일 권한 표현</li>
              <li>• 10진법: 일상생활에서 사용</li>
              <li>• 16진법: 색상 코드, 메모리 주소</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">📊 변환 예시</h3>
            <ul className="text-gray-700 dark:text-gray-300 space-y-1">
              <li>• 10진수 10 = 2진수 1010</li>
              <li>• 10진수 10 = 8진수 12</li>
              <li>• 10진수 10 = 16진수 A</li>
              <li>• 10진수 255 = 16진수 FF</li>
              <li>• 2진수 11111111 = 10진수 255</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">💻 실제 사용 예</h3>
            <ul className="text-gray-700 dark:text-gray-300 space-y-1">
              <li>• IP 주소: 192.168.1.1 (10진법)</li>
              <li>• 색상 코드: #FF5733 (16진법)</li>
              <li>• 파일 권한: 755 (8진법)</li>
              <li>• 비트 연산: 1010 & 1100 (2진법)</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">🎯 변환 팁</h3>
            <ul className="text-gray-700 dark:text-gray-300 space-y-1">
              <li>• 2진법 → 16진법: 4비트씩 묶어 변환</li>
              <li>• 16진법: A=10, B=11, ..., F=15</li>
              <li>• 큰 수는 10진법으로 먼저 변환</li>
              <li>• 계산기 프로그램 모드 활용</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h3 className="font-semibold mb-2 text-blue-900 dark:text-blue-300">
            📌 프로그래밍에서의 표기법
          </h3>
          <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
            <li>• 2진수: 0b1010 (0b 접두사)</li>
            <li>• 8진수: 0o12 또는 012 (0o 또는 0 접두사)</li>
            <li>• 10진수: 10 (접두사 없음)</li>
            <li>• 16진수: 0xA 또는 0xA (0x 접두사)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
