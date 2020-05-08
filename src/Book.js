import React ,{Component} from 'react'
import Shelfer from './Shelfer'
import PropTypes from 'prop-types'


class Book extends Component{
    static propTypes ={
        book:PropTypes.object.isRequired,
        books:PropTypes.array.isRequired,
        changeShelf:PropTypes.func.isRequired
    }
    render(){
        const {book, books, changeShelf} = this.props

        const CoverImg = book.imageLinks && book.imageLinks.thumbnail ? book.imageLinks.thumbnail :  'noCover'
        const title = book.title ? book.title : 'No Title available'
        return(
            <li>
            <div className="book">
              <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: `url(${CoverImg})`}}></div>
                <Shelfer book={book} books={books} changeShelf={changeShelf}/>
              </div>
              <div className="book-title">{title}</div>
            {book.authors &&(
                book.authors.map((author, index) =>(
                <div className="book-authors" key={index}>{author}</div>
            )))}
            </div>
          </li>
        )
    }
}

export default Book