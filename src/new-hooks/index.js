import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Slide from './slide';

/* eslint-disable func-style */
function Example() {
  const [count, setCount] = useState(1);

  return (
    <div>
      <Slide>
        <h1>Slide {count}</h1>
      </Slide>
      <button onClick={() => setCount(count - 1)}>prev</button>
      <button onClick={() => setCount(count + 1)}>next</button>
    </div>
  );
}

ReactDOM.render(<Example />, document.getElementById('content'));
