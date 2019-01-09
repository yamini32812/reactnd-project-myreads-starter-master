//import React and component from react package.
import React, {Component} from 'react'
//import propTypes for typechecking.
import {PropTypes} from 'prop-types'
//Class BookDetails
export default class BookDetails extends Component {
//Declaring static propTypes for access across the class
  static propTypes = {
    //An object called book.
    book: PropTypes.object.isRequired,
    //A function to update the status of the book.
    onUpdate: PropTypes.func.isRequired
  }
//updateShelf variable stores the result of invoking (e) as it takes in an event
//of clicking the status of the book.
  updateShelf = (e) => {
    this.props.onUpdate(e.target.value)
  }
//onChange shifts the book from one shelf to another.
  render() {
    const bookDetail = this.props.book
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{
              width: 128,
              height: 193,
              backgroundImage: `url("${bookDetail.imageLinks.thumbnail}")`
            }}></div>
            <div className="book-shelf-changer">
              <select onChange={this.updateShelf} value={bookDetail.shelf}>
                <option disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{bookDetail.title}</div>
          <div className="book-authors">{bookDetail.authors}</div>
        </div>
      </li>
    )
  }
}
