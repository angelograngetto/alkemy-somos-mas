import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useToast } from '@chakra-ui/react';

const PrivateRoute = ({ children, errorMsg, ...props }) => {
  const { auth } = useSelector((state) => state.auth);
  const toast = useToast();

  return (
    <Route
      {...props}
      render={({ location }) => {
        if (auth) {
          return children;
        } else {
          toast({
            title: 'Error de autenticación',
            description: errorMsg,
            status: 'error',
            duration: 9000,
            isClosable: true,
          });
          return <Redirect to={{ pathname: '/', state: { from: location } }} />;
        }
      }}
    />
  );
};

export default PrivateRoute;
