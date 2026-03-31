import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Strapi에 Redirection 콘텐츠 타입 없음 — WordPress Redirection 플러그인 API 호출 제거
// Preview 모드 쿠키는 Next.js draftMode()가 자체 처리하므로 미들웨어 불필요
export function middleware(_request: NextRequest) {
  return NextResponse.next();
}
