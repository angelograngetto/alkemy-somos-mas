/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { Heading, Text } from '@chakra-ui/react';

import styles from '../../Slides/slides.module.css';

const index = () => {
  const [index, setIndex] = useState(0);
  const location = useLocation();

  // https://ibb.co/3kBZSjs
  // https://ibb.co/BczfTmk
  // https://ibb.co/5rhYFYQ
  // https://ibb.co/WgJj9h6
  // https://ibb.co/KhVxb4f
  // https://ibb.co/fpJkRnV
  // https://ibb.co/2vYmbQ6
  // https://ibb.co/dJwWh4R
  // https://ibb.co/HNzrDfS
  // https://ibb.co/SmHKyXS

  const slidesList =
    location.pathname === '/campaña-escolar'
      ? [
        {
          link: 'https://i.ibb.co/85kr3dn/Foto-6-1.jpg',
          name: 'Bienvenido a la campaña escolar',
          description: 'Introducite en la maravillosa campaña 2021',
        },
        {
          link: 'https://i.ibb.co/5jC54WZ/Manos-10.jpg',
          name: 'Descubrí la experiencia del aprendizaje',
          description: 'Aprendé todos los días algo nuevo y diferente',
        },
        {
          link: 'https://i.ibb.co/tKYpQjv/Foto-5.jpg',
          name: 'Compartí experiencias con tus compañeros',
          description: 'Hacé nuevos amigos y establece vínculos con tus profesores',
        },
      ]
      : [
        {
          link: 'https://i.ibb.co/X7xy8yn/Foto-3.jpg',
          name: 'Bienvenido a la campaña de juguetes',
          description: 'Introducite en la maravillosa campaña 2021',
        },
        {
          link: 'https://i.ibb.co/2Y1nb3T/Foto-10.jpg',
          name: 'Descubrí la maravillosa diversión',
          description: 'Divertite todos los días a toda hora',
        },
        {
          link: 'https://i.ibb.co/z8RShTM/Foto-11.jpg',
          name: 'Compartí experiencias con tus compañeros',
          description: 'Hacé nuevos amigos y divertite con ellos',
        },
      ];
  useEffect(() => {
    const timer = setInterval(() => {
      if (index === slidesList.length - 1) {
        setIndex(0);
      } else {
        setIndex(index + 1);
      }
    }, 5000);
    return () => clearInterval(timer);
  }, [index]);

  const handleClickNext = () => {
    if (index === slidesList.length - 1) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  };

  const handleClickPrev = () => {
    if (index === 0) {
      setIndex(slidesList.length - 1);
    } else {
      setIndex(index - 1);
    }
  };

  return (
    <>
      {slidesList.length !== 0 && (
        <div className={styles.slider}>
          <div className={styles.image__container}>
            <img src={slidesList[index].link} />
            <div className={styles.info__container}>
              <div className={styles.info__text}>
                <Heading fontSize={{ base: '1.3rem', md: '2.6rem', lg: '3.2rem' }}>
                  {slidesList[index].name}
                </Heading>
                <Text display={{ base: 'none', lg: 'block' }} fontSize={{ base: '1.2rem' }}>
                  {slidesList[index].description}
                </Text>
              </div>
            </div>
            <div className={styles.buttons}>
              <ArrowBackIcon
                className={styles.buttons__prev}
                color="#fff"
                onClick={handleClickPrev}
              />
              <ArrowForwardIcon
                className={styles.buttons__next}
                color="#fff"
                onClick={handleClickNext}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default index;
