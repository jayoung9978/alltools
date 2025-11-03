"use client";

import { useState } from "react";
import Link from "next/link";

interface Match {
  text: string;
  index: number;
  groups?: string[];
}

export default function RegexTester() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState({ g: true, i: false, m: false, s: false, u: false });
  const [testString, setTestString] = useState("");
  const [matches, setMatches] = useState<Match[]>([]);
  const [error, setError] = useState("");

  const testRegex = () => {
    setError("");
    setMatches([]);

    if (!pattern) {
      setError("정규식 패턴을 입력하세요.");
      return;
    }

    try {
      const flagStr = Object.entries(flags)
        .filter(([_, value]) => value)
        .map(([key]) => key)
        .join("");

      const regex = new RegExp(pattern, flagStr);
      const results: Match[] = [];

      if (flags.g) {
        // Global flag: find all matches
        let match;
        while ((match = regex.exec(testString)) !== null) {
          results.push({
            text: match[0],
            index: match.index,
            groups: match.slice(1),
          });
          // Prevent infinite loop
          if (!regex.global) break;
        }
      } else {
        // No global flag: find first match only
        const match = regex.exec(testString);
        if (match) {
          results.push({
            text: match[0],
            index: match.index,
            groups: match.slice(1),
          });
        }
      }

      setMatches(results);
    } catch (e) {
      setError(e instanceof Error ? e.message : "잘못된 정규식입니다.");
    }
  };

  const loadExample = () => {
    setPattern("\\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}\\b");
    setFlags({ g: true, i: true, m: false, s: false, u: false });
    setTestString(
      "연락처:\nuser@example.com\ntest.email@domain.co.kr\ninvalid@email"
    );
  };

  const commonPatterns = [
    { name: "이메일", pattern: "\\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}\\b", flags: "gi" },
    { name: "URL", pattern: "https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)", flags: "gi" },
    { name: "전화번호", pattern: "\\d{2,3}-\\d{3,4}-\\d{4}", flags: "g" },
    { name: "IP 주소", pattern: "\\b(?:[0-9]{1,3}\\.){3}[0-9]{1,3}\\b", flags: "g" },
    { name: "16진수 색상", pattern: "#[0-9A-Fa-f]{6}\\b", flags: "g" },
    { name: "숫자만", pattern: "\\d+", flags: "g" },
    { name: "영문만", pattern: "[a-zA-Z]+", flags: "g" },
    { name: "한글만", pattern: "[가-힣]+", flags: "g" },
  ];

  const applyPattern = (p: typeof commonPatterns[0]) => {
    setPattern(p.pattern);
    const newFlags = {
      g: p.flags.includes("g"),
      i: p.flags.includes("i"),
      m: p.flags.includes("m"),
      s: p.flags.includes("s"),
      u: p.flags.includes("u"),
    };
    setFlags(newFlags);
  };

  const highlightMatches = () => {
    if (matches.length === 0) return testString;

    let result = testString;
    const sortedMatches = [...matches].sort((a, b) => b.index - a.index);

    sortedMatches.forEach((match) => {
      const before = result.slice(0, match.index);
      const highlighted = `<mark class="bg-yellow-200 dark:bg-yellow-600">${match.text}</mark>`;
      const after = result.slice(match.index + match.text.length);
      result = before + highlighted + after;
    });

    return result;
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        <Link href="/" className="hover:text-primary-500">홈</Link>
        {" > "}
        <Link href="/dev" className="hover:text-primary-500">개발자 도구</Link>
        {" > "}
        <span>정규식 테스터</span>
      </div>

      <h1 className="text-4xl font-bold mb-2">정규식 테스터</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        정규표현식을 테스트하고 검증하세요
      </p>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Pattern Input */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">정규식 패턴</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">패턴</label>
                <div className="flex gap-2">
                  <span className="text-2xl text-gray-400">/</span>
                  <input
                    type="text"
                    value={pattern}
                    onChange={(e) => setPattern(e.target.value)}
                    placeholder="정규식 패턴을 입력하세요"
                    className="input-field flex-1 font-mono"
                  />
                  <span className="text-2xl text-gray-400">/</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">플래그</label>
                <div className="flex gap-4">
                  {Object.entries(flags).map(([key, value]) => (
                    <label key={key} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) =>
                          setFlags({ ...flags, [key]: e.target.checked })
                        }
                        className="w-4 h-4"
                      />
                      <span className="font-mono font-semibold">{key}</span>
                      <span className="text-xs text-gray-500">
                        {key === "g" && "(전역)"}
                        {key === "i" && "(대소문자 무시)"}
                        {key === "m" && "(여러 줄)"}
                        {key === "s" && "(dotAll)"}
                        {key === "u" && "(유니코드)"}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded">
                  {error}
                </div>
              )}
            </div>
          </div>

          {/* Test String */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">테스트 문자열</h2>
              <div className="flex gap-2">
                <button
                  onClick={loadExample}
                  className="text-xs text-primary-500 hover:text-primary-600"
                >
                  예시 로드
                </button>
              </div>
            </div>

            <textarea
              value={testString}
              onChange={(e) => setTestString(e.target.value)}
              placeholder="테스트할 문자열을 입력하세요..."
              className="input-field min-h-[200px] font-mono text-sm"
            />

            <button onClick={testRegex} className="btn-primary w-full mt-4">
              🔍 테스트
            </button>
          </div>

          {/* Results */}
          {matches.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">
                매칭 결과 ({matches.length}개)
              </h2>

              <div className="space-y-4">
                {/* Highlighted Text */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    하이라이트
                  </label>
                  <div
                    className="bg-gray-50 dark:bg-gray-900 p-4 rounded font-mono text-sm whitespace-pre-wrap"
                    dangerouslySetInnerHTML={{ __html: highlightMatches() }}
                  />
                </div>

                {/* Match Details */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    매칭 상세
                  </label>
                  <div className="space-y-2">
                    {matches.map((match, index) => (
                      <div
                        key={index}
                        className="bg-gray-50 dark:bg-gray-900 p-3 rounded"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-mono font-semibold">
                            Match {index + 1}
                          </span>
                          <span className="text-xs text-gray-500">
                            위치: {match.index}
                          </span>
                        </div>
                        <div className="font-mono text-sm bg-yellow-100 dark:bg-yellow-900/30 px-2 py-1 rounded inline-block">
                          {match.text}
                        </div>
                        {match.groups && match.groups.length > 0 && (
                          <div className="mt-2 text-xs">
                            <span className="text-gray-500">그룹: </span>
                            {match.groups.map((group, i) => (
                              <span
                                key={i}
                                className="font-mono bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded mr-2"
                              >
                                ${i + 1}: {group || "(empty)"}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Common Patterns */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">자주 쓰는 패턴</h2>

            <div className="space-y-2">
              {commonPatterns.map((p, index) => (
                <button
                  key={index}
                  onClick={() => applyPattern(p)}
                  className="btn-secondary w-full text-left text-sm"
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          {/* Cheat Sheet */}
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">치트 시트</h2>

            <div className="space-y-3 text-sm">
              <div>
                <div className="font-semibold mb-1">문자 클래스</div>
                <div className="font-mono text-xs space-y-1">
                  <div><span className="text-primary-500">.</span> - 모든 문자</div>
                  <div><span className="text-primary-500">\d</span> - 숫자 [0-9]</div>
                  <div><span className="text-primary-500">\w</span> - 단어 [A-Za-z0-9_]</div>
                  <div><span className="text-primary-500">\s</span> - 공백</div>
                </div>
              </div>

              <div>
                <div className="font-semibold mb-1">수량자</div>
                <div className="font-mono text-xs space-y-1">
                  <div><span className="text-primary-500">*</span> - 0개 이상</div>
                  <div><span className="text-primary-500">+</span> - 1개 이상</div>
                  <div><span className="text-primary-500">?</span> - 0개 또는 1개</div>
                  <div><span className="text-primary-500">{`{n,m}`}</span> - n~m개</div>
                </div>
              </div>

              <div>
                <div className="font-semibold mb-1">앵커</div>
                <div className="font-mono text-xs space-y-1">
                  <div><span className="text-primary-500">^</span> - 줄 시작</div>
                  <div><span className="text-primary-500">$</span> - 줄 끝</div>
                  <div><span className="text-primary-500">\b</span> - 단어 경계</div>
                </div>
              </div>

              <div>
                <div className="font-semibold mb-1">그룹</div>
                <div className="font-mono text-xs space-y-1">
                  <div><span className="text-primary-500">()</span> - 캡처 그룹</div>
                  <div><span className="text-primary-500">(?:)</span> - 비캡처 그룹</div>
                  <div><span className="text-primary-500">|</span> - OR</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
