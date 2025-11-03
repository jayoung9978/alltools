"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function TimestampConverter() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [timestamp, setTimestamp] = useState("");
  const [humanDate, setHumanDate] = useState("");
  const [humanTime, setHumanTime] = useState("");
  const [convertedResult, setConvertedResult] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timestampToDate = () => {
    try {
      const ts = parseInt(timestamp);
      if (isNaN(ts)) {
        setConvertedResult("유효하지 않은 타임스탬프입니다.");
        return;
      }

      // Auto-detect: seconds vs milliseconds
      const date = ts > 10000000000 ? new Date(ts) : new Date(ts * 1000);

      const formatted = date.toLocaleString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });

      const iso = date.toISOString();
      const utc = date.toUTCString();

      setConvertedResult(`로컬 시간: ${formatted}\nISO 8601: ${iso}\nUTC: ${utc}`);
    } catch (e) {
      setConvertedResult("변환 중 오류가 발생했습니다.");
    }
  };

  const dateToTimestamp = () => {
    try {
      if (!humanDate) {
        setConvertedResult("날짜를 입력하세요.");
        return;
      }

      const dateTimeString = humanTime
        ? `${humanDate}T${humanTime}`
        : `${humanDate}T00:00:00`;

      const date = new Date(dateTimeString);

      if (isNaN(date.getTime())) {
        setConvertedResult("유효하지 않은 날짜입니다.");
        return;
      }

      const timestampMs = date.getTime();
      const timestampSec = Math.floor(timestampMs / 1000);

      setConvertedResult(
        `타임스탬프 (초): ${timestampSec}\n타임스탬프 (밀리초): ${timestampMs}\nISO 8601: ${date.toISOString()}`
      );
    } catch (e) {
      setConvertedResult("변환 중 오류가 발생했습니다.");
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const getCurrentTimestamp = (inMs: boolean = false) => {
    const ts = inMs ? Date.now() : Math.floor(Date.now() / 1000);
    copyToClipboard(ts.toString());
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        <Link href="/" className="hover:text-primary-500">홈</Link>
        {" > "}
        <Link href="/dev" className="hover:text-primary-500">개발자 도구</Link>
        {" > "}
        <span>Unix Timestamp</span>
      </div>

      <h1 className="text-4xl font-bold mb-2">Unix Timestamp 변환</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Unix 타임스탬프와 날짜를 상호 변환하세요
      </p>

      <div className="space-y-6">
        {/* Current Time */}
        <div className="bg-gradient-to-br from-primary-500 to-blue-500 rounded-xl shadow-lg p-8 text-white">
          <h2 className="text-2xl font-semibold mb-4">⏰ 현재 시간</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="text-sm opacity-90 mb-2">현재 날짜/시간</div>
              <div className="text-3xl font-bold mb-4">
                {currentTime.toLocaleString("ko-KR", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: false,
                })}
              </div>
              <div className="text-sm opacity-75">
                {currentTime.toLocaleDateString("ko-KR", { weekday: "long" })}
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <div className="text-sm opacity-90 mb-1">타임스탬프 (초)</div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={Math.floor(currentTime.getTime() / 1000)}
                    readOnly
                    className="flex-1 bg-white/20 border border-white/30 rounded px-3 py-2 font-mono"
                  />
                  <button
                    onClick={() => getCurrentTimestamp(false)}
                    className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded"
                  >
                    📋
                  </button>
                </div>
              </div>

              <div>
                <div className="text-sm opacity-90 mb-1">타임스탬프 (밀리초)</div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={currentTime.getTime()}
                    readOnly
                    className="flex-1 bg-white/20 border border-white/30 rounded px-3 py-2 font-mono"
                  />
                  <button
                    onClick={() => getCurrentTimestamp(true)}
                    className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded"
                  >
                    📋
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Timestamp to Date */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">
              타임스탬프 → 날짜
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Unix 타임스탬프
                </label>
                <input
                  type="text"
                  value={timestamp}
                  onChange={(e) => setTimestamp(e.target.value)}
                  placeholder="예: 1609459200 또는 1609459200000"
                  className="input-field font-mono"
                />
                <div className="text-xs text-gray-500 mt-1">
                  초(10자리) 또는 밀리초(13자리) 입력
                </div>
              </div>

              <button onClick={timestampToDate} className="btn-primary w-full">
                🔄 변환
              </button>
            </div>
          </div>

          {/* Date to Timestamp */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">
              날짜 → 타임스탬프
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">날짜</label>
                <input
                  type="date"
                  value={humanDate}
                  onChange={(e) => setHumanDate(e.target.value)}
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  시간 (선택사항)
                </label>
                <input
                  type="time"
                  value={humanTime}
                  onChange={(e) => setHumanTime(e.target.value)}
                  className="input-field"
                />
              </div>

              <button onClick={dateToTimestamp} className="btn-primary w-full">
                🔄 변환
              </button>
            </div>
          </div>
        </div>

        {/* Result */}
        {convertedResult && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">변환 결과</h2>
              <button
                onClick={() => copyToClipboard(convertedResult)}
                className="btn-secondary text-sm"
              >
                📋 복사
              </button>
            </div>

            <pre className="bg-gray-50 dark:bg-gray-900 p-4 rounded font-mono text-sm whitespace-pre-wrap">
              {convertedResult}
            </pre>
          </div>
        )}

        {/* Info */}
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">💡 Unix Timestamp란?</h2>
          <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
            <p>
              Unix 타임스탬프는 1970년 1월 1일 00:00:00 UTC부터 경과한 시간을
              초 단위로 표현한 값입니다.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">📏 형식</h3>
                <ul className="space-y-1">
                  <li>• <span className="font-mono">초</span>: 10자리 숫자 (예: 1609459200)</li>
                  <li>• <span className="font-mono">밀리초</span>: 13자리 숫자 (예: 1609459200000)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">🎯 활용</h3>
                <ul className="space-y-1">
                  <li>• 데이터베이스 날짜 저장</li>
                  <li>• API 응답의 시간 표현</li>
                  <li>• 로그 파일의 타임스탬프</li>
                  <li>• 시간 기반 계산</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
