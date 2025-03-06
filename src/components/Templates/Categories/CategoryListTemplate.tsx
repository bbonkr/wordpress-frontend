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
}

export default async function CategoriesListTemplate({
  after,
  before,
  first,
  last,
  s,
  showPagination,
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
      {categories?.nodes?.length > 0 ? (
        <ul className="flex-1">
          {categories?.nodes.map((node) => {
            return (
              <li key={node.slug} className="py-1">
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
          />
        </>
      )}
    </div>
  );
}
