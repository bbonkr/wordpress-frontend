import type { StrapiPost } from "@/lib/strapi/types";
import ListOfPostTemplate from "../ListOfPosts/ListOfPostTemplate";
import PaginationTemplate from "../Pagination/PaginationTemplate";
import EmptyState from "@/components/EmptyState/EmptyState";

interface FilteredPostsLayoutProps {
  title: React.ReactNode;
  posts: StrapiPost[];
  page: number;
  pageCount: number;
  basePath: string;
  emptyMessage: string;
  containerClassName?: string;
}

export default function FilteredPostsLayout({
  title,
  posts,
  page,
  pageCount,
  basePath,
  emptyMessage,
  containerClassName = "",
}: Readonly<FilteredPostsLayoutProps>) {
  return (
    <div
      className={`w-full flex flex-col flex-1 justify-between entry-content ${containerClassName}`.trim()}
    >
      <h1>{title}</h1>

      <hr className="my-3" />

      {posts.length > 0 ? (
        <ListOfPostTemplate route={basePath} posts={posts} />
      ) : (
        <EmptyState message={emptyMessage} />
      )}

      <hr />
      <PaginationTemplate basePath={basePath} page={page} pageCount={pageCount} />
    </div>
  );
}
