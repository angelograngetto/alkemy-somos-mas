import React from 'react';
import { Avatar, Box, Flex, LinkBox, Text, Badge, Image, Wrap } from '@chakra-ui/react';
import { Container, Link } from '@chakra-ui/react';
import { SiFacebook } from 'react-icons/si';
import { SiLinkedin } from 'react-icons/si';

const MembersList = ({ membersData }) => {
  return (
    <Wrap justify="center" spacing="1rem">
      {membersData.length > 0 ? (
        membersData.map((member, index) => (
          <Box
            key={index}
            borderRadius="lg"
            borderWidth="1px"
            boxShadow="lg"
            m="5"
            overflow="hidden"
            w="sm"
          >
            <Image alt={member.imageAlt} h="25rem" objectFit="cover" src={member.image} w="100%" />

            <Box p="6" pt="3">
              <Box isTruncated as="h4" fontWeight="semibold" lineHeight="tight" mt="1">
                {member.name}
              </Box>
              <Box mb="10px">
                <Box as="span" color="gray.600" fontSize="sm">
                  <Text dangerouslySetInnerHTML={{ __html: member.description }}></Text>
                </Box>
              </Box>
              <Box alignItems="baseline" d="flex">
                <Badge borderRadius="full" colorScheme="facebook" mr="10px" p="2">
                  <Link isExternal alignItems="center" display="flex" href={member.facebookUrl}>
                    <SiFacebook p="20px" />
                    <Text ml="5px">Facebook</Text>
                  </Link>
                </Badge>
                <Badge borderRadius="full" colorScheme="linkedin" mr="10px" p="2">
                  <Link isExternal alignItems="center" display="flex" href={member.linkedinUrl}>
                    <SiLinkedin p="20px" />
                    <Text ml="5px">LinkedIn</Text>
                  </Link>
                </Badge>
              </Box>
            </Box>
          </Box>
        ))
      ) : (
        <p>Miembros no disponibles</p>
      )}
    </Wrap>
  );
};

export default MembersList;
