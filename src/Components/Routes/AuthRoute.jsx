import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children, errorMsg, ...props }) => {
  const { auth } = useSelector((state) => state.auth);

  return (
    <Route
      {...props}
      render={({ location }) => {
        if (!auth) {
          return children;
        } else {
          return <Redirect to={{ pathname: '/', state: { from: location } }} />;
        }
      }}
    />
  );
};

export default PrivateRoute;
