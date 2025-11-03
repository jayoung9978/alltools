"use client";

import { useState } from "react";
import Link from "next/link";

export default function URLConverter() {
  const [text, setText] = useState("");
  const [encoded, setEncoded] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");

  const encode = () => {
    setEncoded(encodeURIComponent(text));
  };

  const decode = () => {
    try {
      setText(decodeURIComponent(encoded));
    } catch (e) {
      alert("올바른 URL 인코딩 문자열이 아닙니다.");
    }
  };

  const copyToClipboard = (value: string) => {
    navigator.clipboard.writeText(value);
  };

  const reset = () => {
    setText("");
    setEncoded("");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        <Link href="/" className="hover:text-primary-500">홈</Link>
        {" > "}
        <Link href="/conv" className="hover:text-primary-500">변환기</Link>
        {" > "}
        <span>URL 인코딩</span>
      </div>

      <h1 className="text-4xl font-bold mb-2">URL 인코딩 변환기</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        URL 인코딩/디코딩 (Percent Encoding)
      </p>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        {/* Mode Selection */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            onClick={() => setMode("encode")}
            className={`p-4 rounded-lg border-2 transition-all ${
              mode === "encode"
                ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20"
                : "border-gray-200 dark:border-gray-700"
            }`}
          >
            <div className="font-semibold mb-1">인코딩</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              텍스트 → URL 인코딩
            </div>
          </button>
          <button
            onClick={() => setMode("decode")}
            className={`p-4 rounded-lg border-2 transition-all ${
              mode === "decode"
                ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20"
                : "border-gray-200 dark:border-gray-700"
            }`}
          >
            <div className="font-semibold mb-1">디코딩</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              URL 인코딩 → 텍스트
            </div>
          </button>
        </div>

        <div className="space-y-6">
          {mode === "encode" ? (
            <>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium">
                    원본 텍스트
                  </label>
                  <span className="text-xs text-gray-500">
                    {text.length} 글자
                  </span>
                </div>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="https://example.com/search?q=한글 검색어"
                  className="input-field min-h-[150px] font-mono"
                />
              </div>

              <button onClick={encode} className="btn-primary w-full">
                URL 인코딩
              </button>

              {encoded && (
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium">
                      인코딩 결과
                    </label>
                    <button
                      onClick={() => copyToClipboard(encoded)}
                      className="text-xs text-primary-500 hover:text-primary-600"
                    >
                      📋 복사
                    </button>
                  </div>
                  <textarea
                    value={encoded}
                    readOnly
                    className="input-field min-h-[150px] font-mono bg-gray-50 dark:bg-gray-700"
                  />
                </div>
              )}
            </>
          ) : (
            <>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium">
                    인코딩된 URL
                  </label>
                  <span className="text-xs text-gray-500">
                    {encoded.length} 글자
                  </span>
                </div>
                <textarea
                  value={encoded}
                  onChange={(e) => setEncoded(e.target.value)}
                  placeholder="https%3A%2F%2Fexample.com%2Fsearch%3Fq%3D%ED%95%9C%EA%B8%80"
                  className="input-field min-h-[150px] font-mono"
                />
              </div>

              <button onClick={decode} className="btn-primary w-full">
                URL 디코딩
              </button>

              {text && (
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium">
                      디코딩 결과
                    </label>
                    <button
                      onClick={() => copyToClipboard(text)}
                      className="text-xs text-primary-500 hover:text-primary-600"
                    >
                      📋 복사
                    </button>
                  </div>
                  <textarea
                    value={text}
                    readOnly
                    className="input-field min-h-[150px] font-mono bg-gray-50 dark:bg-gray-700"
                  />
                </div>
              )}
            </>
          )}

          <button onClick={reset} className="btn-secondary w-full">
            초기화
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 mt-6">
        <h2 className="text-xl font-semibold mb-4">💡 URL 인코딩이란?</h2>
        <div className="space-y-3 text-gray-700 dark:text-gray-300">
          <p>
            URL에서 사용할 수 없는 문자를 <strong>%XX</strong> 형식으로 변환하는 것입니다.
          </p>
          <p>
            <strong>인코딩이 필요한 경우:</strong>
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm ml-4">
            <li>한글, 특수문자가 포함된 URL</li>
            <li>공백, &, =, ? 등 URL 예약 문자</li>
            <li>쿼리 파라미터 값</li>
          </ul>
          <p className="text-sm">
            <strong>예시:</strong> 공백(' ') → %20, 한글('가') → %EA%B0%80
          </p>
        </div>
      </div>
    </div>
  );
}
