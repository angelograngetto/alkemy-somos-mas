import React from 'react';
import { Box, Image } from '@chakra-ui/react';

const ImageLazy = ({ alt, fallbackSrc, objectFit, src }) => {
  return (
    <Box>
      <Image alt={alt} fallbackSrc={fallbackSrc} objectFit={objectFit} src={src} />
    </Box>
  );
};

export default ImageLazy;
