import React, { useEffect, useState } from 'react';
import { Box, chakra, Stack, Text } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';
import { SocialMediaLinks } from './SocialMediaLinks';
import { FaInstagramSquare, FaFacebookSquare, FaTwitter, FaLinkedin } from 'react-icons/fa';
import OrganizationService from '../../Services/OrganitationService';
import OrganizationTitle from './OrganizationTitle';
import MenuFooter from './MenuFooter';
import Logo from './Logo';
import Newsletter from './Newsletter';

const linksList = [
  { text: 'Inicio', to: '/' },
  { text: 'Contacto', to: '/contacto' },
  { text: 'Nosotros', to: '/nosotros' },
];

const PublicFooter = () => {
  const [organization, setOrganization] = useState(null);
  const today = new Date();

  useEffect(() => {
    const fetchData = async () => {
      const response = await OrganizationService.get();
      setOrganization(response.data);
    };
    fetchData();
  }, []);

  return (
    <Stack backgroundColor="#6767FF" paddingY={10} spacing={5}>
      {organization ? (
        <Stack
          direction={{ base: 'column', xl: 'row' }}
          justifyContent={{ lg: 'space-around' }}
          marginX={{ md: 'auto' }}
          width={{ md: '70%' }}
        >
          <Stack>
            <Logo url={organization.logo} />
            <OrganizationTitle
              color="white"
              display={{ sm: 'none' }}
              fontSize="2xl"
              title={organization.name}
            />
          </Stack>
          <Box display={{ sm: 'none', md: 'inherit' }}>
            <MenuFooter list={linksList} />
          </Box>
          <Stack alignItems="center" direction="column" justifyContent="center">
            <Text color="white" display={{ sm: 'none', lg: 'inherit' }} fontWeight="bolder">
              Siguenos
            </Text>
            <SocialMediaLinks
              color="white"
              links={[
                { name: 'Facebook', url: organization.facebook_url, icon: FaFacebookSquare },
                { name: 'Instagram', url: organization.instagram_url, icon: FaInstagramSquare },
                { name: 'LinkedIn', url: organization.linkedin, icon: FaLinkedin },
                { name: 'Tweeter', url: organization.tweeter, icon: FaTwitter },
              ]}
            />
          </Stack>
        </Stack>
      ) : null}
      <Stack direction="row" justifyContent="center" paddingTop={8}>
        <Text color="white" fontSize="xs">
          <chakra.span color="white" fontWeight="bold">
            @{today.getFullYear()}
          </chakra.span>{' '}
          By Alkemy All Rights Reserved
        </Text>
      </Stack>
    </Stack>
  );
};

export default PublicFooter;
