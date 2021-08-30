import React from 'react';
import { Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const MenuItem = ({ children, to = '/', ...rest }) => {
  return (
    <Link _hover={{ textDecoration: 'none' }} flex={1} to={to}>
      <Text display="block" textAlign="center" {...rest} margin={1} width={150}>
        {children}
      </Text>
    </Link>
  );
};

export default MenuItem;
