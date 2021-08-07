import React from 'react';
import TitleComponent from '../Title/TitleComponent';
import { Box } from '@chakra-ui/react';
import { Container } from '@chakra-ui/react';

const index = ({ newsData }) => {
  return (
    <Container centerContent maxW="container.xl">
      <TitleComponent text={'Novedades'} />
      <Box pt="3">
        {newsData.length > 0 ? (
          newsData.map((news, index) => (
            <Box
              key={index}
              borderRadius="lg"
              borderWidth="1px"
              m="4"
              maxW="md"
              overflow="hidden"
              p="4"
            >
              <p>{news.data}</p>
              <p>{news.data}</p>
            </Box>
          ))
        ) : (
          <p>No hay novedades</p>
        )}
      </Box>
    </Container>
  );
};

export default index;
