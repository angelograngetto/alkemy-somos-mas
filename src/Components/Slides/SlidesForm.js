import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import CKEditor from 'ckeditor4-react';
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
import * as Yup from 'yup';

import axios from 'axios';
import SlidesService from './SlidesService';

const SlidesForm = ({ slide }) => {
  const [slides, setSlides] = useState([]);
  const [utils, setUtils] = useState({
    error: null,
    success: null,
    loading: null,
  });
  useEffect(() => {
    const getSlides = async () => {
      try {
        const response = await axios.get('http://ongapi.alkemy.org/api/slides');
        return response.data.data;
      } catch (error) {
        throw new Error(error);
      }
    };
    getSlides()
      .then((resp) => setSlides(resp))
      .catch((err) => {
        setSlides([]);
        alert('No se pudo obtener los datos solicitados');
      });
  }, []);

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

  const formatFileSupported = ['image/jpg', 'image/png', 'image/jpeg'];
  const slideOrders = slides
    .filter((item) => item?.order !== slide?.order)
    .map((item) => item?.order);
  const validateSchema = Yup.object().shape({
    slideName: Yup.string()
      .required('Campo requerido')
      .min(4, 'El nombre debe tener una longitud mínima de 4 carácteres'),
    slideDescription: Yup.string().required('Campo requerido'),
    slideOrder: Yup.mixed()
      .required('Campo requerido')
      .test({
        name: 'orderNumberValidation',
        exclusive: true,
        message: 'Este campo tiene que ser numérico y mayor o igual a 0',
        test: (value) => !isNaN(value) && value >= 0,
      })
      .test({
        name: 'uniqueOrderValidation',
        exclusive: true,
        message: 'Este orden ya fue utilizado en otro Slide, prueba con otro',
        test: (value) => !slideOrders.includes(parseInt(value)),
      }),
    file: Yup.mixed()
      .required('Campo requerido')
      .test({
        name: 'formatFile',
        exclusive: true,
        message: 'El formato de imagen es inválido, sólo se permite .png o .jpg',
        test: (value) => formatFileSupported.includes(value?.image?.type) || value.url,
      }),
  });

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        slideName: slide?.name ?? '',
        slideDescription: slide?.description ?? '',
        slideOrder: slide?.order ?? '',
        file: { url: slide?.image } ?? '',
      }}
      validationSchema={validateSchema}
      onSubmit={async (values, actions) => {
        let response;
        setUtils({ error: null, success: null, loading: true });
        if (slide && !slide.id) return;
        const newSlide = {
          name: values.slideName,
          description: values.slideDescription,
          order: values.slideOrder,
          image: values.file.imageParsed,
        };

        if (!slide) {
          response = await SlidesService.create(newSlide);
        } else {
          newSlide.id = slide.id;
          response = await SlidesService.update(newSlide);
        }

        if (response.success) {
          setUtils({ error: false, success: true, loading: false });
          actions.resetForm();
        } else {
          setUtils({ error: true, sucess: false, loading: false });
        }
      }}
    >
      {({ setFieldValue, values, errors, touched, setTouched }) => (
        <Container>
          <Form>
            <Box color="gray.900" fontSize="3xl" fontWeight="bold">
              {slide ? 'Edición de Slide' : 'Creación de Slide'}
            </Box>
            {slide && !slide.id ? (
              <Alert my="2" status="error">
                <AlertIcon />
                <Link as={RouterLink} to="backoffice/slides/create">
                  Este slide no existe, haz clic aquí para crearlo
                </Link>
              </Alert>
            ) : null}
            <Field name="slideName">
              {({ field, form, meta }) => (
                <FormControl isInvalid={form.errors.slideName && form.touched.slideName} my="2">
                  <Input id="slideName" placeholder="Nombre del slide" type="text" {...field} />
                  {meta.touched && meta.error && <FormErrorMessage>{meta.error}</FormErrorMessage>}
                </FormControl>
              )}
            </Field>

            <FormControl isInvalid={errors.slideDescription && touched.slideDescription} my="2">
              <CKEditor
                data={values.slideDescription}
                id="slideDescription"
                name="slideDescription"
                onBlur={(evt) => {
                  setTouched({ ...touched, slideDescription: true }, true);
                  setFieldValue('slideDescription', evt.editor.getData());
                }}
                onChange={(evt) => {
                  setTouched({ ...touched, slideDescription: true }, true);
                  setFieldValue('slideDescription', evt.editor.getData());
                }}
              />
              {touched.slideDescription && errors.slideDescription && (
                <FormErrorMessage>{errors.slideDescription}</FormErrorMessage>
              )}
            </FormControl>

            <Field name="slideOrder">
              {({ field, form, meta }) => (
                <FormControl isInvalid={form.errors.slideOrder && form.touched.slideOrder} my="2">
                  <Input id="slideOrder" placeholder="Orden del slide" type="text" {...field} />
                  {meta.touched && meta.error && <FormErrorMessage>{meta.error}</FormErrorMessage>}
                </FormControl>
              )}
            </Field>

            <FormControl isInvalid={errors.file && touched.file} my="2">
              <input
                id="file"
                name="file"
                type="file"
                onBlur={(evt) => setTouched({ ...touched, slideDescription: true }, true)}
                onChange={async (event) => {
                  const fileImage = event.currentTarget.files[0];
                  const imageParsed = await convertBase64(fileImage);
                  setTouched({ ...touched, file: true }, true);
                  setFieldValue('file', {
                    image: fileImage,
                    imageParsed,
                  });
                }}
              />
              {errors.file && (typeof values.file === 'object' || values.file.length === 0) && (
                <FormErrorMessage>{errors.file}</FormErrorMessage>
              )}
            </FormControl>

            {/* {show the image if is a valid image} */}
            {values.file && !errors.file && touched.file ? (
              <img
                alt={slide && values.file.url ? values?.description : values?.file?.image?.name}
                src={slide && values.file.url ? values?.file.url : values?.file?.imageParsed}
                style={{ height: '200px', width: '100%', objectFit: 'cover' }}
              />
            ) : null}

            {utils.loading ? (
              <Button isLoading colorScheme="blue" loadingText="Enviando" my="2">
                Enviar
              </Button>
            ) : (
              <Button colorScheme="blue" disabled={slide && !slide.id} my="2" type="submit">
                Enviar
              </Button>
            )}

            {utils.success ? (
              <Alert my="2" status="success">
                <AlertIcon />
                {slide
                  ? 'El slide ha sido editado exitosamente '
                  : 'El slide se ha creado exitosamente'}
              </Alert>
            ) : utils.error ? (
              <Alert my="2" status="error">
                <AlertIcon />
                {slide
                  ? 'Algo salió mal editando el slide, inténtalo de nuevo'
                  : 'Algo salió mal creando el slide, inténtalo de nuevo'}
              </Alert>
            ) : null}
          </Form>
        </Container>
      )}
    </Formik>
  );
};
export default SlidesForm;
