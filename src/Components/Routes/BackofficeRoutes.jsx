import React from 'react';
import ProtectedAdminRoute from './ProtectedAdminRoute';
import { Switch } from 'react-router-dom';

import { routes } from './backofficeRoutesData';

const BackofficeRoutes = () => {
  return (
    <>
      <Switch>
        {routes.map((route, index) => (
          <ProtectedAdminRoute key={index} exact={route.exact} path={route.path}>
            {route.component}
          </ProtectedAdminRoute>
        ))}
      </Switch>
    </>
  );
};

export default BackofficeRoutes;
