import React, { Component } from 'react';

export default class Search extends Component {
  state = {
    text: '',
  };

  onChange = (e) => {
    this.setState({ ...this.state, [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.searchUsers(this.state.text)
    this.setState({...this.state, text: ''})
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            name="text"
            placeholder="Search Users..."
            value={this.state.text}
            onChange={this.onChange}
          />
          <input
            type="submit"
            value="Search"
            className="btn btn-dark btn-block"
          />
        </form>
      </div>
    );
  }
}
