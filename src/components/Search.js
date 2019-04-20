import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getAll, search } from '../BooksAPI';
import Book from './Book';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
      shelvedBooks: [],
      foundBooks: []
    };

    this.updateQuery = this.updateQuery.bind(this);
  }

  componentDidMount() {
    getAll().then(books => this.setState({ shelvedBooks: books }));
  }

  updateQuery(event) {
    const query = event.target.value;
    this.setState({ query: query });
    // The search bar is empty. Don't show results
    if (query === '') {
      this.setState({ foundBooks: [] });
    } else {
      search(query, 20).then(books => {
        if (Array.isArray(books)) {
          // books is an array, if the length is 0 set foundBooks to an empty array, else, set foundBooks to the books array
          if (books.length === 0) {
            this.setState({ foundBooks: [] });
          } else {
            books.forEach(book => {
              // Check if the book is in shelvedBooks
              let bookInShelf = this.state.shelvedBooks.filter(
                shelvedBook => shelvedBook.id === book.id
              );
              if (bookInShelf[0]) {
                // It was already on a shelf, add the shelf to the book
                book.shelf = bookInShelf[0].shelf;
              } else {
                // It wasn't on a shelf, select none
                book.shelf = 'none';
              }
            });
            this.setState({ foundBooks: books });
          }
        } else {
          // Error
          this.setState({ foundBooks: [] });
        }
      });
    }
  }

  render() {
    const { onBackClick, updateBooks } = this.props;
    const { foundBooks } = this.state;

    const booksInShelf = foundBooks.map((currentBook, key) => {
      return (
        <li key={currentBook.id}>
          <Book book={currentBook} onShelfChange={updateBooks} />
        </li>
      );
    });

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={this.updateQuery}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">{booksInShelf}</ol>
        </div>
      </div>
    );
  }
}

export default Search;

Search.propTypes = {
  updateBooks: PropTypes.func.isRequired
};
