import { print } from "graphql/language/printer";

import { Post, PostConnection } from "@/gql/graphql";
import { fetchGraphQL } from "@/utils/fetchGraphQL";

import styles from "./PostListTemplate.module.css";
import { PostListQuery } from "./PostListQuery";
import Link from "next/link";

interface TemplateProps {
  page?: number;
  limit?: number;
}

export default async function PostListTemplate({ page, limit }: TemplateProps) {
  const { posts } = await fetchGraphQL<{
    posts: PostConnection;
  }>(print(PostListQuery), {});

  return (
    <div>
      <ul>
        {posts?.nodes.map((node) => {
          console.info(node.title);
          return (
            <li key={node.id}>
              <Link href={`/${node.slug}`}>
                <span>{node?.title}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
