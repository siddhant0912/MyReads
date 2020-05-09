import React from 'react'
import Book from './Book'
import PropTypes from 'prop-types'

const BookShelf =(props) =>{
    const {books, changeCategory} = props
    return(
        <ol className="books-grid">
            {books.map(book =>(
                <Book key={book.id} book ={book} books={books} changeCategory={changeCategory}/>
            ))
            }
           </ol>
    )
}

BookShelf.propTypes ={
    books: PropTypes.array.isRequired,
    changeCategory:PropTypes.func.isRequired
}
export default BookShelf