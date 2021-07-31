import React, { useState } from 'react';
import axios from 'axios';
import * as yup from 'yup';

import { useFormik } from 'formik';
import { CKEditor } from 'ckeditor4-react';

import '../FormStyles.css';

const TestimonialForm = ({testimonial}) => {
  const initialValues = {
    name: testimonial ? testimonial.name : '',
    image: testimonial ? testimonial.image : '',
    description: testimonial ? testimonial.description : '',
  };

  const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];

  const formSchema = yup.object().shape({
    name: yup.string().required('El titulo es obligatorio'),
    description: yup.string().required('La descripcion es obligatoria'),
    image: yup
      .mixed()
      .required('Debe seleccionar una imagen')
      .test(
        'fileFormat',
        'Solo se permite los siguientes formatos: jpg, jpeg o png',
        (value) => value && value && SUPPORTED_FORMATS.includes(value.type),
      ),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: formSchema,
    onSubmit: (values) => {
      {
        testimonial ? editTestimonial(values) : createTestimonial(values);
      }
    },
  });

  //Helper function - base64
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = function () {
        resolve(fileReader.result);
      };

      fileReader.onerror = function (event) {
        reject('error');
      };
    });
  };

  const handleImageChange = (e) => {
    formik.setFieldValue('image', e.target.files[0]);
  };

  const handleEditorChange = (e) => {
    formik.setFieldValue('description', e.editor.getData());
  };

  const createTestimonial = async (values) => {
    const image = await convertBase64(values.image);
    const newTestimony = {
      name: values.name,
      description: values.description,
      image: image,
      required: false,
      schema: {
        $ref: '#/definitions/Testimonial',
      },
    };
    const resp = await axios.post('http://ongapi.alkemy.org/api/testimonials', newTestimony);
  };

  const editTestimonial = async (values) => {
    const image = await convertBase64(values.image);
    const editedTestimony = {
      name: values.name,
      description: values.description,
      image: image,
      required: false,
      schema: {
        $ref: '#/definitions/Testimonial',
      },
    };
    const resp = await axios.put(`http://ongapi.alkemy.org/api/testimonials/${testimonial.id}`, editedTestimony);
  };

  return (
    <form className="form-container" onSubmit={formik.handleSubmit}>
      <input
        className="input-field"
        id="name"
        name="name"
        placeholder="Nombre y apellido"
        type="text"
        value={formik.values.name}
        onChange={formik.handleChange}
      />

      {formik.touched.name && formik.errors.name ? <div>{formik.errors.name}</div> : null}

      <input
        accept="image/jpg, image/jpeg, image/png"
        className="input-field"
        id="image"
        name="image"
        title="Seleccionar archivo"
        type="file"
        onChange={(e) => handleImageChange(e)}
      />

      {formik.touched.image && formik.errors.image ? <div>{formik.errors.image}</div> : null}

      <CKEditor
        id="description"
        initData={formik.values.description}
        name="description"
        onChange={(e) => handleEditorChange(e)}
      />

      {formik.touched.description && formik.errors.description ? (
        <div>{formik.errors.description}</div>
      ) : null}

      <button className="submit-btn" type="submit">
        {testimonial ? 'Editar' : 'Crear'}
      </button>
    </form>
  );
};

export default TestimonialForm;
