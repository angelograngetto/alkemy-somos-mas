import React, { useEffect } from 'react';

import { useFormik } from 'formik';
import { Icon, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { Search2Icon } from '@chakra-ui/icons';
import { useDebouncedValue } from '../../../hooks/useDebouncedValue';

export const SearchInput = ({ onDebounce, placeholder }) => {
  const initialValues = {
    searchText: '',
  };

  const formik = useFormik({
    initialValues: initialValues,
  });

  const debouncedValue = useDebouncedValue(formik.values.searchText);

  useEffect(() => {
    onDebounce(debouncedValue);
  }, [debouncedValue]);

  return (
    <InputGroup>
      <Input
        margin="auto"
        marginTop="40px"
        name="searchText"
        placeholder={placeholder ? placeholder : null}
        type="text"
        value={formik.values.searchText}
        width={{ base: '70%', lg: '50%' }}
        onChange={formik.handleChange}
      />
      <InputRightElement>
        <Icon
          as={Search2Icon}
          position="absolute"
          right={{ base: '65px', md: '135px', lg: '350px' }}
          top={{ base: '52px', md: '52px', lg: '52px' }}
        />
      </InputRightElement>
    </InputGroup>
  );
};
