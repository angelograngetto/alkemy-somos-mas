import React from 'react';

const TitleComponent = ({ text, img = 'https://via.placeholder.com/150' }) => {
  return (
    <div style={{ backgroundImage: `url(${img})` }}>
      <h1>{text}</h1>
    </div>
  );
};

export default TitleComponent;
