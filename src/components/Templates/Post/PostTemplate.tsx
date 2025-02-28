import { print } from "graphql/language/printer";

import { ContentNode, Post } from "@/gql/graphql";
import { fetchGraphQL } from "@/utils/fetchGraphQL";

import styles from "./PostTemplate.module.css";
import { PostQuery } from "./PostQuery";

interface TemplateProps {
  node: ContentNode;
}

export default async function PostTemplate({ node }: TemplateProps) {
  const { post } = await fetchGraphQL<{ post: Post }>(print(PostQuery), {
    id: node.databaseId,
  });

  return (
    <div
      className={`w-full px-3 md:px-10 flex flex-col flex-1 justify-between ${styles.post}`}
    >
      <h1 className={styles.title}>{post.title}</h1>
      <div className={styles.author}>By {post.author?.node.name}</div>

      <div
        className={`whitespace-break-spaces ${styles.body}`}
        dangerouslySetInnerHTML={{ __html: post.content || "" }}
      />
    </div>
  );
}
