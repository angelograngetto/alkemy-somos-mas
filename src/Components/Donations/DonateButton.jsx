import React from 'react';
import { Link, Text } from '@chakra-ui/react';

const DonateButton = ({ isActive, to = '/' }) => {
  return (
    <Link _hover={{ textDecoration: 'none', color: 'blue.200' }} href={to}>
      <Text color={isActive && 'blue.200'} display="block">
        Donar
      </Text>
    </Link>
  );
};

export default DonateButton;
