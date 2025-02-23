import React from 'react';
import spinnerGif from '../assets/spinner.gif';

const Spinner = ({top="15%"}) => {
  return (
    <div style={{ marginTop: top,display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <img src={spinnerGif} alt="Loading..." width={100} height={100} />
    </div>
  );
};

export default Spinner;