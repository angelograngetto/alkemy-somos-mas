import { RepeatIcon } from '@chakra-ui/icons';
import { Button, Flex, Skeleton, Text } from '@chakra-ui/react';
import React from 'react';

const Error = ({ error }) => {
  return (
    <Flex align="center" justify="center" minH="100vh" p="5">
      <Flex
        borderRadius="xl"
        borderWidth="1px"
        boxShadow="2xl"
        justify="center"
        overflow="hidden"
        p="5"
        w="5xl"
      >
        <Flex align="center" flexDir="column">
          <Text>{error.message ? `Message: ${error.message}` : <Skeleton />}</Text>
          <Text>Reload the page</Text>
          <Button
            _hover={{ boxShadow: 'xl', transform: 'scale(1.1)' }}
            borderRadius="full"
            boxShadow="lg"
            colorScheme="green"
            h="50px"
            m="5"
            w="50px"
            onClick={() => window.location.reload()}
          >
            <RepeatIcon />
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Error;
