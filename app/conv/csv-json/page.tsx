"use client";

import { useState } from "react";
import Link from "next/link";

type ConversionMode = "csv-to-json" | "json-to-csv";

export default function CsvJsonConverter() {
  const [mode, setMode] = useState<ConversionMode>("csv-to-json");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [options, setOptions] = useState({
    hasHeader: true,
    prettyPrint: true,
    delimiter: ",",
  });

  const csvToJson = (csvText: string) => {
    try {
      const lines = csvText.trim().split("\n");
      if (lines.length === 0) {
        throw new Error("CSV 데이터가 비어있습니다.");
      }

      const delimiter = options.delimiter;
      const headers = options.hasHeader
        ? lines[0].split(delimiter).map((h) => h.trim())
        : lines[0].split(delimiter).map((_, i) => `column${i + 1}`);

      const dataLines = options.hasHeader ? lines.slice(1) : lines;
      const result = dataLines.map((line) => {
        const values = line.split(delimiter).map((v) => v.trim());
        const obj: Record<string, string> = {};
        headers.forEach((header, index) => {
          obj[header] = values[index] || "";
        });
        return obj;
      });

      return options.prettyPrint
        ? JSON.stringify(result, null, 2)
        : JSON.stringify(result);
    } catch (err) {
      throw new Error(
        `CSV 파싱 오류: ${err instanceof Error ? err.message : "알 수 없는 오류"}`
      );
    }
  };

  const jsonToCsv = (jsonText: string) => {
    try {
      const data = JSON.parse(jsonText);
      if (!Array.isArray(data)) {
        throw new Error("JSON은 배열 형식이어야 합니다.");
      }
      if (data.length === 0) {
        throw new Error("빈 배열입니다.");
      }

      const delimiter = options.delimiter;
      const headers = Object.keys(data[0]);
      const csvLines = [];

      if (options.hasHeader) {
        csvLines.push(headers.join(delimiter));
      }

      data.forEach((row) => {
        const values = headers.map((header) => {
          const value = row[header]?.toString() || "";
          // 쉼표나 따옴표가 포함된 경우 따옴표로 감싸기
          if (value.includes(delimiter) || value.includes('"')) {
            return `"${value.replace(/"/g, '""')}"`;
          }
          return value;
        });
        csvLines.push(values.join(delimiter));
      });

      return csvLines.join("\n");
    } catch (err) {
      throw new Error(
        `JSON 파싱 오류: ${err instanceof Error ? err.message : "알 수 없는 오류"}`
      );
    }
  };

  const convert = () => {
    if (!input.trim()) {
      setError("입력 데이터를 입력해주세요.");
      return;
    }

    try {
      setError("");
      const result =
        mode === "csv-to-json" ? csvToJson(input) : jsonToCsv(input);
      setOutput(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "변환 오류가 발생했습니다.");
      setOutput("");
    }
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(output);
    alert("복사되었습니다!");
  };

  const downloadOutput = () => {
    const extension = mode === "csv-to-json" ? "json" : "csv";
    const blob = new Blob([output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `converted.${extension}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const reset = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  const loadExample = () => {
    if (mode === "csv-to-json") {
      setInput("이름,나이,직업\n홍길동,30,개발자\n김철수,25,디자이너\n이영희,28,기획자");
    } else {
      setInput(
        JSON.stringify(
          [
            { 이름: "홍길동", 나이: 30, 직업: "개발자" },
            { 이름: "김철수", 나이: 25, 직업: "디자이너" },
            { 이름: "이영희", 나이: 28, 직업: "기획자" },
          ],
          null,
          2
        )
      );
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        <Link href="/" className="hover:text-primary-500">
          홈
        </Link>
        {" > "}
        <Link href="/conv" className="hover:text-primary-500">
          변환기
        </Link>
        {" > "}
        <span>CSV ↔ JSON</span>
      </div>

      <h1 className="text-4xl font-bold mb-2">CSV ↔ JSON 변환기</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        CSV와 JSON 형식을 서로 변환합니다
      </p>

      {/* Mode Selector */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">변환 방향</h2>
        <div className="flex gap-4">
          <button
            onClick={() => {
              setMode("csv-to-json");
              reset();
            }}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
              mode === "csv-to-json"
                ? "bg-primary-500 text-white"
                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            }`}
          >
            📊 CSV → JSON
          </button>
          <button
            onClick={() => {
              setMode("json-to-csv");
              reset();
            }}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
              mode === "json-to-csv"
                ? "bg-primary-500 text-white"
                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            }`}
          >
            📄 JSON → CSV
          </button>
        </div>
      </div>

      {/* Options */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">옵션</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={options.hasHeader}
              onChange={(e) =>
                setOptions({ ...options, hasHeader: e.target.checked })
              }
              className="w-4 h-4 text-primary-500"
            />
            <span className="text-sm">첫 줄을 헤더로 사용</span>
          </label>

          {mode === "csv-to-json" && (
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={options.prettyPrint}
                onChange={(e) =>
                  setOptions({ ...options, prettyPrint: e.target.checked })
                }
                className="w-4 h-4 text-primary-500"
              />
              <span className="text-sm">JSON 보기 좋게 정렬</span>
            </label>
          )}

          <div className="flex items-center gap-2">
            <span className="text-sm">구분자:</span>
            <select
              value={options.delimiter}
              onChange={(e) =>
                setOptions({ ...options, delimiter: e.target.value })
              }
              className="input-field py-1 text-sm"
            >
              <option value=",">쉼표 (,)</option>
              <option value=";">세미콜론 (;)</option>
              <option value="\t">탭 (Tab)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              {mode === "csv-to-json" ? "CSV 입력" : "JSON 입력"}
            </h2>
            <button
              onClick={loadExample}
              className="text-xs text-primary-500 hover:text-primary-600"
            >
              예시 로드
            </button>
          </div>

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              mode === "csv-to-json"
                ? "이름,나이,직업\n홍길동,30,개발자\n김철수,25,디자이너"
                : '[\n  {"이름": "홍길동", "나이": 30}\n]'
            }
            className="input-field min-h-[400px] font-mono text-sm"
          />

          <div className="mt-6 space-y-3">
            <button onClick={convert} className="btn-primary w-full">
              🔄 변환하기
            </button>
            <button onClick={reset} className="btn-secondary w-full">
              초기화
            </button>
          </div>
        </div>

        {/* Output */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              {mode === "csv-to-json" ? "JSON 출력" : "CSV 출력"}
            </h2>
            {output && (
              <div className="flex gap-2">
                <button
                  onClick={copyOutput}
                  className="text-xs text-primary-500 hover:text-primary-600"
                >
                  📋 복사
                </button>
                <button
                  onClick={downloadOutput}
                  className="text-xs text-primary-500 hover:text-primary-600"
                >
                  💾 다운로드
                </button>
              </div>
            )}
          </div>

          {error ? (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <div className="text-red-600 dark:text-red-400 font-semibold mb-1">
                ⚠️ 오류
              </div>
              <div className="text-sm text-red-700 dark:text-red-300">
                {error}
              </div>
            </div>
          ) : output ? (
            <textarea
              value={output}
              readOnly
              className="input-field min-h-[400px] font-mono text-sm bg-gray-50 dark:bg-gray-700/50"
            />
          ) : (
            <div className="min-h-[400px] flex items-center justify-center bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <div className="text-center text-gray-400">
                <div className="text-4xl mb-2">🔄</div>
                <div>변환 버튼을</div>
                <div>눌러보세요</div>
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
            <h3 className="font-semibold mb-2">📊 데이터 분석</h3>
            <p className="text-gray-700 dark:text-gray-300">
              CSV 데이터를 JSON으로 변환하여 웹 API에서 사용
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">📁 엑셀 데이터</h3>
            <p className="text-gray-700 dark:text-gray-300">
              엑셀에서 내보낸 CSV를 JSON 형식으로 변환
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">🔧 개발 테스트</h3>
            <p className="text-gray-700 dark:text-gray-300">
              API 응답 JSON을 CSV로 변환하여 엑셀에서 확인
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">📈 리포트 작성</h3>
            <p className="text-gray-700 dark:text-gray-300">
              JSON 데이터를 CSV로 변환하여 리포트에 첨부
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
