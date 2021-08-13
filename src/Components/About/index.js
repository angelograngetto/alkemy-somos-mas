import React, { useState, useEffect } from 'react';
import ProgressBar from '../Utils/ProgressBar';
import Alert from '../Utils/Alert';
import TitleComponent from '../Title/TitleComponent';

const index = ({ sobreNosotros }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      //ACA VA A IR LA LLAMADA AL SERVICIO
      // setLoading(true);
    } catch (error) {
      Alert('error', 'Error', 'Algo salió mal, por favor intente más tarde.');
      setLoading(false);
    }
  }, []);

  return (
    <div>
      {loading && <ProgressBar isIndeterminate colorScheme="blue" />}
      <TitleComponent text={'Nosotros'} />
      {sobreNosotros ? <p>{sobreNosotros}</p> : null}
    </div>
  );
};

export default index;
