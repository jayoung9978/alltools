"use client";

import { useState } from "react";
import Link from "next/link";

export default function UUIDGenerator() {
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState(1);
  const [uppercase, setUppercase] = useState(false);
  const [includeHyphens, setIncludeHyphens] = useState(true);

  const generateUUID = (): string => {
    // UUID v4 생성
    const uuid = crypto.randomUUID();

    let result = uuid;

    if (!includeHyphens) {
      result = result.replace(/-/g, "");
    }

    if (uppercase) {
      result = result.toUpperCase();
    }

    return result;
  };

  const handleGenerate = () => {
    const newUuids = Array.from({ length: count }, () => generateUUID());
    setUuids(newUuids);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("클립보드에 복사되었습니다!");
  };

  const copyAll = () => {
    const allText = uuids.join("\n");
    navigator.clipboard.writeText(allText);
    alert("모든 UUID가 클립보드에 복사되었습니다!");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        <Link href="/" className="hover:text-primary-500">
          홈
        </Link>
        {" > "}
        <Link href="/gen" className="hover:text-primary-500">
          생성기
        </Link>
        {" > "}
        <span>UUID 생성기</span>
      </div>

      <h1 className="text-4xl font-bold mb-2">UUID 생성기</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        고유한 UUID (Universally Unique Identifier)를 생성하세요
      </p>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Settings Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <h2 className="text-xl font-semibold mb-4">설정</h2>

          <div className="space-y-6">
            {/* Count */}
            <div>
              <label className="block text-sm font-medium mb-2">
                생성 개수: {count}개
              </label>
              <input
                type="range"
                min="1"
                max="100"
                value={count}
                onChange={(e) => setCount(parseInt(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>1개</span>
                <span>100개</span>
              </div>
            </div>

            {/* Options */}
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={uppercase}
                  onChange={(e) => setUppercase(e.target.checked)}
                  className="w-4 h-4 rounded"
                />
                <span className="text-sm">대문자로 표시</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeHyphens}
                  onChange={(e) => setIncludeHyphens(e.target.checked)}
                  className="w-4 h-4 rounded"
                />
                <span className="text-sm">하이픈(-) 포함</span>
              </label>
            </div>

            {/* Generate Button */}
            <button onClick={handleGenerate} className="btn-primary w-full">
              🎲 UUID 생성
            </button>

            {/* Quick Examples */}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm font-medium mb-2">빠른 설정</p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setCount(1);
                    setUppercase(false);
                    setIncludeHyphens(true);
                  }}
                  className="btn-secondary text-xs py-2"
                >
                  기본 (1개)
                </button>
                <button
                  onClick={() => {
                    setCount(10);
                    setUppercase(false);
                    setIncludeHyphens(true);
                  }}
                  className="btn-secondary text-xs py-2"
                >
                  대량 (10개)
                </button>
                <button
                  onClick={() => {
                    setCount(1);
                    setUppercase(true);
                    setIncludeHyphens(true);
                  }}
                  className="btn-secondary text-xs py-2"
                >
                  대문자
                </button>
                <button
                  onClick={() => {
                    setCount(1);
                    setUppercase(false);
                    setIncludeHyphens(false);
                  }}
                  className="btn-secondary text-xs py-2"
                >
                  하이픈 제거
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Output Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <h2 className="text-xl font-semibold mb-4">생성된 UUID</h2>

          {uuids.length > 0 ? (
            <div className="space-y-4">
              <div className="max-h-96 overflow-y-auto space-y-2">
                {uuids.map((uuid, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                  >
                    <code className="flex-1 text-sm font-mono break-all">
                      {uuid}
                    </code>
                    <button
                      onClick={() => copyToClipboard(uuid)}
                      className="btn-secondary text-xs px-3 py-1 shrink-0"
                    >
                      복사
                    </button>
                  </div>
                ))}
              </div>

              {uuids.length > 1 && (
                <button onClick={copyAll} className="btn-primary w-full">
                  📋 전체 복사 ({uuids.length}개)
                </button>
              )}

              <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  정보
                </div>
                <div className="text-xs space-y-1">
                  <div>총 개수: {uuids.length}개</div>
                  <div>형식: UUID v4</div>
                  <div>
                    길이: {uuids[0]?.length || 0}자
                    {includeHyphens ? " (하이픈 포함)" : " (하이픈 제거)"}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <div className="text-center text-gray-400">
                <div className="text-4xl mb-2">🎲</div>
                <div>설정을 선택하고</div>
                <div>UUID를 생성하세요</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 mt-6">
        <h2 className="text-xl font-semibold mb-4">💡 UUID란?</h2>
        <div className="space-y-3 text-sm">
          <p>
            UUID (Universally Unique Identifier)는 전 세계적으로 고유한 128비트
            식별자입니다.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">주요 용도</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                <li>데이터베이스 기본 키</li>
                <li>세션 ID 생성</li>
                <li>파일명 고유화</li>
                <li>API 토큰</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">UUID v4 특징</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                <li>랜덤 생성 방식</li>
                <li>충돌 확률 극히 낮음</li>
                <li>36자 길이 (하이픈 포함)</li>
                <li>32자 길이 (하이픈 제거)</li>
              </ul>
            </div>
          </div>
          <div className="pt-3">
            <h3 className="font-semibold mb-2">예제</h3>
            <div className="space-y-2">
              <div>
                <span className="text-gray-600 dark:text-gray-400 text-xs">
                  하이픈 포함:
                </span>
                <code className="block text-xs bg-white dark:bg-gray-700 p-2 rounded mt-1">
                  550e8400-e29b-41d4-a716-446655440000
                </code>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400 text-xs">
                  하이픈 제거:
                </span>
                <code className="block text-xs bg-white dark:bg-gray-700 p-2 rounded mt-1">
                  550e8400e29b41d4a716446655440000
                </code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
