"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type ContrastResult = {
  ratio: number;
  aa: { normal: boolean; large: boolean };
  aaa: { normal: boolean; large: boolean };
};

export default function ContrastChecker() {
  const [foreground, setForeground] = useState("#000000");
  const [background, setBackground] = useState("#ffffff");
  const [result, setResult] = useState<ContrastResult | null>(null);

  useEffect(() => {
    calculateContrast();
  }, [foreground, background]);

  const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  const getLuminance = (r: number, g: number, b: number): number => {
    const [rs, gs, bs] = [r, g, b].map((val) => {
      val = val / 255;
      return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };

  const getContrastRatio = (color1: string, color2: string): number => {
    const rgb1 = hexToRgb(color1);
    const rgb2 = hexToRgb(color2);

    if (!rgb1 || !rgb2) return 0;

    const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
    const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);

    const lighter = Math.max(lum1, lum2);
    const darker = Math.min(lum1, lum2);

    return (lighter + 0.05) / (darker + 0.05);
  };

  const calculateContrast = () => {
    const ratio = getContrastRatio(foreground, background);

    setResult({
      ratio: ratio,
      aa: {
        normal: ratio >= 4.5, // 일반 텍스트 AA 기준
        large: ratio >= 3, // 큰 텍스트 AA 기준
      },
      aaa: {
        normal: ratio >= 7, // 일반 텍스트 AAA 기준
        large: ratio >= 4.5, // 큰 텍스트 AAA 기준
      },
    });
  };

  const swapColors = () => {
    const temp = foreground;
    setForeground(background);
    setBackground(temp);
  };

  const loadExample = (fg: string, bg: string) => {
    setForeground(fg);
    setBackground(bg);
  };

  const getStatusIcon = (pass: boolean) => {
    return pass ? "✅" : "❌";
  };

  const getStatusColor = (pass: boolean) => {
    return pass
      ? "text-green-600 dark:text-green-400"
      : "text-red-600 dark:text-red-400";
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        <Link href="/" className="hover:text-primary-500">
          홈
        </Link>
        {" > "}
        <Link href="/dev" className="hover:text-primary-500">
          개발자 도구
        </Link>
        {" > "}
        <span>색상 대비 검사</span>
      </div>

      <h1 className="text-4xl font-bold mb-2">색상 대비 검사기 (WCAG)</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        웹 접근성 표준(WCAG)에 따른 색상 대비율을 검사합니다
      </p>

      {/* Color Pickers */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-6">
        <h2 className="text-xl font-semibold mb-4">색상 선택</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Foreground */}
          <div>
            <label className="block text-sm font-medium mb-2">
              전경색 (텍스트 색상)
            </label>
            <div className="flex gap-3 items-center">
              <input
                type="color"
                value={foreground}
                onChange={(e) => setForeground(e.target.value)}
                className="w-20 h-12 cursor-pointer rounded border border-gray-300 dark:border-gray-600"
              />
              <input
                type="text"
                value={foreground}
                onChange={(e) => setForeground(e.target.value)}
                className="input-field flex-1"
                placeholder="#000000"
              />
            </div>
          </div>

          {/* Background */}
          <div>
            <label className="block text-sm font-medium mb-2">
              배경색 (Background)
            </label>
            <div className="flex gap-3 items-center">
              <input
                type="color"
                value={background}
                onChange={(e) => setBackground(e.target.value)}
                className="w-20 h-12 cursor-pointer rounded border border-gray-300 dark:border-gray-600"
              />
              <input
                type="text"
                value={background}
                onChange={(e) => setBackground(e.target.value)}
                className="input-field flex-1"
                placeholder="#ffffff"
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button onClick={swapColors} className="btn-secondary">
            🔄 색상 교체
          </button>
        </div>

        {/* Quick Examples */}
        <div className="mt-6">
          <h3 className="text-sm font-medium mb-2">빠른 예시</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <button
              onClick={() => loadExample("#000000", "#ffffff")}
              className="btn-secondary text-sm py-2"
            >
              검정/흰색
            </button>
            <button
              onClick={() => loadExample("#ffffff", "#000000")}
              className="btn-secondary text-sm py-2"
            >
              흰색/검정
            </button>
            <button
              onClick={() => loadExample("#0066cc", "#ffffff")}
              className="btn-secondary text-sm py-2"
            >
              파랑/흰색
            </button>
            <button
              onClick={() => loadExample("#767676", "#ffffff")}
              className="btn-secondary text-sm py-2"
            >
              회색/흰색
            </button>
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-6">
        <h2 className="text-xl font-semibold mb-4">미리보기</h2>
        <div
          style={{ backgroundColor: background }}
          className="rounded-lg p-8 border border-gray-300 dark:border-gray-600"
        >
          <div style={{ color: foreground }} className="space-y-4">
            <div className="text-sm">작은 텍스트 (14px) - 일반 크기</div>
            <div className="text-base font-normal">
              일반 텍스트 예시입니다. The quick brown fox jumps over the lazy
              dog.
            </div>
            <div className="text-lg font-semibold">
              큰 텍스트 (18px 볼드) - 큰 크기
            </div>
            <div className="text-2xl">
              매우 큰 텍스트 (24px) - Large Text Example
            </div>
          </div>
        </div>
      </div>

      {/* Contrast Results */}
      {result && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-6">
          <h2 className="text-xl font-semibold mb-4">대비율 검사 결과</h2>

          {/* Contrast Ratio */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6 mb-6">
            <div className="text-center">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                대비율 (Contrast Ratio)
              </div>
              <div className="text-5xl font-bold text-primary-500">
                {result.ratio.toFixed(2)}:1
              </div>
            </div>
          </div>

          {/* WCAG Standards */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* AA Standard */}
            <div className="border-2 border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">
                WCAG AA 기준 (최소 요구사항)
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>일반 텍스트 (4.5:1)</span>
                  <span className={getStatusColor(result.aa.normal)}>
                    {getStatusIcon(result.aa.normal)}{" "}
                    {result.aa.normal ? "통과" : "실패"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>큰 텍스트 (3:1)</span>
                  <span className={getStatusColor(result.aa.large)}>
                    {getStatusIcon(result.aa.large)}{" "}
                    {result.aa.large ? "통과" : "실패"}
                  </span>
                </div>
              </div>
            </div>

            {/* AAA Standard */}
            <div className="border-2 border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">
                WCAG AAA 기준 (향상된 요구사항)
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>일반 텍스트 (7:1)</span>
                  <span className={getStatusColor(result.aaa.normal)}>
                    {getStatusIcon(result.aaa.normal)}{" "}
                    {result.aaa.normal ? "통과" : "실패"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>큰 텍스트 (4.5:1)</span>
                  <span className={getStatusColor(result.aaa.large)}>
                    {getStatusIcon(result.aaa.large)}{" "}
                    {result.aaa.large ? "통과" : "실패"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Overall Status */}
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h3 className="font-semibold mb-2 text-blue-900 dark:text-blue-300">
              📌 권장 사항
            </h3>
            <div className="text-sm text-gray-700 dark:text-gray-300">
              {result.aaa.normal ? (
                <p>
                  ✅ 훌륭합니다! AAA 기준을 통과하여 최상의 접근성을
                  제공합니다.
                </p>
              ) : result.aa.normal ? (
                <p>
                  ✅ AA 기준을 통과했습니다. 대부분의 웹사이트에 적합한
                  대비율입니다.
                </p>
              ) : result.aa.large ? (
                <p>
                  ⚠️ 큰 텍스트에만 사용 가능합니다. 일반 크기 텍스트는 대비율을
                  높여주세요.
                </p>
              ) : (
                <p>
                  ❌ 접근성 기준을 통과하지 못했습니다. 색상 대비를 높이는 것을
                  권장합니다.
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Info */}
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">💡 WCAG 기준 설명</h2>
        <div className="grid md:grid-cols-2 gap-6 text-sm">
          <div>
            <h3 className="font-semibold mb-2">📊 대비율 기준</h3>
            <ul className="text-gray-700 dark:text-gray-300 space-y-1">
              <li>• AA 일반 텍스트: 4.5:1 이상</li>
              <li>• AA 큰 텍스트: 3:1 이상</li>
              <li>• AAA 일반 텍스트: 7:1 이상</li>
              <li>• AAA 큰 텍스트: 4.5:1 이상</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">📏 텍스트 크기 정의</h3>
            <ul className="text-gray-700 dark:text-gray-300 space-y-1">
              <li>• 일반 텍스트: 18px 미만 (또는 14px 볼드 미만)</li>
              <li>• 큰 텍스트: 18px 이상 (또는 14px 볼드 이상)</li>
              <li>• 24px는 큰 텍스트로 분류됨</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">🎯 WCAG 레벨</h3>
            <ul className="text-gray-700 dark:text-gray-300 space-y-1">
              <li>• AA: 최소 준수 기준 (법적 요구사항)</li>
              <li>• AAA: 향상된 접근성 (권장 사항)</li>
              <li>• 대부분의 웹사이트는 AA 기준 준수</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">♿ 왜 중요한가요?</h3>
            <p className="text-gray-700 dark:text-gray-300">
              저시력자, 색맹, 노인 등 다양한 사용자가 콘텐츠를 쉽게 읽을 수
              있도록 하여 웹 접근성을 향상시킵니다.
            </p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
          <h3 className="font-semibold mb-2 text-yellow-900 dark:text-yellow-300">
            ⚠️ 주의사항
          </h3>
          <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
            <li>
              • 그래픽 UI (버튼, 아이콘)는 3:1 이상의 대비율 권장 (WCAG 2.1)
            </li>
            <li>• 로고와 장식적 요소는 대비율 요구사항에서 제외됨</li>
            <li>• 비활성화된 요소도 대비율 요구사항에서 제외될 수 있음</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
