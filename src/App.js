import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import Navigation from './components/Navigation';
import Bookcase from './components/Bookcase';
import Shelf from './components/Shelf';
import Search from './components/Search';
import { getAll, update } from './BooksAPI';

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

  async updateBooks(book, shelf) {
    try {
      await update(book, shelf);
      const books = await getAll();
	  this.setState({allBooks: books});
    }catch(err) {
      console.log(err);
    }
  }

  closeSearchPage() {
    this.setState({ showSearchPage: false });
 }

  render() {
    const { allBooks } = this.state;
	const currentlyReading = allBooks.filter(book => (book.shelf === 'currentlyReading'));
	const wantToRead = allBooks.filter(book => (book.shelf === 'wantToRead'));
	const read = allBooks.filter(book => (book.shelf === 'read'));
    const updateBooks = this.updateBooks.bind(this);
	const closeSearchPage = this.closeSearchPage.bind(this);

    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <Search onBackClick={closeSearchPage}/>
        ) : (
          <div className="list-books">
          
          <Navigation />
          <Bookcase>
              {/* Shelves */}
              <Shelf name="Currently Reading" books={currentlyReading} updateBooks={updateBooks}/>
              <Shelf name="Want to Read" books={wantToRead} updateBooks={updateBooks}/>
              <Shelf name="Read" books={read} updateBooks={updateBooks}/>
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
