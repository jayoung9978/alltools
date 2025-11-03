"use client";

import { useState } from "react";
import Link from "next/link";

export default function JSONFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [indent, setIndent] = useState(2);

  const format = () => {
    try {
      setError("");
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, indent);
      setOutput(formatted);
    } catch (e) {
      setError("올바른 JSON 형식이 아닙니다.");
      setOutput("");
    }
  };

  const minify = () => {
    try {
      setError("");
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
    } catch (e) {
      setError("올바른 JSON 형식이 아닙니다.");
      setOutput("");
    }
  };

  const validate = () => {
    try {
      JSON.parse(input);
      setError("");
      alert("✅ 올바른 JSON 형식입니다!");
    } catch (e) {
      setError("❌ 올바른 JSON 형식이 아닙니다.");
    }
  };

  const copyToClipboard = (value: string) => {
    navigator.clipboard.writeText(value);
  };

  const reset = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  const loadSample = () => {
    const sample = {
      name: "홍길동",
      age: 30,
      email: "hong@example.com",
      address: {
        city: "서울",
        district: "강남구"
      },
      hobbies: ["독서", "운동", "여행"]
    };
    setInput(JSON.stringify(sample));
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        <Link href="/" className="hover:text-primary-500">홈</Link>
        {" > "}
        <Link href="/conv" className="hover:text-primary-500">변환기</Link>
        {" > "}
        <span>JSON Formatter</span>
      </div>

      <h1 className="text-4xl font-bold mb-2">JSON Formatter</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        JSON 정렬, 압축, 유효성 검사
      </p>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">입력</h2>
            <div className="flex gap-2">
              <button
                onClick={loadSample}
                className="text-xs text-primary-500 hover:text-primary-600"
              >
                샘플 로드
              </button>
              <button
                onClick={reset}
                className="text-xs text-gray-500 hover:text-gray-600"
              >
                초기화
              </button>
            </div>
          </div>

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='{"name": "홍길동", "age": 30}'
            className="input-field min-h-[400px] font-mono text-sm"
          />

          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">들여쓰기:</label>
              <select
                value={indent}
                onChange={(e) => setIndent(parseInt(e.target.value))}
                className="input-field text-sm py-1"
              >
                <option value={2}>2 spaces</option>
                <option value={4}>4 spaces</option>
                <option value={8}>Tab</option>
              </select>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <button onClick={format} className="btn-primary text-sm py-2">
                정렬
              </button>
              <button onClick={minify} className="btn-secondary text-sm py-2">
                압축
              </button>
              <button onClick={validate} className="btn-secondary text-sm py-2">
                검증
              </button>
            </div>
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded text-sm">
              {error}
            </div>
          )}
        </div>

        {/* Output Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">결과</h2>
            {output && (
              <button
                onClick={() => copyToClipboard(output)}
                className="text-xs text-primary-500 hover:text-primary-600"
              >
                📋 복사
              </button>
            )}
          </div>

          <textarea
            value={output}
            readOnly
            placeholder="결과가 여기에 표시됩니다"
            className="input-field min-h-[400px] font-mono text-sm bg-gray-50 dark:bg-gray-700"
          />

          {output && (
            <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-gray-600 dark:text-gray-400">
              <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded">
                원본: {input.length.toLocaleString()} 글자
              </div>
              <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded">
                결과: {output.length.toLocaleString()} 글자
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 mt-6">
        <h2 className="text-xl font-semibold mb-4">💡 주요 기능</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <h3 className="font-semibold mb-2">정렬 (Format)</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              읽기 쉽게 들여쓰기와 줄바꿈을 추가합니다.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">압축 (Minify)</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              불필요한 공백을 제거하여 용량을 줄입니다.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">검증 (Validate)</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              올바른 JSON 형식인지 확인합니다.
            </p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h3 className="font-semibold mb-2 text-blue-900 dark:text-blue-100">
            💡 Tip
          </h3>
          <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1 list-disc list-inside">
            <li>API 응답 데이터를 정렬하여 확인할 때 유용합니다</li>
            <li>압축하면 네트워크 전송 시 용량을 줄일 수 있습니다</li>
            <li>한글과 특수문자도 정확하게 처리됩니다</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
