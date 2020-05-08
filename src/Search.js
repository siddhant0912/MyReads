import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import {Link} from 'react-router-dom'
import Book from './Book'
import PropTypes from 'prop-types'


class Search extends Component {
    static propTypes ={
        books:PropTypes.array.isRequired,
        changeShelf:PropTypes.func.isRequired
    }
    state={
        query:"",
        newBooks:[],
        searchErr:false
    }
    UpdateSearch = async (query) =>{
        this.setState(()=>({
            query:query.trim()
        }))
        if(query !== ''){
            const sbooks =await BooksAPI.search(query)
            if(sbooks.error){
                return(
                    this.setState({
                        searchErr:true
                    })
                )
            }else{
                this.setState({
                    newBooks:sbooks,
                    searchErr:false
                })
            }
        }else{
            return(
                this.setState({
                    searchErr:true
                })
            )
        }
    }
    render() {
        const {query ,newBooks, searchErr} = this.state
        const {books,changeShelf} = this.props
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/"><button className="close-search">Close</button></Link> 
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" value={query} onChange={(event)=> this.UpdateSearch(event.target.value)}/>
                </div>
            </div>
            <div className="search-books-results">
            {newBooks.length > 0 &&(
                <div>
                    <p>{`Search Returned ${newBooks.length} Books`}</p>
                    <ol className="books-grid">
                        {newBooks.map(book=>(
                            <Book key={book.id} book={book} books={books} changeShelf={changeShelf}/>
                        ))}

                    </ol>
                </div>
                    
            )} 
            {searchErr && (
                <h3>{`${query}not Found. Please try again!`}</h3>
            )}   
            </div>  
          </div>
        )
    }
}

export default Search