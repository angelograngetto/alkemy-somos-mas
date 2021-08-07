import React from 'react';
import TitleComponent from '../Title/TitleComponent';

const index = ({ datosContacto }) => {
  return (
    <div>
      <TitleComponent text={'Contacto'} />
      {datosContacto ? <p>{datosContacto}</p> : null}
    </div>
  );
};

export default index;
