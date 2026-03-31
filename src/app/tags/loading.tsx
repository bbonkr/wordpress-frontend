import ListSkeleton from "@/components/Skeleton/ListSkeleton";
import TitleSkeleton from "@/components/Skeleton/TitleSkeleton";
import styles from "@/components/Templates/Tags/TagListTemplate.module.css";

export default function TagsLoadingPage() {
  return (
    <div
      className={`w-full flex flex-col flex-1 justify-between entry-content ${styles.container}`}
    >
      <h1 className={styles.title}>
        <TitleSkeleton />
      </h1>

      <hr className="my-3" />

      <ListSkeleton count={10} />

      <hr />
    </div>
  );
}
