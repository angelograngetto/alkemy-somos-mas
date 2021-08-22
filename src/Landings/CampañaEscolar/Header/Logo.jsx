import React from 'react';
import { Box, Image } from '@chakra-ui/react';

export default function Logo({ logo, ...rest }) {
  return (
    <Box {...rest}>
      <Image margin={0} src={logo} />
    </Box>
  );
}
