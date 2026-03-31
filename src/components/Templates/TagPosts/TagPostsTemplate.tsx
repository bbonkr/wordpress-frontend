import Link from "next/link";
import { getTagBySlug, getPosts } from "@/lib/strapi/client";
import FilteredPostsLayout from "../FilteredPosts/FilteredPostsLayout";
import styles from "./TagPostsTemplate.module.css";

interface TagPostsTemplateProps {
  tagSlug?: string;
  page?: number;
}

export default async function TagPostsTemplate({
  tagSlug,
  page = 1,
}: Readonly<TagPostsTemplateProps>) {
  if (!tagSlug) return null;

  const pageSize = 10;

  const [tag, postsResult] = await Promise.all([
    getTagBySlug(tagSlug),
    getPosts({
      page,
      pageSize,
      filters: {
        tags: { slug: { $eq: tagSlug } },
        state: { $eq: "Published" },
      },
      populate: ["author", "category", "featuredImage"],
      sort: "published:desc",
    }),
  ]);

  const posts = postsResult.data;
  const { pageCount } = postsResult.meta.pagination;

  return (
    <FilteredPostsLayout
      title={
        <Link href={`/tags/${tagSlug}`}>
          Posts with the <strong>{tag?.name ?? tagSlug}</strong> tag
        </Link>
      }
      posts={posts}
      page={page}
      pageCount={pageCount}
      basePath={`/tags/${tagSlug}/`}
      emptyMessage="There is no post with this tag."
      containerClassName={styles.container}
    />
  );
}
