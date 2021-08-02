import React from 'react';
import { useHistory } from 'react-router-dom';
import { Flex, Box, Container, Image, Button } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';

const Organization = () => {
  const history = useHistory();

  const toEdit = () => {
    history.push('/backoffice/organization/edit');
  };

  const name = 'Name';
  const image = 'https://via.placeholder.com/300x200?text=image';
  const shortDescription = 'Lorem ipsum short description';

  return (
    <Flex align="center" justify="center" minH="100vh">
      <Container centerContent>
        <Box borderRadius="lg" borderWidth="1px" maxW="lg" overflow="hidden">
          <Image alt={name} src={image} />
          <Box isTruncated as="h4" fontWeight="semibold" lineHeight="tight" m="2">
            {name}
          </Box>
          <Box m="2">{shortDescription}</Box>
        </Box>
        <Button
          colorScheme="teal"
          margin="1rem"
          rightIcon={<ArrowForwardIcon />}
          variant="outline"
          onClick={toEdit}
        >
          Edit
        </Button>
      </Container>
    </Flex>
  );
};

export default Organization;
