import React from 'react';
import { Box, Image, Text, AspectRatio } from '@chakra-ui/react';

const CardComponent = ({
  title = 'Titulo',
  image = 'https://www.satellitetoday.com/wp-content/uploads/2019/06/Screen-Shot-2019-06-13-at-5.50.12-PM-800x490.png',
  description = 'Esta es la descripcion a mostrar en la tarjeta, Ullamco dolor ipsum elit esse sint cillum sit anim Adipisicing veniam tempor nostrud duis velit pariatur officia sunt mollit Consequat laboris reprehenderit esse sit reprehenderit do nostrud mollit ad consectetur.',
}) => {
  return (
    <Box borderRadius="lg" borderWidth="1px" m="2" maxW="md" overflow="hidden">
      <AspectRatio maxW="470px" ratio={4 / 3}>
        <Image
          alt="Image Card"
          fallbackSrc="images/placeholder/470x340.png"
          objectFit="cover"
          src={image}
        />
      </AspectRatio>

      <Box p="6">
        <Box mt="1">
          <Text fontSize={24} fontWeight="bold">
            {title}
          </Text>
        </Box>

        <Box mt="2">
          <Text fontSize={18}>{description}</Text>
        </Box>
      </Box>
    </Box>
  );
};

export default CardComponent;
