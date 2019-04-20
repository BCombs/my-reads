import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

const Shelf = props => {
  const { shelfName, books, updateBooks } = props;
  const booksInShelf = books.map((currentBook, key) => {
    return (
      <li key={currentBook.id}>
        <Book book={currentBook} onShelfChange={updateBooks} />
      </li>
    );
  });

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelfName}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">{booksInShelf}</ol>
      </div>
    </div>
  );
};
export default Shelf;

Shelf.propTypes = {
  shelfName: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  updateBooks: PropTypes.func.isRequired
};
