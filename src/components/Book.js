import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Book extends Component {
  
  render() {
    const book = this.props.book
    const { imageLinks } = book;
    const smallThumbnail = book.imageLinks.smallThumbnail;
    const { title } = book;
    const authors = book.authors.join(', ');
    
    return(
    	<div className="book">
        	<div className="book-top">
         		<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${smallThumbnail})` }}></div>
					<div className="book-shelf-changer">
						<select>
							<option value="move" disabled>Move to...</option>
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
	book: PropTypes.object.isRequired
}