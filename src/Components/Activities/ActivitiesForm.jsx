import React, { useState } from 'react';
import { Button, Input, Image, Text, Stack } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { createActivity, updateActivity } from '../../features/activities/activitiesSlice';
import CKEditor from 'ckeditor4-react';
import ActivitiesService from '../../Services/ActivitiesService';
import validationSchema from './ValidationSchema';
import '../FormStyles.css';

const ActivitiesForm = ({ activity }) => {
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();

  const initialValues = {
    name: activity ? activity.name : '',
    description: activity ? activity.description : '',
    image: activity ? activity.image : '',
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const data = {
        name: values.name,
        description: values.description,
        required: false,
        schema: {
          $ref: '#/definitions/Activity',
        },
      };
      if (file) data.image = file;

      if (activity) {
        data.id = activity.id;
        dispatch(updateActivity(data));
      } else {
        dispatch(createActivity(data));
      }
    },
  });

  const handleEditorChange = (event) => {
    formik.setFieldValue('description', event.editor.getData());
  };

  const handleImageChange = async (event) => {
    const image = await convertBase64(event.target.files[0]);
    setFile(image);
    formik.setFieldValue('image', image);
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = function () {
        resolve(fileReader.result);
      };

      fileReader.onerror = function (event) {
        reject(null);
      };
    });
  };

  return (
    <form className="form-container" onSubmit={formik.handleSubmit}>
      <Input
        border="1px solid #c1c1c1"
        name="name"
        padding="15px 30px"
        placeholder="Activity Title"
        type="text"
        value={formik.values.name}
        onChange={formik.handleChange}
      />
      {formik.errors.name && (
        <Text color="red.600" fontSize="xs" textAlign="start">
          {formik.errors.name}
        </Text>
      )}
      <Input
        accept="image/png, image/jpg"
        border="1px solid #c1c1c1"
        name="image"
        padding="5px 30px"
        type="file"
        onChange={handleImageChange}
      />
      {formik.errors.image && (
        <Text color="red.600" fontSize="xs" textAlign="start">
          {formik.errors.image}
        </Text>
      )}

      <Stack direction="row" justifyContent="center">
        <Image src={formik.values.image} width={200} />
      </Stack>

      <CKEditor data={formik.values.description} onChange={handleEditorChange} />

      <Button
        backgroundColor="#2E86C1"
        border="none"
        color="#fff"
        padding="10px 15px"
        type="submit"
      >
        {activity ? 'Actualizar' : 'Enviar'}
      </Button>
    </form>
  );
};

export default ActivitiesForm;
