import Link from "next/link";

interface EmptyStateProps {
  message: string;
  linkHref?: string;
  linkLabel?: string;
}

export default function EmptyState({
  message,
  linkHref = "/",
  linkLabel = "Navigate to post list page",
}: Readonly<EmptyStateProps>) {
  return (
    <div className="flex-1 flex flex-col justify-center items-center gap-3">
      <p>{message}</p>
      <p>
        <Link href={linkHref}>{linkLabel}</Link>
      </p>
    </div>
  );
}
