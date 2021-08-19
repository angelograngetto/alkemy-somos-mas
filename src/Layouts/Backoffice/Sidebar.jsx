import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import MenuItem from './MenuItem';
import { useLocation } from 'react-router-dom';

const Sidebar = ({ links }) => {
  const location = useLocation();

  return (
    <Box bg="blue.800" h="100%" mx={-8} pos="fixed" w="100%">
      <Flex flexDirection="column" marginTop="60px">
        {links.map((link, index) => (
          <MenuItem
            key={index}
            color="white"
            fontSize="20px"
            isActive={link.to === location.pathname}
            p={4}
            to={link.to}
          >
            {link.text}
          </MenuItem>
        ))}
      </Flex>
    </Box>
  );
};

export default Sidebar;
