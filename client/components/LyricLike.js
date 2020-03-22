import React, { Component } from "react";
import { graphql } from "react-apollo";
import { queryLikes } from "../queries/fetchLyric";
import mutation from "../mutations/AddLikes";

class LyricLike extends Component {
  addLikes(id) {
    this.props.mutate({
      variables: {
        id
      }
      // If we ust `dataIdFromObject: o => o.id`,
      // make sure return id for identiry by Apollo Store
      // mutation AddLikes($id: ID!) {
      //   likeLyric(id: $id) {
      //     id
      //     likes
      //   }
      // }
      // we don't need below instruction to refetch query
      // refetchQueries: [{ query: queryLikes, variables: { id } }]
    });
  }
  render() {
    const { lyric } = this.props.data;
    if (!lyric) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <div>
          {lyric.likes}
          <i className="material-icons" onClick={() => this.addLikes(lyric.id)}>
            thumb_up
          </i>
        </div>
      </div>
    );
  }
}

export default graphql(queryLikes, {
  options: props => ({
    variables: {
      id: props.id
    }
  })
})(graphql(mutation)(LyricLike));
