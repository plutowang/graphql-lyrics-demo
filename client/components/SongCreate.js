import React, { Component } from "react";
import { graphql } from "react-apollo";
import { Link, hashHistory } from "react-router";
import query from "../queries/fetchSongs";
import mutation from '../mutations/AddSong';

class SongCreate extends Component {
  constructor(props) {
    super(props);
    this.state = { title: "" };
    // this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(e) {
    e.preventDefault();
    this.props
      .mutate({
        variables: {
          title: this.state.title
        },
        // refetch Queries it can include variables opt
        refetchQueries: [{ query }]
      })
      .then(() => {
        // redir to home
        hashHistory.push("/");
      })
      .catch(error => {
        console.error(error);
      });
  }
  render() {
    return (
      <div>
        <Link to="/" className="waves-effect waves-teal btn-flat">
          <i className="material-icons">arrow_back</i>
        </Link>
        <h3>Create a New Song</h3>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label>Song Title:</label>
          <input
            type="text"
            value={this.state.title}
            onChange={e => this.setState({ title: e.target.value })}
          />
          <button className="btn-floating btn-large waves-effect waves-light blue right">
            <i className="material-icons">add</i>
          </button>
        </form>
      </div>
    );
  }
}


export default graphql(mutation)(SongCreate);
