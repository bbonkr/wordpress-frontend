import { print } from "graphql/language/printer";

import { Tag } from "@/gql/graphql";
import { fetchGraphQL } from "@/utils/fetchGraphQL";

import { TagPostsQuery } from "./TagPostsQuery";
import Link from "next/link";
import ListOfPostTemplate from "../ListOfPosts/ListOfPostTemplate";
import PaginationTemplate from "../Pagination/PaginationTemplate";
import constants from "@/constants";
import styles from "./TagPostsTemplate.module.css";

interface TagPostsTemplate {
  tagSlug: string;
  after?: string;
  before?: string;
  first?: string;
  last?: string;
  s?: string;
}

export default async function TagPostsTemplate({
  tagSlug,
  after,
  before,
  first,
  last,
  s,
}: Readonly<TagPostsTemplate>) {
  const firstValue =
    !after && !before && !last ? `${constants.pagination.first}` : first;

  const { tag } = await fetchGraphQL<{
    tag: Tag;
  }>(print(TagPostsQuery), {
    id: tagSlug,
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
      <h1 className={styles.title}>
        <Link href={`/categories/${tag.slug}`}>
          Posts with the <strong> {tag.name}</strong> tag
        </Link>
      </h1>

      <hr className="my-3" />

      {(tag?.posts?.nodes?.length ?? 0) > 0 ? (
        <ListOfPostTemplate route="/" posts={tag?.posts?.nodes} />
      ) : (
        <div className="flex-1 flex flex-col justify-center items-center ">
          <div className="flex flex-col gap-3 w-full">
            <p>There is no post in this tag.</p>
            <p>You can find the article you want in the list.</p>
            <p>
              <Link href="/">Navigate to post list page</Link>
            </p>
          </div>
        </div>
      )}

      <hr />
      <PaginationTemplate
        route={`/tags/${tagSlug}/`}
        pageInfo={tag?.posts?.pageInfo}
      />
    </div>
  );
}
