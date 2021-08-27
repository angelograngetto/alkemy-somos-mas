import React from 'react';
import { Stack } from '@chakra-ui/react';
import MenuItem from './MenuIItem';

const MenuFooter = ({ list }) => {
  return (
    <Stack direction="row" justifyContent="center" width="100%">
      <Stack
        align="center"
        direction={['column', 'column', 'row', 'row']}
        flexWrap="wrap"
        justify="center"
        paddingY={4}
      >
        {list.map((item, index) => (
          <MenuItem
            key={index}
            _hover={{ color: 'blue.200' }}
            color="white"
            fontSize="2xl"
            fontWeight="bold"
            to={item.to}
          >
            {item.text}
          </MenuItem>
        ))}
      </Stack>
    </Stack>
  );
};

export default MenuFooter;
