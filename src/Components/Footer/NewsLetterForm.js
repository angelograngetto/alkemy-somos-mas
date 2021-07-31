import React, { useState } from 'react';
import { Button, Checkbox, Container, Flex, Input } from '@chakra-ui/react';

const NewsLetterForm = () => {
  const [newsLetter, setNewsLetter] = useState(localStorage.getItem('newsletter'));

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('newsletter', 'accepted');
    setNewsLetter('accepted');
  };

  return (
    <Container>
      {newsLetter === null ? (
        <form className="" onSubmit={handleSubmit}>
          <Flex>
            <Input placeholder="Suscribirme al Newsletter" type="email" variant="flushed" />
            <Button colorScheme="teal" type="submit" variant="outline">
              Suscribirme
            </Button>
          </Flex>
        </form>
      ) : null}
    </Container>
  );
};

export default NewsLetterForm;
