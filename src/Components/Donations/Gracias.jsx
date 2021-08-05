import { Box, Text } from '@chakra-ui/react';
import React from 'react';

const Gracias = () => {
  return (
    <Box
      alignItems="center"
      display="flex"
      flexDirection="column"
      flexWrap="wrap"
      justifyContent="space-evenly"
      mt="200px"
    >
      <Text fontSize={{ base: '30px', md: '40px', lg: '46px' }} textAlign="center">
        ¡Muchas gracias por su donación!
      </Text>
    </Box>
  );
};

export default Gracias;
