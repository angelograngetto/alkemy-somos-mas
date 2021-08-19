import React from 'react';
import { Box, Text } from '@chakra-ui/react';

const HeaderLogo = (props) => {
  return (
    <Box {...props} w={{ base: '120px', lg: '200px' }}>
      <Text color="white" fontSize={{ base: 'lg', lg: '2xl' }} fontWeight="bold">
        Somos Más
      </Text>
    </Box>
  );
};

export default HeaderLogo;
