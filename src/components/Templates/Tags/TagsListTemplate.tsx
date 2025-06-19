import { TagConnection } from "@/gql/graphql";
import { TagListQuery } from "./TagListQuery";
import { fetchGraphQL } from "@/utils/fetchGraphQL";
import { print } from "graphql/language/printer";

import Link from "next/link";
import constants from "@/constants";
import PaginationTemplate from "../Pagination/PaginationTemplate";
import styles from "./TagListTemplate.module.css";

interface TagsListTemplate {
  after?: string;
  before?: string;
  first?: string;
  last?: string;
  s?: string;
  showPagination?: boolean;
  isLoading?: boolean;
}

export default async function TagsListTemplate({
  after,
  before,
  first,
  last,
  s,
  showPagination,
  isLoading,
}: Readonly<TagsListTemplate>) {
  const firstValue =
    !after && !before && !last ? `${constants.pagination.first}` : first;

  const { tags } = await fetchGraphQL<{
    tags: TagConnection;
  }>(print(TagListQuery), {
    after: after,
    before: before,
    first: firstValue ? parseInt(firstValue, 10) : undefined,
    last: last ? parseInt(last, 10) : undefined,
    s: s,
  });

  return (
    <div
      className={`w-full flex flex-col flex-1 justify-between entry-content ${styles.container}`}
    >
      <h1 className={styles.title}>
        {isLoading ? (
          <div className="placeholder animate-pulse">&nbsp;</div>
        ) : (
          <Link href={`/tags/`}>Tags</Link>
        )}
      </h1>

      <hr className="my-3" />

      {tags?.nodes?.length > 0 ? (
        <ul className="flex-1 list-none">
          {isLoading
            ? new Array(10).fill(0).map((v, i, arr) => (
                <li
                  key={(v + i).toString()}
                  className="placeholder animate-pulse my-1 py-1"
                >
                  &nbsp;
                </li>
              ))
            : tags?.nodes.map((node) => {
                return (
                  <li key={node.slug} className="py-1 flex flex-row gap-1">
                    <Link href={`/tags/${node.slug}`}>{node?.name}</Link>
                    <span>
                      <small>({node.count})</small>
                    </span>
                  </li>
                );
              })}
        </ul>
      ) : (
        <div className="flex-1 flex flex-col justify-center items-center ">
          <div className="flex flex-col gap-3 w-full">
            <p>There is no tags.</p>
            <p>You can find the article you want in the list.</p>
            <p>
              <Link href="/">Navigate to post list page</Link>
            </p>
          </div>
        </div>
      )}

      {showPagination && (
        <>
          <hr />
          <PaginationTemplate
            route="/tags/"
            pageInfo={tags.pageInfo}
            isLoading={isLoading}
          />
        </>
      )}
    </div>
  );
}
