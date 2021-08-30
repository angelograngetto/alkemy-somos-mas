import { Container, Text, Box } from '@chakra-ui/react';
import React from 'react';

const Description = ({ description }) => {
  return (
    <Box m="5">
      {description ? (
        <Container
          borderRadius="lg"
          boxShadow="md"
          maxWidth={{ base: '100%', lg: '70%', xl: '60%' }}
          p="5"
        >
          <Text fontWeight="black">Nuestra historia:</Text>
          <Text dangerouslySetInnerHTML={{ __html: description }}></Text>
        </Container>
      ) : null}
    </Box>
  );
};

export default Description;
