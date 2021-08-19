import React from 'react';
import { Route } from 'react-router-dom';

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
import RegisterForm from '../Auth/RegisterForm';

const PublicRoutes = () => {
  return (
    <>
      <Route exact component={Home} path="/" />
      <Route exact component={ActivitiesList} path="/activities" />
      <Route exact component={DetailView} path="/activities/:id" />
      <Route
        exact
        path="/contacto"
        render={() => <Contact datosContacto={'datos de contacto que serán recibidos de la API'} />}
      />
      <Route exact path="/donar">
        <Donacion text="¡Contribuye!" />
      </Route>
      <Route exact component={Gracias} path="/gracias" />
      <Route exact component={LoginForm} path="/login" />
      <Route exact component={About} path="/nosotros" />
      <Route exact component={News} path="/novedades" />
      <Route exact component={DetailNew} path="/novedades/:id" />
      <Route exact component={RegisterForm} path="/register" />
    </>
  );
};

export default PublicRoutes;
