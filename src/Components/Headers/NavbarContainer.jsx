import React from 'react';
import { Flex, Stack } from '@chakra-ui/react';

const NavbarContainer = ({ children, ...props }) => {
  return (
    <Flex
      align="center"
      as="nav"
      backgroundColor="blue.900"
      color="white"
      justify="flex-start"
      mb={8}
      p={8}
      w="100%"
      wrap="wrap"
      {...props}
    >
      {children}
    </Flex>
  );
};

export default NavbarContainer;
