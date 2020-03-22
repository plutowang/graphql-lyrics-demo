import React, { Component } from "react";
import { graphql } from "react-apollo";

import mutation from "../mutations/DeleteLyric";
import query from "../queries/fetchLyric";

class LyricDelete extends Component {
  onLyricDelete(id) {
    this.props
      .mutate({
        variables: {
          id
        },
        // When we add a new song, we're not changing 
        // anything by an ID so React won't see any changes 
        // for the IDs it is watching.
        // In short, you can't use dataIdFromObject 
        // for adding or removing data in the Apollo Store.
        refetchQueries: [{ query, variables: { id: this.props.songId } }]
      })
      .catch(e => {
        console.log(e);
      });
  }
  render() {
    return (
      <i
        className="material-icons"
        onClick={() => this.onLyricDelete(this.props.id)}
      >
        delete_forever
      </i>
    );
  }
}
export default graphql(mutation)(LyricDelete);
