//import React and component from react package.
import React, {Component} from 'react'
//import BooksShelf class from BooksShelf
import BooksShelf from './BooksShelf'
//import link from react-router-dom package.
import {Link} from 'react-router-dom'
import {PropTypes} from 'prop-types'
//class HomePage
export default class HomePage extends Component {
//Declaring the static propTypes
  static propTypes = {
    books: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired
  }
//Organizing books on the shelves by filtering them according to
//currentlyReading etc.
  render() {
    const books = this.props.books

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BooksShelf books={books.filter((book) => (book.shelf === "currentlyReading"))} title="Currently Reading" changeShelf={this.props.onChange}/>
            <BooksShelf books={books.filter((book) => (book.shelf === "read"))} title="Read" changeShelf={this.props.onChange}/>
            <BooksShelf books={books.filter((book) => (book.shelf === "wantToRead"))} title="Want to Read" changeShelf={this.props.onChange}/>
          </div>
        </div>
        <div className="open-search">
          <Link to='/search'>Add a book</Link>
        </div>
      </div>
    )
  }
}
