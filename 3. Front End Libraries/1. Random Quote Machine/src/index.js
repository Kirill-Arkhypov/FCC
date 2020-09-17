import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class App extends React.Component {
  state = {
    text: '',
    author: '',
  };

  async fetchQuote() {
    const response = await fetch(
      'https://quote-garden.herokuapp.com/api/v2/quotes/random'
    );
    const parsed = await response.json();

    this.setState({
      text: parsed.quote.quoteText,
      author: parsed.quote.quoteAuthor,
    });
  }

  componentDidMount() {
    this.fetchQuote();
  }

  render() {
    return (
      <div id='quote-box'>
        <p id='text'>{this.state.text}</p>
        <p id='author'>{this.state.author}</p>
        <a id='tweet-quote' href='twitter.com/intent/tweet'>
          Tweet Quote
        </a>
        <button id='new-quote' onClick={this.fetchQuote.bind(this)}>
          Get a Quote!
        </button>
      </div>
    );
  }
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
