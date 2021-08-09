import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './slides.module.css';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { Heading } from '@chakra-ui/react';
import SlidesService from './SlidesService.js';

const Slides = () => {
  const [index, setIndex] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchSlides = async () => {
      const response = await SlidesService.getAll();
      setData(response.data);
    };

    fetchSlides();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (index === data.length - 1) {
        setIndex(0);
      } else {
        setIndex(index + 1);
      }
    }, 5000);
    return () => clearInterval(timer);
  }, [index]);

  const handleClickNext = () => {
    if (index === data.length - 1) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  };

  const handleClickPrev = () => {
    if (index === 0) {
      setIndex(data.length - 1);
    } else {
      setIndex(index - 1);
    }
  };

  return (
    <>
      {data.length !== 0 && (
        <div className={styles.slider}>
          <div className={styles.image__container}>
            <img src={data[index].image} />
            <div className={styles.info__container}>
              <div className={styles.info__text}>
                <Heading>{data[index].name}</Heading>
                <div dangerouslySetInnerHTML={{ __html: `${data[index].description}` }}></div>
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
