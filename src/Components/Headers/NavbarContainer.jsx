import React from 'react';
import { Flex } from '@chakra-ui/react';

const NavbarContainer = ({ children, ...props }) => {
  return (
    <Flex
      align="center"
      as="nav"
      backgroundColor="#6767FF"
      color="white"
      justify="flex-start"
      p={3}
      w="100%"
      wrap="wrap"
      {...props}
    >
      {children}
    </Flex>
  );
};

export default NavbarContainer;
