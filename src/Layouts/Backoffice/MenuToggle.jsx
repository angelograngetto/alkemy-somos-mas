import React from 'react';
import { Box, Button } from '@chakra-ui/react';
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import Sidebar from './Sidebar';

const MenuToggle = ({ toggle, isOpen, links }) => {
  return (
    <Box
      display={{ base: 'block', md: 'block', lg: 'none' }}
      transition="transform 2s ease-out"
      width={{ base: '15%', md: '25%' }}
      onClick={toggle}
    >
      {isOpen ? (
        <>
          <Button mt={1}>
            <CloseIcon />
          </Button>
          <Sidebar links={links} />
        </>
      ) : (
        <Button mt={1}>
          <HamburgerIcon />
        </Button>
      )}
    </Box>
  );
};

export default MenuToggle;
