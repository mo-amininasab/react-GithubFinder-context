import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import axios from 'axios';

// cmp
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import About from './components/pages/About';
import User from './components/users/User';

// style
import './App.css';
import Alert from './components/layout/Alert';

export default class App extends Component {
  state = {
    users: [],
    user: {},
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

  getUser = async (userName) => {
    this.setState({ ...this.state, loading: true });
    const { data } = await axios.get(
      `https://api.github.com/users/${userName}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    this.setState({ ...this.state, user: data, loading: false });
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
          <Switch>
            <Route path="/" exact>
              <Search
                searchUsers={this.searchUsers}
                clearUsers={this.clearUsers}
                showClear={this.state.users.length > 0 ? true : false}
                setAlert={this.setAlert}
              />
              <Users loading={this.state.loading} users={this.state.users} />
            </Route>
            <Route exact path="/about" component={About} />
            <Route exact
              path="/user/:login"
              render={(props) => (
                <User
                  {...props}
                  getUser={this.getUser}
                  user={this.state.user}
                  loading={this.state.loading}
                />
              )}
            />
          </Switch>
        </div>
      </div>
    );
  }
}
