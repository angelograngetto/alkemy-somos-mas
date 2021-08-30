import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Stack } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import MenuItem from './MenuItem';
import DonateButton from '../Donations/DonateButton';

const MenuLinks = ({ isOpen, isLogged, options }) => {
  const { auth, isAdmin } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!isLogged) {
    options = options.filter((option) => option.requireLogin == false);
  } else {
    if (isAdmin) {
      options = options.filter(
        (option) => option.text !== 'Contacto' && option.showAuthorizedUsers,
      );
    } else {
      options = options.filter(
        (option) => option.showAuthorizedUsers && option.requireAdmin == false,
      );
    }
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
        direction={{ base: 'column', md: 'row', lg: 'row' }}
        fontSize={{ md: '13px', lg: '16px' }}
        justify={['center, space-between', 'flex-start', 'flex-start']}
        pt={{ base: 1, md: 0, lg: 0 }}
        spacing={{ base: 2, md: 4, lg: 8 }}
        width="100%"
      >
        {options.map((option, index) => (
          <MenuItem
            key={index}
            fontSize="1.1em"
            isActive={option.to === location.pathname}
            reqLogin={option.reqLogin}
            to={option.to}
          >
            {option.text}
          </MenuItem>
        ))}
        {auth && !isAdmin && <DonateButton isActive={location.pathname === '/donar'} to="/donar" />}
      </Stack>
    </Box>
  );
};

export default MenuLinks;
