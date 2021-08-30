import React, { useState } from 'react';
import { Flex } from '@chakra-ui/react';
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
    <Flex
      alignItems="center"
      as="nav"
      backgroundColor="#6767FF"
      direction="row"
      fontSize="1.1em"
      height="100px"
      justifyContent="space-between"
      p={4}
      w="100%"
    >
      <MenuToggle isOpen={isOpen} links={linksList} toggle={toggle} />
      <HeaderLogo />
      <MenuLinks links={linksList} />
    </Flex>
  );
};

export default Header;
