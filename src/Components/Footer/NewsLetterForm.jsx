import React, { useState } from 'react';
import { Button, Checkbox, Container, Flex, Input, Stack, Text } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';

const NewsLetterForm = () => {
  const [newsLetter, setNewsLetter] = useState(localStorage.getItem('newsletter'));

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('newsletter', 'accepted');
    setNewsLetter('accepted');
  };

  return (
    <Stack>
      {newsLetter === null ? (
        <form className="" onSubmit={handleSubmit}>
          <Stack width="105%">
            <Input placeholder="Suscribirme al Newsletter" type="email" variant="flushed" />
            <Button color="white" colorScheme="green" type="submit">
              Suscribirme
            </Button>
          </Stack>
        </form>
      ) : (
        <Stack
          display={{ base: 'none', lg: 'block' }}
          justifyContent="center"
          textAlign="center"
          width="100%"
        >
          <CheckCircleIcon color="white" fontSize="65px" mt="1" textAlign="center" />
          <Text color="white" fontSize="16px" textAlign="center">
            Ya estas suscripto a nuestro newsletter
          </Text>
        </Stack>
      )}
    </Stack>
  );
};

export default NewsLetterForm;
