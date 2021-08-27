import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { Heading, Text } from '@chakra-ui/react';

import styles from './slides.module.css';

import { getSlidesList } from '../../features/slides/slidesSlice';

const Slides = () => {
  const dispatch = useDispatch();
  const { slidesList } = useSelector((state) => state.slides);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    dispatch(getSlidesList());
  }, [dispatch]);

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
            <img src={slidesList[index].image} />
            <div className={styles.info__container}>
              <div className={styles.info__text}>
                <Heading fontSize={{ base: '1.3rem', md: '2.6rem', lg: '3.2rem' }}>
                  {slidesList[index].name}
                </Heading>
                <Text
                  dangerouslySetInnerHTML={{ __html: `${slidesList[index].description}` }}
                  display={{ base: 'none', lg: 'block' }}
                ></Text>
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

export default Slides;
