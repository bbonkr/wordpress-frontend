import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const rawPath = searchParams.get("path") ?? "/";
  // Open Redirect 방지: 내부 경로만 허용 (백슬래시 우회 포함)
  const safePath =
    rawPath.startsWith("/") && !rawPath.startsWith("//") && !rawPath.startsWith("/\\")
      ? rawPath
      : "/";

  const draftModeValue = await draftMode();
  draftModeValue.disable();

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "";
  return NextResponse.redirect(`${baseUrl}${safePath}`);
}
