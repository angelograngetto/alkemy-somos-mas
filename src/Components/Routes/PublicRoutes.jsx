import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import ProgressBar from '../Utils/ProgressBar';

const About = lazy(() => import('../About'));
const ActivitiesList = lazy(() => import('../Activities/ActivitiesList'));
const AuthRoute = lazy(() => import('./AuthRoute'));
const CampañaEscolarLanding = lazy(() => import('../Landings/CampañaEscolar'));
const Contact = lazy(() => import('../Contact'));
const DetailView = lazy(() => import('../Activities/Detail/DetailView'));
const DetailNew = lazy(() => import('../News/Detail/DetailNew'));
const Donacion = lazy(() => import('../Donations/Donacion'));
const Gracias = lazy(() => import('../Donations/Gracias'));
const Home = lazy(() => import('../Home'));
const LoginForm = lazy(() => import('../Auth/LoginForm'));
const News = lazy(() => import('../News'));
const Newsletter = lazy(() => import('../Newsletter'));
const RegisterForm = lazy(() => import('../Auth/RegisterForm'));
const PageNotFound = lazy(() => import('../PageNotFound/PageNotFound'));

const PublicRoutes = () => {
  return (
    <Suspense fallback={<ProgressBar isIndeterminate />}>
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
        <AuthRoute exact path="/login">
          <LoginForm />
        </AuthRoute>
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
        <Route exact component={CampañaEscolarLanding} path="/campaña-escolar" />
        <AuthRoute exact path="/register">
          <RegisterForm />
        </AuthRoute>
        <Route component={PageNotFound} path="*" />
      </Switch>
    </Suspense>
  );
};

export default PublicRoutes;
