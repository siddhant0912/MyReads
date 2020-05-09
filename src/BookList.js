import React, {Component} from 'react'
import BookShelf from './BookShelf'
import PropTypes from 'prop-types'

class BookList extends Component{
    static propTypes ={
        books:PropTypes.array.isRequired,
        changeCategory:PropTypes.func.isRequired
    }
    render(){
        const {books, changeCategory} =this.props
        const shelfs = [
            { type: 'currentlyReading', title: 'Currently Reading' },
            { type: 'wantToRead', title: 'Want to Read' },
            { type: 'read', title: 'Read' },
          ];

        return(
            <div className="list-books-content">
                {shelfs.map((shelf,index) =>{
                    const shelfbooks = books.filter(book => book.shelf === shelf.type)
                    return(
                        <div className="bookshelf" key={index}>
                            <h2 className="bookshelf-title">{`${shelf.title}`}</h2>
                            <div className="bookshelf-books" >
                             <BookShelf  books ={shelfbooks} changeCategory={changeCategory}/>  
                            </div>
                        </div>
                    )
                })

                }
              

            </div>
        )
    }

}

export default BookList