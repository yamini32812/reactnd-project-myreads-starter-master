import React, {Component} from 'react'
import {Route} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import HomePage from './components/HomePage'
import BooksSearch from './components/SearchPage'
import './App.css'

class BooksApp extends Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then(data => {
      this.setState({
        books: data
      });
    });
  }

  updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      this.bookDetails()
    })
  }

  bookDetails() {
    BooksAPI.getAll().then(data => {
      this.setState({
        books: data
      });
    });
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (<HomePage books={this.state.books} onChange={this.updateShelf}/>)}/>
        <Route exact path="/search" render={({history}) => (<BooksSearch onChange={this.updateShelf} myBooks={this.state.books}/>)}/>
      </div>
    )
  }
}

export default BooksApp
