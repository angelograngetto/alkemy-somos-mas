import React from 'react';
import { Box, Spinner } from '@chakra-ui/react';

export const SpinnerComponent = () => {
  return (
    <Box m="2">
      <Spinner color="blue.500" emptyColor="gray.200" size="lg" speed="0.60s" thickness="4px" />
    </Box>
  );
};
