import ListOfPostTemplate from "../ListOfPosts/ListOfPostTemplate";
import PaginationTemplate from "../Pagination/PaginationTemplate";
import EmptyState from "@/components/EmptyState/EmptyState";
import { getPosts } from "@/lib/strapi/client";

import styles from "./PostListTemplate.module.css";

interface PostListTemplateProps {
  page?: number;
}

export default async function PostListTemplate({
  page = 1,
}: Readonly<PostListTemplateProps>) {
  const pageSize = 10;
  const result = await getPosts({
    page,
    pageSize,
    filters: { state: { $eq: "Published" } },
    populate: ["author", "category", "featuredImage"],
    sort: "published:desc",
  });

  const posts = result.data;
  const { pageCount } = result.meta.pagination;

  return (
    <div
      className={`flex flex-col flex-1 w-full justify-between ${styles.container}`}
    >
      {posts.length > 0 ? (
        <ListOfPostTemplate route="/" posts={posts} />
      ) : (
        <EmptyState message="There are no posts." />
      )}

      <hr />
      <PaginationTemplate basePath="/" page={page} pageCount={pageCount} />
    </div>
  );
}
