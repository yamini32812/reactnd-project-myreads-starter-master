//import React and component from react package.
import React, {Component} from 'react'
//import BookDetails class from the js file BookDetails.
import BookDetails from './BookDetails'
//import propTypes for typechecking.
import {PropTypes} from 'prop-types'
//Class BookShelf.
export default class BooksShelf extends Component {
//Declaration of static propTypes to access them throughout the class.
  static propTypes = {
    //An array of books.
    books: PropTypes.array.isRequired,
    //BookShelf title string.(currentlyReading etc.)
    title: PropTypes.string.isRequired,
    //changeShelf function for the book to change self.
    changeShelf: PropTypes.func.isRequired
  }
//updateBook function takes two parameters book,shelf. It invokes changeShelf.
  updateBook = (book, shelf) => {
    this.props.changeShelf(book, shelf)
  }
  //render draws the page.
  render() {
    //Assign the array of books to variable books.
    //Creates div for bookshelf.
    //Book is mapped to the shelf to which it is supposed to go to..
    const books = this.props.books
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book,id) => (<BookDetails book={book} key={id} onUpdate={(shelf) => {
              this.updateBook(book, shelf)
            }}/>))}
          </ol>
        </div>
      </div>
    )
  }
}
