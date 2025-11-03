"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function TextCounter() {
  const [text, setText] = useState("");
  const [stats, setStats] = useState({
    chars: 0,
    charsNoSpace: 0,
    bytes: 0,
    words: 0,
    lines: 0,
    sentences: 0,
    paragraphs: 0,
  });

  useEffect(() => {
    const chars = text.length;
    const charsNoSpace = text.replace(/\s/g, "").length;
    const bytes = new Blob([text]).size;

    // 단어 수 (공백 기준)
    const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;

    // 줄 수
    const lines = text === "" ? 0 : text.split("\n").length;

    // 문장 수 (마침표, 물음표, 느낌표 기준)
    const sentences = text.trim() === "" ? 0 : text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;

    // 문단 수 (빈 줄로 구분)
    const paragraphs = text.trim() === "" ? 0 : text.split(/\n\s*\n/).filter(p => p.trim().length > 0).length;

    setStats({
      chars,
      charsNoSpace,
      bytes,
      words,
      lines,
      sentences,
      paragraphs,
    });
  }, [text]);

  const loadExample = () => {
    setText(
      "안녕하세요!\n\n이것은 글자수 세기 도구입니다.\n여러 가지 통계를 확인할 수 있습니다.\n\n문자, 단어, 줄, 문장, 문단 수를 계산합니다."
    );
  };

  const clear = () => {
    setText("");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        <Link href="/" className="hover:text-primary-500">홈</Link>
        {" > "}
        <Link href="/text" className="hover:text-primary-500">텍스트 도구</Link>
        {" > "}
        <span>글자수 세기</span>
      </div>

      <h1 className="text-4xl font-bold mb-2">글자수 세기</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        텍스트의 글자, 단어, 줄, 바이트 수를 실시간으로 확인하세요
      </p>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Input */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">텍스트 입력</h2>
              <div className="flex gap-2">
                <button
                  onClick={loadExample}
                  className="text-xs text-primary-500 hover:text-primary-600"
                >
                  예시 로드
                </button>
                <button
                  onClick={clear}
                  className="text-xs text-gray-500 hover:text-gray-600"
                >
                  지우기
                </button>
              </div>
            </div>

            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="여기에 텍스트를 입력하세요..."
              className="input-field min-h-[500px] font-mono"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="space-y-6">
          {/* Basic Stats */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <h2 className="text-xl font-semibold mb-4">📊 통계</h2>

            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">글자 수</span>
                <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  {stats.chars.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">공백 제외</span>
                <span className="text-xl font-semibold">
                  {stats.charsNoSpace.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">바이트</span>
                <span className="text-xl font-semibold">
                  {stats.bytes.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">단어 수</span>
                <span className="text-xl font-semibold">
                  {stats.words.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">줄 수</span>
                <span className="text-xl font-semibold">
                  {stats.lines.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">문장 수</span>
                <span className="text-xl font-semibold">
                  {stats.sentences.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">문단 수</span>
                <span className="text-xl font-semibold">
                  {stats.paragraphs.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Reading Time */}
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6">
            <h3 className="font-semibold mb-3">⏱️ 읽는 시간 (예상)</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">느리게</span>
                <span className="font-semibold">
                  약 {Math.ceil(stats.words / 150)} 분
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">보통</span>
                <span className="font-semibold">
                  약 {Math.ceil(stats.words / 200)} 분
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">빠르게</span>
                <span className="font-semibold">
                  약 {Math.ceil(stats.words / 250)} 분
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 mt-6">
        <h2 className="text-xl font-semibold mb-4">💡 활용 예시</h2>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <h3 className="font-semibold mb-2">📝 글쓰기</h3>
            <p className="text-gray-700 dark:text-gray-300">
              에세이, 리포트 작성 시 글자 수 제한 확인
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">💬 SNS 게시물</h3>
            <p className="text-gray-700 dark:text-gray-300">
              트위터, 인스타그램 글자 수 제한 체크
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">📄 문서 작업</h3>
            <p className="text-gray-700 dark:text-gray-300">
              계약서, 제안서 등 문서 분량 확인
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">✍️ 번역</h3>
            <p className="text-gray-700 dark:text-gray-300">
              번역 전후 문자 수 및 바이트 비교
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
