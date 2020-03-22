import React, { Component } from "react";
import { graphql } from "react-apollo";
import { Link, hashHistory } from "react-router";
import query from "../queries/fetchSingleSong";
import LyricCreate from "../components/LyricCreate";
import Lyrics from "../components/Lyrics";

class SongDetail extends Component {
  render() {
    const { song } = this.props.data;
    if (!song) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <Link to="/" className="waves-effect waves-teal btn-flat">
          <i className="material-icons">arrow_back</i>
        </Link>
        <h3>{song.title}</h3>
        <Lyrics songId={song.id} lyrics={song.lyrics} />
        <LyricCreate id={song.id} />
      </div>
    );
  }
}

export default graphql(query, {
  options: props => {
    return {
      variables: {
        id: props.params.id
      }
    };
  }
})(SongDetail);
