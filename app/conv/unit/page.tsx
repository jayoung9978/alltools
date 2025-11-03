"use client";

import { useState } from "react";
import Link from "next/link";

type UnitCategory = "length" | "weight" | "temperature";

interface Unit {
  name: string;
  symbol: string;
  toBase: (value: number) => number;
  fromBase: (value: number) => number;
}

const units: Record<UnitCategory, Unit[]> = {
  length: [
    { name: "미터", symbol: "m", toBase: (v) => v, fromBase: (v) => v },
    { name: "킬로미터", symbol: "km", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
    { name: "센티미터", symbol: "cm", toBase: (v) => v / 100, fromBase: (v) => v * 100 },
    { name: "밀리미터", symbol: "mm", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
    { name: "마일", symbol: "mi", toBase: (v) => v * 1609.34, fromBase: (v) => v / 1609.34 },
    { name: "야드", symbol: "yd", toBase: (v) => v * 0.9144, fromBase: (v) => v / 0.9144 },
    { name: "피트", symbol: "ft", toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
    { name: "인치", symbol: "in", toBase: (v) => v * 0.0254, fromBase: (v) => v / 0.0254 },
  ],
  weight: [
    { name: "킬로그램", symbol: "kg", toBase: (v) => v, fromBase: (v) => v },
    { name: "그램", symbol: "g", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
    { name: "밀리그램", symbol: "mg", toBase: (v) => v / 1000000, fromBase: (v) => v * 1000000 },
    { name: "톤", symbol: "t", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
    { name: "파운드", symbol: "lb", toBase: (v) => v * 0.453592, fromBase: (v) => v / 0.453592 },
    { name: "온스", symbol: "oz", toBase: (v) => v * 0.0283495, fromBase: (v) => v / 0.0283495 },
  ],
  temperature: [
    { name: "섭씨", symbol: "°C", toBase: (v) => v, fromBase: (v) => v },
    { name: "화씨", symbol: "°F", toBase: (v) => (v - 32) * 5/9, fromBase: (v) => v * 9/5 + 32 },
    { name: "켈빈", symbol: "K", toBase: (v) => v - 273.15, fromBase: (v) => v + 273.15 },
  ],
};

export default function UnitConverter() {
  const [category, setCategory] = useState<UnitCategory>("length");
  const [fromUnit, setFromUnit] = useState(0);
  const [toUnit, setToUnit] = useState(1);
  const [value, setValue] = useState("");

  const convert = () => {
    const num = parseFloat(value);
    if (isNaN(num)) return "";

    const from = units[category][fromUnit];
    const to = units[category][toUnit];

    const baseValue = from.toBase(num);
    const result = to.fromBase(baseValue);

    return result.toFixed(6).replace(/\.?0+$/, "");
  };

  const result = convert();

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        <Link href="/" className="hover:text-primary-500">홈</Link>
        {" > "}
        <Link href="/conv" className="hover:text-primary-500">변환기</Link>
        {" > "}
        <span>단위 변환</span>
      </div>

      <h1 className="text-4xl font-bold mb-2">단위 변환기</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        길이, 무게, 온도 단위 변환
      </p>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
        {/* Category Selection */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <button
            onClick={() => {
              setCategory("length");
              setFromUnit(0);
              setToUnit(1);
            }}
            className={`p-4 rounded-lg border-2 transition-all ${
              category === "length"
                ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20"
                : "border-gray-200 dark:border-gray-700"
            }`}
          >
            <div className="font-semibold">📏 길이</div>
          </button>
          <button
            onClick={() => {
              setCategory("weight");
              setFromUnit(0);
              setToUnit(1);
            }}
            className={`p-4 rounded-lg border-2 transition-all ${
              category === "weight"
                ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20"
                : "border-gray-200 dark:border-gray-700"
            }`}
          >
            <div className="font-semibold">⚖️ 무게</div>
          </button>
          <button
            onClick={() => {
              setCategory("temperature");
              setFromUnit(0);
              setToUnit(1);
            }}
            className={`p-4 rounded-lg border-2 transition-all ${
              category === "temperature"
                ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20"
                : "border-gray-200 dark:border-gray-700"
            }`}
          >
            <div className="font-semibold">🌡️ 온도</div>
          </button>
        </div>

        <div className="space-y-6">
          {/* From Unit */}
          <div>
            <label className="block text-sm font-medium mb-2">변환할 값</label>
            <div className="flex gap-2">
              <input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="100"
                className="input-field flex-1"
              />
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(parseInt(e.target.value))}
                className="input-field w-32"
              >
                {units[category].map((unit, index) => (
                  <option key={index} value={index}>
                    {unit.symbol}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Swap Button */}
          <div className="text-center">
            <button
              onClick={() => {
                const temp = fromUnit;
                setFromUnit(toUnit);
                setToUnit(temp);
              }}
              className="btn-secondary"
            >
              ⇅ 교환
            </button>
          </div>

          {/* To Unit */}
          <div>
            <label className="block text-sm font-medium mb-2">변환 결과</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={result}
                readOnly
                placeholder="0"
                className="input-field flex-1 bg-gray-50 dark:bg-gray-700 font-bold text-lg"
              />
              <select
                value={toUnit}
                onChange={(e) => setToUnit(parseInt(e.target.value))}
                className="input-field w-32"
              >
                {units[category].map((unit, index) => (
                  <option key={index} value={index}>
                    {unit.symbol}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Result Display */}
          {result && (
            <div className="p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg text-center">
              <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                {value} {units[category][fromUnit].symbol} = {result} {units[category][toUnit].symbol}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Reference */}
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 mt-6">
        <h2 className="text-xl font-semibold mb-4">📋 자주 쓰는 변환</h2>
        <div className="grid md:grid-cols-2 gap-3 text-sm">
          {category === "length" && (
            <>
              <div className="p-3 bg-white dark:bg-gray-700 rounded">1 inch = 2.54 cm</div>
              <div className="p-3 bg-white dark:bg-gray-700 rounded">1 foot = 30.48 cm</div>
              <div className="p-3 bg-white dark:bg-gray-700 rounded">1 mile = 1.609 km</div>
              <div className="p-3 bg-white dark:bg-gray-700 rounded">1 yard = 0.914 m</div>
            </>
          )}
          {category === "weight" && (
            <>
              <div className="p-3 bg-white dark:bg-gray-700 rounded">1 lb = 0.454 kg</div>
              <div className="p-3 bg-white dark:bg-gray-700 rounded">1 oz = 28.35 g</div>
              <div className="p-3 bg-white dark:bg-gray-700 rounded">1 ton = 1000 kg</div>
              <div className="p-3 bg-white dark:bg-gray-700 rounded">1 kg = 2.205 lb</div>
            </>
          )}
          {category === "temperature" && (
            <>
              <div className="p-3 bg-white dark:bg-gray-700 rounded">0°C = 32°F</div>
              <div className="p-3 bg-white dark:bg-gray-700 rounded">100°C = 212°F</div>
              <div className="p-3 bg-white dark:bg-gray-700 rounded">0 K = -273.15°C</div>
              <div className="p-3 bg-white dark:bg-gray-700 rounded">37°C = 98.6°F (체온)</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
