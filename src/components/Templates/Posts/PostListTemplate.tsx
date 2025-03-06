import { print } from "graphql/language/printer";

import { PostConnection } from "@/gql/graphql";
import { fetchGraphQL } from "@/utils/fetchGraphQL";

import { PostListQuery } from "./PostListQuery";
import Link from "next/link";
import ListOfPostTemplate from "../ListOfPosts/ListOfPostTemplate";
import PaginationTemplate from "../Pagination/PaginationTemplate";
import constants from "@/constants";

import styles from "./PostListTemplate.module.css";

interface PostListTemplate {
  after?: string;
  before?: string;
  first?: string;
  last?: string;
  s?: string;
}

export default async function PostListTemplate({
  after,
  before,
  first,
  last,
  s,
}: Readonly<PostListTemplate>) {
  const firstValue =
    !after && !before && !last ? `${constants.pagination.first}` : first;

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
    <div
      className={`w-full px-3 md:px-10 flex flex-col flex-1 justify-between ${styles.container}`}
    >
      {posts?.nodes?.length > 0 ? (
        <ListOfPostTemplate route="/" posts={posts.nodes} />
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
      <PaginationTemplate route="/" pageInfo={posts.pageInfo} />
    </div>
  );
}
