import gql from "graphql-tag";

export const CategoriesListQuery = gql`
  query categoriesQuery(
    $after: String = ""
    $before: String = ""
    $first: Int = 0
    $last: Int = 0
  ) {
    categories(
      where: { order: ASC, orderby: TERM_ORDER, childOf: 3 }
      after: $after
      before: $before
      first: $first
      last: $last
    ) {
      nodes {
        categoryId
        count
        slug
        name
        uri
        description
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
