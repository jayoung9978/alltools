"use client";

import { useState } from "react";
import Link from "next/link";

export default function GradientGenerator() {
  const [color1, setColor1] = useState("#3B82F6");
  const [color2, setColor2] = useState("#8B5CF6");
  const [angle, setAngle] = useState(90);
  const [type, setType] = useState<"linear" | "radial">("linear");

  const getGradientCSS = () => {
    if (type === "linear") {
      return `linear-gradient(${angle}deg, ${color1}, ${color2})`;
    } else {
      return `radial-gradient(circle, ${color1}, ${color2})`;
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const presets = [
    { name: "일몰", color1: "#FF6B6B", color2: "#FFD93D", angle: 45 },
    { name: "바다", color1: "#667eea", color2: "#764ba2", angle: 135 },
    { name: "숲", color1: "#11998e", color2: "#38ef7d", angle: 90 },
    { name: "불꽃", color1: "#f12711", color2: "#f5af19", angle: 45 },
    { name: "보라", color1: "#8E2DE2", color2: "#4A00E0", angle: 135 },
    { name: "분홍", color1: "#ff9a9e", color2: "#fecfef", angle: 90 },
  ];

  const loadPreset = (preset: typeof presets[0]) => {
    setColor1(preset.color1);
    setColor2(preset.color2);
    setAngle(preset.angle);
    setType("linear");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        <Link href="/" className="hover:text-primary-500">홈</Link>
        {" > "}
        <Link href="/gen" className="hover:text-primary-500">생성기</Link>
        {" > "}
        <span>그라데이션 생성기</span>
      </div>

      <h1 className="text-4xl font-bold mb-2">그라데이션 생성기</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        CSS 그라데이션 코드를 생성하세요
      </p>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="space-y-6">
          {/* Preview */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <h2 className="text-xl font-semibold mb-4">미리보기</h2>
            <div
              className="w-full h-64 rounded-lg border-4 border-gray-200 dark:border-gray-700"
              style={{ background: getGradientCSS() }}
            />
          </div>

          {/* Type */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <label className="block text-sm font-medium mb-3">타입</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setType("linear")}
                className={`p-3 rounded-lg border-2 transition-all ${
                  type === "linear"
                    ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20"
                    : "border-gray-200 dark:border-gray-700"
                }`}
              >
                선형
              </button>
              <button
                onClick={() => setType("radial")}
                className={`p-3 rounded-lg border-2 transition-all ${
                  type === "radial"
                    ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20"
                    : "border-gray-200 dark:border-gray-700"
                }`}
              >
                원형
              </button>
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="space-y-6">
          {/* Colors */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">색상</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  시작 색상
                </label>
                <div className="flex gap-3">
                  <input
                    type="color"
                    value={color1}
                    onChange={(e) => setColor1(e.target.value)}
                    className="w-20 h-12 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={color1}
                    onChange={(e) => setColor1(e.target.value)}
                    className="input-field flex-1 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  끝 색상
                </label>
                <div className="flex gap-3">
                  <input
                    type="color"
                    value={color2}
                    onChange={(e) => setColor2(e.target.value)}
                    className="w-20 h-12 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={color2}
                    onChange={(e) => setColor2(e.target.value)}
                    className="input-field flex-1 font-mono"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Angle (Linear only) */}
          {type === "linear" && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="flex justify-between mb-2">
                <label className="block text-sm font-medium">각도</label>
                <span className="text-sm font-semibold text-primary-500">
                  {angle}°
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="360"
                value={angle}
                onChange={(e) => setAngle(parseInt(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0°</span>
                <span>360°</span>
              </div>

              {/* Quick Angles */}
              <div className="grid grid-cols-4 gap-2 mt-4">
                {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                  <button
                    key={deg}
                    onClick={() => setAngle(deg)}
                    className="text-xs p-2 bg-gray-100 dark:bg-gray-700 rounded hover:bg-primary-100 dark:hover:bg-primary-900/20"
                  >
                    {deg}°
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* CSS Code */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-3">
              <label className="block text-sm font-medium">CSS 코드</label>
              <button
                onClick={() => copyToClipboard(`background: ${getGradientCSS()};`)}
                className="text-xs text-primary-500 hover:text-primary-600"
              >
                📋 복사
              </button>
            </div>
            <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded font-mono text-sm break-all">
              background: {getGradientCSS()};
            </div>
          </div>
        </div>
      </div>

      {/* Presets */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mt-6">
        <h2 className="text-xl font-semibold mb-4">프리셋</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {presets.map((preset) => (
            <button
              key={preset.name}
              onClick={() => loadPreset(preset)}
              className="group"
            >
              <div
                className="w-full h-24 rounded-lg mb-2 border-2 border-gray-200 dark:border-gray-700 group-hover:border-primary-500 transition-all"
                style={{
                  background: `linear-gradient(${preset.angle}deg, ${preset.color1}, ${preset.color2})`,
                }}
              />
              <div className="text-sm text-center">{preset.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 mt-6">
        <h2 className="text-xl font-semibold mb-4">💡 사용 예시</h2>
        <div className="space-y-3 text-sm">
          <div>
            <div className="font-semibold mb-1">선형 그라데이션</div>
            <code className="text-xs bg-white dark:bg-gray-700 p-2 rounded block">
              background: linear-gradient(90deg, #3B82F6, #8B5CF6);
            </code>
          </div>
          <div>
            <div className="font-semibold mb-1">원형 그라데이션</div>
            <code className="text-xs bg-white dark:bg-gray-700 p-2 rounded block">
              background: radial-gradient(circle, #3B82F6, #8B5CF6);
            </code>
          </div>
          <div>
            <div className="font-semibold mb-1">3색 그라데이션</div>
            <code className="text-xs bg-white dark:bg-gray-700 p-2 rounded block">
              background: linear-gradient(90deg, #3B82F6, #8B5CF6, #EC4899);
            </code>
          </div>
        </div>
      </div>
    </div>
  );
}
