import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import MenuItem from './MenuItem';
import { useLocation } from 'react-router-dom';

const Sidebar = ({ links }) => {
  const location = useLocation();

  return (
    <Box bg="#6767FF" h="100%" mx={-4} position="absolute" vh="100%" w="100%" zIndex="1000">
      <Flex flexDirection="column" marginTop="60px">
        {links.map((link, index) => (
          <MenuItem
            key={index}
            color={link.to === location.pathname ? 'blue.200' : 'white'}
            fontSize="20px"
            p={{ base: '12px', md: '20px' }}
            textAlign="center"
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
