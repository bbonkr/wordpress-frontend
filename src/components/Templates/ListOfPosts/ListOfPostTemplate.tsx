import Link from "next/link";
import type { StrapiPost } from "@/lib/strapi/types";
import EmptyState from "@/components/EmptyState/EmptyState";
import { stripHtml } from "@/lib/metadata";

interface ListOfPostTemplateProps {
  posts: StrapiPost[] | undefined;
  /**
   * route should end with '/'
   */
  route: string | undefined;
}

export default function ListOfPostTemplate({
  posts,
  route,
}: Readonly<ListOfPostTemplateProps>) {
  if (!posts || posts.length === 0) {
    return <EmptyState message="There is no posts." />;
  }
  return (
    <ul className="flex-1">
      {posts.map((post) => (
        <li key={post.slug} className="my-1 py-1">
          <Link href={`${route ?? "/"}${post.slug}`}>
            <span>{stripHtml(post.title ?? "")}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
