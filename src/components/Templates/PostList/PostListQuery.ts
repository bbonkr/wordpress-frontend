import gql from "graphql-tag";

export const PostListQuery = gql`
  query PostList(
    $after: String
    $first: Int
    $before: String
    $last: Int
    $s: String
  ) {
    posts(
      where: { search: $s }
      after: $after
      first: $first
      before: $before
      last: $last
    ) {
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
