import React from 'react';
import { IconButton } from '@chakra-ui/react';

const SocialMediaItem = ({ icon, link, name }) => {
  return (
    <IconButton
      aria-label={name}
      as="a"
      href={`https://${link}`}
      icon={icon}
      marginX={2}
      rel="noopener"
      target="_blank"
    />
  );
};

export default SocialMediaItem;
