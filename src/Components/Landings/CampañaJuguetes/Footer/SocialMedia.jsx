import { ButtonGroup, Flex, IconButton, Stack, Text, Link } from '@chakra-ui/react';
import * as React from 'react';
import { FaInstagramSquare, FaFacebookSquare, FaTwitterSquare, FaLinkedin } from 'react-icons/fa';
import SocialMediaIcon from './SocialMediaIcon';

const SocialMedia = () => (
  <ButtonGroup color="white" pt="8" variant="ghost">
    <Stack direction={{ base: 'row', lg: 'column' }}>
      <Text display={{ base: 'none', lg: 'inline-flex' }} fontSize="lg" fontWeight="bold">
        Redes Sociales
      </Text>
      <Link
        _hover={{ textDecoration: 'none' }}
        href="https://facebook.com"
        rel="noopener noreferrer"
        target="_blank"
      >
        <SocialMediaIcon Icon={FaFacebookSquare} name="Facebook" />
      </Link>
      <Link
        _hover={{ textDecoration: 'none' }}
        href="https://instagram.com"
        rel="noopener noreferrer"
        target="_blank"
      >
        <SocialMediaIcon Icon={FaInstagramSquare} name="Instagram" />
      </Link>
      <Link
        _hover={{ textDecoration: 'none' }}
        href="https://twitter.com"
        rel="noopener noreferrer"
        target="_blank"
      >
        <SocialMediaIcon Icon={FaTwitterSquare} name="Twitter" />
      </Link>
      <Link
        _hover={{ textDecoration: 'none' }}
        href="https://linkedin.com"
        rel="noopener noreferrer"
        target="_blank"
      >
        <SocialMediaIcon Icon={FaLinkedin} name="Linkedin" />
      </Link>
    </Stack>
  </ButtonGroup>
);

export default SocialMedia;
