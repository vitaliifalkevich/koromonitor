import React from 'react';

const styles = {
  position: 'absolute',
  width: '150px',
  left: '50%',
  marginLeft: '-75px',
  marginTop: '100px',
};

const Spinner = () => {
  return (
    <div style={styles}>
      <div className="small-processing-container">
        <div className="ui-processing" />
        <div className="ui-processing-text">Data is loading</div>
      </div>
    </div>
  );
};

export default Spinner;
