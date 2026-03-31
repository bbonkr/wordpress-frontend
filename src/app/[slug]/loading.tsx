import TitleSkeleton from "@/components/Skeleton/TitleSkeleton";

export default function SlugLoadingPage() {
  return (
    <div className="w-full flex flex-col flex-1 entry-content">
      <TitleSkeleton className="h-8 my-2" />
      <TitleSkeleton className="h-4 my-1" />
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="placeholder animate-pulse my-1">
          &nbsp;
        </div>
      ))}
    </div>
  );
}
