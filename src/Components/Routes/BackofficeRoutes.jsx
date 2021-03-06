import React from 'react';
import ProtectedAdminRoute from './ProtectedAdminRoute';
import BackOfficeLayout from '../../Layouts/Backoffice/BackOfficeLayout';
import { Switch } from 'react-router-dom';
import { routes } from './backofficeRoutesData';

const BackofficeRoutes = () => {
  return (
    <>
      <BackOfficeLayout>
        <Switch>
          {routes.map((route, index) => (
            <ProtectedAdminRoute key={index} exact={route.exact} path={route.path}>
              {route.component}
            </ProtectedAdminRoute>
          ))}
        </Switch>
      </BackOfficeLayout>
    </>
  );
};

export default BackofficeRoutes;
