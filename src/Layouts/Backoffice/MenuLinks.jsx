import React from 'react';

import { Box, Stack } from '@chakra-ui/react';

import MenuItem from './MenuItem';

const MenuLinks = ({ isOpen, links }) => {
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
          <MenuItem key={index} to={link.to}>
            {link.text}
          </MenuItem>
        ))}
      </Stack>
    </Box>
  );
};

export default MenuLinks;
