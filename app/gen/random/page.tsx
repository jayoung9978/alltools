"use client";

import { useState } from "react";
import Link from "next/link";

export default function RandomPicker() {
  const [items, setItems] = useState("");
  const [result, setResult] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const getItems = () => {
    return items
      .split("\n")
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
  };

  const pick = () => {
    const itemList = getItems();
    if (itemList.length === 0) {
      alert("항목을 입력해주세요.");
      return;
    }

    setIsAnimating(true);

    // 애니메이션 효과
    let counter = 0;
    const interval = setInterval(() => {
      const randomItem = itemList[Math.floor(Math.random() * itemList.length)];
      setResult(randomItem);
      counter++;

      if (counter >= 20) {
        clearInterval(interval);
        const finalItem = itemList[Math.floor(Math.random() * itemList.length)];
        setResult(finalItem);
        setHistory((prev) => [finalItem, ...prev.slice(0, 9)]);
        setIsAnimating(false);
      }
    }, 100);
  };

  const pickMultiple = (count: number) => {
    const itemList = getItems();
    if (itemList.length === 0) {
      alert("항목을 입력해주세요.");
      return;
    }

    // 항목이 부족하면 모든 항목을 추첨
    const actualCount = Math.min(count, itemList.length);
    const shuffled = [...itemList].sort(() => Math.random() - 0.5);
    const picked = shuffled.slice(0, actualCount);

    // 항목이 부족했다면 결과에 안내 메시지 추가
    let resultText = picked.join("\n");
    if (actualCount < count) {
      resultText += `\n\n⚠️ 전체 ${itemList.length}개 항목 모두 추첨됨 (요청: ${count}개)`;
    }

    setResult(resultText);
    setHistory((prev) => [...picked, ...prev].slice(0, 10));
  };

  const reset = () => {
    setResult("");
    setHistory([]);
  };

  const loadExample = () => {
    setItems("사과\n바나나\n딸기\n포도\n수박\n참외\n키위\n망고");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        <Link href="/" className="hover:text-primary-500">홈</Link>
        {" > "}
        <Link href="/gen" className="hover:text-primary-500">생성기</Link>
        {" > "}
        <span>랜덤 추첨기</span>
      </div>

      <h1 className="text-4xl font-bold mb-2">랜덤 추첨기</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        항목 중 랜덤으로 선택하세요
      </p>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">항목 입력</h2>
            <button
              onClick={loadExample}
              className="text-xs text-primary-500 hover:text-primary-600"
            >
              예시 로드
            </button>
          </div>

          <textarea
            value={items}
            onChange={(e) => setItems(e.target.value)}
            placeholder="한 줄에 하나씩 입력하세요&#10;예:&#10;사과&#10;바나나&#10;딸기"
            className="input-field min-h-[300px]"
          />

          <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            총 {getItems().length}개 항목
          </div>

          <div className="mt-6 space-y-3">
            <button
              onClick={pick}
              disabled={isAnimating}
              className="btn-primary w-full"
            >
              🎲 1개 추첨
            </button>

            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => pickMultiple(3)}
                className="btn-secondary text-sm py-2"
              >
                3개
              </button>
              <button
                onClick={() => pickMultiple(5)}
                className="btn-secondary text-sm py-2"
              >
                5개
              </button>
              <button
                onClick={() => pickMultiple(10)}
                className="btn-secondary text-sm py-2"
              >
                10개
              </button>
            </div>

            <button onClick={reset} className="btn-secondary w-full">
              초기화
            </button>
          </div>
        </div>

        {/* Result */}
        <div className="space-y-6">
          {/* Current Result */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <h2 className="text-xl font-semibold mb-4">추첨 결과</h2>

            {result ? (
              <div
                className={`min-h-[200px] flex items-center justify-center bg-gradient-to-br from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20 rounded-lg p-6 ${
                  isAnimating ? "animate-pulse" : ""
                }`}
              >
                <div className="text-center">
                  <div className="text-4xl mb-4">🎉</div>
                  <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 whitespace-pre-wrap">
                    {result}
                  </div>
                </div>
              </div>
            ) : (
              <div className="min-h-[200px] flex items-center justify-center bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div className="text-center text-gray-400">
                  <div className="text-4xl mb-2">🎲</div>
                  <div>항목을 입력하고</div>
                  <div>추첨 버튼을 눌러보세요</div>
                </div>
              </div>
            )}
          </div>

          {/* History */}
          {history.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
              <h2 className="text-xl font-semibold mb-4">
                추첨 기록 ({history.length}개)
              </h2>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {history.map((item, index) => (
                  <div
                    key={index}
                    className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded flex items-center justify-between"
                  >
                    <span className="text-sm">{item}</span>
                    <span className="text-xs text-gray-500">#{index + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 mt-6">
        <h2 className="text-xl font-semibold mb-4">💡 활용 예시</h2>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <h3 className="font-semibold mb-2">🎁 경품 추첨</h3>
            <p className="text-gray-700 dark:text-gray-300">
              참가자 이름을 입력하고 당첨자를 랜덤으로 뽑기
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">🍽️ 메뉴 선택</h3>
            <p className="text-gray-700 dark:text-gray-300">
              먹고 싶은 메뉴를 입력하고 오늘의 메뉴 결정
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">👥 팀 배정</h3>
            <p className="text-gray-700 dark:text-gray-300">
              여러 명을 랜덤으로 뽑아 팀 구성하기
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">📝 순서 정하기</h3>
            <p className="text-gray-700 dark:text-gray-300">
              발표 순서나 작업 순서 랜덤 지정
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
