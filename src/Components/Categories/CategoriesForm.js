import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import CKEditor from 'ckeditor4-react';
import * as Yup from 'yup';
import {
  Button,
  Alert,
  AlertIcon,
  FormControl,
  FormErrorMessage,
  Input,
  Box,
  Container,
  Link,
} from '@chakra-ui/react';
import CategoriesServices from '../../Services/CategoriesServices';

const CategoriesForm = ({ categorie }) => {
  const [utils, setUtils] = useState({ error: false, success: false, loading: false });

  const convertBase64 = (file) => {
    if (file) {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = function () {
          resolve(fileReader.result);
        };
        fileReader.onerror = function () {
          reject(Error('Algo salió mal, vuelve a intentarlo'));
        };
      });
    }
  };

  const formatFileSupported = ['image/png', 'image/jpg', 'image/jpeg'];
  const validateSchema = Yup.object().shape({
    name: Yup.string()
      .required('Campo requerido')
      .min(4, 'El nombre debe tener un mínimo de 4 carácteres'),
    description: Yup.string().required('Campo requerido'),
    image: Yup.mixed()
      .required('Campo requerido')
      .test({
        name: 'formatFile',
        exclusive: true,
        message: 'El formato de imagen es inválido, sólo se permite .png o .jpg',
        test: (value) => formatFileSupported.includes(value?.originalImage?.type) || value.url,
      }),
  });

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        name: categorie?.name ?? '',
        description: categorie?.description ?? '',
        image: { url: categorie?.image } ?? '',
      }}
      validationSchema={validateSchema}
      onSubmit={(values, actions) => {
        if (categorie && !categorie.id) return;
        setUtils({ ...utils, loading: true });
        let data = {
          name: values.name,
          description: values.description,
          image: values.image.imageParsed,
        };
        if (categorie) {
          if (values.image.url) {
            CategoriesServices.update(
              { name: values.name, description: values.description },
              categorie.id,
            )
              .then((resp) => setUtils({ error: false, loading: false, success: true }))
              .catch((err) => setUtils({ error: true, loading: false, success: false }));
          } else {
            CategoriesServices.update(data, categorie.id)
              .then((resp) => setUtils({ error: false, loading: false, success: true }))
              .catch((err) => setUtils({ error: true, loading: false, success: false }));
          }
        } else {
          CategoriesServices.create(data)
            .then((resp) => {
              actions.resetForm({
                name: '',
                description: '',
                image: '',
              });
              setUtils({ error: false, loading: false, success: true });
            })
            .catch((err) => setUtils({ error: true, loading: false, success: false }));
        }
      }}
    >
      {({ values, errors, setFieldValue, setFieldTouched, touched }) => (
        <Container>
          <Form>
            <Box color="gray.900" fontSize="3xl" fontWeight="bold">
              {categorie ? 'Edición de categoría' : 'Creación de categoría'}
            </Box>
            {categorie && !categorie.id ? (
              <Alert my="2" status="error">
                <AlertIcon />
                <Link as={RouterLink} to="backoffice/categories/create">
                  Esta categoría no existe, haz clic aquí para crearlo
                </Link>
              </Alert>
            ) : null}

            <Field name="name">
              {({ field, form, meta }) => (
                <FormControl isInvalid={form.errors.name && form.touched.name} my="2">
                  <Input id="name" placeholder="Nombre de la categoría" type="text" {...field} />
                  {meta.touched && meta.error && <FormErrorMessage>{meta.error}</FormErrorMessage>}
                </FormControl>
              )}
            </Field>

            <FormControl isInvalid={errors.description && touched.description} my="2">
              <CKEditor
                data={values.description}
                id="description"
                name="description"
                onBlur={() => setFieldTouched('description', true, true)}
                onChange={(event) => setFieldValue('description', event.editor.getData())}
              />
              {touched.description && errors.description && (
                <FormErrorMessage>{errors.description}</FormErrorMessage>
              )}
            </FormControl>

            <FormControl isInvalid={errors.image && touched.image} my="2">
              <input
                id="image"
                name="image"
                type="file"
                onBlur={() => setFieldTouched('image', true, true)}
                onChange={async (event) => {
                  const imageFile = event.currentTarget.files[0];
                  const imageParsed = await convertBase64(imageFile);
                  setFieldValue('image', {
                    originalImage: imageFile,
                    imageParsed,
                  });
                }}
              />
              {errors.image && touched.image && <FormErrorMessage>{errors.image}</FormErrorMessage>}
            </FormControl>

            {!errors.image && values?.image ? (
              <img
                alt={categorie ? values?.image?.description : values?.image?.originalImage?.name}
                src={
                  categorie
                    ? values?.image?.url || values?.image?.imageParsed
                    : values?.image?.imageParsed
                }
                style={{ height: '200px', width: '100%', objectFit: 'cover' }}
              />
            ) : null}

            {utils.loading ? (
              <Button isLoading colorScheme="blue" loadingText="Enviando" my="2">
                Enviar
              </Button>
            ) : (
              <Button colorScheme="blue" disabled={categorie && !categorie.id} my="2" type="submit">
                Enviar
              </Button>
            )}

            {utils.success ? (
              <Alert my="2" status="success">
                <AlertIcon />
                {categorie
                  ? 'La categoría ha sido editada exitosamente '
                  : 'La categoría se ha creado exitosamente'}
              </Alert>
            ) : utils.error ? (
              <Alert my="2" status="error">
                <AlertIcon />
                {categorie
                  ? 'Algo salió mal editando la categoría, inténtalo de nuevo'
                  : 'Algo salió mal creando la categoría, inténtalo de nuevo'}
              </Alert>
            ) : null}
          </Form>
        </Container>
      )}
    </Formik>
  );
};
export default CategoriesForm;
