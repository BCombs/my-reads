import React from 'react';
import { Link, Route } from 'react-router-dom';
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

  render() {
    const { allBooks } = this.state;
    const currentlyReading = allBooks.filter(
      book => book.shelf === 'currentlyReading'
    );
    const wantToRead = allBooks.filter(book => book.shelf === 'wantToRead');
    const read = allBooks.filter(book => book.shelf === 'read');

    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <div className="list-books">
              <Navigation />
              <Bookcase>
                {/* Shelves */}
                <Shelf
                  shelfName="Currently Reading"
                  books={currentlyReading}
                  updateBooks={this.updateBooks}
                />
                <Shelf
                  shelfName="Want to Read"
                  books={wantToRead}
                  updateBooks={this.updateBooks}
                />
                <Shelf
                  shelfName="Read"
                  books={read}
                  updateBooks={this.updateBooks}
                />
              </Bookcase>
              <div className="open-search">
                <Link to="/search">Add a book</Link>
              </div>
            </div>
          )}
        />
        <Route
          path="/search"
          render={() => (
            <Search
              onBackClick={this.closeSearchPage}
              updateBooks={this.updateBooks}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
