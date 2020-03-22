import { gql } from "apollo-boost";

export default gql`
  mutation DeleteLyric($id: ID!) {
    deleteLyric(id: $id) {
      id
    }
  }
`;
