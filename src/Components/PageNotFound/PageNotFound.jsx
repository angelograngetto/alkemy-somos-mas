import { Text, Box } from '@chakra-ui/react';
import React from 'react';

const PageNotFound = () => {
  return (
    <Box
      alignItems="center"
      color="#0a0a0a"
      d="flex"
      fontSize={{ base: '1.5em', lg: '2em' }}
      fontWeight="bold"
      justifyContent="center"
      marginTop={{ base: '70%', lg: '18%' }}
      p={4}
      w="100%"
    >
      <Text textAlign="center">PAGE NOT FOUND</Text>
    </Box>
  );
};

export default PageNotFound;
