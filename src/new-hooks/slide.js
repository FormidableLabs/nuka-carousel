import React, { Component } from 'react';

class Slide extends Component {
  render() {
    return (
      <div
        style={{
          height: '300px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {this.props.children}
      </div>
    );
  }
}

export default Slide;
