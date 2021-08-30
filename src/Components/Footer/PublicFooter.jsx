import React, { useEffect, useState } from 'react';
import { Box, chakra, Divider, Stack, Text } from '@chakra-ui/react';
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
    <Stack backgroundColor="#6767FF">
      {organization ? (
        <Stack
          direction={{ base: 'column', lg: 'row' }}
          justifyContent={{ lg: 'space-evenly' }}
          mt="3"
        >
          <Stack justifyContent="center">
            <Logo url={organization.logo} />
            {/* <OrganizationTitle
              color="white"
              display={{ sm: 'none' }}
              fontSize="2xl"
              title={organization.name}
            /> */}
          </Stack>
          <Stack display={{ sm: 'none', md: 'inherit' }}>
            <MenuFooter list={linksList} />
          </Stack>
          <Stack display={{ base: 'none', lg: 'initial' }} justifyContent="center">
            <Newsletter />
          </Stack>
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
                { name: 'Twitter', url: organization.tweeter, icon: FaTwitter },
              ]}
            />
          </Stack>
        </Stack>
      ) : null}
      <Divider />
      <Stack direction="row" justifyContent="center" paddingBottom={1} paddingTop={1}>
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
