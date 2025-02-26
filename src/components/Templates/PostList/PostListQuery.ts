import gql from "graphql-tag";

export const PostListQuery = gql`
  query PostList {
    posts {
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
      nodes {
        id
        excerpt
        slug
        title
        date
        dateGmt
      }
    }
  }
`;
