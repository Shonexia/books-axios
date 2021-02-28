import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.css';

function App() {
  const [books, setBooks] = useState(null);
  const fetchData = async () => {
    const response = await axios.get(
      'https://www.anapioficeandfire.com/api/books?pageSize=30'
    );
    setBooks(response.data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (  
    <div className="App">
      <h1>Gejmotron knjige</h1>
      {/* Fetch data from API */}
      {/*<div>{fetchData}</div>*/}
      {/* Display data from API */}
      <div className="books">
        {books &&
          books.map((book, index) => {
            const cleanedDate = new Date(book.released).toDateString();
            const authors = book.authors.join(', ');

            return (
              <div className="book" key={index}>
                <h3>Book {index + 1}</h3>
                <h2>{book.name}</h2>

                <div className="details">
                  <p>👨: {authors}</p>
                  <p>📖: {book.numberOfPages} pages</p>
                  <p>🏘️: {book.country}</p>
                  <p>⏰: {cleanedDate}</p>
                </div>
              </div>
            );
          })}
      </div>

    </div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
