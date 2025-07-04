import { print } from "graphql/language/printer";

import { Category } from "@/gql/graphql";
import { fetchGraphQL } from "@/utils/fetchGraphQL";

import { CategoryPostsQuery } from "./CategoryPostsQuery";
import Link from "next/link";
import ListOfPostTemplate from "../ListOfPosts/ListOfPostTemplate";
import PaginationTemplate from "../Pagination/PaginationTemplate";
import constants from "@/constants";
import styles from "./CategoryPostsTemplate.module.css";

interface PostListTemplate {
  categorySlug?: string;
  after?: string;
  before?: string;
  first?: string;
  last?: string;
  s?: string;
  isLoading?: boolean;
}

export default async function CategoryPostsTemplate({
  categorySlug,
  after,
  before,
  first,
  last,
  s,
  isLoading,
}: Readonly<PostListTemplate>) {
  const firstValue =
    !after && !before && !last ? `${constants.pagination.first}` : first;

  const { category } = await fetchGraphQL<{
    category: Category;
  }>(print(CategoryPostsQuery), {
    id: categorySlug ?? "",
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
          <Link href={`/categories/${category.slug}`}>
            Posts in the <strong>{category.name}</strong> category
          </Link>
        )}
      </h1>

      <hr className="my-3" />

      {(category?.posts?.nodes?.length ?? 0) > 0 ? (
        <ListOfPostTemplate
          route="/"
          posts={category?.posts?.nodes}
          isLoading={isLoading}
        />
      ) : (
        <div className="flex-1 flex flex-col justify-center items-center ">
          <div className="flex flex-col gap-3 w-full">
            <p>There is no post in this category.</p>
            <p>You can find the article you want in the list.</p>
            <p>
              <Link href="/">Navigate to post list page</Link>
            </p>
          </div>
        </div>
      )}

      <hr />
      <PaginationTemplate
        route={`/categories/${categorySlug}/`}
        pageInfo={category?.posts?.pageInfo}
        isLoading={isLoading}
      />
    </div>
  );
}
