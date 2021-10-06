import React from 'react';
import { Switch, Route } from 'react-router-dom';

// context
import GithubState from './context/github/GithubState';
import AlertState from './context/alert/AlertState';

// cmp
import Navbar from './components/layout/Navbar';
import User from './components/users/User';
import Alert from './components/layout/Alert';

// pages
import About from './components/pages/About';
import Home from './components/pages/Home';
import NotFound from './components/pages/NotFound';

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
              <Route path="/" exact component={Home} />
              <Route exact path="/about" component={About} />
              <Route exact path="/user/:login" component={User} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </div>
      </AlertState>
    </GithubState>
  );
};

export default App;
