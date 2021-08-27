import React from 'react';
import * as yup from 'yup';
import axios from 'axios';

import { useFormik } from 'formik';
import CKEditor from 'ckeditor4-react';
import { convertBase64 } from '../Utils/ConvertBase64';
import { Post, Put } from '../../Services/privateApiService';

import '../FormStyles.css';

const ProjectForm = ({ project }) => {
  const initialValues = {
    title: project ? project.title : '',
    description: project ? project.description : '',
    image: project ? project.image : '',
    due_date: project ? project.due_date : '',
  };

  const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];

  const formSchema = yup.object().shape({
    title: yup.string().required('El titulo es obligatorio'),
    description: yup.string().required('La descripcion es obligatoria'),
    /* Se comenta requerimiento para permitir post/put y salvar error de API al procesar imagen */
    // image: yup
    //   .mixed()
    //   .required('Debe seleccionar una imagen')
    //   .test(
    //     'fileFormat',
    //     'Solo se permite los siguientes formatos: jpg, jpeg o png',
    //     (value) => value && value && SUPPORTED_FORMATS.includes(value.type),
    //   ),
    due_date: yup.date(),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: formSchema,
    onSubmit: (values) => {
      {
        project ? editProject(values) : createNewProject(values);
      }
    },
  });

  const handleEditorChange = (e) => {
    formik.setFieldValue('description', e.editor.getData());
  };

  const handleImageChange = (e) => {
    formik.setFieldValue('image', e.currentTarget.files[0]);
  };

  // API requests
  const createNewProject = async (values) => {
    const img = await convertBase64(values.image);
    const newProject = {
      title: values.title,
      description: values.description,
      image: img,
      due_date: values.due_date,
    };
    Post('http://ongapi.alkemy.org/api/projects', newProject);
  };

  const editProject = async (values) => {
    const image = await convertBase64(values.image);
    const editedProject = {
      title: values.title,
      description: values.description,
      image: image,
      due_date: values.due_date,
    };

    Put('http://ongapi.alkemy.org/api/projects', project.id, editedProject);
  };

  return (
    <form className="form-container" onSubmit={formik.handleSubmit}>
      <label>Nombre del proyecto</label>
      <input
        className="input-field"
        id="title"
        name="title"
        placeholder="Titulo"
        type="text"
        value={formik.values.title}
        onChange={formik.handleChange}
      />

      {formik.touched.name && formik.errors.name ? <div>{formik.errors.name}</div> : null}

      <label>Descripción:</label>
      <CKEditor
        id="description"
        initData={formik.values.description}
        name="description"
        onChange={(e) => handleEditorChange(e)}
      />

      {formik.touched.description && formik.errors.description ? (
        <div>{formik.errors.description}</div>
      ) : null}

      <label>Seleccione una imagen</label>
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

      <label>Fecha de finalización:</label>
      <input
        className="input-field"
        id="due_date"
        name="due_date"
        type="date"
        value={formik.values.due_date}
        onChange={formik.handleChange}
      />

      <button className="submit-btn" type="submit">
        {project ? 'Editar' : 'Crear'}
      </button>
    </form>
  );
};

export default ProjectForm;
