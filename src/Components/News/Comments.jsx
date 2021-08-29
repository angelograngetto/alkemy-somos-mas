import React, { useEffect } from 'react';
import {
  Box,
  Center,
  Divider,
  Flex,
  HStack,
  Image,
  Spacer,
  Tag,
  Text,
  VStack,
} from '@chakra-ui/react';
import { AiFillLike } from 'react-icons/ai';

const data = [
  {
    id: 1,
    created_at: '19/9/2021',
    image: 'https://i.ibb.co/RGXHxCD/1.jpg',
    name: 'Angelo Grangretto',
    comment: 'Muy interesante.',
    likes: 1,
    role: 0,
  },
  {
    id: 2,
    created_at: '19/9/2021',
    image: 'https://i.ibb.co/YfTqdNc/2.jpg',
    name: 'Federico Illuminato',
    comment: 'Gran aporte!',
    likes: 2,
    role: 0,
  },
  {
    id: 3,
    created_at: '19/9/2021',
    image: 'https://i.ibb.co/mzRv3td/3.jpg',
    name: 'Julio Romero',
    comment: 'Me parece muy interesante noticia.',
    likes: 3,
    role: 0,
  },
  {
    id: 4,
    created_at: '19/9/2021',
    image: 'https://i.ibb.co/Br9Btcb/4.jpg',
    name: 'Jorge Díaz',
    comment: 'Esta bueno dar a la luz este tipo de incidencias',
    likes: 4,
    role: 0,
  },
  {
    id: 5,
    created_at: '19/9/2021',
    image: 'https://i.ibb.co/x1SfQD8/5.jpg',
    name: 'Nicolas Gomez',
    comment: 'Felicito a la organización por esta nota',
    likes: 5,
    role: 0,
  },
  {
    id: 6,
    created_at: '19/9/2021',
    image: 'https://i.ibb.co/FqJCB5g/6.jpg',
    name: 'Oscar Ariel Saucedo',
    comment: 'Gracias por toda la ayuda realizada otorgada',
    likes: 6,
    role: 0,
  },
  {
    id: 7,
    created_at: '19/9/2021',
    image: 'https://i.ibb.co/RgzLztF/7.jpg',
    name: 'Rodrigo Calderon',
    comment:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam nisi purus, rutrum in nisl et, convallis tempor ipsum. Nullam maximus imperdiet ornare. Suspendisse potenti. Pellentesque tristique, metus eu fringilla malesuada, nulla massa ultrices ex, vel suscipit est mi ut ex. Pellentesque vitae molestie odio. Etiam elementum lorem id sem malesuada, non accumsan sem pulvinar. Fusce feugiat finibus enim, sed dignissim quam aliquam non. Cras vel fringilla felis, vel pulvinar dolor. Vestibulum porttitor massa vitae ante fringilla, ut tincidunt nisl laoreet. Pellentesque congue tristique tempor.',
    likes: 7,
    role: 1,
  },
];

const Comments = () => {
  return (
    <Box
      border="1px"
      borderColor="gray.100"
      borderRadius="xl"
      boxShadow="xl"
      mx={{ sm: 1, md: 3, lg: 5 }}
      my="5"
      p={{ base: 1, md: 3, xl: 5 }}
    >
      <Flex justifyContent="center" m={{ sm: 1, md: 2, lg: 3 }}>
        <Tag borderRadius="full" colorScheme="green" size="lg">
          Comentarios: {data.length}
        </Tag>
      </Flex>
      <Box>
        {data.map((com) => (
          <Flex
            key={com.id}
            border="1px"
            borderColor="gray.100"
            borderRadius="xl"
            boxShadow="lg"
            minHeight="75px"
            mt="5"
            p="2"
          >
            <Box>
              <Image
                alt={com.name}
                border={com.role === 1 ? '2px' : null}
                borderBottomRadius={com.role === 1 ? null : 'xl'}
                borderColor={com.role === 1 ? 'purple.200' : null}
                borderTopRadius="xl"
                boxShadow="md"
                maxHeight={{ base: '50px', md: '75px', lg: '100px' }}
                maxWidth="100px"
                objectFit="cover"
                src={com.image}
              />
              {com.role === 1 && (
                <Text
                  isTruncated
                  backgroundColor="purple.200"
                  borderBottomRadius="xl"
                  boxShadow="md"
                  color="purple.800"
                  fontSize="sm"
                  pb="1"
                  textAlign="center"
                >
                  Admin
                </Text>
              )}
            </Box>
            <Flex flexDirection="column" ml="2" w="100%">
              <Flex>
                <Tag isTruncated borderRadius="full" colorScheme="red" size="md">
                  {com.name}
                  <Center height="100%" ml="2">
                    <Divider borderColor="red.200" orientation="vertical" />
                  </Center>
                  <Text fontSize="sm" fontWeight="thin" ml="2">
                    {com.created_at}
                  </Text>
                </Tag>
              </Flex>
              <Flex w="100%">
                <Box backgroundColor="blue.100" borderRadius="xl" mt="2" p="3" size="lg" w="100%">
                  <Text
                    color="cyan.900"
                    fontSize={{ sm: 'sm', md: 'md', lg: 'lg' }}
                    fontWeight="semibold"
                  >
                    {com.comment}
                  </Text>
                </Box>
              </Flex>
              <Flex mt="1">
                <Spacer />
                <Flex background="purple.100" borderRadius="md" px="2">
                  <Text color="purple.900" fontWeight="semibold">
                    {com.likes} likes
                  </Text>
                </Flex>
                <Flex
                  _hover={{ transform: 'scale(1.1)' }}
                  alignItems="center"
                  background="purple.100"
                  borderRadius="md"
                  color="purple.700"
                  ml="1"
                  px="2"
                >
                  <AiFillLike />
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        ))}
      </Box>
    </Box>
  );
};

export default Comments;
