import React from 'react';
import { Button, Link, Text } from '@chakra-ui/react';

const DonateButton = ({ isActive, to = '/' }) => {
  return (
    <Link _hover={{ textDecoration: 'none', color: 'blue.200' }} href={to}>
      <Button color={isActive && 'red.200'} colorScheme="green" display="block">
        Donar
      </Button>
    </Link>
  );
};

export default DonateButton;
