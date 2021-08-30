import React, { useEffect } from 'react';
import TitleComponent from '../Title/TitleComponent';
import { Box, Text, Link, SimpleGrid, HStack, Center, VStack } from '@chakra-ui/react';
import Map from '../Map';
import { useSelector, useDispatch } from 'react-redux';
import { getOrganization } from '../../features/about/aboutSlice';
import ContactForm from './ContactForm';
import { FaPhoneAlt, FaEnvelope, FaRegClock, FaMapMarkedAlt } from 'react-icons/fa';

const index = () => {
  const { aboutUS } = useSelector((state) => state.about);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrganization());
  }, []);

  return (
    <>
      <TitleComponent
        img={
          'https://cdn.discordapp.com/attachments/872973629376319500/881352780260966400/foto.png'
        }
        text={'Contacto'}
      />
      <SimpleGrid
        columns={{ sm: 1, md: 2 }}
        p={{ sm: 2, md: 3, lg: 5 }}
        spacing={{ sm: 5, md: 7, lg: 10 }}
      >
        <Link as="a" href="tel:0111560112988">
          <Box
            _hover={{ backgroundColor: 'green.200', color: 'green.900', borderColor: 'green.300' }}
            border="1px"
            borderColor="gray.100"
            borderRadius="lg"
            boxShadow="lg"
            height="80px"
          >
            <HStack h="100%">
              <Center ml="2rem">
                <FaPhoneAlt fontSize="2rem" />
              </Center>
              <VStack alignItems="flex-start" pl="3" spacing={0}>
                <Text fontWeight="bold" m="0">
                  Teléfono
                </Text>
                <Text fontSize="lg" m="0">
                  +54 (011) 15 6011-2988
                </Text>
              </VStack>
            </HStack>
          </Box>
        </Link>
        <Link as="a" href="mailto:somosmas@ong.com">
          <Box
            _hover={{ backgroundColor: 'red.200', color: 'red.900', borderColor: 'red.300' }}
            border="1px"
            borderColor="gray.100"
            borderRadius="lg"
            boxShadow="lg"
            height="80px"
          >
            <HStack h="100%">
              <Center ml="2rem">
                <FaEnvelope fontSize="2rem" />
              </Center>
              <VStack alignItems="flex-start" pl="3" spacing={0}>
                <Text fontWeight="bold" m="0">
                  Email
                </Text>
                <Text fontSize="lg" m="0">
                  somosmas@ong.com
                </Text>
              </VStack>
            </HStack>
          </Box>
        </Link>
        <Link as="a" href="https://goo.gl/maps/Wm7CLuoc5nZkQpQ99">
          <Box
            _hover={{ backgroundColor: 'blue.200', color: 'blue.900', borderColor: 'blue.300' }}
            border="1px"
            borderColor="gray.100"
            borderRadius="lg"
            boxShadow="lg"
            height="80px"
          >
            <HStack h="100%">
              <Center ml="2rem">
                <FaMapMarkedAlt fontSize="2rem" />
              </Center>
              <VStack alignItems="flex-start" pl="3" spacing={0}>
                <Text fontWeight="bold" m="0">
                  Dirección
                </Text>
                <Text noOfLines fontSize="lg" m="0">
                  Maipú 8419, San Isidro, Buenos Aires
                </Text>
              </VStack>
            </HStack>
          </Box>
        </Link>

        <Box border="1px" borderColor="gray.100" borderRadius="lg" boxShadow="lg" height="80px">
          <HStack h="100%">
            <Center ml="2rem">
              <FaRegClock fontSize="2rem" />
            </Center>
            <VStack alignItems="flex-start" pl="3" spacing={0}>
              <Text fontWeight="bold" m="0">
                Horario de atención
              </Text>
              <Text noOfLines fontSize="lg" m="0">
                Lunes a viernes de 08:00 a 18:00hs.
              </Text>
            </VStack>
          </HStack>
        </Box>
      </SimpleGrid>

      <ContactForm />
      <Box h="20rem">
        <Map address={'San Isidro, Buenos Aires, Argentina'} markerTitle={aboutUS?.name} />
      </Box>
    </>
  );
};

export default index;
