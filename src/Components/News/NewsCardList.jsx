import React from 'react';
import { Box, Image, Text } from '@chakra-ui/react';

const NewsCardList = ({ newsData }) => {
  return (
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
            <Image boxSize="100%" h="10rem" mb="1rem" objectFit="cover" src={news.image} />
            <Text>{news.name}</Text>
            <Text dangerouslySetInnerHTML={{ __html: news.content }}></Text>
          </Box>
        ))
      ) : (
        <p>No hay novedades</p>
      )}
    </Box>
  );
};
export default NewsCardList;
