import { CategoryConnection } from "@/gql/graphql";
import { CategoriesListQuery } from "./CategoryListQuery";
import { fetchGraphQL } from "@/utils/fetchGraphQL";
import { print } from "graphql/language/printer";

import Link from "next/link";
import constants from "@/constants";
import PaginationTemplate from "../Pagination/PaginationTemplate";
import styles from "./CategoryListTemplate.module.css";

interface PostListTemplate {
  after?: string;
  before?: string;
  first?: string;
  last?: string;
  s?: string;
  showPagination?: boolean;
  isLoading?: boolean;
}

export default async function CategoriesListTemplate({
  after,
  before,
  first,
  last,
  s,
  showPagination,
  isLoading,
}: Readonly<PostListTemplate>) {
  const firstValue =
    !after && !before && !last ? `${constants.pagination.first}` : first;

  const { categories } = await fetchGraphQL<{
    categories: CategoryConnection;
  }>(print(CategoriesListQuery), {
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
        {isLoading ? (
          <div className="placeholder animate-pulse">&nbsp;</div>
        ) : (
          <Link href={`/categories/`}>Categories</Link>
        )}
      </h1>

      <hr className="my-3" />

      {categories?.nodes?.length > 0 ? (
        <ul className="flex-1">
          {isLoading
            ? new Array(10).fill(0).map((v, i, arr) => (
                <li
                  key={(v + i).toString()}
                  className="placeholder animate-pulse my-1 py-1"
                >
                  &nbsp;
                </li>
              ))
            : categories?.nodes.map((node) => {
                return (
                  <li key={node.slug} className="my-1 py-1">
                    <Link href={`/categories/${node.slug}`}>
                      <span>{node?.name}</span>
                    </Link>
                  </li>
                );
              })}
        </ul>
      ) : (
        <div className="flex-1 flex flex-col justify-center items-center ">
          <div className="flex flex-col gap-3 w-full">
            <p>There is no category.</p>
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
            route="/categories/"
            pageInfo={categories.pageInfo}
            isLoading={isLoading}
          />
        </>
      )}
    </div>
  );
}
