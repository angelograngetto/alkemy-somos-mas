import React, { Suspense, lazy } from 'react';
import { Box } from '@chakra-ui/react';

import { SpinnerComponent } from '../Components/Spinner/SpinnerComponent';
const ImageLazy = lazy(() => import('./ImageLazy'));

export const LazyLoadImage = ({ alt, fallbackSrc, objectFit, src }) => {
  return (
    <Suspense
      fallback={
        <Box alignItems="center" display="flex" justifyContent="center">
          <SpinnerComponent />
        </Box>
      }
    >
      <ImageLazy alt={alt} fallbackSrc={fallbackSrc} objectFit={objectFit} src={src} />
    </Suspense>
  );
};
