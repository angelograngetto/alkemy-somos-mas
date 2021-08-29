import React from 'react';
import { Flex, Heading } from '@chakra-ui/react';

const TitleComponent = ({ text, img = 'https://via.placeholder.com/150' }) => {
  return (
    <Flex
      alignItems="center"
      backgroundPosition="center"
      height="27vh"
      justifyContent="center"
      style={{ backgroundImage: `url(${img})` }}
    >
      <Heading fontSize={{ base: '4xl', md: '6xl' }} m="4" p="3">
        {text}
      </Heading>
    </Flex>
  );
};

export default TitleComponent;
