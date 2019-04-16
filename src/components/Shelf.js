import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

class Shelf extends Component {
  
  
  render() {
    const shelfName = this.props.name;
    
    return (
      <div className="bookshelf">
      	<h2 className="bookshelf-title">{shelfName}</h2>
      	<div className="bookshelf-books">
      		<ol className="books-grid">
      		</ol>
      	</div>
      </div>
    );
  }
}

export default Shelf;

Shelf.propTypes = {
  name: PropTypes.string.isRequired
}