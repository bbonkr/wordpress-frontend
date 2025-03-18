import { print } from "graphql/language/printer";

import { Category, ContentNode, Post, Tag } from "@/gql/graphql";
import { fetchGraphQL } from "@/utils/fetchGraphQL";

import styles from "./PostTemplate.module.css";
import { PostQuery } from "./PostQuery";
import Link from "next/link";
import { Suspense } from "react";
import { PostContent } from "@/components/Clients/PostContent/PostContent";

interface TemplateProps {
  node?: ContentNode;
  isLoading?: boolean;
}

export default async function PostTemplate({ node, isLoading }: TemplateProps) {
  const { post } = await fetchGraphQL<{ post: Post }>(print(PostQuery), {
    id: node?.databaseId ?? "",
  });

  return (
    <div
      className={`w-full px-3 md:px-10 flex flex-col flex-1 entry-content ${styles.post}`}
    >
      <h1 className={styles.title}>
        {isLoading ? (
          <div className="placeholder animate-pulse">&nbsp;</div>
        ) : (
          <>{post?.title}</>
        )}
      </h1>
      <div className={styles.author}>
        {isLoading ? (
          <div className="placeholder animate-pulse min-w-3/12 inline-block">
            &nbsp;
          </div>
        ) : (
          <>By {post?.author?.node.name}</>
        )}
      </div>
      <aside>
        {((post?.categories?.nodes?.length ?? 0) > 0 || isLoading) && (
          <>
            <h4 className="my-3">
              {isLoading ? (
                <span className="placeholder animate-pulse inline-block min-w-3/12">
                  &nbsp;
                </span>
              ) : (
                <>Categories:</>
              )}
            </h4>
            <div className={styles.categories}>
              <ul className="flex flex-row gap-2 flex-wrap">
                {isLoading
                  ? new Array(3).fill(10).map((v, i, arr) => (
                      <li
                        key={v + i}
                        className="placeholder animate-pulse min-w-3/12"
                      >
                        &nbsp;
                      </li>
                    ))
                  : post?.categories?.nodes?.map((category: Category) => (
                      <li key={category.slug}>
                        <Link href={`/categories/${category.slug}`}>
                          <span className={styles.category}>
                            {category.name}
                          </span>
                        </Link>
                      </li>
                    ))}
              </ul>
            </div>
          </>
        )}
      </aside>
      <hr className="my-3" />

      {isLoading ? (
        <div className={` ${styles.body} post `}>
          {new Array(10).fill(0).map((v, i, arr) => (
            <div key={i + v} className="placeholder animate-pulse my-1">
              &nbsp;
            </div>
          ))}
        </div>
      ) : (
        <Suspense
          fallback={
            <div
              className={` ${styles.body} post`}
              dangerouslySetInnerHTML={{ __html: post?.content ?? "" }}
            />
          }
        >
          <PostContent
            classNames={` ${styles.body} post`}
            content={post?.content ?? ""}
          />
        </Suspense>
      )}

      <aside>
        <hr className="my-3" />
        {((post?.tags?.nodes?.length ?? 0) > 0 || isLoading) && (
          <>
            <h4 className="my-3">
              {isLoading ? (
                <span className="placeholder animate-pulse inline-block min-w-3/12">
                  &nbsp;
                </span>
              ) : (
                <>Tags</>
              )}{" "}
            </h4>
            <div className={styles.tags}>
              <ul className="flex flex-row gap-2 flex-wrap">
                {isLoading
                  ? new Array(3).fill(10).map((v, i, arr) => (
                      <li
                        key={v + i}
                        className="placeholder animate-pulse min-w-3/12"
                      >
                        &nbsp;
                      </li>
                    ))
                  : post?.tags?.nodes?.map((tag: Tag) => (
                      <li key={tag.slug}>
                        <Link href={`/tags/${tag.slug}`}>
                          <span className={styles.tag}>{tag.name}</span>
                        </Link>
                      </li>
                    ))}
              </ul>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
