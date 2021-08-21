import * as yup from 'yup';

//VALIDATIONS
const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required('Por favor ingrese un título.')
    .min(4, 'El título debe tener al menos 4 letras.'),
  content: yup.string().required('Por favor añada un contenido.'),
  category: yup.string().required('Por favor elija una categoría.'),
  image: yup
    .mixed()
    .required('Por favor elija una imagen.')
    .test('type', 'Formato de imagen no válido.', (value) => {
      return (
        (value && value.type === 'image/jpeg') ||
        (value && value.type === 'image/jpg') ||
        (value && value.type === 'image/gif') ||
        (value && value.type === 'image/png') ||
        (value && typeof value === 'string')
      );
    }),
});

export default validationSchema;
