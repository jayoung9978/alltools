"use client";

import { useState } from "react";
import Link from "next/link";

export default function CaseConverter() {
  const [text, setText] = useState("");

  const convertCase = (type: string) => {
    let result = "";
    switch (type) {
      case "upper":
        result = text.toUpperCase();
        break;
      case "lower":
        result = text.toLowerCase();
        break;
      case "title":
        result = text
          .toLowerCase()
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
        break;
      case "sentence":
        result = text
          .toLowerCase()
          .split(". ")
          .map((sentence) => sentence.charAt(0).toUpperCase() + sentence.slice(1))
          .join(". ");
        break;
      case "toggle":
        result = text
          .split("")
          .map((char) =>
            char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()
          )
          .join("");
        break;
      case "camel":
        result = text
          .toLowerCase()
          .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase());
        break;
      case "pascal":
        result = text
          .toLowerCase()
          .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
          .replace(/^(.)/, (_, chr) => chr.toUpperCase());
        break;
      case "snake":
        result = text
          .trim()
          .replace(/\s+/g, "_")
          .toLowerCase();
        break;
      case "kebab":
        result = text
          .trim()
          .replace(/\s+/g, "-")
          .toLowerCase();
        break;
      case "constant":
        result = text
          .trim()
          .replace(/\s+/g, "_")
          .toUpperCase();
        break;
      default:
        result = text;
    }
    setText(result);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
  };

  const loadExample = () => {
    setText("hello world example text");
  };

  const clear = () => {
    setText("");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        <Link href="/" className="hover:text-primary-500">홈</Link>
        {" > "}
        <Link href="/text" className="hover:text-primary-500">텍스트 도구</Link>
        {" > "}
        <span>대소문자 변환</span>
      </div>

      <h1 className="text-4xl font-bold mb-2">대소문자 변환</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        텍스트를 다양한 케이스로 변환하세요
      </p>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Input */}
        <div className="lg:col-span-2 space-y-6">
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
              className="input-field min-h-[300px] text-lg"
            />

            <div className="flex justify-between items-center mt-4">
              <div className="text-sm text-gray-500">
                {text.length} 글자
              </div>
              <button
                onClick={copyToClipboard}
                className="btn-secondary text-sm"
              >
                📋 복사
              </button>
            </div>
          </div>

          {/* Examples */}
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">💡 변환 예시</h2>
            <div className="space-y-2 text-sm font-mono">
              <div className="grid grid-cols-2 gap-2">
                <span className="text-gray-600 dark:text-gray-400">원본:</span>
                <span>hello world</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span className="text-gray-600 dark:text-gray-400">UPPER CASE:</span>
                <span>HELLO WORLD</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span className="text-gray-600 dark:text-gray-400">lower case:</span>
                <span>hello world</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span className="text-gray-600 dark:text-gray-400">Title Case:</span>
                <span>Hello World</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span className="text-gray-600 dark:text-gray-400">camelCase:</span>
                <span>helloWorld</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span className="text-gray-600 dark:text-gray-400">PascalCase:</span>
                <span>HelloWorld</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span className="text-gray-600 dark:text-gray-400">snake_case:</span>
                <span>hello_world</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span className="text-gray-600 dark:text-gray-400">kebab-case:</span>
                <span>hello-world</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span className="text-gray-600 dark:text-gray-400">CONSTANT_CASE:</span>
                <span>HELLO_WORLD</span>
              </div>
            </div>
          </div>
        </div>

        {/* Conversion Buttons */}
        <div className="space-y-3">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">변환 옵션</h2>

            <div className="space-y-2">
              <button
                onClick={() => convertCase("upper")}
                className="btn-secondary w-full text-left justify-start"
              >
                🔤 UPPER CASE
              </button>

              <button
                onClick={() => convertCase("lower")}
                className="btn-secondary w-full text-left justify-start"
              >
                🔡 lower case
              </button>

              <button
                onClick={() => convertCase("title")}
                className="btn-secondary w-full text-left justify-start"
              >
                🔠 Title Case
              </button>

              <button
                onClick={() => convertCase("sentence")}
                className="btn-secondary w-full text-left justify-start"
              >
                📝 Sentence case
              </button>

              <button
                onClick={() => convertCase("toggle")}
                className="btn-secondary w-full text-left justify-start"
              >
                ⚡ tOGGLE cASE
              </button>

              <div className="border-t border-gray-200 dark:border-gray-700 my-4"></div>

              <div className="text-sm font-semibold text-gray-500 mb-2">
                프로그래밍 케이스
              </div>

              <button
                onClick={() => convertCase("camel")}
                className="btn-secondary w-full text-left justify-start text-sm"
              >
                🐫 camelCase
              </button>

              <button
                onClick={() => convertCase("pascal")}
                className="btn-secondary w-full text-left justify-start text-sm"
              >
                🅿️ PascalCase
              </button>

              <button
                onClick={() => convertCase("snake")}
                className="btn-secondary w-full text-left justify-start text-sm"
              >
                🐍 snake_case
              </button>

              <button
                onClick={() => convertCase("kebab")}
                className="btn-secondary w-full text-left justify-start text-sm"
              >
                �串 kebab-case
              </button>

              <button
                onClick={() => convertCase("constant")}
                className="btn-secondary w-full text-left justify-start text-sm"
              >
                🔒 CONSTANT_CASE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
