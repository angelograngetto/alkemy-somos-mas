import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import Backoffice from './Components/Backoffice/Index';

function App() {
  return (
    <Router>
      <Switch>
        <Redirect exact from="/" to="/home" />
        <Route component={Backoffice} path="/backoffice" />
      </Switch>
    </Router>
  );
}

export default App;
