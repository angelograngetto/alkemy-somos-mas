import React from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Flex, Image, Stack, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import SocialMedia from './SocialMedia';
import Copyright from './Copyright';
import Logo from '../../../../assets/LOGO-SOMOS-MAS.png';

const Footer = () => {
  const location = useLocation();
  return (
    <Box as="footer" backgroundColor="#6767FF" px={{ base: '4', md: '8' }} py="4">
      <Stack maxW="6xl" mx="auto" pb="8" px={{ base: '4', md: '8' }}>
        <Stack
          align="center"
          direction={{ sm: 'column', lg: 'row' }}
          justify="space-between"
          spacing={6}
        >
          <Flex flex={1} order={0}>
            <Image src={Logo} width={{ base: '120px', lg: '240px' }} />
          </Flex>

          <Flex
            alignItems="center"
            direction="column"
            flex={1}
            justifyContent="center"
            order={{ base: 2, lg: 1 }}
          >
            <Text
              color="white"
              d={{ base: 'none', lg: 'inline-flex' }}
              fontSize="lg"
              fontWeight="bold"
              mb={4}
              textAlign="center"
            >
              Enlaces al sitio web
            </Text>
            <Link to="/">
              <Text
                _hover={{ color: 'blue.100' }}
                color="white"
                d={{ base: 'none', md: 'block' }}
                fontWeight="semibold"
              >
                Ir al inicio
              </Text>
            </Link>
            {location.pathname === '/campaña-escolar' ? (
              <Link to="/campaña-juguetes">
                <Text
                  _hover={{ color: 'blue.100' }}
                  color="white"
                  d={{ base: 'none', '2xl': 'block' }}
                  fontWeight="semibold"
                >
                  Ir a la campaña juguetes
                </Text>
              </Link>
            ) : (
              <Link to="/campaña-escolar">
                <Text
                  _hover={{ color: 'blue.100' }}
                  color="white"
                  d={{ base: 'none', '2xl': 'block' }}
                  fontWeight="semibold"
                >
                  Ir a la campaña escolar
                </Text>
              </Link>
            )}
          </Flex>
          <Flex flex={1} justifyContent="center" order={{ base: 1, lg: 2 }}>
            <SocialMedia />
          </Flex>
        </Stack>
      </Stack>
      <Copyright alignSelf={{ base: 'center', sm: 'start' }} />
    </Box>
  );
};

export default Footer;
