export const getContainerStyle = props => {
  return {
    position: 'relative',
    width: props.width || '500px',
    height: props.height || '200px'
  };
};
