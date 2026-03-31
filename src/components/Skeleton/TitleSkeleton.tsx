interface TitleSkeletonProps {
  className?: string;
}

export default function TitleSkeleton({
  className = "",
}: Readonly<TitleSkeletonProps>) {
  return (
    <div className={`placeholder animate-pulse ${className}`.trim()}>
      &nbsp;
    </div>
  );
}
