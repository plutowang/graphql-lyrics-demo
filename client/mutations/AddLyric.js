import { gql } from "apollo-boost";

export default gql`
  mutation AddLyric($id: ID!, $content: String) {
    addLyricToSong(songId: $id, content: $content) {
      id
      lyrics {
        id
        content
        likes
      }
    }
  }
`;
