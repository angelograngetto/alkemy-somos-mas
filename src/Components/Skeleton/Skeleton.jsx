import React from 'react';
import { Box } from '@chakra-ui/react';
import { skeletonCard, skeletonDefualt, skeletonImage, skeletonTable } from './skeletontypes';

export const Skeleton = ({ loaderType = 'table' }) => {
  // loaderType must be a string - "card", "image", "table"

  const skeletonTypes = (loaderType) => {
    switch (loaderType) {
      case 'card':
        return skeletonCard;

      case 'image':
        return skeletonImage;

      case 'table':
        return skeletonTable;

      default:
        return skeletonDefualt;
    }
  };

  const skeleton = skeletonTypes(loaderType);

  return <Box m="5">{skeleton}</Box>;
};
