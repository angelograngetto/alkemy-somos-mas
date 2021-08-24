import * as Yup from 'yup';

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Ingrese un Nombre.'),
  email: Yup.string().email('El Email es inválido.').required('Ingrese un Email.'),
  phone: Yup.string()
    .matches(phoneRegExp, 'Número no válido.')
    .min(8, 'Mínimo 8 números')
    .required('Ingrese un teléfono válido.'),
  message: Yup.string().required('Ingrese un mensaje.'),
});

export default validationSchema;
