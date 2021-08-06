import React from 'react';
import { Box, Text, Image } from '@chakra-ui/react';

const ActivityContent = ({ activity }) => {
  return (
    <Box>
      <Text isTruncated fontSize="3xl" textAlign="center">
        {activity.name}
      </Text>
      <Image alt="activity_image" objectFit="cover" src={activity.image} />
      <Text
        dangerouslySetInnerHTML={{ __html: activity.description }}
        fontSize="1xl"
        mt={3}
        textAlign="center"
      />
    </Box>
  );
};

export default ActivityContent;
