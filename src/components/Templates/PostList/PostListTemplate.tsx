import { print } from "graphql/language/printer";

import { PostConnection } from "@/gql/graphql";
import { fetchGraphQL } from "@/utils/fetchGraphQL";

import { PostListQuery } from "./PostListQuery";
import Link from "next/link";

interface PostListTemplate {
  after?: string;
  before?: string;
  first?: string;
  last?: string;
  s?: string;
}

const FIRST = 10;
const LAST = 10;

export default async function PostListTemplate({
  after,
  before,
  first,
  last,
  s,
}: Readonly<PostListTemplate>) {
  const firstValue = !after && !before && !last ? `${FIRST}` : first;

  const { posts } = await fetchGraphQL<{
    posts: PostConnection;
  }>(print(PostListQuery), {
    after: after,
    before: before,
    first: firstValue ? parseInt(firstValue, 10) : undefined,
    last: last ? parseInt(last, 10) : undefined,
    s: s,
  });

  return (
    <div className="w-full px-3 md:px-10 flex flex-col flex-1 justify-between">
      {posts?.nodes?.length > 0 ? (
        <ul className="flex-1">
          {posts?.nodes.map((node) => {
            return (
              <li key={node.id} className="py-1">
                <Link href={`/${node.slug}`}>
                  <span>{node?.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="flex-1 flex flex-col justify-center items-center ">
          <div className="flex flex-col gap-3 w-full">
            <p>
              There is no posts for the keyword <strong>{s}</strong>.
            </p>
            <p>You can find the article you want in the list.</p>
            <p>
              <Link href="/">Navigate to post list page</Link>
            </p>
          </div>
        </div>
      )}

      <hr />
      <aside className="flex flex-col justify-center items-center py-6">
        <ul className="flex flex-row gap-3">
          <li>
            {posts.pageInfo.hasPreviousPage ? (
              <Link href="/">First</Link>
            ) : (
              <span className="cursor-not-allowed">First</span>
            )}
          </li>
          <li>
            {posts.pageInfo.hasPreviousPage ? (
              <Link
                href={`/?before=${posts.pageInfo.startCursor}&last=${LAST}`}
              >
                Previous ({posts.pageInfo.hasPreviousPage ? "✅" : "❌"})
              </Link>
            ) : (
              <span className="cursor-not-allowed">Previous</span>
            )}
          </li>

          <li>
            {posts.pageInfo.hasNextPage ? (
              <Link href={`/?after=${posts.pageInfo.endCursor}&first=${FIRST}`}>
                Next ({posts.pageInfo.hasNextPage ? "✅" : "❌"})
              </Link>
            ) : (
              <span className="cursor-not-allowed">Next</span>
            )}
          </li>
          <li>
            {posts.pageInfo.hasNextPage ? (
              <Link href={`/?last=${LAST}`}>Last</Link>
            ) : (
              <span className="cursor-not-allowed">Last</span>
            )}
          </li>
        </ul>
      </aside>
    </div>
  );
}
