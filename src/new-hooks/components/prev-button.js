import React from 'react';
import { defaultButtonStyles } from '../style-utils/button-styles';

const PreviousButton = props => {
  return (
    <button style={defaultButtonStyles} onClick={props.onClick}>
      Previous
    </button>
  );
};

export default PreviousButton;
