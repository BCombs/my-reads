import React, { Component } from 'react';

class Bookcase extends Component {
  
  render() {
    
    return (
      <div className="list-books-content">
      	{this.props.children}
      </div>
    );
  }
}

export default Bookcase;