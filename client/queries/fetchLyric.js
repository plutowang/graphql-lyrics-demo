import { gql } from "apollo-boost";

export default gql`
  query fetchLyric($id: ID!) {
    song(id: $id) {
      id
      lyrics {
        id
        content
      }
    }
  }
`;

export const queryLikes = gql`
  query fetchLikes($id: ID!) {
    lyric(id: $id) {
      id
      likes
    }
  }
`;
