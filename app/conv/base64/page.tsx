"use client";

import { useState } from "react";
import Link from "next/link";

export default function Base64Converter() {
  const [text, setText] = useState("");
  const [base64, setBase64] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [error, setError] = useState("");

  const encode = () => {
    try {
      setError("");
      const encoded = btoa(unescape(encodeURIComponent(text)));
      setBase64(encoded);
    } catch (e) {
      setError("인코딩 중 오류가 발생했습니다.");
    }
  };

  const decode = () => {
    try {
      setError("");
      const decoded = decodeURIComponent(escape(atob(base64)));
      setText(decoded);
    } catch (e) {
      setError("디코딩 중 오류가 발생했습니다. 올바른 Base64 문자열인지 확인하세요.");
    }
  };

  const copyToClipboard = (value: string) => {
    navigator.clipboard.writeText(value);
  };

  const reset = () => {
    setText("");
    setBase64("");
    setError("");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        <Link href="/" className="hover:text-primary-500">홈</Link>
        {" > "}
        <Link href="/conv" className="hover:text-primary-500">변환기</Link>
        {" > "}
        <span>Base64 변환</span>
      </div>

      <h1 className="text-4xl font-bold mb-2">Base64 변환기</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        텍스트 ↔ Base64 인코딩/디코딩
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
              텍스트 → Base64
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
              Base64 → 텍스트
            </div>
          </button>
        </div>

        <div className="space-y-6">
          {mode === "encode" ? (
            <>
              {/* Text Input */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium">
                    입력 텍스트
                  </label>
                  <span className="text-xs text-gray-500">
                    {text.length} 글자
                  </span>
                </div>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="인코딩할 텍스트를 입력하세요..."
                  className="input-field min-h-[150px] font-mono"
                />
              </div>

              <button onClick={encode} className="btn-primary w-full">
                Base64로 인코딩
              </button>

              {/* Base64 Output */}
              {base64 && (
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium">
                      Base64 결과
                    </label>
                    <button
                      onClick={() => copyToClipboard(base64)}
                      className="text-xs text-primary-500 hover:text-primary-600"
                    >
                      📋 복사
                    </button>
                  </div>
                  <textarea
                    value={base64}
                    readOnly
                    className="input-field min-h-[150px] font-mono bg-gray-50 dark:bg-gray-700"
                  />
                </div>
              )}
            </>
          ) : (
            <>
              {/* Base64 Input */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium">
                    Base64 입력
                  </label>
                  <span className="text-xs text-gray-500">
                    {base64.length} 글자
                  </span>
                </div>
                <textarea
                  value={base64}
                  onChange={(e) => setBase64(e.target.value)}
                  placeholder="디코딩할 Base64 문자열을 입력하세요..."
                  className="input-field min-h-[150px] font-mono"
                />
              </div>

              <button onClick={decode} className="btn-primary w-full">
                텍스트로 디코딩
              </button>

              {/* Text Output */}
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

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg">
              {error}
            </div>
          )}

          <button onClick={reset} className="btn-secondary w-full">
            초기화
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 mt-6">
        <h2 className="text-xl font-semibold mb-4">💡 Base64란?</h2>
        <div className="space-y-3 text-gray-700 dark:text-gray-300">
          <p>
            <strong>Base64</strong>는 바이너리 데이터를 ASCII 문자열로 인코딩하는 방식입니다.
          </p>
          <p>
            <strong>주요 용도:</strong>
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm ml-4">
            <li>이메일 첨부파일 인코딩</li>
            <li>이미지를 데이터 URL로 변환</li>
            <li>JSON에 바이너리 데이터 포함</li>
            <li>URL에 데이터 포함 (단, URL-safe Base64 사용 권장)</li>
          </ul>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            ※ 한글과 특수문자도 정확하게 인코딩/디코딩됩니다.
          </p>
        </div>
      </div>
    </div>
  );
}
