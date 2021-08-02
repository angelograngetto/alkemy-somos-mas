import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';

import Backoffice from './Components/Backoffice/Index';
import SlidesForm from './Components/Slides/SlidesForm';
import Organization from './Components/Backoffice/Organization/Index';
import RegisterForm from './Components/Auth/RegisterForm';
import UsersForm from './Components/Users/UsersForm';
import MemberForm from './Components/Backoffice/MemberForm';
import NewsForm from './Components/News/NewsForm';
import DetailView from './Components/Activities/Detail/DetailView';
import DetailNew from './Components/News/Detail/DetailNew';

function App() {
  return (
    <Router>
      <Switch>
        <Redirect exact from="/" to="/home" />
        <Route exact component={SlidesForm} path="/backoffice/slides/create" />
        <Route component={RegisterForm} path="/register" />
        <Route exact component={UsersForm} path="/backoffice/users/create" />
        <Route path="/home" />
        <Route exact component={Organization} path="/backoffice/organization" />
        <Route exact component={MemberForm} path="/backoffice/organization/edit" />
        <Route exact component={MemberForm} path="/backoffice/organization/edit/:id" />
        <Route exact component={Backoffice} path="/backoffice" />
        <Route component={NewsForm} path="/backoffice/novedades" />
        <Route component={DetailView} path="/actividades/:id" />
        <Route component={DetailNew} path="/novedades/:id" />
      </Switch>
    </Router>
  );
}

export default App;
