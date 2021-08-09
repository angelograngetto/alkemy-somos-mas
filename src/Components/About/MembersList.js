import React from 'react';
import { Avatar, Box, Flex, Text } from '@chakra-ui/react';
import { Container } from '@chakra-ui/react';
import { SiFacebook } from 'react-icons/si';
import { SiLinkedin } from 'react-icons/si';

const MembersList = ({ membersData }) => {
  return (
    <Container centerContent>
      <Box>
        {membersData.length > 0 ? (
          membersData.map((member, index) => (
            <Flex key={index} borderRadius="lg" borderWidth="1px" m="5" overflow="hidden" p="4">
              <Avatar size="xl" src={`${member.image}`} />
              <Box m="3" p="3">
                <Text fontWeight="bold" pt="2">
                  {member.name}
                </Text>
                <Text fontsize="sm" pt="2">
                  {member.description}
                </Text>
                <Flex alignItems="center" pt="2">
                  <SiFacebook />
                  <Text px="2">{member.facebookUrl}</Text>
                </Flex>
                <Flex alignItems="center" pt="2">
                  <SiLinkedin />
                  <Text px="2">{member.linkedinUrl}</Text>
                </Flex>
              </Box>
            </Flex>
          ))
        ) : (
          <p>Miembros no disponibles</p>
        )}
      </Box>
    </Container>
  );
};

export default MembersList;
