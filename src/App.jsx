import React, { Component } from 'react';
import axios from 'axios';

// cmp
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';

// style
import './App.css';

export default class App extends Component {
  state = {
    users: [],
    loading: false,
  };

  searchUsers = async (text) => {
    this.setState({ ...this.state, loading: true });
    const { data } = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    console.log(data);

    this.setState({ ...this.state, users: data.items, loading: false });
  };

  render() {
    return (
      <div>
        <Navbar />
        <div className="container">
          <Search searchUsers={this.searchUsers} />
          <Users loading={this.state.loading} users={this.state.users} />
        </div>
      </div>
    );
  }
}
