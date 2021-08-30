import React from 'react';
import { Box, Text, Image, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const ActivityContent = ({ activity }) => {
  return (
    <Link to={`/actividades/${activity.id}`}>
      <Box borderRadius="xl" cursor="pointer">
        <Image
          alt="activity_image"
          borderRadius="xl"
          objectFit="cover"
          src={activity.image}
          w="100%"
        />
        <Text isTruncated fontSize="2xl" marginTop="10px" textAlign="center">
          {activity.name}
        </Text>
        <Text
          dangerouslySetInnerHTML={{ __html: activity.description }}
          fontSize="1xl"
          mt={3}
          textAlign="center"
        />
        <Box alignItems="center" d="flex" justifyContent="center" marginTop="10px">
          <Button bg="#6767cf" color="white" margin="auto" variant="outline">
            Leer Más
          </Button>
        </Box>
      </Box>
    </Link>
  );
};

export default ActivityContent;
