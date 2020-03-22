import { gql } from "apollo-boost";

export default gql`
  mutation AddLikes($id: ID!) {
    likeLyric(id: $id) {
      id
      likes
    }
  }
`;
