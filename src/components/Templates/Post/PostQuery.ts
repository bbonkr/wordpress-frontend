import gql from "graphql-tag";

export const PostQuery = gql`
  query PostQuery($id: ID!, $preview: Boolean = false) {
    post(id: $id, idType: DATABASE_ID, asPreview: $preview) {
      content
      date
      title
      author {
        node {
          name
          nicename
          nickname
          avatar {
            height
            width
            url
            size
            extraAttr
          }
        }
      }
      tags {
        nodes {
          name
          slug
        }
      }
      categories {
        nodes {
          name
          slug
        }
      }
    }
  }
`;
