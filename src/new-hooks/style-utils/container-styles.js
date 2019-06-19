export const getContainerStyle = props => {
  return {
    position: 'relative',
    width: props.slideWidth || '500px',
    height: props.slideHeight || '200px'
  };
};
