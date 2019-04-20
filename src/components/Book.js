import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class Book extends Component {
  componentDidMount() {
    const node = ReactDOM.findDOMNode(this);
    if (node instanceof HTMLElement) {
      const selector = node.querySelector('.selector');
      selector.value = this.props.book.shelf;
      selector.addEventListener('change', event =>
        this.props.onShelfChange(this.props.book, event.target.value)
      );
    }
  }

  componentWillUnmount() {
    const node = ReactDOM.findDOMNode(this);
    const selector = node.querySelector('.selector');
    selector.removeEventListener('change', event =>
      this.props.onShelfChange(this.props.book, event.target.value)
    );
  }

  render() {
    const book = this.props.book;
    let smallThumbnail;
    if (book.imageLinks) {
      smallThumbnail = book.imageLinks.smallThumbnail;
    } else {
      smallThumbnail = '';
    }
    const { title } = book;
    let authors;
    if (book.authors) {
      authors = book.authors.join(', ');
    } else {
      authors = '';
    }

    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${smallThumbnail})`
            }}
          >
            {' '}
          </div>
          <div className="book-shelf-changer">
            <select className="selector">
              <option value="move" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{authors}</div>
      </div>
    );
  }
}

export default Book;
Book.propTypes = {
  book: PropTypes.object.isRequired,
  onShelfChange: PropTypes.func.isRequired
};
