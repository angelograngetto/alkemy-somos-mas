import React from 'react';

import { Text } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';

const MenuItem = ({ children, to = '/', ...rest }) => {
  const location = useLocation();

  return (
    <Link to={to}>
      <Text
        color={to === location.pathname ? 'blue.200' : 'white'}
        cursor="pointer"
        display="block"
        {...rest}
        _hover={{ color: 'blue.200' }}
      >
        {children}
      </Text>
    </Link>
  );
};

export default MenuItem;
