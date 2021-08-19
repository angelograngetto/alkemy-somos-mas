import React from 'react';

import { Box, Stack } from '@chakra-ui/react';

import { useLocation } from 'react-router-dom';

import MenuItem from './MenuItem';

const MenuLinks = ({ isOpen, links }) => {
  const location = useLocation();

  return (
    <Box
      display={{ base: isOpen ? 'flex' : 'none', md: 'block' }}
      flex={{ base: 1, md: 0 }}
      marginTop={{ base: 5, md: 0 }}
      order={{ base: 1 }}
    >
      <Stack
        alignItems="center"
        direction={['column', 'column', 'row', 'row']}
        justify={['center, space-between', 'flex-start', 'flex-start']}
        pt={[4, 4, 0, 0]}
        spacing={6}
        width="100%"
      >
        {links.map((link, index) => (
          <MenuItem key={index} isActive={link.to === location.pathname} to={link.to}>
            {link.text}
          </MenuItem>
        ))}
      </Stack>
    </Box>
  );
};

export default MenuLinks;
