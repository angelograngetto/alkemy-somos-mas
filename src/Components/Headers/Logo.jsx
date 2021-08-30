import React from 'react';
import { Box, Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import LogoNav from '../../assets/LOGO-SOMOS-MAS-nav.png';

const Logo = (props) => {
  return (
    <Box {...props} ml="3">
      <Link to="/">
        <Image borderRadius="50%" src={LogoNav} width={150} />
      </Link>
    </Box>
  );
};

export default Logo;
