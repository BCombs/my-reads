import React from 'react';
import './App.css';
import Navigation from './components/Navigation';
import Bookcase from './components/Bookcase';
import Shelf from './components/Shelf';
import Search from './components/Search';
import { getAll, update } from './BooksAPI';

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSearchPage: false,
      allBooks: []
    };

    this.updateBooks = this.updateBooks.bind(this);
    this.closeSearchPage = this.closeSearchPage.bind(this);
  }

  componentDidMount() {
    try {
      getAll().then(books => this.setState({ allBooks: books }));
    } catch (err) {
      console.log(err);
    }
  }

  updateBooks(book, shelf) {
    try {
      update(book, shelf).then(() => {
        getAll().then(books => this.setState({ allBooks: books }));
      });
    } catch (err) {
      console.log(err);
    }
  }

  closeSearchPage() {
    this.setState({ showSearchPage: false });
  }

  render() {
    const { allBooks } = this.state;
    const currentlyReading = allBooks.filter(
      book => book.shelf === 'currentlyReading'
    );
    const wantToRead = allBooks.filter(book => book.shelf === 'wantToRead');
    const read = allBooks.filter(book => book.shelf === 'read');

    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <Search
            onBackClick={this.closeSearchPage}
            updateBooks={this.updateBooks}
          />
        ) : (
          <div className="list-books">
            <Navigation />
            <Bookcase>
              {/* Shelves */}
              <Shelf
                name="Currently Reading"
                books={currentlyReading}
                updateBooks={this.updateBooks}
              />
              <Shelf
                name="Want to Read"
                books={wantToRead}
                updateBooks={this.updateBooks}
              />
              <Shelf name="Read" books={read} updateBooks={this.updateBooks} />
            </Bookcase>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>
                Add a book
              </a>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default BooksApp;
