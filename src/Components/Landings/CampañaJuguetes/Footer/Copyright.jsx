import { Text } from '@chakra-ui/layout';
import * as React from 'react';

const Copyright = (props) => (
  <Text color="white" fontSize="sm" textAlign="center" {...props}>
    &copy; {new Date().getFullYear()} By Alkemy Labs. All rights reserved.
  </Text>
);

export default Copyright;
