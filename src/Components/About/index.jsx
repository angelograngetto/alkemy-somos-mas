import React, { useState, useEffect } from 'react';
import ProgressBar from '../Utils/ProgressBar';
import Alert from '../Utils/Alert';
import TitleComponent from '../Title/TitleComponent';
import { useDispatch, useSelector } from 'react-redux';
import { getMembers, getOrganization } from '../../features/about/aboutSlice';
import Description from './Description';
import MembersList from './MembersList';
import { Container } from '@chakra-ui/layout';
import SocialWidgets from './SocialWidgets';

const index = () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const about = useSelector((state) => state.about);
  console.log(about);

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
    <div>
      {loading && <ProgressBar isIndeterminate colorScheme="blue" />}
      <TitleComponent text={'Nosotros'} />
      <Description description={about.aboutUS.long_description} />
      <MembersList membersData={about.membersList} />
      <SocialWidgets />
    </div>
  );
};

export default index;
