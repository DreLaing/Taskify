import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';
import HomePage from './components/HomePage'
import Login from './components/Login'
import ProjectPage from './components/ProjectPage'

function App() {
  return (
    <Router>
      <Switch>
      <Route path={'/user/:id/:project'}>
          <ProjectPage />
        </Route>
        <Route path={'/user/:id'}>
          <HomePage />
        </Route>
        <Route path={'/'} exact={true}>
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
