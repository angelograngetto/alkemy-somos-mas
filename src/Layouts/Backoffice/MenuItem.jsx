import React from 'react';
import { Link } from 'react-router-dom';
import { Text } from '@chakra-ui/react';

const MenuItem = ({ children, to = '/', ...rest }) => {
  return (
    <Link to={to}>
      <Text color="white" cursor="pointer" display="block" {...rest} _hover={{ color: 'blue.200' }}>
        {children}
      </Text>
    </Link>
  );
};

export default MenuItem;
