"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import QRCode from "qrcode";

type QRMode = "text" | "contact";

interface ContactData {
  name: string;
  phone: string;
  email: string;
  company: string;
  title: string;
  website: string;
  address: string;
}

export default function QRGenerator() {
  const [mode, setMode] = useState<QRMode>("text");
  const [text, setText] = useState("");
  const [contact, setContact] = useState<ContactData>({
    name: "",
    phone: "",
    email: "",
    company: "",
    title: "",
    website: "",
    address: "",
  });
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [size, setSize] = useState(300);
  const [errorLevel, setErrorLevel] = useState<"L" | "M" | "Q" | "H">("M");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateVCard = (): string => {
    const vcard = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      contact.name ? `FN:${contact.name}` : "",
      contact.name ? `N:${contact.name.split(" ").reverse().join(";")};;;` : "",
      contact.phone ? `TEL;TYPE=CELL:${contact.phone}` : "",
      contact.email ? `EMAIL:${contact.email}` : "",
      contact.company ? `ORG:${contact.company}` : "",
      contact.title ? `TITLE:${contact.title}` : "",
      contact.website ? `URL:${contact.website}` : "",
      contact.address ? `ADR;TYPE=WORK:;;${contact.address};;;;` : "",
      "END:VCARD",
    ]
      .filter((line) => line !== "")
      .join("\n");

    return vcard;
  };

  const generateQR = async () => {
    let qrContent = "";

    if (mode === "text") {
      if (!text.trim()) return;
      qrContent = text;
    } else {
      if (!contact.name && !contact.phone && !contact.email) return;
      qrContent = generateVCard();
    }

    try {
      const canvas = canvasRef.current;
      if (canvas) {
        await QRCode.toCanvas(canvas, qrContent, {
          width: size,
          errorCorrectionLevel: errorLevel,
          margin: 2,
        });

        // Canvas를 이미지로 변환
        const dataUrl = canvas.toDataURL("image/png");
        setQrDataUrl(dataUrl);
      }
    } catch (error) {
      console.error("QR 생성 오류:", error);
    }
  };

  const downloadQR = () => {
    if (!qrDataUrl) return;

    const link = document.createElement("a");
    link.download = "qrcode.png";
    link.href = qrDataUrl;
    link.click();
  };

  const copyToClipboard = async () => {
    if (!qrDataUrl) return;

    try {
      const response = await fetch(qrDataUrl);
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ "image/png": blob }),
      ]);
      alert("QR 코드가 클립보드에 복사되었습니다!");
    } catch (error) {
      alert("클립보드 복사 실패. 다운로드를 이용해주세요.");
    }
  };

  const loadExample = (type: string) => {
    if (type === "vcard") {
      setMode("contact");
      setContact({
        name: "홍길동",
        phone: "010-1234-5678",
        email: "hong@example.com",
        company: "ASDW",
        title: "개발자",
        website: "https://asdw.kr",
        address: "서울특별시 강남구",
      });
      return;
    }

    setMode("text");
    switch (type) {
      case "url":
        setText("https://asdw.kr");
        break;
      case "email":
        setText("mailto:example@email.com");
        break;
      case "tel":
        setText("tel:010-1234-5678");
        break;
      case "sms":
        setText("sms:010-1234-5678?body=안녕하세요");
        break;
      case "wifi":
        setText("WIFI:T:WPA;S:MyNetwork;P:password123;;");
        break;
    }
  };

  useEffect(() => {
    if (mode === "text" && text) {
      generateQR();
    } else if (mode === "contact" && (contact.name || contact.phone || contact.email)) {
      generateQR();
    }
  }, [text, contact, size, errorLevel, mode]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        <Link href="/" className="hover:text-primary-500">홈</Link>
        {" > "}
        <Link href="/gen" className="hover:text-primary-500">생성기</Link>
        {" > "}
        <span>QR 코드 생성기</span>
      </div>

      <h1 className="text-4xl font-bold mb-2">QR 코드 생성기</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        URL, 텍스트, 연락처 등을 QR 코드로 변환하세요
      </p>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <h2 className="text-xl font-semibold mb-4">입력</h2>

          {/* Mode Selector */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setMode("text")}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                mode === "text"
                  ? "bg-primary-500 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
              }`}
            >
              📝 텍스트
            </button>
            <button
              onClick={() => setMode("contact")}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                mode === "contact"
                  ? "bg-primary-500 text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
              }`}
            >
              👤 연락처
            </button>
          </div>

          <div className="space-y-4">
            {mode === "text" ? (
              <>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    텍스트 또는 URL
                  </label>
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="https://example.com"
                    className="input-field min-h-[120px]"
                  />
                  <div className="text-xs text-gray-500 mt-1">
                    {text.length} 글자
                  </div>
                </div>

                {/* Quick Examples - Text */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    빠른 예제
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <button
                      onClick={() => loadExample("url")}
                      className="btn-secondary text-xs py-2"
                    >
                      🔗 URL
                    </button>
                    <button
                      onClick={() => loadExample("email")}
                      className="btn-secondary text-xs py-2"
                    >
                      📧 이메일
                    </button>
                    <button
                      onClick={() => loadExample("tel")}
                      className="btn-secondary text-xs py-2"
                    >
                      📞 전화
                    </button>
                    <button
                      onClick={() => loadExample("sms")}
                      className="btn-secondary text-xs py-2"
                    >
                      💬 SMS
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium mb-2">
                      이름 *
                    </label>
                    <input
                      type="text"
                      value={contact.name}
                      onChange={(e) =>
                        setContact({ ...contact, name: e.target.value })
                      }
                      placeholder="홍길동"
                      className="input-field"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium mb-2">
                      전화번호 *
                    </label>
                    <input
                      type="tel"
                      value={contact.phone}
                      onChange={(e) =>
                        setContact({ ...contact, phone: e.target.value })
                      }
                      placeholder="010-1234-5678"
                      className="input-field"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium mb-2">
                      이메일
                    </label>
                    <input
                      type="email"
                      value={contact.email}
                      onChange={(e) =>
                        setContact({ ...contact, email: e.target.value })
                      }
                      placeholder="email@example.com"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      회사
                    </label>
                    <input
                      type="text"
                      value={contact.company}
                      onChange={(e) =>
                        setContact({ ...contact, company: e.target.value })
                      }
                      placeholder="회사명"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      직책
                    </label>
                    <input
                      type="text"
                      value={contact.title}
                      onChange={(e) =>
                        setContact({ ...contact, title: e.target.value })
                      }
                      placeholder="직책"
                      className="input-field"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium mb-2">
                      웹사이트
                    </label>
                    <input
                      type="url"
                      value={contact.website}
                      onChange={(e) =>
                        setContact({ ...contact, website: e.target.value })
                      }
                      placeholder="https://example.com"
                      className="input-field"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium mb-2">
                      주소
                    </label>
                    <input
                      type="text"
                      value={contact.address}
                      onChange={(e) =>
                        setContact({ ...contact, address: e.target.value })
                      }
                      placeholder="서울특별시 강남구"
                      className="input-field"
                    />
                  </div>
                </div>

                {/* Quick Example - vCard */}
                <div>
                  <button
                    onClick={() => loadExample("vcard")}
                    className="btn-secondary w-full text-sm"
                  >
                    📋 예제 연락처 불러오기
                  </button>
                </div>
              </>
            )}

            {/* Size */}
            <div>
              <label className="block text-sm font-medium mb-2">
                크기: {size}px
              </label>
              <input
                type="range"
                min="200"
                max="600"
                step="50"
                value={size}
                onChange={(e) => setSize(parseInt(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>200px</span>
                <span>600px</span>
              </div>
            </div>

            {/* Error Correction */}
            <div>
              <label className="block text-sm font-medium mb-2">
                오류 복원 수준
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { value: "L", label: "낮음 (7%)" },
                  { value: "M", label: "중간 (15%)" },
                  { value: "Q", label: "높음 (25%)" },
                  { value: "H", label: "최고 (30%)" },
                ].map((level) => (
                  <button
                    key={level.value}
                    onClick={() => setErrorLevel(level.value as any)}
                    className={`p-2 rounded text-xs ${
                      errorLevel === level.value
                        ? "bg-primary-500 text-white"
                        : "bg-gray-100 dark:bg-gray-700"
                    }`}
                  >
                    {level.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={generateQR}
              className="btn-primary w-full"
              disabled={
                mode === "text"
                  ? !text.trim()
                  : !contact.name && !contact.phone && !contact.email
              }
            >
              QR 코드 생성
            </button>
          </div>
        </div>

        {/* Output Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <h2 className="text-xl font-semibold mb-4">QR 코드</h2>

          <div className="space-y-4">
            {/* Canvas (숨김) */}
            <canvas ref={canvasRef} className="hidden" />

            {/* QR Code Display */}
            {qrDataUrl ? (
              <div className="space-y-4">
                <div className="flex justify-center p-4 bg-white rounded-lg">
                  <img
                    src={qrDataUrl}
                    alt="QR Code"
                    className="max-w-full"
                    style={{ width: size, height: size }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button onClick={downloadQR} className="btn-primary">
                    💾 다운로드
                  </button>
                  <button onClick={copyToClipboard} className="btn-secondary">
                    📋 복사
                  </button>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    QR 코드 정보
                  </div>
                  <div className="text-xs space-y-1">
                    <div>크기: {size} × {size}px</div>
                    <div>오류 복원: {errorLevel} 수준</div>
                    {mode === "text" ? (
                      <div>내용 길이: {text.length} 글자</div>
                    ) : (
                      <div>타입: vCard 연락처</div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div className="text-center text-gray-400">
                  <div className="text-4xl mb-2">📱</div>
                  <div>텍스트를 입력하고</div>
                  <div>QR 코드를 생성하세요</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 mt-6">
        <h2 className="text-xl font-semibold mb-4">💡 QR 코드 활용</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
          <div>
            <h3 className="font-semibold mb-2">URL</h3>
            <code className="text-xs bg-white dark:bg-gray-700 p-2 rounded block">
              https://example.com
            </code>
          </div>
          <div>
            <h3 className="font-semibold mb-2">이메일</h3>
            <code className="text-xs bg-white dark:bg-gray-700 p-2 rounded block">
              mailto:email@example.com
            </code>
          </div>
          <div>
            <h3 className="font-semibold mb-2">전화</h3>
            <code className="text-xs bg-white dark:bg-gray-700 p-2 rounded block">
              tel:010-1234-5678
            </code>
          </div>
          <div>
            <h3 className="font-semibold mb-2">WiFi</h3>
            <code className="text-xs bg-white dark:bg-gray-700 p-2 rounded block">
              WIFI:T:WPA;S:이름;P:비번;;
            </code>
          </div>
          <div className="md:col-span-2">
            <h3 className="font-semibold mb-2">연락처 (vCard)</h3>
            <code className="text-xs bg-white dark:bg-gray-700 p-2 rounded block whitespace-pre-wrap">
              스마트폰에서 스캔 시 연락처 앱에 바로 저장됩니다
            </code>
          </div>
        </div>
        <p className="text-xs text-gray-600 dark:text-gray-400 mt-4">
          ※ 오류 복원 수준이 높을수록 QR 코드가 손상되어도 읽을 수 있지만, 코드가 복잡해집니다.
        </p>
      </div>
    </div>
  );
}
