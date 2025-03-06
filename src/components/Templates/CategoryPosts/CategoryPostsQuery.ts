import gql from "graphql-tag";

export const CategoryPostsQuery = gql`
  query postsOfCategoryQuery(
    $id: ID = ""
    $after: String = ""
    $before: String = ""
    $first: Int
    $last: Int
  ) {
    category(id: $id, idType: SLUG) {
      posts(after: $after, before: $before, first: $first, last: $last) {
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
