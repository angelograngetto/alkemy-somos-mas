import React from 'react';
import { Box, Spinner } from '@chakra-ui/react';

export const SpinnerComponent = () => {
  return (
    <div m="auto" w="100vw">
      <Spinner
        color="#6767FF"
        emptyColor="gray.200"
        m="auto"
        size="lg"
        speed="0.60s"
        thickness="4px"
      />
    </div>
  );
};
export default SpinnerComponent;
