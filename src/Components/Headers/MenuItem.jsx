import React from 'react';
import { Link, Text } from '@chakra-ui/react';

const MenuItem = ({ isActive, children, reqLogin, to = '/', ...rest }) => {
  return (
    <Link _hover={{ textDecoration: 'none', color: 'blue.200' }} href={to}>
      <Text color={isActive && 'blue.200'} display="block" {...rest}>
        {children}
      </Text>
    </Link>
  );
};

export default MenuItem;
