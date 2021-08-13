import React, { useEffect, useState } from 'react';
import TitleComponent from '../Title/TitleComponent';
import NewsCardList from './NewsCardList';
import NewsService from '../../Services/NewsService';
import { Container } from '@chakra-ui/react';

const index = () => {
  const [news, setNews] = useState([]);
  const fetchNews = async () => {
    try {
      const resp = await NewsService.getNews();
      setNews(resp.data.data);
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    fetchNews();
  }, []);
  return (
    <Container centerContent maxW="container.xl">
      <TitleComponent text={'Novedades'} />
      <NewsCardList newsData={news} />
    </Container>
  );
};

export default index;
