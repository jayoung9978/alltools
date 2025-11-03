"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import JSZip from "jszip";

type FaviconSize = {
  size: number;
  name: string;
  purpose: string;
};

const FAVICON_SIZES: FaviconSize[] = [
  { size: 16, name: "favicon-16x16.png", purpose: "브라우저 탭" },
  { size: 32, name: "favicon-32x32.png", purpose: "브라우저 탭" },
  { size: 48, name: "favicon-48x48.png", purpose: "Windows 사이트 아이콘" },
  { size: 180, name: "apple-touch-icon.png", purpose: "iOS 홈 화면" },
  { size: 192, name: "android-chrome-192x192.png", purpose: "Android 홈 화면" },
  { size: 512, name: "android-chrome-512x512.png", purpose: "Android 스플래시" },
];

export default function FaviconGenerator() {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [generating, setGenerating] = useState(false);
  const [siteName, setSiteName] = useState("My Website");
  const [themeColor, setThemeColor] = useState("#ffffff");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("이미지 파일만 선택해주세요.");
      return;
    }

    setOriginalFile(file);

    const reader = new FileReader();
    reader.onload = (event) => {
      const url = event.target?.result as string;
      setPreviewUrl(url);
    };
    reader.readAsDataURL(file);
  };

  const resizeImage = (
    img: HTMLImageElement,
    size: number
  ): Promise<Blob | null> => {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        resolve(null);
        return;
      }

      // 이미지를 정사각형으로 크롭하여 그리기
      const sourceSize = Math.min(img.width, img.height);
      const sourceX = (img.width - sourceSize) / 2;
      const sourceY = (img.height - sourceSize) / 2;

      ctx.drawImage(
        img,
        sourceX,
        sourceY,
        sourceSize,
        sourceSize,
        0,
        0,
        size,
        size
      );

      canvas.toBlob((blob) => {
        resolve(blob);
      }, "image/png");
    });
  };

  const generateFavicons = async () => {
    if (!originalFile || !previewUrl) {
      alert("먼저 이미지를 선택해주세요.");
      return;
    }

    setGenerating(true);

    try {
      const img = new Image();
      img.onload = async () => {
        const zip = new JSZip();

        // 모든 크기의 favicon 생성
        for (const { size, name } of FAVICON_SIZES) {
          const blob = await resizeImage(img, size);
          if (blob) {
            zip.file(name, blob);
          }
        }

        // manifest.json 생성
        const manifest = {
          name: siteName,
          short_name: siteName,
          icons: [
            {
              src: "/android-chrome-192x192.png",
              sizes: "192x192",
              type: "image/png",
            },
            {
              src: "/android-chrome-512x512.png",
              sizes: "512x512",
              type: "image/png",
            },
          ],
          theme_color: themeColor,
          background_color: themeColor,
          display: "standalone",
        };
        zip.file("manifest.json", JSON.stringify(manifest, null, 2));

        // HTML 코드 생성
        const htmlCode = `<!-- Favicon -->
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="manifest" href="/manifest.json">
<meta name="theme-color" content="${themeColor}">`;

        zip.file("html-code.txt", htmlCode);

        // README 생성
        const readme = `# Favicon Package

## 파일 설명
- favicon-16x16.png: 브라우저 탭 아이콘 (16x16)
- favicon-32x32.png: 브라우저 탭 아이콘 (32x32)
- favicon-48x48.png: Windows 사이트 아이콘 (48x48)
- apple-touch-icon.png: iOS 홈 화면 아이콘 (180x180)
- android-chrome-192x192.png: Android 홈 화면 아이콘 (192x192)
- android-chrome-512x512.png: Android 스플래시 화면 (512x512)
- manifest.json: PWA 매니페스트 파일
- html-code.txt: HTML 코드 (복사하여 <head> 태그에 붙여넣기)

## 설치 방법
1. 모든 이미지 파일을 웹사이트의 public 또는 루트 디렉토리에 업로드
2. html-code.txt의 내용을 복사하여 HTML의 <head> 태그에 추가
3. manifest.json 파일도 루트 디렉토리에 업로드

생성일: ${new Date().toLocaleString("ko-KR")}
`;

        zip.file("README.txt", readme);

        // ZIP 파일 다운로드
        const content = await zip.generateAsync({ type: "blob" });
        const url = URL.createObjectURL(content);
        const a = document.createElement("a");
        a.href = url;
        a.download = "favicon-package.zip";
        a.click();
        URL.revokeObjectURL(url);

        setGenerating(false);
        alert("✅ Favicon 패키지가 생성되었습니다!");
      };
      img.src = previewUrl;
    } catch (error) {
      setGenerating(false);
      alert("생성 중 오류가 발생했습니다.");
      console.error(error);
    }
  };

  const reset = () => {
    setOriginalFile(null);
    setPreviewUrl("");
    setSiteName("My Website");
    setThemeColor("#ffffff");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        <Link href="/" className="hover:text-primary-500">
          홈
        </Link>
        {" > "}
        <Link href="/gen" className="hover:text-primary-500">
          생성기
        </Link>
        {" > "}
        <span>Favicon 패키지</span>
      </div>

      <h1 className="text-4xl font-bold mb-2">Favicon 패키지 생성기</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        하나의 이미지로 모든 플랫폼용 파비콘 세트를 생성합니다
      </p>

      {/* Upload Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-6">
        <h2 className="text-xl font-semibold mb-4">1. 이미지 업로드</h2>
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
              📁 이미지 선택
            </label>
            {originalFile && (
              <span className="ml-4 text-sm text-gray-600 dark:text-gray-400">
                {originalFile.name}
              </span>
            )}
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">
              💡 권장 사항
            </h3>
            <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
              <li>• 최소 512x512 픽셀 이상의 정사각형 이미지</li>
              <li>• PNG 형식 권장 (투명 배경 지원)</li>
              <li>• 단순하고 명확한 디자인 (작은 크기에서도 알아볼 수 있도록)</li>
              <li>• 로고나 아이콘 형태가 적합</li>
            </ul>
          </div>

          {previewUrl && (
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 flex justify-center">
              <img
                src={previewUrl}
                alt="미리보기"
                className="max-w-[200px] max-h-[200px] object-contain"
              />
            </div>
          )}
        </div>
      </div>

      {/* Settings Section */}
      {previewUrl && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-6">
          <h2 className="text-xl font-semibold mb-4">2. 설정</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                사이트 이름
              </label>
              <input
                type="text"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                placeholder="My Website"
                className="input-field"
              />
              <div className="text-xs text-gray-500 mt-1">
                PWA 매니페스트와 홈 화면에 표시됩니다
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                테마 색상
              </label>
              <div className="flex gap-3 items-center">
                <input
                  type="color"
                  value={themeColor}
                  onChange={(e) => setThemeColor(e.target.value)}
                  className="w-16 h-10 cursor-pointer rounded border border-gray-300 dark:border-gray-600"
                />
                <input
                  type="text"
                  value={themeColor}
                  onChange={(e) => setThemeColor(e.target.value)}
                  className="input-field flex-1"
                  placeholder="#ffffff"
                />
              </div>
              <div className="text-xs text-gray-500 mt-1">
                브라우저 주소 표시줄과 PWA 테마 색상
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Generate Button */}
      {previewUrl && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-6">
          <h2 className="text-xl font-semibold mb-4">3. 생성</h2>
          <div className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
              <h3 className="font-semibold mb-2">생성될 파일 목록</h3>
              <div className="grid md:grid-cols-2 gap-2 text-sm text-gray-600 dark:text-gray-400">
                {FAVICON_SIZES.map(({ name, size, purpose }) => (
                  <div key={name} className="flex items-center gap-2">
                    <span className="text-primary-500">✓</span>
                    <span>
                      {name} ({size}x{size}) - {purpose}
                    </span>
                  </div>
                ))}
                <div className="flex items-center gap-2">
                  <span className="text-primary-500">✓</span>
                  <span>manifest.json - PWA 설정</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-primary-500">✓</span>
                  <span>html-code.txt - HTML 코드</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-primary-500">✓</span>
                  <span>README.txt - 설치 가이드</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={generateFavicons}
                disabled={generating}
                className="btn-primary flex-1"
              >
                {generating ? "⏳ 생성 중..." : "🎨 Favicon 패키지 생성"}
              </button>
              <button onClick={reset} className="btn-secondary">
                초기화
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Info */}
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">💡 활용 가이드</h2>
        <div className="grid md:grid-cols-2 gap-6 text-sm">
          <div>
            <h3 className="font-semibold mb-2">📱 포함된 아이콘</h3>
            <ul className="text-gray-700 dark:text-gray-300 space-y-1">
              <li>• 16x16, 32x32: 브라우저 탭 아이콘</li>
              <li>• 48x48: Windows 사이트 아이콘</li>
              <li>• 180x180: iOS Safari 홈 화면</li>
              <li>• 192x192: Android 홈 화면</li>
              <li>• 512x512: Android 스플래시 화면</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">🚀 설치 방법</h3>
            <ul className="text-gray-700 dark:text-gray-300 space-y-1">
              <li>1. ZIP 파일 압축 해제</li>
              <li>2. 이미지 파일들을 public 폴더에 업로드</li>
              <li>3. html-code.txt의 코드를 HTML에 추가</li>
              <li>4. manifest.json도 public 폴더에 업로드</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">✨ PWA 지원</h3>
            <p className="text-gray-700 dark:text-gray-300">
              생성된 파일은 Progressive Web App (PWA) 표준을 준수하여 모바일
              앱처럼 설치 가능합니다.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">🎯 플랫폼 호환성</h3>
            <p className="text-gray-700 dark:text-gray-300">
              iOS, Android, Windows, macOS, Linux 등 모든 주요 플랫폼과
              브라우저에서 호환됩니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
