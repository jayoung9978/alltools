"use client";

import { useState } from "react";
import Link from "next/link";

export default function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
  });
  const [selectedSymbols, setSelectedSymbols] = useState<string[]>([
    "!", "@", "#", "$", "%", "^", "&", "*"
  ]);
  const [count, setCount] = useState(1);
  const [passwords, setPasswords] = useState<string[]>([]);

  const charSets = {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
  };

  const availableSymbols = [
    "!", "@", "#", "$", "%", "^", "&", "*"
  ];

  const generatePassword = (len: number) => {
    let chars = "";
    if (options.uppercase) chars += charSets.uppercase;
    if (options.lowercase) chars += charSets.lowercase;
    if (options.numbers) chars += charSets.numbers;
    if (selectedSymbols.length > 0) chars += selectedSymbols.join("");

    if (chars.length === 0) {
      alert("최소 1개 이상의 옵션을 선택해주세요.");
      return "";
    }

    let result = "";
    for (let i = 0; i < len; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const generate = () => {
    if (count === 1) {
      const pwd = generatePassword(length);
      setPassword(pwd);
      setPasswords([]);
    } else {
      const pwds = Array.from({ length: count }, () => generatePassword(length));
      setPasswords(pwds);
      setPassword("");
    }
  };

  const getStrength = (pwd: string) => {
    let strength = 0;
    if (pwd.length >= 12) strength++;
    if (pwd.length >= 16) strength++;
    if (/[a-z]/.test(pwd)) strength++;
    if (/[A-Z]/.test(pwd)) strength++;
    if (/[0-9]/.test(pwd)) strength++;
    if (/[^a-zA-Z0-9]/.test(pwd)) strength++;

    if (strength <= 2) return { text: "약함", color: "text-red-600", bg: "bg-red-50" };
    if (strength <= 4) return { text: "보통", color: "text-yellow-600", bg: "bg-yellow-50" };
    return { text: "강함", color: "text-green-600", bg: "bg-green-50" };
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const copyAll = () => {
    const text = passwords.join("\n");
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        <Link href="/" className="hover:text-primary-500">홈</Link>
        {" > "}
        <Link href="/gen" className="hover:text-primary-500">생성기</Link>
        {" > "}
        <span>비밀번호 생성기</span>
      </div>

      <h1 className="text-4xl font-bold mb-2">비밀번호 생성기</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        안전한 랜덤 비밀번호를 생성하세요
      </p>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        <div className="space-y-6">
          {/* Length */}
          <div>
            <div className="flex justify-between mb-2">
              <label className="block text-sm font-medium">
                길이
              </label>
              <span className="text-sm font-semibold text-primary-500">
                {length} 글자
              </span>
            </div>
            <input
              type="range"
              min="4"
              max="64"
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>4</span>
              <span>64</span>
            </div>
          </div>

          {/* Options */}
          <div>
            <label className="block text-sm font-medium mb-2">포함할 문자</label>
            <div className="space-y-2">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={options.uppercase}
                  onChange={(e) =>
                    setOptions({ ...options, uppercase: e.target.checked })
                  }
                  className="w-5 h-5"
                />
                <span>대문자 (A-Z)</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={options.lowercase}
                  onChange={(e) =>
                    setOptions({ ...options, lowercase: e.target.checked })
                  }
                  className="w-5 h-5"
                />
                <span>소문자 (a-z)</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={options.numbers}
                  onChange={(e) =>
                    setOptions({ ...options, numbers: e.target.checked })
                  }
                  className="w-5 h-5"
                />
                <span>숫자 (0-9)</span>
              </label>
            </div>
          </div>

          {/* Special Characters */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium">
                특수문자 ({selectedSymbols.length}개 선택)
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedSymbols(availableSymbols)}
                  className="text-xs text-primary-500 hover:text-primary-600"
                >
                  전체 선택
                </button>
                <button
                  onClick={() => setSelectedSymbols([])}
                  className="text-xs text-gray-500 hover:text-gray-600"
                >
                  전체 해제
                </button>
              </div>
            </div>
            <div className="grid grid-cols-8 gap-2">
              {availableSymbols.map((symbol) => (
                <button
                  key={symbol}
                  onClick={() => {
                    if (selectedSymbols.includes(symbol)) {
                      setSelectedSymbols(selectedSymbols.filter(s => s !== symbol));
                    } else {
                      setSelectedSymbols([...selectedSymbols, symbol]);
                    }
                  }}
                  className={`p-2 rounded text-sm font-mono border-2 transition-all ${
                    selectedSymbols.includes(symbol)
                      ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400"
                      : "border-gray-200 dark:border-gray-700 hover:border-gray-300"
                  }`}
                  title={symbol}
                >
                  {symbol}
                </button>
              ))}
            </div>
          </div>

          {/* Count */}
          <div>
            <label className="block text-sm font-medium mb-2">
              생성 개수
            </label>
            <select
              value={count}
              onChange={(e) => setCount(parseInt(e.target.value))}
              className="input-field"
            >
              <option value={1}>1개</option>
              <option value={5}>5개</option>
              <option value={10}>10개</option>
              <option value={20}>20개</option>
            </select>
          </div>

          <button onClick={generate} className="btn-primary w-full">
            🔐 비밀번호 생성
          </button>

          {/* Single Password Result */}
          {password && (
            <div className="space-y-3 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">생성된 비밀번호</label>
                <span className={`text-xs px-2 py-1 rounded ${getStrength(password).bg} ${getStrength(password).color}`}>
                  {getStrength(password).text}
                </span>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={password}
                  readOnly
                  className="input-field flex-1 font-mono"
                />
                <button
                  onClick={() => copyToClipboard(password)}
                  className="btn-secondary whitespace-nowrap"
                >
                  📋 복사
                </button>
              </div>
            </div>
          )}

          {/* Multiple Passwords Result */}
          {passwords.length > 0 && (
            <div className="space-y-3 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">
                  생성된 비밀번호 ({passwords.length}개)
                </label>
                <button
                  onClick={copyAll}
                  className="text-xs text-primary-500 hover:text-primary-600"
                >
                  📋 전체 복사
                </button>
              </div>
              <div className="max-h-64 overflow-y-auto space-y-2">
                {passwords.map((pwd, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={pwd}
                      readOnly
                      className="input-field flex-1 font-mono text-sm"
                    />
                    <button
                      onClick={() => copyToClipboard(pwd)}
                      className="btn-secondary text-xs px-3"
                    >
                      복사
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 mt-6">
        <h2 className="text-xl font-semibold mb-4">🔒 안전한 비밀번호 만들기</h2>
        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300 list-disc list-inside">
          <li>최소 12자 이상 사용</li>
          <li>대문자, 소문자, 숫자, 특수문자 혼합</li>
          <li>사전에 있는 단어 사용 금지</li>
          <li>개인정보(이름, 생일 등) 사용 금지</li>
          <li>서비스마다 다른 비밀번호 사용</li>
          <li>정기적으로 비밀번호 변경</li>
        </ul>
      </div>
    </div>
  );
}
