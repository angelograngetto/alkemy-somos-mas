import React from 'react';
import { Box, Stack } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import MenuItem from './MenuItem';

const MenuLinks = ({ isOpen, isLogged, options }) => {
  const location = useLocation();

  if (!isLogged) {
    options = options.filter((option) => option.requireLogin == false);
  }
  return (
    <Box
      display={{ base: isOpen ? 'flex' : 'none', md: 'block' }}
      flex={{ base: 1, md: 0 }}
      marginRight={5}
      marginTop={{ base: 5, md: 0 }}
      order={{ base: 1 }}
    >
      <Stack
        alignItems="center"
        direction={['column', 'column', 'row', 'row']}
        justify={['center, space-between', 'flex-start', 'flex-start']}
        pt={[4, 4, 0, 0]}
        spacing={8}
        width="100%"
      >
        {options.map((option, index) => (
          <MenuItem
            key={index}
            isActive={option.to === location.pathname}
            reqLogin={option.reqLogin}
            to={option.to}
          >
            {option.text}
          </MenuItem>
        ))}
      </Stack>
    </Box>
  );
};

export default MenuLinks;
