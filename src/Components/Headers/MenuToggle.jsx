import React from 'react';
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import { Box, Button } from '@chakra-ui/react';

const MenuToggle = ({ isOpen, toggle }) => {
  return (
    <Box
      display={{ base: 'block', md: 'none' }}
      width={{ base: '65%', md: '100%' }}
      onClick={toggle}
    >
      {isOpen ? (
        <Button colorScheme="blue" float="right">
          <CloseIcon />
        </Button>
      ) : (
        <Button colorScheme="blue" float="right">
          <HamburgerIcon />
        </Button>
      )}
    </Box>
  );
};

export default MenuToggle;
