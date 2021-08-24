import React from 'react';
import TitleComponent from '../Title/TitleComponent';

const index = ({ datosContacto }) => {
  return (
    <div>
      <TitleComponent text={'Contacto'} />
      {datosContacto ? <p>{datosContacto}</p> : <p>{'Datos no disponibles'}</p>}
    </div>
  );
};

export default index;
