import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';

import Backoffice from './Components/Backoffice/Index';
import Edit from './Components/Backoffice/Organization/Edit';
import SlidesForm from './Components/Slides/SlidesForm';
import Organization from './Components/Backoffice/Organization/Index';
import RegisterForm from './Components/Auth/RegisterForm';
import UsersForm from './Components/Users/UsersForm';
import MemberForm from './Components/Backoffice/MemberForm';
import NewsForm from './Components/News/NewsForm';
import DetailView from './Components/Activities/Detail/DetailView';
import DetailNew from './Components/News/Detail/DetailNew';
import CategoriesForm from './Components/Categories/CategoriesForm';
import Donacion from './Components/Donations/Donacion';
import Gracias from './Components/Donations/Gracias';
import NewsList from './Components/News/NewsList';
import Slides from './Components/Slides';
import ActivitiesList from './Components/Activities/ActivitiesList';
import Home from './Components/Home/Index';
import ActivitiesListBack from './Components/Activities/BackOffice/ActivitiesListBack';
import Contact from './Components/Contact/index';
import About from './Components/About/index';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact component={Home} path="/" />
        <Route exact component={SlidesForm} path="/backoffice/slides/create" />
        <Route exact component={Slides} path="/backoffice/slides" />
        <Route component={RegisterForm} path="/register" />
        <Route exact component={UsersForm} path="/backoffice/users/create" />
        <Route exact component={Organization} path="/backoffice/organization" />
        <Route exact component={Edit} path="/backoffice/organization/edit" />
        <Route exact component={MemberForm} path="/backoffice/organization/edit/:id" />
        <Route exact component={Backoffice} path="/backoffice" />
        <Route component={NewsForm} path="/backoffice/novedades" />
        <Route component={DetailView} path="/actividades/:id" />
        <Route component={DetailNew} path="/novedades/:id" />
        <Route exact component={CategoriesForm} path="/backoffice/categories/create" />
        <Route exact path="/donar">
          <Donacion text="¡Contribuye!" />
        </Route>
        <Route exact component={Gracias} path="/gracias" />
        <Route exact component={NewsList} path="/backoffice/news" />
        <Route exact component={ActivitiesList} path="/actividades" />
        <Route
          exact
          path="/nosotros"
          render={() => <About sobreNosotros={'texto que se obtendrá de la api'} />}
        />
        <Route exact component={ActivitiesListBack} path="/backoffice/activities" />
        <Route
          exact
          path="/contacto"
          render={() => (
            <Contact datosContacto={'datos de contacto que serán recibidos de la API'} />
          )}
        />
      </Switch>
    </Router>
  );
}

export default App;
