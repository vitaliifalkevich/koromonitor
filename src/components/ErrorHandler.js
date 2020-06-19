import React from 'react';
import '../styles/error.scss';

const ErrorHandler = ({ errorMsg, error }) => {
  return (
    <div className={error.className}>
      {errorMsg}. <br /> {error.message}
    </div>
  );
};

export default ErrorHandler;
