import Link from "next/link";
import { getTags } from "@/lib/strapi/client";
import PaginationTemplate from "../Pagination/PaginationTemplate";
import EmptyState from "@/components/EmptyState/EmptyState";
import styles from "./TagListTemplate.module.css";

interface TagsListTemplateProps {
  page?: number;
}

export default async function TagsListTemplate({
  page = 1,
}: Readonly<TagsListTemplateProps>) {
  const result = await getTags(page, 10, {
    posts: { state: { $eq: "Published" } },
  });
  const tags = result.data;
  const { pageCount } = result.meta.pagination;

  return (
    <div
      className={`w-full flex flex-col flex-1 justify-between entry-content ${styles.container}`}
    >
      <h1 className={styles.title}>
        <Link href="/tags/">Tags</Link>
      </h1>

      <hr className="my-3" />

      {tags.length > 0 ? (
        <ul className="flex-1 list-none">
          {tags.map((tag) => (
            <li key={tag.slug} className="py-1">
              <Link href={`/tags/${tag.slug}`}>{tag.name}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState message="There are no tags." />
      )}

      <hr />
      <PaginationTemplate basePath="/tags/" page={page} pageCount={pageCount} />
    </div>
  );
}
