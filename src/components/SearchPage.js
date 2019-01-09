//import React and component from react package.
import React, {Component} from 'react'
//import link from react-router-dom package.
import {Link} from 'react-router-dom'
//import BookDetails class from the js file BookDetails.
import BookDetails from './BookDetails'
//import propTypes for typechecking.
import {PropTypes} from 'prop-types'
//import all methods from BooksAPI
import * as BooksAPI from '../BooksAPI'
//class BooksSearch
export default class BooksSearch extends Component {
  state = {
    Books: [],
    query: ''
  }

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    myBooks: PropTypes.array.isRequired
  }
//takes in the query
  handleChange = (event) => {
    var value = event.target.value
    this.setState(() => {
      return {query: value}
    })
    this.bookSearch(value)
  }
//changing book shelves.
  changeBookShelf = (books) => {
    let all_Books = this.props.myBooks
    for (let book of books) {
      book.shelf = "none"
    }

    for (let book of books) {
      for (let b of all_Books) {
        if (b.id === book.id) {
          book.shelf = b.shelf
        }
      }
    }
    return books
  }
//search for books using the query
  bookSearch = (val) => {
    if (val.length !== 0) {
      BooksAPI.search(val, 10).then((books) => {
        if (books.length > 0) {
          books = books.filter((book) => (book.imageLinks))
          books = this.changeBookShelf(books)
          this.setState(() => {
            return {Books: books}
          })
        }
        else{
          this.setState({Books: []})
        }
      })
    } else {
      this.setState({Books: [], query: ''})
    }
  }
//adding search page book to books shelf.
  bookAdd = (book, shelf) => {
    this.props.onChange(book, shelf)
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={this.handleChange}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.query.length > 0 && this.state.Books.map((book,id) => (<BookDetails book={book} key={id} onUpdate={(shelf) => {
              this.bookAdd(book, shelf)
            }}/>))}
          </ol>
        </div>
      </div>
    )
  }
}
