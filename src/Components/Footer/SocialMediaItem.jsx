import React from 'react';
import { IconButton, Stack, Text } from '@chakra-ui/react';

const SocialMediaItem = ({ icon, link, name }) => {
  return (
    <Stack marginX={4}>
      <IconButton
        _hover={{ color: '#6767FF', backgroundColor: 'white' }}
        aria-label={name}
        as="a"
        href={`https://${link}`}
        icon={icon}
        rel="noopener"
        target="_blank"
        title={name}
      />

      <Text display={{ sm: 'none', lg: 'inherit' }} fontSize="xs" fontWeight="bold">
        {name}
      </Text>
    </Stack>
  );
};

export default SocialMediaItem;
