import React, { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import ProgressBar from '../Utils/ProgressBar';
import WebPublicaLayout from '../../Layouts/WebPublica/WebPublicaLayout';

const About = lazy(() => import('../About'));
const ActivitiesList = lazy(() => import('../Activities/ActivitiesList'));
const AuthRoute = lazy(() => import('./AuthRoute'));
const CampañaEscolarLanding = lazy(() => import('../Landings/CampañaEscolar'));
const CampañaJuguetesLanding = lazy(() => import('../Landings/CampañaJuguetes'));
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
const Logout = lazy(() => import('../Auth/Logout'));

const PublicRoutes = () => {
  const { isAdmin } = useSelector((state) => state.auth);

  return (
    <Suspense fallback={<ProgressBar isIndeterminate />}>
      <Switch>
        <Route exact component={CampañaEscolarLanding} path="/campaña-escolar" />
        <Route exact component={CampañaJuguetesLanding} path="/campaña-juguetes" />
        <WebPublicaLayout>
          <Switch>
            <Route exact component={Home} path="/" />
            <Route exact component={ActivitiesList} path="/activities" />
            <Route exact component={DetailView} path="/activities/:id" />
            <Route
              exact
              path="/contacto"
              render={() => (!isAdmin ? <Contact /> : <Redirect to="/" />)}
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
            <Route exact component={Logout} path="/logout" />
            <AuthRoute exact path="/register">
              <RegisterForm />
            </AuthRoute>
            <Route component={PageNotFound} path="*" />
          </Switch>
        </WebPublicaLayout>
      </Switch>
    </Suspense>
  );
};

export default PublicRoutes;
