import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import MenuItem from './MenuItem';
import { useLocation } from 'react-router-dom';

const Sidebar = ({ links }) => {
  const location = useLocation();

  return (
    <Box bg="blue.800" h="100%" mx={-8} pos="fixed" w="100%" zIndex="10000000000">
      <Flex flexDirection="column" marginTop="60px">
        {links.map((link, index) => (
          <MenuItem
            key={index}
            color={link.to === location.pathname ? 'blue.200' : 'white'}
            fontSize="20px"
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
