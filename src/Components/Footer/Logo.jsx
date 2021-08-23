import React from 'react';
import { Box, Image, Stack, Text } from '@chakra-ui/react';

export default function Logo({ url }) {
  return (
    <Stack alignItems="center" direction="column" justifyContent="center" w="100%">
      <Image src={url} width={100} />
    </Stack>
  );
}
