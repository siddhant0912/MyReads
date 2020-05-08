import React, {Component} from 'react'
import Book from './Book'
import PropTypes from 'prop-types'

class BookShelf extends Component{
    static propTypes ={
        books:PropTypes.array.isRequired,
        changeShelf:PropTypes.func.isRequired
    }
    render(){

        const {books, changeShelf} = this.props
        return(
           <ol className="books-grid">
            {books.map(book =>(
                <Book key={book.id} book ={book} books={books} changeShelf={changeShelf}/>
            ))
            }
           </ol>
        )
    }


}

export default BookShelf