import { Heading, Flex } from '@chakra-ui/react';
import { m } from 'framer-motion';
import React from 'react';

const TitleComponent = ({ text, img = 'https://via.placeholder.com/150' }) => {
  return (
    <Flex
      alignItems="center"
      backgroundPosition="center"
      height={{ base: '150px', md: '250px', lg: '300px' }}
      justifyContent="center"
      style={{ backgroundImage: `url(${img})` }}
    >
      <Heading
        bgColor="#6767FF"
        borderRadius="xl"
        boxShadow="dark-lg"
        color="white"
        fontSize={{ base: '4xl', md: '6xl' }}
        m="4"
        p="3"
      >
        {text}
      </Heading>
    </Flex>
  );
};

export default TitleComponent;
