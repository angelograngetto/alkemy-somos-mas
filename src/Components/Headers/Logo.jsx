import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Logo = (props) => {
  return (
    <Box {...props}>
      <Link to="/">
        <Text color="white" cursor="pointer" fontSize="lg" fontWeight="bold">
          Somos más
        </Text>
      </Link>
    </Box>
  );
};

export default Logo;
