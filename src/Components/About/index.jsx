import React, { useState, useEffect } from 'react';
import ProgressBar from '../Utils/ProgressBar';
import Alert from '../Utils/Alert';
import TitleComponent from '../Title/TitleComponent';
import { useDispatch, useSelector } from 'react-redux';
import { getMembers, getOrganization } from '../../features/about/aboutSlice';
import Description from './Description';
import MembersList from './MembersList';
import { Divider } from '@chakra-ui/layout';
import SocialWidgets from './SocialWidgets';
import { Flex, Box } from '@chakra-ui/react';

const index = () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const about = useSelector((state) => state.about);

  useEffect(() => {
    try {
      dispatch(getOrganization());
      dispatch(getMembers());
      //ACA VA A IR LA LLAMADA AL SERVICIO
      // setLoading(true);
    } catch (error) {
      setLoading(false);
      Alert('error', 'Error', 'Algo salió mal, por favor intente más tarde.');
    }
  }, []);

  return (
    <>
      <TitleComponent
        img={
          'https://cdn.discordapp.com/attachments/872973629376319500/881352780260966400/foto.png'
        }
        text={'Nosotros'}
      />
      <Box align="center" justify="center" minH="100vh" p={{ base: 0, sm: 0, lg: 5 }}>
        <Flex
          // borderRadius={{ base: '0', sm: '0', lg: 'xl' }}
          // borderWidth="1px"
          // boxShadow="2xl"
          flexDir="column"
          justify="center"
          overflow="hidden"
          p={{ base: 0, sm: 1, lg: 2 }}
        >
          {loading && <ProgressBar isIndeterminate colorScheme="blue" />}
          <Description description={about.aboutUS.long_description} />
          <MembersList membersData={about.membersList} />
          <Divider my="5" />
          <SocialWidgets />
        </Flex>
      </Box>
    </>
  );
};

export default index;
