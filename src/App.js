import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';

import Backoffice from './Components/Backoffice/Index';
import RegisterForm from './Components/Auth/RegisterForm';
import DetailView from './Components/Activities/Detail/DetailView';

function App() {
  return (
    <Router>
      <Switch>
        <Redirect exact from="/" to="/home" />
        <Route component={RegisterForm} path="/register" />
        <Route component={Backoffice} path="/backoffice" />
        <Route component={DetailView} path="/actividades/:id" />
      </Switch>
    </Router>
  );
}

export default App;
