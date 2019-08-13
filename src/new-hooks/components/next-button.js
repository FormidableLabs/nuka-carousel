import React from 'react';
import { defaultButtonStyles } from '../style-utils/button-styles';

const NextButton = props => (
  <button style={defaultButtonStyles} onClick={props.onClick}>
    Next
  </button>
);

export default NextButton;
