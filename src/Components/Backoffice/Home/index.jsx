import React from 'react';
import { FaCheck, FaPlus } from 'react-icons/fa';
import { Field, Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
  Flex,
  Box,
  Divider,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Textarea,
  Input,
  Heading,
  Button,
} from '@chakra-ui/react';

const FormEditHome = (props) => {
  const validationSchema = Yup.object({
    welcome: Yup.string()
      .min(20, 'The welcome message requires at least 20 characters')
      .required('The welcome message is Required'),
    slider1: Yup.mixed().required('Image of slider 1 is required'),
    sliderTxt1: Yup.string().required('Description of Slider 1 is required'),
    slider2: Yup.mixed().required('Image of slider 2 is required'),
    sliderTxt2: Yup.string().required('Description of Slider 2 is required'),
    slider3: Yup.mixed().required('Image of slider 3 is required'),
    sliderTxt3: Yup.string().required('Description of Slider 3 is required'),
  });

  return (
    <Flex align="center" justify="center" minH="100vh" p="5">
      <Box borderRadius="xl" borderWidth="1px" boxShadow="2xl" overflow="hidden" p="5" w="5xl">
        <Heading as="h1" fontSize="5xl" lineHeight="tall" mb="5" mt="1">
          Edit Home Information
        </Heading>
        <Divider mb="5" />
        <Formik
          initialValues={{
            welcome: props.welcome || '',
            slider1: props.slider1 || '',
            sliderTxt1: props.sliderTxt1 || '',
            slider2: props.slider2 || '',
            sliderTxt2: props.sliderTxt2 || '',
            slider3: props.slider3 || '',
            sliderTxt3: props.sliderTxt3 || '',
          }}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              actions.setSubmitting(false);
            }, 1000);
          }}
        >
          {(props) => (
            <Form noValidate>
              <Field name="welcome">
                {({ field, form }) => (
                  <FormControl
                    isRequired
                    isInvalid={form.errors.welcome && form.touched.welcome}
                    mb="10"
                  >
                    <FormLabel as="h2" fontSize="2xl" htmlFor="welcome" mb="3">
                      welcome text
                    </FormLabel>
                    <Textarea
                      {...field}
                      borderRadius="xl"
                      id="welcome"
                      name="welcome"
                      placeholder="Write here a welcome message that you want to show on the home page"
                      size="lg"
                    />
                    <FormErrorMessage>{form.errors.welcome}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Box as="h2" fontSize="2xl">
                Sliders
              </Box>
              <Flex justify="space-around" wrap="wrap">
                <Box d="flex" flexDir="column" flexGrow="2" m="5">
                  <Field name="slider1">
                    {({ field, form }) => (
                      <FormControl
                        isRequired
                        h="100%"
                        isInvalid={form.errors.slider1 && form.touched.slider1}
                      >
                        <FormLabel
                          _hover={{
                            bgImage: 'url("https://imgur.com/jrlkzGt.png")',
                            color: 'gray.50',
                          }}
                          alignItems="center"
                          bgImage={
                            form.values.slider1
                              ? `url('${form.values.slider1}')`
                              : "url('https://imgur.com/OBTdzJ6.png')"
                          }
                          bgPosition="center"
                          bgRepeat="no-repeat"
                          bgSize="cover"
                          border={form.errors.slider1 ? '2px solid #e53e3e' : '1px solid #e2e8f0'}
                          borderRadius="xl"
                          cursor="pointer"
                          display="flex"
                          flexDir="column"
                          for="slider1"
                          h="150px"
                          justifyContent="center"
                          w="100%"
                        >
                          <Box m="3">Choose a image for slider 1</Box>
                          <FaPlus />
                        </FormLabel>
                        <Input
                          {...field}
                          display="none"
                          name="slider1"
                          type="file"
                          value={form.values.slider1}
                          onChange={form.handleChange}
                        />
                        <FormErrorMessage mb="3">{form.errors.slider1}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="sliderTxt1">
                    {({ field, form }) => (
                      <FormControl
                        isRequired
                        h="100%"
                        isInvalid={form.errors.sliderTxt1 && form.touched.sliderTxt1}
                      >
                        <FormLabel htmlFor="sliderTxt1" mt="3">
                          Description
                        </FormLabel>
                        <Input
                          borderRadius="xl"
                          {...field}
                          id="sliderTxt1"
                          name="sliderTxt1"
                          placeholder="Put the description of the slider 1 just here"
                          title="Put the description of the slider 1 just here"
                          type="text"
                          value={form.values.sliderTxt1}
                          onChange={form.handleChange}
                        />
                        <FormErrorMessage>{form.errors.sliderTxt1}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </Box>
                <Box d="flex" flexDir="column" flexGrow="2" m="5">
                  <Field name="slider2">
                    {({ field, form }) => (
                      <FormControl
                        isRequired
                        h="100%"
                        isInvalid={form.errors.slider2 && form.touched.slider2}
                      >
                        <FormLabel
                          _hover={{
                            bgImage: 'url("https://imgur.com/jrlkzGt.png")',
                            color: 'gray.50',
                          }}
                          alignItems="center"
                          bgImage={
                            form.values.slider2
                              ? `url('${form.values.slider2}')`
                              : "url('https://imgur.com/OBTdzJ6.png')"
                          }
                          bgPosition="center"
                          bgRepeat="no-repeat"
                          bgSize="cover"
                          border={form.errors.slider2 ? '2px solid #e53e3e' : '1px solid #e2e8f0'}
                          borderRadius="xl"
                          cursor="pointer"
                          display="flex"
                          flexDir="column"
                          for="slider2"
                          h="150px"
                          justifyContent="center"
                          w="100%"
                        >
                          <Box m="3">Choose a image for slider 2</Box>
                          <FaPlus />
                        </FormLabel>
                        <Input
                          {...field}
                          display="none"
                          name="slider2"
                          type="file"
                          value={form.values.slider2}
                          onChange={form.handleChange}
                        />
                        <FormErrorMessage mb="3">{form.errors.slider2}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="sliderTxt2">
                    {({ field, form }) => (
                      <FormControl
                        isRequired
                        h="100%"
                        isInvalid={form.errors.sliderTxt2 && form.touched.sliderTxt2}
                      >
                        <FormLabel htmlFor="sliderTxt2" mt="3">
                          Description
                        </FormLabel>
                        <Input
                          borderRadius="xl"
                          {...field}
                          id="sliderTxt2"
                          name="sliderTxt2"
                          placeholder="Put the description of the slider 2 just here"
                          title="Put the description of the slider 2 just here"
                          type="text"
                          value={form.values.sliderTxt2}
                          onChange={form.handleChange}
                        />
                        <FormErrorMessage>{form.errors.sliderTxt2}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </Box>
                <Box d="flex" flexDir="column" flexGrow="2" m="5">
                  <Field name="slider3">
                    {({ field, form }) => (
                      <FormControl
                        isRequired
                        h="100%"
                        isInvalid={form.errors.slider3 && form.touched.slider3}
                      >
                        <FormLabel
                          _hover={{
                            bgImage: 'url("https://imgur.com/jrlkzGt.png")',
                            color: 'gray.50',
                          }}
                          alignItems="center"
                          bgImage={
                            form.values.slider3
                              ? `url('${form.values.slider3}')`
                              : "url('https://imgur.com/OBTdzJ6.png')"
                          }
                          bgPosition="center"
                          bgRepeat="no-repeat"
                          bgSize="cover"
                          border={form.errors.slider3 ? '2px solid #e53e3e' : '1px solid #e2e8f0'}
                          borderRadius="xl"
                          cursor="pointer"
                          display="flex"
                          flexDir="column"
                          for="slider3"
                          h="150px"
                          justifyContent="center"
                          w="100%"
                        >
                          <Box m="3">Choose a image for slider 3</Box>
                          <FaPlus />
                        </FormLabel>
                        <Input
                          {...field}
                          display="none"
                          name="slider3"
                          type="file"
                          value={form.values.slider3}
                          onChange={form.handleChange}
                        />
                        <FormErrorMessage mb="3">{form.errors.slider3}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="sliderTxt3">
                    {({ field, form }) => (
                      <FormControl
                        isRequired
                        h="100%"
                        isInvalid={form.errors.sliderTxt3 && form.touched.sliderTxt3}
                      >
                        <FormLabel htmlFor="sliderTxt3" mt="3">
                          Description
                        </FormLabel>
                        <Input
                          borderRadius="xl"
                          {...field}
                          id="sliderTxt3"
                          name="sliderTxt3"
                          placeholder="Put the description of the slider 3 just here"
                          title="Put the description of the slider 3 just here"
                          type="text"
                          value={form.values.sliderTxt3}
                          onChange={form.handleChange}
                        />
                        <FormErrorMessage>{form.errors.sliderTxt3}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </Box>
              </Flex>
              <Box display="flex" justifyContent="flex-end" w="100%">
                <Button
                  borderRadius="xl"
                  colorScheme="green"
                  isLoading={props.isSubmitting}
                  mt="5"
                  rightIcon={<FaCheck />}
                  type="submit"
                >
                  Save
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Flex>
  );
};

export default FormEditHome;
