import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import Navigation from './components/Navigation';
import Bookcase from './components/Bookcase';
import Shelf from './components/Shelf';
import { getAll } from './BooksAPI';

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    allBooks: []
  }

  async componentDidMount() {
    try {
      const books = await getAll();
	  this.setState({allBooks: books});
  	} catch(err) {
      console.log(err);
    }
  }

  render() {
    const { allBooks } = this.state;
	const currentlyReading = allBooks.filter(book => (book.shelf === 'currentlyReading'));
	const wantToRead = allBooks.filter(book => (book.shelf === 'wantToRead'));
	const read = allBooks.filter(book => (book.shelf === 'read'));

    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
          <div className="list-books">
          
          <Navigation />
          <Bookcase>
              {/* Shelves */}
              <Shelf name="Currently Reading" books={currentlyReading} />
              <Shelf name="Want to Read" books={wantToRead} />
              <Shelf name="Read" books={read} />
		 </Bookcase>
         <div className="open-search">
           <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
         </div>
         </div>
        )}
      </div>
    )
  }
}

export default BooksApp
