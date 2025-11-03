"use client";

import { useState } from "react";
import Link from "next/link";

type Match = {
  id: number;
  option1: string | null;
  option2: string | null;
  winner: string | null;
  round: number;
};

export default function TournamentSelector() {
  const [items, setItems] = useState("");
  const [mode, setMode] = useState<"single" | "tournament">("single");
  const [matches, setMatches] = useState<Match[]>([]);
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);
  const [winner, setWinner] = useState<string | null>(null);
  const [tournamentStarted, setTournamentStarted] = useState(false);

  const getItems = () => {
    return items
      .split("\n")
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
  };

  const startSingleChoice = () => {
    const itemList = getItems();
    if (itemList.length < 2) {
      alert("최소 2개 이상의 항목을 입력해주세요.");
      return;
    }

    // 무작위로 하나 선택
    const randomIndex = Math.floor(Math.random() * itemList.length);
    setWinner(itemList[randomIndex]);
    setTournamentStarted(true);
  };

  const startTournament = () => {
    const itemList = getItems();
    if (itemList.length < 2) {
      alert("최소 2개 이상의 항목을 입력해주세요.");
      return;
    }

    // 토너먼트 대진표 생성
    const shuffled = [...itemList].sort(() => Math.random() - 0.5);
    const newMatches: Match[] = [];
    let matchId = 0;

    // 첫 라운드 매치 생성
    for (let i = 0; i < shuffled.length; i += 2) {
      newMatches.push({
        id: matchId++,
        option1: shuffled[i],
        option2: shuffled[i + 1] || null, // 홀수 개수일 경우 null
        winner: shuffled[i + 1] ? null : shuffled[i], // 상대가 없으면 자동 승리
        round: 1,
      });
    }

    setMatches(newMatches);
    setCurrentMatchIndex(0);
    setWinner(null);
    setTournamentStarted(true);
  };

  const selectWinner = (selectedOption: string) => {
    const updatedMatches = [...matches];
    updatedMatches[currentMatchIndex].winner = selectedOption;
    setMatches(updatedMatches);

    // 다음 매치로 이동
    const nextIndex = currentMatchIndex + 1;
    const currentRoundMatches = matches.filter(
      (m) => m.round === matches[currentMatchIndex].round
    );
    const completedCurrentRound = currentRoundMatches.every((m) => m.winner !== null);

    if (nextIndex < matches.length && !completedCurrentRound) {
      setCurrentMatchIndex(nextIndex);
    } else if (completedCurrentRound) {
      // 현재 라운드 완료, 다음 라운드 생성
      const winners = currentRoundMatches
        .map((m) => m.winner)
        .filter((w) => w !== null) as string[];

      if (winners.length === 1) {
        // 토너먼트 종료
        setWinner(winners[0]);
      } else {
        // 다음 라운드 매치 생성
        const nextRound = matches[currentMatchIndex].round + 1;
        const nextRoundMatches: Match[] = [];
        let matchId = matches.length;

        for (let i = 0; i < winners.length; i += 2) {
          nextRoundMatches.push({
            id: matchId++,
            option1: winners[i],
            option2: winners[i + 1] || null,
            winner: winners[i + 1] ? null : winners[i],
            round: nextRound,
          });
        }

        const allMatches = [...matches, ...nextRoundMatches];
        setMatches(allMatches);
        setCurrentMatchIndex(matches.length);
      }
    }
  };

  const reset = () => {
    setMatches([]);
    setCurrentMatchIndex(0);
    setWinner(null);
    setTournamentStarted(false);
  };

  const loadExample = () => {
    setItems(
      "피자\n치킨\n햄버거\n짜장면\n짬뽕\n탕수육\n초밥\n삼겹살\n스테이크\n파스타\n라면\n김치찌개"
    );
  };

  const getCurrentMatch = () => {
    return matches[currentMatchIndex];
  };

  const getRoundName = (round: number) => {
    const totalRounds = Math.max(...matches.map((m) => m.round));
    if (round === totalRounds && matches.filter((m) => m.round === round).length === 1) {
      return "결승전";
    }
    if (round === totalRounds - 1 && matches.filter((m) => m.round === round).length === 2) {
      return "준결승";
    }
    return `${round}라운드`;
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        <Link href="/" className="hover:text-primary-500">
          홈
        </Link>
        {" > "}
        <Link href="/gen" className="hover:text-primary-500">
          생성기
        </Link>
        {" > "}
        <span>투표 & 선택</span>
      </div>

      <h1 className="text-4xl font-bold mb-2">투표 & 선택 도구</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        여러 항목 중 하나를 선택하거나 토너먼트로 최종 승자를 결정합니다
      </p>

      {!tournamentStarted ? (
        <>
          {/* Mode Selection */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-6">
            <h2 className="text-xl font-semibold mb-4">모드 선택</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <button
                onClick={() => setMode("single")}
                className={`p-6 rounded-lg border-2 transition-colors ${
                  mode === "single"
                    ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20"
                    : "border-gray-200 dark:border-gray-700"
                }`}
              >
                <div className="text-3xl mb-2">🎯</div>
                <div className="font-semibold mb-1">단일 선택</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  여러 항목 중 무작위로 하나를 선택합니다
                </div>
              </button>

              <button
                onClick={() => setMode("tournament")}
                className={`p-6 rounded-lg border-2 transition-colors ${
                  mode === "tournament"
                    ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20"
                    : "border-gray-200 dark:border-gray-700"
                }`}
              >
                <div className="text-3xl mb-2">🏆</div>
                <div className="font-semibold mb-1">토너먼트</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  대진표를 만들어 1:1 선택으로 최종 승자 결정
                </div>
              </button>
            </div>
          </div>

          {/* Input Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-6">
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
              placeholder="선택할 항목을 한 줄에 하나씩 입력하세요&#10;예:&#10;피자&#10;치킨&#10;햄버거"
              className="input-field min-h-[300px]"
            />

            <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              총 {getItems().length}개 항목
            </div>

            <div className="mt-6">
              <button
                onClick={mode === "single" ? startSingleChoice : startTournament}
                className="btn-primary w-full"
              >
                {mode === "single" ? "🎯 선택하기" : "🏆 토너먼트 시작"}
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          {mode === "single" ? (
            /* Single Choice Result */
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-6">
              <h2 className="text-xl font-semibold mb-6 text-center">선택 결과</h2>
              <div className="bg-gradient-to-r from-primary-500 to-blue-500 rounded-lg p-8 text-center">
                <div className="text-4xl mb-4">🎊</div>
                <div className="text-3xl font-bold text-white mb-2">
                  {winner}
                </div>
                <div className="text-sm text-white/80">이(가) 선택되었습니다!</div>
              </div>
              <button onClick={reset} className="btn-secondary w-full mt-6">
                다시 선택하기
              </button>
            </div>
          ) : winner ? (
            /* Tournament Winner */
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-6">
              <h2 className="text-xl font-semibold mb-6 text-center">
                🏆 토너먼트 우승자
              </h2>
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg p-8 text-center">
                <div className="text-5xl mb-4">👑</div>
                <div className="text-4xl font-bold text-white mb-2">
                  {winner}
                </div>
                <div className="text-sm text-white/80">최종 우승!</div>
              </div>
              <button onClick={reset} className="btn-secondary w-full mt-6">
                새 토너먼트 시작
              </button>
            </div>
          ) : (
            /* Tournament Match */
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-6">
              <div className="text-center mb-6">
                <div className="inline-block bg-primary-100 dark:bg-primary-900 px-4 py-2 rounded-full">
                  <span className="font-semibold text-primary-700 dark:text-primary-300">
                    {getRoundName(getCurrentMatch()?.round || 1)}
                  </span>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  매치 {currentMatchIndex + 1} /{" "}
                  {matches.filter((m) => m.round === getCurrentMatch()?.round).length}
                </div>
              </div>

              <div className="text-center mb-8">
                <h2 className="text-2xl font-semibold">어느 것을 선택하시겠습니까?</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {getCurrentMatch()?.option1 && (
                  <button
                    onClick={() => selectWinner(getCurrentMatch()!.option1!)}
                    className="bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl p-8 transition-all transform hover:scale-105 shadow-lg"
                  >
                    <div className="text-3xl font-bold">
                      {getCurrentMatch()!.option1}
                    </div>
                  </button>
                )}

                {getCurrentMatch()?.option2 && (
                  <button
                    onClick={() => selectWinner(getCurrentMatch()!.option2!)}
                    className="bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl p-8 transition-all transform hover:scale-105 shadow-lg"
                  >
                    <div className="text-3xl font-bold">
                      {getCurrentMatch()!.option2}
                    </div>
                  </button>
                )}
              </div>

              <div className="mt-8 text-center">
                <button onClick={reset} className="btn-secondary">
                  토너먼트 취소
                </button>
              </div>
            </div>
          )}

          {/* Tournament Bracket Preview */}
          {mode === "tournament" && !winner && matches.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
              <h2 className="text-xl font-semibold mb-4">대진표</h2>
              <div className="space-y-4">
                {Array.from(new Set(matches.map((m) => m.round))).map((round) => (
                  <div key={round}>
                    <div className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
                      {getRoundName(round)}
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {matches
                        .filter((m) => m.round === round)
                        .map((match) => (
                          <div
                            key={match.id}
                            className={`p-3 rounded-lg border-2 text-sm ${
                              match.winner
                                ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                                : "border-gray-200 dark:border-gray-700"
                            }`}
                          >
                            <div
                              className={
                                match.winner === match.option1
                                  ? "font-bold"
                                  : "text-gray-500"
                              }
                            >
                              {match.option1}
                            </div>
                            {match.option2 && (
                              <>
                                <div className="text-center text-xs text-gray-400">
                                  vs
                                </div>
                                <div
                                  className={
                                    match.winner === match.option2
                                      ? "font-bold"
                                      : "text-gray-500"
                                  }
                                >
                                  {match.option2}
                                </div>
                              </>
                            )}
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* Info */}
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 mt-6">
        <h2 className="text-xl font-semibold mb-4">💡 활용 예시</h2>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <h3 className="font-semibold mb-2">🎯 단일 선택</h3>
            <p className="text-gray-700 dark:text-gray-300">
              점심 메뉴, 영화 선택, 게임 선택 등 빠르게 하나를 골라야 할 때
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">🏆 토너먼트</h3>
            <p className="text-gray-700 dark:text-gray-300">
              최애 음식, 최고의 캐릭터, 베스트 영화 등 신중하게 비교하며 선택할 때
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">👥 그룹 의사결정</h3>
            <p className="text-gray-700 dark:text-gray-300">
              회의에서 여러 안 중 하나를 결정할 때, 공정한 선택 도구로 활용
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">🎮 재미 요소</h3>
            <p className="text-gray-700 dark:text-gray-300">
              이상형 월드컵처럼 친구들과 재미있게 즐기는 게임으로 활용
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
