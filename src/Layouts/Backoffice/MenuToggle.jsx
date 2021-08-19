import React from 'react';
import { Box, Button } from '@chakra-ui/react';
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import Sidebar from './Sidebar';

const MenuToggle = ({ toggle, isOpen, links }) => {
  return (
    <Box
      display={{ base: 'block', md: 'none' }}
      width={{ base: '65%', md: '100%' }}
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
