import React from 'react';
import { Progress, Box, Text } from '@chakra-ui/react';

const ProgressBar = ({ value, isIndeterminate, colorScheme }) => {
  return (
    <Box
      alignItems="center"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      marginTop="250px"
    >
      <Text fontSize="2xl" marginBottom="10px">
        Cargando...
      </Text>
      <Progress
        borderRadius="5px"
        colorScheme={colorScheme}
        isIndeterminate={isIndeterminate}
        value={value}
        width="40%"
      />
    </Box>
  );
};

export default ProgressBar;
