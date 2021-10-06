import React, { Component } from 'react';
import axios from 'axios';

// cmp
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';

// style
import './App.css';

export default class App extends Component {
  state = {
    users: [],
    loading: false,
  };

  async componentDidMount() {
    this.setState({ ...this.state, loading: true });
    const { data } = await axios.get(
      `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    this.setState({ ...this.state, users: data, loading: false });
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="container">
          <Users loading={this.state.loading} users={this.state.users} />
        </div>
      </div>
    );
  }
}
