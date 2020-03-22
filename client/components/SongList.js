import React, { Component } from "react";
// help us bond component with an actual query
import { graphql } from "react-apollo";
import { Link } from "react-router";
import query from "../queries/fetchSongs";
import mutation from "../mutations/DeleteSong";

class SongList extends Component {

  onSongDelete(id) {
    this.props
      .mutate({
        variables: {
          id
        },
        // // refetch Queries it can include variables opt
        // refetchQueries: [{ query }]
      })
      // `this.props.data.` is added to our component automatically
      // by import { graphql } from "react-apollo";
      .then(()=>(this.props.data.refetch()))
      .catch(error => {
        console.error(error);
      });
  }
  renderSongs() {
    return this.props.data.songs.map(({id, title}) => (
      <li key={id} className="collection-item">
        <Link to={`/songs/${id}`}>{title}</Link>
        <i
          className="material-icons"
          onClick={() => this.onSongDelete(id)}
        >
          delete_forever
        </i>
      </li>
    ));
  }

  render() {
    if (this.props.data.loading) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <ul className="collection">{this.renderSongs()}</ul>
        <Link to="/songs/new" className="btn-floating btn-large blue right">
          <i className="material-icons">library_add</i>
        </Link>
      </div>
    );
  }
}

// graphql call query, it return a function which is then
// immediately indicated of immediately called by the second
// parentheses
export default graphql(mutation)(graphql(query)(SongList));
