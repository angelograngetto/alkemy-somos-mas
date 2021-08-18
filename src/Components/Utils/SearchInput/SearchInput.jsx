import React, { useEffect } from 'react';

import { useFormik } from 'formik';
import { Box, Icon, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { Search2Icon } from '@chakra-ui/icons';
import { useDebouncedValue } from '../../../hooks/useDebouncedValue';

export const SearchInput = ({ onDebounce }) => {
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
    <Box mt="3">
      <InputGroup>
        <Input
          name="searchText"
          type="text"
          value={formik.values.searchText}
          onChange={formik.handleChange}
        />

        <InputRightElement>
          <Icon as={Search2Icon} />
        </InputRightElement>
      </InputGroup>
    </Box>
  );
};
