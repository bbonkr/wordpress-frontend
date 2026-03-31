import ListSkeleton from "@/components/Skeleton/ListSkeleton";
import styles from "@/components/Templates/Posts/PostListTemplate.module.css";

export default function Loading() {
  return (
    <div
      className={`flex flex-col flex-1 w-full justify-between ${styles.container}`}
    >
      <ListSkeleton count={10} />
      <hr />
    </div>
  );
}
