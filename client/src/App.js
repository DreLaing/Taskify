import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';
import HomePage from './components/HomePage'
import Login from './components/Login'
import ProjectPage from './components/ProjectPage'
import Sidebar from './components/Sidebar'

function App() {
  return (
    <Router>
      <Switch>
      <Route path={'/user/:id/:project'}>
          <Sidebar />
          <ProjectPage />
        </Route>
        <Route path={'/user/:id'}>
          <Sidebar />
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
