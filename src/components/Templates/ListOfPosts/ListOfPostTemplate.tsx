import { Post } from "@/gql/graphql";
import Link from "next/link";

interface ListOfPostTemplateProps {
  posts: Post[] | undefined;
  /**
   * route should end with '/'
   */
  route: string | undefined;
  isLoading?: boolean;
}
export default async function ListOfPostTemplate({
  posts,
  route,
  isLoading,
}: Readonly<ListOfPostTemplateProps>) {
  if (!posts || posts.length === 0) {
    return (
      <div className="flex-1 flex flex-col justify-center items-center ">
        <div className="flex flex-col gap-3 w-full">
          <p>There is no posts.</p>
          <p>You can find the posts you want in the list.</p>
          <p>
            <Link href="/">Navigate to post list page</Link>
          </p>
        </div>
      </div>
    );
  }
  return (
    <ul className="flex-1">
      {isLoading
        ? new Array(10).fill(0).map((v, i, arr) => (
            <li key={v + i} className="placeholder animate-pulse my-1 py-1">
              &nbsp;
            </li>
          ))
        : posts.map((node) => {
            return (
              <li
                key={node.slug}
                className={`my-1 py-1 ${
                  isLoading ? "placeholder animate-pulse" : ""
                }`}
              >
                <Link href={`${route ?? "/"}${node.slug}`}>
                  <span> {node.title}</span>
                </Link>
              </li>
            );
          })}
    </ul>
  );
}
