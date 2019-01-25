import { createAnimate } from 'react-move';

const numeric = (beg, end) => {
  const a = +beg;
  const b = +end - a;

  return function(t) {
    return a + b * t;
  };
};

const getInterpolator = (begValue, endValue) => {
  return numeric(begValue, endValue);
};

export default createAnimate(getInterpolator);
