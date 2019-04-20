import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { search, update } from '../BooksAPI';
import Book from './Book';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchValue: '',
      foundBooks: []
    };

    this.updateSearch = this.updateSearch.bind(this);
  }

  async updateSearch(event) {
    this.setState({ searchValue: event.target.value });
    const books = await search(this.state.searchValue, 20);
    if (typeof books !== 'undefined') {
      this.setState({ foundBooks: books });
      console.log(this.state.foundBooks);
    }
  }

  render() {
    const { onBackClick, updateBooks } = this.props;
    const onShelfChange = (book, shelf) => {
      updateBooks(book, shelf);
    };
    const { foundBooks } = this.state;

    const booksInShelf = foundBooks.map((currentBook, key) => {
      return (
        <li key={currentBook.id}>
          <Book book={currentBook} onShelfChange={onShelfChange} />
        </li>
      );
    });

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <a className="close-search" onClick={() => onBackClick()}>
            Close
          </a>
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
              onChange={this.updateSearch}
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
  onBackClick: PropTypes.func.isRequired,
  updateBooks: PropTypes.func.isRequired
};
