import React, { Component } from "react";
import { graphql } from "react-apollo";
// import LyricLike from "../components/LyricLike";
import mutation from "../mutations/AddLikes";
import LyricDelete from "../components/LyricDelete";

class Lyrics extends Component {
  addLikes({ id, likes }) {
    this.props.mutate({
      variables: {
        id
      },
      optimisticResponse: {
        __typename: "Mutation",
        likeLyric: {
          id,
          __typename: "LyricType",
          likes: likes + 1
        }
      }
    });
  }
  renderLyrics(lyrics) {
    return lyrics.map(({ id, content, likes }) => (
      <li key={id} className="collection-item">
        {content}
        <div className="vote-boxß">
          <span className="badge">{likes}</span>
          <i
            className="material-icons"
            onClick={() => this.addLikes({ id, likes })}
          >
            thumb_up
          </i>
          <LyricDelete id={id} songId={this.props.songId} />
        </div>
      </li>
    ));
  }
  render() {
    return (
      <div>
        <ul className="collection">{this.renderLyrics(this.props.lyrics)}</ul>
      </div>
    );
  }
}

export default graphql(mutation)(Lyrics);
