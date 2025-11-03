import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* 계산기 */}
          <div>
            <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">
              계산기
            </h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <Link href="/calc/loan" className="hover:text-primary-500">
                  대출 계산기
                </Link>
              </li>
              <li>
                <Link href="/calc/bmi" className="hover:text-primary-500">
                  BMI 계산기
                </Link>
              </li>
              <li>
                <Link href="/calc/date" className="hover:text-primary-500">
                  날짜 계산기
                </Link>
              </li>
            </ul>
          </div>

          {/* 변환기 */}
          <div>
            <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">
              변환기
            </h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <Link href="/conv/color" className="hover:text-primary-500">
                  색상 변환기
                </Link>
              </li>
              <li>
                <Link href="/conv/base64" className="hover:text-primary-500">
                  Base64 변환
                </Link>
              </li>
              <li>
                <Link href="/conv/unit" className="hover:text-primary-500">
                  단위 변환
                </Link>
              </li>
            </ul>
          </div>

          {/* 생성기 */}
          <div>
            <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">
              생성기
            </h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <Link href="/gen/qr" className="hover:text-primary-500">
                  QR 코드
                </Link>
              </li>
              <li>
                <Link href="/gen/password" className="hover:text-primary-500">
                  비밀번호
                </Link>
              </li>
              <li>
                <Link href="/gen/gradient" className="hover:text-primary-500">
                  그라데이션
                </Link>
              </li>
            </ul>
          </div>

          {/* 정보 */}
          <div>
            <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">
              정보
            </h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <Link href="/about" className="hover:text-primary-500">
                  소개
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-primary-500">
                  개인정보처리방침
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary-500">
                  문의하기
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>© {currentYear} ASDW.KR. All rights reserved.</p>
          <p className="mt-2">
            무료 웹 도구 모음 - 계산기, 변환기, 생성기
          </p>
        </div>
      </div>
    </footer>
  );
}
