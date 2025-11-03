"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function ColorConverter() {
  const [hex, setHex] = useState("#3B82F6");
  const [rgb, setRgb] = useState({ r: 59, g: 130, b: 246 });
  const [hsl, setHsl] = useState({ h: 217, s: 91, l: 60 });

  // HEX to RGB
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  // RGB to HEX
  const rgbToHex = (r: number, g: number, b: number) => {
    return "#" + [r, g, b].map((x) => {
      const hex = x.toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    }).join("");
  };

  // RGB to HSL
  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r:
          h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
          break;
        case g:
          h = ((b - r) / d + 2) / 6;
          break;
        case b:
          h = ((r - g) / d + 4) / 6;
          break;
      }
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  };

  // HSL to RGB
  const hslToRgb = (h: number, s: number, l: number) => {
    h /= 360;
    s /= 100;
    l /= 100;

    let r, g, b;

    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;

      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255),
    };
  };

  const updateFromHex = (value: string) => {
    setHex(value);
    const rgbValue = hexToRgb(value);
    if (rgbValue) {
      setRgb(rgbValue);
      setHsl(rgbToHsl(rgbValue.r, rgbValue.g, rgbValue.b));
    }
  };

  const updateFromRgb = (r: number, g: number, b: number) => {
    setRgb({ r, g, b });
    setHex(rgbToHex(r, g, b));
    setHsl(rgbToHsl(r, g, b));
  };

  const updateFromHsl = (h: number, s: number, l: number) => {
    setHsl({ h, s, l });
    const rgbValue = hslToRgb(h, s, l);
    setRgb(rgbValue);
    setHex(rgbToHex(rgbValue.r, rgbValue.g, rgbValue.b));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const pickColor = async () => {
    // @ts-ignore - EyeDropper API는 아직 TypeScript 타입이 없음
    if (!window.EyeDropper) {
      alert("이 브라우저는 스포이드 기능을 지원하지 않습니다. Chrome, Edge 등에서 사용해주세요.");
      return;
    }

    try {
      // @ts-ignore
      const eyeDropper = new window.EyeDropper();
      const result = await eyeDropper.open();
      updateFromHex(result.sRGBHex);
    } catch (e) {
      // 사용자가 취소한 경우
      console.log("Color picking cancelled");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        <Link href="/" className="hover:text-primary-500">홈</Link>
        {" > "}
        <Link href="/conv" className="hover:text-primary-500">변환기</Link>
        {" > "}
        <span>색상 변환기</span>
      </div>

      <h1 className="text-4xl font-bold mb-2">색상 변환기</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        HEX ↔ RGB ↔ HSL 색상 코드 변환
      </p>

      {/* Color Preview */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-6">
        <div className="text-center mb-6">
          <div
            className="w-full h-32 rounded-lg mb-4 border-4 border-gray-200 dark:border-gray-700"
            style={{ backgroundColor: hex }}
          />
          <div className="text-2xl font-bold" style={{ color: hex }}>
            {hex.toUpperCase()}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* HEX Input */}
          <div className="space-y-3">
            <label className="block text-sm font-medium">HEX</label>
            <input
              type="text"
              value={hex}
              onChange={(e) => updateFromHex(e.target.value)}
              className="input-field font-mono"
              placeholder="#3B82F6"
            />
            <button
              onClick={() => copyToClipboard(hex)}
              className="btn-secondary w-full text-sm"
            >
              📋 복사
            </button>
          </div>

          {/* RGB Inputs */}
          <div className="space-y-3">
            <label className="block text-sm font-medium">RGB</label>
            <div className="space-y-2">
              <input
                type="number"
                value={rgb.r}
                onChange={(e) => updateFromRgb(parseInt(e.target.value) || 0, rgb.g, rgb.b)}
                className="input-field"
                placeholder="R"
                min="0"
                max="255"
              />
              <input
                type="number"
                value={rgb.g}
                onChange={(e) => updateFromRgb(rgb.r, parseInt(e.target.value) || 0, rgb.b)}
                className="input-field"
                placeholder="G"
                min="0"
                max="255"
              />
              <input
                type="number"
                value={rgb.b}
                onChange={(e) => updateFromRgb(rgb.r, rgb.g, parseInt(e.target.value) || 0)}
                className="input-field"
                placeholder="B"
                min="0"
                max="255"
              />
            </div>
            <button
              onClick={() => copyToClipboard(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`)}
              className="btn-secondary w-full text-sm"
            >
              📋 복사
            </button>
          </div>

          {/* HSL Inputs */}
          <div className="space-y-3">
            <label className="block text-sm font-medium">HSL</label>
            <div className="space-y-2">
              <input
                type="number"
                value={hsl.h}
                onChange={(e) => updateFromHsl(parseInt(e.target.value) || 0, hsl.s, hsl.l)}
                className="input-field"
                placeholder="H (0-360)"
                min="0"
                max="360"
              />
              <input
                type="number"
                value={hsl.s}
                onChange={(e) => updateFromHsl(hsl.h, parseInt(e.target.value) || 0, hsl.l)}
                className="input-field"
                placeholder="S (0-100)"
                min="0"
                max="100"
              />
              <input
                type="number"
                value={hsl.l}
                onChange={(e) => updateFromHsl(hsl.h, hsl.s, parseInt(e.target.value) || 0)}
                className="input-field"
                placeholder="L (0-100)"
                min="0"
                max="100"
              />
            </div>
            <button
              onClick={() => copyToClipboard(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`)}
              className="btn-secondary w-full text-sm"
            >
              📋 복사
            </button>
          </div>
        </div>

        {/* Color Picker */}
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <label className="block text-sm font-medium mb-2">색상 선택기</label>
          <div className="flex gap-3">
            <input
              type="color"
              value={hex}
              onChange={(e) => updateFromHex(e.target.value)}
              className="flex-1 h-12 rounded-lg cursor-pointer"
            />
            <button
              onClick={pickColor}
              className="btn-primary whitespace-nowrap px-6"
              title="화면에서 색상 추출"
            >
              💧 스포이드
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            💡 스포이드: 화면의 어떤 부분에서든 색상을 추출할 수 있습니다 (Chrome, Edge 지원)
          </p>
        </div>
      </div>

      {/* Color Palette */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-6">
        <h2 className="text-xl font-semibold mb-4">색상 팔레트</h2>
        <div className="grid grid-cols-5 gap-2">
          {[
            "#EF4444", "#F59E0B", "#10B981", "#3B82F6", "#8B5CF6",
            "#EC4899", "#6366F1", "#14B8A6", "#F97316", "#06B6D4",
          ].map((color) => (
            <button
              key={color}
              onClick={() => updateFromHex(color)}
              className="h-12 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:scale-105 transition-transform"
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>
      </div>

      {/* CSS Code */}
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">💡 CSS 코드</h2>
        <div className="space-y-3 font-mono text-sm">
          <div className="p-3 bg-white dark:bg-gray-700 rounded flex justify-between items-center">
            <code>color: {hex};</code>
            <button
              onClick={() => copyToClipboard(`color: ${hex};`)}
              className="text-xs text-primary-500 hover:text-primary-600"
            >
              복사
            </button>
          </div>
          <div className="p-3 bg-white dark:bg-gray-700 rounded flex justify-between items-center">
            <code>color: rgb({rgb.r}, {rgb.g}, {rgb.b});</code>
            <button
              onClick={() => copyToClipboard(`color: rgb(${rgb.r}, ${rgb.g}, ${rgb.b});`)}
              className="text-xs text-primary-500 hover:text-primary-600"
            >
              복사
            </button>
          </div>
          <div className="p-3 bg-white dark:bg-gray-700 rounded flex justify-between items-center">
            <code>color: hsl({hsl.h}, {hsl.s}%, {hsl.l}%);</code>
            <button
              onClick={() => copyToClipboard(`color: hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%);`)}
              className="text-xs text-primary-500 hover:text-primary-600"
            >
              복사
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
