import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Redirect exact from="/" to="/home" />
      </Switch>
    </Router>
  );
}

export default App;
