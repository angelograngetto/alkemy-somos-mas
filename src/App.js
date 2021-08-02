import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';

import Backoffice from './Components/Backoffice/Index';
import Organization from './Components/Backoffice/Organization/Index';
import RegisterForm from './Components/Auth/RegisterForm';
import MemberForm from './Components/Backoffice/MemberForm';
import NewsForm from './Components/News/NewsForm';
import DetailView from './Components/Activities/Detail/DetailView';

function App() {
  return (
    <Router>
      <Switch>
        <Redirect exact from="/" to="/home" />
        <Route component={RegisterForm} path="/register" />
        <Route exact component={Organization} path="/backoffice/organization" />
        <Route exact component={MemberForm} path="/backoffice/organization/edit" />
        <Route exact component={MemberForm} path="/backoffice/organization/edit/:id" />
        <Route exact component={Backoffice} path="/backoffice" />
        <Route component={NewsForm} path="/backoffice/novedades" />
        <Route component={DetailView} path="/actividades/:id" />
      </Switch>
    </Router>
  );
}

export default App;
