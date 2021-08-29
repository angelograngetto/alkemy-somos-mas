import React from 'react';
import { Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const MenuItem = ({ isActive, children, reqLogin, to = '/', ...rest }) => {
  return (
    <Link to={to}>
      <Text
        _hover={{ textDecoration: 'none', color: 'blue.200' }}
        color={isActive && 'blue.200'}
        display="block"
        fontSize={{ base: '14px' }}
        {...rest}
      >
        {children}
      </Text>
    </Link>
  );
};

export default MenuItem;
