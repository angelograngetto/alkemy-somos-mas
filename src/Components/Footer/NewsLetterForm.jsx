import React, { useState } from 'react';
import { Button, Checkbox, Container, Flex, Input, Stack } from '@chakra-ui/react';

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
      ) : null}
    </Stack>
  );
};

export default NewsLetterForm;
