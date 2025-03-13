import { print } from "graphql/language/printer";

import { Category, ContentNode, Post, Tag } from "@/gql/graphql";
import { fetchGraphQL } from "@/utils/fetchGraphQL";

import styles from "./PostTemplate.module.css";
import { PostQuery } from "./PostQuery";
import Link from "next/link";
import { Suspense } from "react";
import { PostContent } from "@/components/Clients/PostContent/PostContent";

interface TemplateProps {
  node: ContentNode;
}

export default async function PostTemplate({ node }: TemplateProps) {
  const { post } = await fetchGraphQL<{ post: Post }>(print(PostQuery), {
    id: node.databaseId,
  });

  const cdeBlockRegex = new RegExp("<pre>.*<code.*class=.*language", "ig");
  let content = post.content ?? "";
  const hasCodeBlock = cdeBlockRegex.test(content);

  console.info("hasCodeBlock", hasCodeBlock);
  if (hasCodeBlock) {
  }

  return (
    <div
      className={`w-full px-3 md:px-10 flex flex-col flex-1 justify-between ${styles.post}`}
    >
      <h1 className={styles.title}>{post.title}</h1>
      <div className={styles.author}>By {post.author?.node.name}</div>
      <aside>
        {(post.categories?.nodes?.length ?? 0) > 0 && (
          <>
            <h4 className="my-3">Categories:</h4>
            <div className={styles.categories}>
              <ul className="flex flex-row gap-3">
                {post.categories?.nodes?.map((category: Category) => (
                  <li key={category.slug}>
                    <Link href={`/categories/${category.slug}`}>
                      <span className={styles.category}>{category.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </aside>
      <hr className="my-3" />
      {/* <div
        className={`whitespace-break-spaces ${styles.body}`}
        dangerouslySetInnerHTML={{ __html: content }}
      /> */}
      <Suspense
        fallback={
          <div
            className={`whitespace-break-spaces ${styles.body}`}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        }
      >
        <PostContent
          classNames={`whitespace-break-spaces ${styles.body}`}
          content={content}
        />
      </Suspense>

      <aside>
        <hr className="my-3" />
        {(post.tags?.nodes?.length ?? 0) > 0 && (
          <>
            <h4 className="my-3">Tags</h4>
            <div className={styles.tags}>
              <ul className="flex flex-row gap-3">
                {post.tags?.nodes?.map((tag: Tag) => (
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
