import React from 'react';
import { Text } from '@chakra-ui/react';

const OrganizationTitle = ({ title, fontWeight, textAlign, ...rest }) => {
  return (
    <Text fontWeight={fontWeight} textAlign={textAlign} {...rest}>
      {title}
    </Text>
  );
};

OrganizationTitle.defaultProps = {
  fontWeight: 'bold',
  textAlign: 'center',
};

export default OrganizationTitle;
