import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

import About from './Components/About/index';
import ActivitiesList from './Components/Activities/ActivitiesList';
import ActivitiesListBack from './Components/Activities/BackOffice/ActivitiesListBack';
import Backoffice from './Components/Backoffice/Index';
import CategoriesForm from './Components/Categories/CategoriesForm';
import CategoriesListScreen from './Components/Backoffice/Categories/Index';
import Contact from './Components/Contact/index';
import DetailNew from './Components/News/Detail/DetailNew';
import DetailView from './Components/Activities/Detail/DetailView';
import Donacion from './Components/Donations/Donacion';
import Edit from './Components/Backoffice/Organization/Edit';
import Gracias from './Components/Donations/Gracias';
import Home from './Components/Home/Index';
import MemberForm from './Components/Backoffice/MemberForm';
import MemberList from './Components/Backoffice/MemberList';
import News from './Components/News/index';
import NewsForm from './Components/News/NewsForm';
import NewsList from './Components/News/NewsList';
import Organization from './Components/Backoffice/Organization/Index';
import RegisterForm from './Components/Auth/RegisterForm';
import SlidesForm from './Components/Slides/SlidesForm';
import SlidesListScreen from './Components/Backoffice/Slides/Index';
import UsersForm from './Components/Users/UsersForm';
import UsersListScreen from './Components/Backoffice/Users/Index';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact component={Home} path="/" />
        <Route exact component={ActivitiesList} path="/actividades" />
        <Route exact component={DetailView} path="/actividades/:id" />
        <Route exact component={Backoffice} path="/backoffice" />
        <Route exact component={ActivitiesListBack} path="/backoffice/activities" />
        <Route exact component={CategoriesListScreen} path="/backoffice/categories" />
        <Route exact component={CategoriesForm} path="/backoffice/categories/create" />
        <Route exact component={MemberList} path="/backoffice/members" />
        <Route exact component={NewsList} path="/backoffice/news" />
        <Route exact component={NewsForm} path="/backoffice/news/create" />
        <Route exact component={Organization} path="/backoffice/organization" />
        <Route exact component={Edit} path="/backoffice/organization/edit" />
        <Route exact component={MemberForm} path="/backoffice/organization/edit/:id" />
        <Route exact component={SlidesListScreen} path="/backoffice/slides" />
        <Route exact component={SlidesForm} path="/backoffice/slides/create" />
        <Route exact component={UsersListScreen} path="/backoffice/users" />
        <Route exact component={UsersForm} path="/backoffice/users/create" />
        <Route
          exact
          path="/contacto"
          render={() => (
            <Contact datosContacto={'datos de contacto que serán recibidos de la API'} />
          )}
        />
        <Route exact path="/donar">
          <Donacion text="¡Contribuye!" />
        </Route>
        <Route exact component={Gracias} path="/gracias" />
        <Route
          exact
          path="/nosotros"
          render={() => <About sobreNosotros={'texto que se obtendrá de la api'} />}
        />
        <Route exact path="/novedades" render={() => <News newsData={''} />} />
        <Route exact component={DetailNew} path="/novedades/:id" />
        <Route exact component={RegisterForm} path="/register" />
      </Switch>
    </Router>
  );
}

export default App;
