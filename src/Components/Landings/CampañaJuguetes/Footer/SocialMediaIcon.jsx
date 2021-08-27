import React from 'react';

import { IconButton, Stack, Text } from '@chakra-ui/react';

const SocialMediaIcon = ({ Icon, name, size }) => {
  return (
    <Stack alignItems="center" direction="row" spacing={2}>
      <IconButton
        _hover={{ color: '#6767FF', backgroundColor: 'white' }}
        aria-label={name}
        as="a"
        icon={<Icon fontSize={size} />}
      />
      <Text _hover={{ color: 'blue.100' }} display={{ base: 'none', lg: 'inline-block' }}>
        {name}
      </Text>
    </Stack>
  );
};

SocialMediaIcon.defaultProps = {
  size: '35px',
  link: '',
};

export default SocialMediaIcon;
