import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import axios from 'axios';

// cmp
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import About from './components/pages/About';
import User from './components/users/User';
import Alert from './components/layout/Alert';

// style
import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [repos, setRepos] = useState([]);

  const searchUsers = async (text) => {
    setLoading(true);
    const { data } = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    setLoading(false);
    setUsers(data.items);
  };

  const getUser = async (userName) => {
    setLoading(true);
    const { data } = await axios.get(
      `https://api.github.com/users/${userName}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    setLoading(false);
    setUser(data);
  };

  const getUserRepos = async (userName) => {
    setLoading(true);
    const { data } = await axios.get(
      `https://api.github.com/users/${userName}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    setLoading(false);
    setRepos(data);
  };

  const clearUsers = () => {
    setLoading(false);
    setUsers([]);
  };

  const showAlert = (msg, type) => {
    setAlert({ msg: msg, type: type });

    setTimeout(() => setAlert(null), 5000);
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <Alert alert={alert} />
        <Switch>
          <Route path="/" exact>
            <Search
              searchUsers={searchUsers}
              clearUsers={clearUsers}
              showClear={users.length > 0 ? true : false}
              setAlert={showAlert}
            />
            <Users loading={loading} users={users} />
          </Route>
          <Route exact path="/about" component={About} />
          <Route
            exact
            path="/user/:login"
            render={(props) => (
              <User
                {...props}
                getUser={getUser}
                getUserRepos={getUserRepos}
                user={user}
                repos={repos}
                loading={loading}
              />
            )}
          />
        </Switch>
      </div>
    </div>
  );
};

export default App;
