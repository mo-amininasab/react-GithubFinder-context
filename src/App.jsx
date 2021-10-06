import React from 'react';
import { Switch, Route } from 'react-router-dom';

// context
import GithubState from './context/github/GithubState';
import AlertState from './context/alert/AlertState';

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
  return (
    <GithubState>
      <AlertState>
        <div>
          <Navbar />
          <div className="container">
            <Alert />
            <Switch>
              <Route path="/" exact>
                <Search />
                <Users />
              </Route>
              <Route exact path="/about" component={About} />
              <Route exact path="/user/:login" component={User} />
            </Switch>
          </div>
        </div>
      </AlertState>
    </GithubState>
  );
};

export default App;
