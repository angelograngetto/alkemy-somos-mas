import React from 'react';
import { Box, Text, Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const HeaderLogo = (props) => {
  return (
    <Box {...props} w={{ base: '120px', lg: '150px' }}>
      <Link to="/backoffice">
        <Text color="white" fontSize={{ base: 'lg', lg: '2xl' }} fontWeight="bold">
          <Image alt="logo" src="https://i.ibb.co/jTvz7Mt/LOGO-SOMOS-MAS-1.png" />
        </Text>
      </Link>
    </Box>
  );
};

export default HeaderLogo;
