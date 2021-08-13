const getSpanishError = (httpError) => {
  if (httpError.includes('404')) return 'El recurso al que intenta acceder no existe';
  if (httpError.includes('422')) return 'Los datos provistos no son correctos';
  return null;
};

export default getSpanishError;
