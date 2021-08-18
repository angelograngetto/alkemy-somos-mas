import React, { useState } from 'react';
import { Stack, Text } from '@chakra-ui/react';
import HeaderLogo from './HeaderLogo';
import MenuToggle from './MenuToggle';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Stack
      alignItems="center"
      backgroundColor="blue.800"
      direction="row"
      height="70px"
      justifyContent="space-between"
      paddingX={5}
    >
      <HeaderLogo />
      <MenuToggle isOpen={isOpen} toggle={toggle} />
    </Stack>
  );
};

export default Header;
