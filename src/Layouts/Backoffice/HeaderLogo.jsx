import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const HeaderLogo = (props) => {
  return (
    <Box {...props} w={{ base: '120px', lg: '200px' }}>
      <Link to="/backoffice">
        <Text color="white" fontSize={{ base: 'lg', lg: '2xl' }} fontWeight="bold">
          Somos Más
        </Text>
      </Link>
    </Box>
  );
};

export default HeaderLogo;
