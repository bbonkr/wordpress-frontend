import { print } from "graphql/language/printer";
import { ContentNode, Page } from "@/gql/graphql";
import { fetchGraphQL } from "@/utils/fetchGraphQL";
import { PageQuery } from "./PageQuery";
import styles from "./PageTemplate.module.css";

interface TemplateProps {
  node: ContentNode;
  isLoading?: boolean;
}

export default async function PageTemplate({ node, isLoading }: TemplateProps) {
  const { page } = await fetchGraphQL<{ page: Page }>(print(PageQuery), {
    id: node.databaseId,
  });

  return (
    <div
      className={`w-full px-3 md:px-10 flex flex-col flex-1 justify-between ${styles.post}`}
    >
      {isLoading ? (
        <div className={`${styles.body}`}>
          {new Array(10).fill(0).map((v, i, arr) => (
            <div key={i + v} className="placeholder animate-pulse my-1">
              &nbsp;
            </div>
          ))}
        </div>
      ) : (
        <div
          className={`${styles.body} post entry-content`}
          dangerouslySetInnerHTML={{ __html: page?.content || "" }}
        />
      )}
    </div>
  );
}
