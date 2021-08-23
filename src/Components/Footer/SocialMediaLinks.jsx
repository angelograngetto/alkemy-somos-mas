import * as React from 'react';
import { ButtonGroup } from '@chakra-ui/react';
import SocialMediaItem from './SocialMediaItem';

export const SocialMediaLinks = ({ links, color, iconSize }) => (
  <ButtonGroup color={color} marginY={3} variant="ghost">
    {links.map((item, index) => (
      <SocialMediaItem
        key={index}
        icon={<item.icon fontSize={iconSize} />}
        link={item.url}
        name={item.name}
      />
    ))}
  </ButtonGroup>
);

SocialMediaLinks.defaultProps = {
  color: 'gray.400',
  iconSize: '30px',
};
