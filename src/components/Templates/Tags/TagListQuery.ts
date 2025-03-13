import gql from "graphql-tag";

export const TagListQuery = gql`
  query tagsQuery($first: Int, $last: Int, $before: String, $after: String) {
    tags(
      after: $after
      before: $before
      first: $first
      last: $last
      where: { order: DESC, orderby: COUNT }
    ) {
      nodes {
        id
        slug
        uri
        name
        count
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
  }
`;
