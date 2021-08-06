import React from 'react';
import TitleComponent from '../Title/TitleComponent';

const index = ({ sobreNosotros }) => {
  return (
    <div>
      <TitleComponent text={'Nosotros'} />
      {sobreNosotros ? <p>{sobreNosotros}</p> : null}
    </div>
  );
};

export default index;
