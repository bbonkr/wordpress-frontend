import { print } from "graphql/language/printer";
import { ContentNode, Page } from "@/gql/graphql";
import { fetchGraphQL } from "@/utils/fetchGraphQL";
import { PageQuery } from "./PageQuery";
import styles from "./PageTemplate.module.css";

interface TemplateProps {
  node: ContentNode;
}

export default async function PageTemplate({ node }: TemplateProps) {
  const { page } = await fetchGraphQL<{ page: Page }>(print(PageQuery), {
    id: node.databaseId,
  });

  return (
    <div
      className={`w-full px-3 md:px-10 flex flex-col flex-1 justify-between ${styles.post}`}
    >
      <div
        className={`${styles.body}`}
        dangerouslySetInnerHTML={{ __html: page?.content || "" }}
      />
      ;
    </div>
  );
}
