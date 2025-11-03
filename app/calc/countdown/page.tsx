"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
}

export default function CountdownTimer() {
  const [targetDate, setTargetDate] = useState("");
  const [targetTime, setTargetTime] = useState("00:00");
  const [eventName, setEventName] = useState("");
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining | null>(
    null
  );
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      calculateTimeRemaining();
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, targetDate, targetTime]);

  const calculateTimeRemaining = () => {
    if (!targetDate) return;

    const target = new Date(`${targetDate}T${targetTime}`).getTime();
    const now = new Date().getTime();
    const difference = target - now;

    if (difference <= 0) {
      setTimeRemaining({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        total: 0,
      });
      setIsActive(false);
      return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    setTimeRemaining({
      days,
      hours,
      minutes,
      seconds,
      total: difference,
    });
  };

  const startCountdown = () => {
    if (!targetDate) {
      alert("날짜를 선택해주세요.");
      return;
    }

    const target = new Date(`${targetDate}T${targetTime}`).getTime();
    const now = new Date().getTime();

    if (target <= now) {
      alert("미래의 날짜와 시간을 선택해주세요.");
      return;
    }

    setIsActive(true);
    calculateTimeRemaining();
  };

  const reset = () => {
    setIsActive(false);
    setTimeRemaining(null);
    setTargetDate("");
    setTargetTime("00:00");
    setEventName("");
  };

  const loadExample = (days: number, eventTitle: string) => {
    const future = new Date();
    future.setDate(future.getDate() + days);
    setTargetDate(future.toISOString().split("T")[0]);
    setTargetTime("18:00");
    setEventName(eventTitle);
  };

  const getProgressPercentage = () => {
    if (!timeRemaining || timeRemaining.total <= 0) return 0;
    // 최대 365일 기준으로 퍼센티지 계산
    const maxDays = 365;
    const remainingDays =
      timeRemaining.days +
      timeRemaining.hours / 24 +
      timeRemaining.minutes / 1440;
    return Math.min(100, (remainingDays / maxDays) * 100);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        <Link href="/" className="hover:text-primary-500">
          홈
        </Link>
        {" > "}
        <Link href="/calc" className="hover:text-primary-500">
          계산기
        </Link>
        {" > "}
        <span>카운트다운 타이머</span>
      </div>

      <h1 className="text-4xl font-bold mb-2">카운트다운 타이머</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        특정 이벤트까지 남은 시간을 실시간으로 확인하세요
      </p>

      {/* Input Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-6">
        <h2 className="text-xl font-semibold mb-6">이벤트 설정</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              이벤트 이름 (선택)
            </label>
            <input
              type="text"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              placeholder="예: 수능, 결혼식, 여행 출발"
              className="input-field"
              disabled={isActive}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">날짜</label>
              <input
                type="date"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                className="input-field"
                disabled={isActive}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">시간</label>
              <input
                type="time"
                value={targetTime}
                onChange={(e) => setTargetTime(e.target.value)}
                className="input-field"
                disabled={isActive}
              />
            </div>
          </div>

          {!isActive && (
            <div className="flex gap-2">
              <button
                onClick={() => loadExample(7, "다음 주 미팅")}
                className="btn-secondary text-xs py-2 px-3"
              >
                7일 후
              </button>
              <button
                onClick={() => loadExample(30, "한 달 기념일")}
                className="btn-secondary text-xs py-2 px-3"
              >
                30일 후
              </button>
              <button
                onClick={() => loadExample(100, "100일 기념일")}
                className="btn-secondary text-xs py-2 px-3"
              >
                100일 후
              </button>
            </div>
          )}

          <div className="flex gap-3">
            {!isActive ? (
              <button onClick={startCountdown} className="btn-primary flex-1">
                ⏱️ 타이머 시작
              </button>
            ) : (
              <button onClick={reset} className="btn-secondary flex-1">
                초기화
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Countdown Display */}
      {timeRemaining !== null && (
        <div className="bg-gradient-to-br from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20 rounded-xl shadow-lg p-8 mb-6">
          {eventName && (
            <h2 className="text-2xl font-bold text-center mb-6">
              {eventName}
            </h2>
          )}

          {timeRemaining.total > 0 ? (
            <>
              <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center">
                  <div className="text-4xl font-bold text-primary-600 dark:text-primary-400">
                    {timeRemaining.days}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    일
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center">
                  <div className="text-4xl font-bold text-primary-600 dark:text-primary-400">
                    {timeRemaining.hours}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    시간
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center">
                  <div className="text-4xl font-bold text-primary-600 dark:text-primary-400">
                    {timeRemaining.minutes}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    분
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center">
                  <div className="text-4xl font-bold text-primary-600 dark:text-primary-400">
                    {timeRemaining.seconds}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    초
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-primary-500 to-blue-500 h-full transition-all duration-1000"
                  style={{ width: `${100 - getProgressPercentage()}%` }}
                />
              </div>

              <div className="text-center mt-6 text-gray-600 dark:text-gray-400">
                <p className="text-sm">
                  목표: {new Date(`${targetDate}T${targetTime}`).toLocaleString("ko-KR")}
                </p>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🎉</div>
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                시간이 됐습니다!
              </div>
              <p className="text-gray-600 dark:text-gray-400 mt-4">
                {eventName || "목표 시간"}에 도달했습니다.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Info */}
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">💡 활용 예시</h2>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <h3 className="font-semibold mb-2">📅 시험/면접</h3>
            <p className="text-gray-700 dark:text-gray-300">
              중요한 시험이나 면접까지 남은 시간 체크
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">🎂 기념일</h3>
            <p className="text-gray-700 dark:text-gray-300">
              생일, 결혼기념일, 100일 기념일 카운트
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">✈️ 여행</h3>
            <p className="text-gray-700 dark:text-gray-300">
              여행 출발일까지 남은 날짜 확인
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">🎯 프로젝트 마감</h3>
            <p className="text-gray-700 dark:text-gray-300">
              업무 마감일이나 프로젝트 완료 목표일 관리
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
