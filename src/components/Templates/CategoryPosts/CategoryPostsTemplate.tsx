import Link from "next/link";
import { getCategoryBySlug, getPosts } from "@/lib/strapi/client";
import FilteredPostsLayout from "../FilteredPosts/FilteredPostsLayout";
import styles from "./CategoryPostsTemplate.module.css";

interface CategoryPostsTemplateProps {
  categorySlug?: string;
  page?: number;
}

export default async function CategoryPostsTemplate({
  categorySlug,
  page = 1,
}: Readonly<CategoryPostsTemplateProps>) {
  if (!categorySlug) return null;

  const pageSize = 10;

  const [category, postsResult] = await Promise.all([
    getCategoryBySlug(categorySlug),
    getPosts({
      page,
      pageSize,
      filters: {
        category: { slug: { $eq: categorySlug } },
        state: { $eq: "Published" },
      },
      populate: ["category", "author", "featuredImage"],
      sort: "published:desc",
    }),
  ]);

  const posts = postsResult.data;
  const { pageCount } = postsResult.meta.pagination;

  return (
    <FilteredPostsLayout
      title={
        <Link href={`/categories/${categorySlug}`}>
          Posts in the <strong>{category?.name ?? categorySlug}</strong> category
        </Link>
      }
      posts={posts}
      page={page}
      pageCount={pageCount}
      basePath={`/categories/${categorySlug}/`}
      emptyMessage="There is no post in this category."
      containerClassName={styles.container}
    />
  );
}
