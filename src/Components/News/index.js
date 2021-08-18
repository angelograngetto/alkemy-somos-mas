import React, { useEffect, useState } from 'react';
import TitleComponent from '../Title/TitleComponent';
import NewsCardList from './NewsCardList';
import NewsService from '../../Services/NewsService';
import { Container } from '@chakra-ui/react';
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
    <Container centerContent maxW="container.xl">
      <TitleComponent text={'Novedades'} />
      <SearchInput
        onDebounce={(value) => {
          setTerm(value);
        }}
      />
      <NewsCardList newsData={news} />
    </Container>
  );
};

export default News;
