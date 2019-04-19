import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

class Shelf extends Component {
  
  render() {
    const shelfName = this.props.name;
    const books = this.props.books;
    const booksInShelf = books.map((currentBook, key) => {
      return (<li key={currentBook.id}> <Book book={currentBook} /> </li>);
  	});
    
    return (
      <div className="bookshelf">
      	<h2 className="bookshelf-title">{shelfName}</h2>
		<div className="bookshelf-books">
			<ol className="books-grid">
				{booksInShelf}
			</ol>
		</div>
	  </div>
    );
  }
}

export default Shelf;

Shelf.propTypes = {
  name: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired
}