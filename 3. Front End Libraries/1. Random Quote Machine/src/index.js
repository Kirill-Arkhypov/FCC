import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class App extends React.Component {
  state = {
    text: '',
    author: '',
  };

  fetchQuote = async () => {
    const response = await fetch(
      'https://quote-garden.herokuapp.com/api/v2/quotes/random'
    ).then((res) => res.json());

    this.setState({
      text: response.quote.quoteText,
      author: response.quote.quoteAuthor,
    });
  };

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
        <button id='new-quote' onClick={this.fetchQuote}>
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
