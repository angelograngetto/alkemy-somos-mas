import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const AdminPrivateRoute = ({ children: Children, ...props }) => {
  const { auth, isAdmin } = useSelector((state) => state.auth);

  return (
    <Route
      {...props}
      render={({ location }) => {
        return auth && isAdmin ? (
          <Children />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: location } }} />
        );
      }}
    />
  );
};

export default AdminPrivateRoute;
