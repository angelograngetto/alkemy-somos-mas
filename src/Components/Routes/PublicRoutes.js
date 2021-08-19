import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

import About from '../About/index';
import ActivitiesList from '../Activities/ActivitiesList';
import Contact from '../Contact/index';
import DetailView from '../Activities/Detail/DetailView';
import DetailNew from '../News/Detail/DetailNew';
import Donacion from '../Donations/Donacion';
import Gracias from '../Donations/Gracias';
import Home from '../Home/Index';
import LoginForm from '../Auth/LoginForm';
import News from '../News/index';
import Newsletter from '../Newsletter';
import RegisterForm from '../Auth/RegisterForm';
import PageNotFound from '../PageNotFound/PageNotFound';

const PublicRoutes = () => {
  return (
    <>
      <Switch>
        <Route exact component={Home} path="/" />
        <Route exact component={ActivitiesList} path="/activities" />
        <Route exact component={DetailView} path="/activities/:id" />
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
        <Route exact component={LoginForm} path="/login" />
        <PrivateRoute
          exact
          errorMsg="Para poder suscribirte necesitás estar registrado"
          path="/newsletter"
        >
          <Newsletter />
        </PrivateRoute>
        <Route exact component={About} path="/nosotros" />
        <Route exact component={News} path="/novedades" />
        <Route exact component={DetailNew} path="/novedades/:id" />
        <Route exact component={RegisterForm} path="/register" />
        <Route component={PageNotFound} path="*" />
      </Switch>
    </>
  );
};

export default PublicRoutes;
