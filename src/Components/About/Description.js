import { Container } from '@chakra-ui/react';
import React from 'react';

const Description = ({ description }) => {
  return (
    <div> {description ? <Container maxWidth="container.xl">{description}</Container> : null}</div>
  );
};

export default Description;
