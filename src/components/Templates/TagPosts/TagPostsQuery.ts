import gql from "graphql-tag";

export const TagPostsQuery = gql`
  query tagPostsQuery(
    $id: ID = ""
    $after: String
    $before: String
    $first: Int
    $last: Int
  ) {
    tag(id: $id, idType: SLUG) {
      name
      slug
      posts(
        after: $after
        before: $before
        first: $first
        last: $last
        where: { status: PUBLISH }
      ) {
        nodes {
          id
          excerpt
          slug
          title
          date
          dateGmt
        }
        pageInfo {
          endCursor
          hasNextPage
          hasPreviousPage
          startCursor
        }
      }
    }
  }
`;
