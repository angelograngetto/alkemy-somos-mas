import React from 'react';
import { Container, Image, Stack, Text } from '@chakra-ui/react';
import TitleComponent from '../../../Title/TitleComponent';
import { news, category } from './mockData';

const DetailNew = () => {
  const content = news.content.replace(/<[^>]+>/g, '');
  const image = news.image !== '' ? news.image : 'https://via.placeholder.com/350';
  return (
    <Container maxWidth={{ base: 'container.xl', md: 'container.xl' }} paddingY={20}>
      <TitleComponent text={news.name} />
      <Stack direction={{ base: 'column', md: 'row' }} marginTop={10} spacing={10}>
        <Stack alignItems="center" justifyContent="center">
          <Image maxWidth={{ base: '100%', md: 350, lg: 500 }} src={image} />
        </Stack>
        <Stack alignItems={{ base: 'center', md: 'flex-start' }} spacing={4} width="100%">
          <Stack
            border="1px solid gray"
            borderRadius={15}
            direction="row"
            justifyContent="center"
            minWidth={{ base: '40%', md: '25%' }}
            padding={1}
          >
            <Text>{category.name}</Text>
          </Stack>
          <Text fontSize={24} fontWeight="bold">
            Descripción
          </Text>
          <Text textAlign="justify">{content}</Text>
        </Stack>
      </Stack>
    </Container>
  );
};

export default DetailNew;
