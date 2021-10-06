import React, { Component } from 'react';
import axios from 'axios';

// cmp
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';

// style
import './App.css';
import Alert from './components/layout/Alert';

export default class App extends Component {
  state = {
    users: [],
    loading: false,
    alert: null,
  };

  searchUsers = async (text) => {
    this.setState({ ...this.state, loading: true });
    const { data } = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    console.log(data);

    this.setState({ ...this.state, users: data.items, loading: false });
  };

  clearUsers = () => {
    this.setState({ ...this.state, users: [], loading: false });
  };

  setAlert = (msg, type) => {
    this.setState({ ...this.state, alert: { msg: msg, type: type } });

    setTimeout(() => this.setState({ ...this.state, alert: null }), 5000);
  };

  render() {
    return (
      <div>
        <Navbar />
        <div className="container">
          <Alert alert={this.state.alert} />
          <Search
            searchUsers={this.searchUsers}
            clearUsers={this.clearUsers}
            showClear={this.state.users.length > 0 ? true : false}
            setAlert={this.setAlert}
          />
          <Users loading={this.state.loading} users={this.state.users} />
        </div>
      </div>
    );
  }
}
