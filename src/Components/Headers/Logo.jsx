import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { Redirect } from 'react-router-dom';

const Logo = (props) => {
  const handleLogoClick = () => {
    return <Redirect to="/home" />;
  };

  return (
    <Box {...props}>
      <Text
        color="white"
        cursor="pointer"
        fontSize="lg"
        fontWeight="bold"
        onClick={handleLogoClick}
      >
        Somos más
      </Text>
    </Box>
  );
};

export default Logo;
