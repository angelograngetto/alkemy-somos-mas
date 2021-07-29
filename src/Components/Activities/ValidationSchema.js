import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('El nombre es obligatorio'),
  image: Yup.mixed().required('Debe seleccionar una imagen'),
});

export default validationSchema;
