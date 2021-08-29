import React, { useEffect, useState } from 'react';
import TitleComponent from '../Title/TitleComponent';
import NewsCardList from './NewsCardList';
import NewsService from '../../Services/NewsService';
import { Box, Container, Heading } from '@chakra-ui/react';
import UltimoEvento from './UltimoEvento';
import { SearchInput } from '../Utils/SearchInput/SearchInput';

const News = () => {
  const [news, setNews] = useState([]);
  const [term, setTerm] = useState('');

  const fetchNews = async () => {
    if (term.length >= 3) {
      try {
        const resp = await NewsService.search(term);
        setNews(resp.data.data);
      } catch (error) {
        alert(error);
      }
    } else {
      try {
        const resp = await NewsService.getNews();
        setNews(resp.data.data);
      } catch (error) {
        alert(error);
      }
    }
  };

  useEffect(() => {
    fetchNews();
  }, [term]);

  return (
    <Box>
      <TitleComponent
        img={
          'https://cdn.discordapp.com/attachments/872973629376319500/881352780260966400/foto.png'
        }
        text={'Novedades'}
      />
      <Box m="auto" mt="6" p="6" w={{ base: '60%', md: '40%' }}>
        {/* <SearchInput
          onDebounce={(value) => {
            setTerm(value);
          }}
        /> */}
      </Box>
      <Box overflow="hidden">
        <NewsCardList newsData={news} />
      </Box>
      <Box m="3" mb="12" overflow="hidden">
        <Heading h="100px" m="auto" textAlign="center" w="50%">
          Videos
        </Heading>
        <UltimoEvento
          videoUrl={'https://www.youtube.com/watch?v=Zp8aZmqf_rU&ab_channel=EdesurArgentina'}
        />
      </Box>
    </Box>
  );
};

export default News;
