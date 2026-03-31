import type { Metadata } from "next";
import Link from "next/link";

export function generateMetadata(): Metadata {
  return {
    title: `404 Not Found | ${process.env.NEXT_PUBLIC_SITE_TITLE ?? "Blog"}`,
    robots: { index: false, follow: false },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/404`,
    },
  };
}

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 gap-3">
      <div className="text-2xl">
        <p>404 — Page Not Found</p>
      </div>
      <p>
        <Link href="/">Navigate to post list page</Link>
      </p>
    </div>
  );
}
