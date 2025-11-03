"use client";

import { useState, useRef } from "react";
import Link from "next/link";

type ImageFormat = "image/jpeg" | "image/png" | "image/webp";

export default function ImageConverter() {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [convertedUrl, setConvertedUrl] = useState<string>("");
  const [outputFormat, setOutputFormat] = useState<ImageFormat>("image/png");
  const [quality, setQuality] = useState(0.9);
  const [stats, setStats] = useState({
    originalSize: 0,
    convertedSize: 0,
    originalFormat: "",
    width: 0,
    height: 0,
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("이미지 파일만 선택해주세요.");
      return;
    }

    setOriginalFile(file);
    setConvertedUrl("");

    const reader = new FileReader();
    reader.onload = (event) => {
      const url = event.target?.result as string;
      setPreviewUrl(url);

      // 이미지 크기 정보 가져오기
      const img = new Image();
      img.onload = () => {
        setStats((prev) => ({
          ...prev,
          originalSize: file.size,
          originalFormat: file.type,
          width: img.width,
          height: img.height,
        }));
      };
      img.src = url;
    };
    reader.readAsDataURL(file);
  };

  const convertImage = () => {
    if (!originalFile || !previewUrl) {
      alert("먼저 이미지를 선택해주세요.");
      return;
    }

    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.drawImage(img, 0, 0);

      canvas.toBlob(
        (blob) => {
          if (!blob) return;

          const url = URL.createObjectURL(blob);
          setConvertedUrl(url);
          setStats((prev) => ({
            ...prev,
            convertedSize: blob.size,
          }));
        },
        outputFormat,
        quality
      );
    };
    img.src = previewUrl;
  };

  const downloadConverted = () => {
    if (!convertedUrl) return;

    const extension = outputFormat.split("/")[1];
    const a = document.createElement("a");
    a.href = convertedUrl;
    a.download = `converted.${extension}`;
    a.click();
  };

  const reset = () => {
    setOriginalFile(null);
    setPreviewUrl("");
    setConvertedUrl("");
    setStats({
      originalSize: 0,
      convertedSize: 0,
      originalFormat: "",
      width: 0,
      height: 0,
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  const getCompressionRate = () => {
    if (stats.originalSize === 0 || stats.convertedSize === 0) return 0;
    return Math.round(
      ((stats.originalSize - stats.convertedSize) / stats.originalSize) * 100
    );
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
        <span>이미지 변환</span>
      </div>

      <h1 className="text-4xl font-bold mb-2">이미지 포맷 변환기</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        JPG, PNG, WEBP 등 다양한 이미지 포맷으로 변환합니다
      </p>

      {/* Canvas (hidden) */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Upload Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-6">
        <h2 className="text-xl font-semibold mb-4">이미지 선택</h2>
        <div className="space-y-4">
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              id="file-input"
            />
            <label
              htmlFor="file-input"
              className="btn-primary inline-block cursor-pointer"
            >
              📁 이미지 파일 선택
            </label>
            {originalFile && (
              <span className="ml-4 text-sm text-gray-600 dark:text-gray-400">
                {originalFile.name}
              </span>
            )}
          </div>

          {previewUrl && (
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                <h3 className="text-sm font-semibold mb-2">원본 정보</h3>
                <div className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                  <div>크기: {formatBytes(stats.originalSize)}</div>
                  <div>포맷: {stats.originalFormat}</div>
                  <div>
                    해상도: {stats.width} x {stats.height}
                  </div>
                </div>
              </div>

              {convertedUrl && (
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                  <h3 className="text-sm font-semibold mb-2">변환 결과</h3>
                  <div className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                    <div>크기: {formatBytes(stats.convertedSize)}</div>
                    <div>포맷: {outputFormat}</div>
                    <div className="text-green-600 dark:text-green-400 font-semibold">
                      {getCompressionRate() > 0
                        ? `${getCompressionRate()}% 압축됨`
                        : getCompressionRate() < 0
                          ? `${Math.abs(getCompressionRate())}% 증가`
                          : "동일"}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Options */}
      {previewUrl && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-6">
          <h2 className="text-xl font-semibold mb-4">변환 설정</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                출력 포맷
              </label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => setOutputFormat("image/jpeg")}
                  className={`py-3 px-4 rounded-lg font-medium transition-colors ${
                    outputFormat === "image/jpeg"
                      ? "bg-primary-500 text-white"
                      : "bg-gray-100 dark:bg-gray-700"
                  }`}
                >
                  JPG
                </button>
                <button
                  onClick={() => setOutputFormat("image/png")}
                  className={`py-3 px-4 rounded-lg font-medium transition-colors ${
                    outputFormat === "image/png"
                      ? "bg-primary-500 text-white"
                      : "bg-gray-100 dark:bg-gray-700"
                  }`}
                >
                  PNG
                </button>
                <button
                  onClick={() => setOutputFormat("image/webp")}
                  className={`py-3 px-4 rounded-lg font-medium transition-colors ${
                    outputFormat === "image/webp"
                      ? "bg-primary-500 text-white"
                      : "bg-gray-100 dark:bg-gray-700"
                  }`}
                >
                  WEBP
                </button>
              </div>
            </div>

            {outputFormat !== "image/png" && (
              <div>
                <label className="block text-sm font-medium mb-2">
                  품질: {Math.round(quality * 100)}%
                </label>
                <input
                  type="range"
                  min="0.1"
                  max="1"
                  step="0.1"
                  value={quality}
                  onChange={(e) => setQuality(parseFloat(e.target.value))}
                  className="w-full"
                />
                <div className="text-xs text-gray-500 mt-1">
                  낮을수록 파일 크기 작음, 높을수록 품질 좋음
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <button onClick={convertImage} className="btn-primary flex-1">
                🔄 변환하기
              </button>
              {convertedUrl && (
                <button
                  onClick={downloadConverted}
                  className="btn-primary flex-1 bg-green-500 hover:bg-green-600"
                >
                  💾 다운로드
                </button>
              )}
              <button onClick={reset} className="btn-secondary">
                초기화
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preview */}
      {previewUrl && (
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <h2 className="text-xl font-semibold mb-4">원본 미리보기</h2>
            <div className="bg-gray-100 dark:bg-gray-700/50 rounded-lg p-4 flex items-center justify-center min-h-[300px]">
              <img
                src={previewUrl}
                alt="원본"
                className="max-w-full max-h-[400px] object-contain"
              />
            </div>
          </div>

          {convertedUrl && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
              <h2 className="text-xl font-semibold mb-4">변환 결과</h2>
              <div className="bg-gray-100 dark:bg-gray-700/50 rounded-lg p-4 flex items-center justify-center min-h-[300px]">
                <img
                  src={convertedUrl}
                  alt="변환됨"
                  className="max-w-full max-h-[400px] object-contain"
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Info */}
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 mt-6">
        <h2 className="text-xl font-semibold mb-4">💡 활용 예시</h2>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <h3 className="font-semibold mb-2">🌐 웹 최적화</h3>
            <p className="text-gray-700 dark:text-gray-300">
              이미지를 WEBP로 변환하여 웹사이트 로딩 속도 개선
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">📱 SNS 업로드</h3>
            <p className="text-gray-700 dark:text-gray-300">
              PNG를 JPG로 변환하여 파일 크기 줄이기
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">🎨 투명 배경</h3>
            <p className="text-gray-700 dark:text-gray-300">
              JPG를 PNG로 변환하여 투명 배경 편집 준비
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">💾 용량 절감</h3>
            <p className="text-gray-700 dark:text-gray-300">
              고품질 이미지를 압축하여 저장 공간 절약
            </p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h3 className="font-semibold mb-2 text-blue-900 dark:text-blue-300">
            📌 포맷 선택 가이드
          </h3>
          <div className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
            <div>
              <strong>JPG:</strong> 사진에 적합, 투명 배경 미지원, 작은 파일
              크기
            </div>
            <div>
              <strong>PNG:</strong> 로고/아이콘에 적합, 투명 배경 지원, 무손실
              압축
            </div>
            <div>
              <strong>WEBP:</strong> 웹 최적화, 작은 크기에 좋은 품질, 최신
              브라우저 지원
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
