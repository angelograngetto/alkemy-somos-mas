import React, { useState } from 'react';
import { Stack } from '@chakra-ui/react';
import HeaderLogo from './HeaderLogo';
import MenuToggle from './MenuToggle';
import MenuLinks from './MenuLinks';

const Header = ({ links }) => {
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
      <MenuToggle isOpen={isOpen} links={links} toggle={toggle} />
      <HeaderLogo />
      <MenuLinks links={links} />
    </Stack>
  );
};

export default Header;
