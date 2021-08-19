import React from 'react';

import { Link, Text } from '@chakra-ui/react';

const MenuItem = ({ children, to = '/', ...rest }) => {
  return (
    <Link href={to}>
      <Text color="white" cursor="pointer" display="block" {...rest} _hover={{ color: 'blue.200' }}>
        {children}
      </Text>
    </Link>
  );
};

export default MenuItem;
