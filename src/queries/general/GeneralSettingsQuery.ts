import gql from "graphql-tag";

export const GeneralSettingsQuery = gql`
  query generalSettings {
    generalSettings {
      title
      description
    }
  }
`;
