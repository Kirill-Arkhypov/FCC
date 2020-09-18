import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import marked from 'marked';

import placeholder from './placeholder.js';
import './index.css';

function App() {
  const [output, parse] = useState(placeholder);

  return (
    <div id='container'>
      <textarea id='editor' onChange={(e) => parse(e.target.value)}>
        {output}
      </textarea>
      <div
        id='preview'
        dangerouslySetInnerHTML={{ __html: marked(output, { breaks: true }) }}
      ></div>
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
