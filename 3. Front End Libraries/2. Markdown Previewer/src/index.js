import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import marked from 'marked';

import placeholder from './placeholder.js';
import './index.css';

function App() {
  const [text, changeText] = useState(placeholder);

  return (
    <div>
      <h1>Markdown Previewer</h1>
      <div className='row'>
        <div className='column'>
          <h3>Enter your markdown here</h3>
          <textarea
            id='editor'
            value={text}
            onChange={(e) => changeText(e.target.value)}
          />
        </div>
        <div className='column'>
          <h3>Result</h3>
          <div
            id='preview'
            dangerouslySetInnerHTML={{
              __html: marked(text, { breaks: true }),
            }}
          />
        </div>
      </div>
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
