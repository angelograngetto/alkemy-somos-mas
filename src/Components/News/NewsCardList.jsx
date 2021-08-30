import React, { useState, useEffect } from 'react';
import { Box, Image, Text, SimpleGrid, GridItem, Button } from '@chakra-ui/react';
import SpinnerComponent from '../Spinner/SpinnerComponent';
import { Link } from 'react-router-dom';
const postsPerPage = 2;

const NewsCardList = ({ newsData }) => {
  const [newsToShow, setnewsToShow] = useState([]);
  const [next, setNext] = useState(2);

  const loopWithSlice = (start, end) => {
    const slicedPosts = newsData.slice(start, end);
    setnewsToShow(slicedPosts);
  };

  useEffect(() => {
    loopWithSlice(0, postsPerPage);
  }, [newsData]);

  const handleShowMoreNews = () => {
    loopWithSlice(0, next + postsPerPage);
    setNext(next + postsPerPage);
  };
  return (
    <>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 2 }}
        justifyItems="center"
        m={{ base: 1, md: 6 }}
        p="3"
        px="12"
        spacing={9}
      >
        {newsData.length > 0 ? (
          newsToShow.map((news, index) => (
            <Box
              key={index}
              _hover={{ boxShadow: 'dark-lg' }}
              borderColor="gray.100"
              borderRadius="xl"
              borderWidth="1px"
              boxShadow="lg"
              m="3"
              overflow="hidden"
              p="3"
              w="100%"
            >
              <Link to={`/novedades/${news.id}`}>
                <Image
                  borderRadius="md"
                  boxShadow="lg"
                  boxSize="200px"
                  h={{ lg: 'auto' }}
                  maxH={{ lg: '300px' }}
                  minH={{ base: '300px' }}
                  objectFit="cover"
                  src={news.image}
                  w="100%"
                />
                <Text fontSize="xl" fontWeight="semibold" p="3">
                  {news.name}
                </Text>
                <Text
                  dangerouslySetInnerHTML={{ __html: news.content }}
                  letterSpacing="tight"
                  p="3"
                  textAlign="justify"
                ></Text>
              </Link>
            </Box>
          ))
        ) : (
          <GridItem colSpan={12} m="auto" my="100px">
            <SpinnerComponent />
          </GridItem>
        )}
      </SimpleGrid>
      <Box d="flex" justifyContent="center" mb="9">
        {next <= newsData.length ? (
          <Button
            colorScheme="blue"
            justifyItems="center"
            w={{ base: '150px', md: '230px' }}
            onClick={handleShowMoreNews}
          >
            Cargar Más
          </Button>
        ) : null}
      </Box>
    </>
  );
};
export default NewsCardList;
