import React, { Component } from "react";
import { graphql } from "react-apollo";
import mutation from "../mutations/AddLyric";
// import query from "../queries/fetchLyric";

class LyricCreate extends Component {
  constructor(props) {
    super(props);
    this.state = { content: "" };
  }
  onSubmit(e) {
    e.preventDefault();
    this.props
      .mutate({
        variables: {
          id: this.props.id,
          content: this.state.content
        }
        // If we ust `dataIdFromObject: o => o.id`,
        // make sure return id for identiry by Apollo Store
        // mutation AddLyric($id: ID!, $content: String) {
        //   addLyricToSong(songId: $id, content: $content) {
        //     id
        //     lyrics {
        //       id
        //       content
        //     }
        //   }
        // }
        // we don't need below instruction to refetch query
        // refetchQueries: [{ query, variables: { id: this.props.id } }]
      })
      .then(() => {
        this.setState({ content: "" });
      });
  }
  render() {
    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <label>Add a Lyric</label>
        <input
          value={this.state.content}
          onChange={e => this.setState({ content: e.target.value })}
        />
        <button className="btn-floating btn-large waves-effect waves-light blue right">
          <i className="material-icons">post_add</i>
        </button>
      </form>
    );
  }
}

export default graphql(mutation)(LyricCreate);
