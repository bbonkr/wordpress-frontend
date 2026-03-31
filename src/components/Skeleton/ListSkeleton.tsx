interface ListSkeletonProps {
  count?: number;
  itemClassName?: string;
}

export default function ListSkeleton({
  count = 10,
  itemClassName = "my-1 py-1",
}: Readonly<ListSkeletonProps>) {
  return (
    <ul className="flex-1 list-none">
      {Array.from({ length: count }).map((_, i) => (
        <li key={i} className={`placeholder animate-pulse ${itemClassName}`}>
          &nbsp;
        </li>
      ))}
    </ul>
  );
}
