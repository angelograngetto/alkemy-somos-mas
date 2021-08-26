import React, { useState } from 'react';
import { Stack } from '@chakra-ui/react';
import HeaderLogo from './HeaderLogo';
import MenuToggle from './MenuToggle';
import MenuLinks from './MenuLinks';
import { linksList } from './LinksList';

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
      paddingX={8}
      w="100%"
    >
      <MenuToggle isOpen={isOpen} links={linksList} toggle={toggle} />
      <HeaderLogo />
      <MenuLinks links={linksList} />
    </Stack>
  );
};

export default Header;
