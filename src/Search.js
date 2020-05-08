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
        searchedBooks:[],
        searchError:false
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
                        searchError:true
                    })
                )
            }else{
                this.setState({
                    searchedBooks:sbooks,
                    searchError:false
                })
            }
        }else{
            return(
                this.setState({
                    searchError:true
                })
            )
        }
    }
    render() {
        const {query ,searchedBooks, searchError} = this.state
        const {books,changeCategory} = this.props
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/"><button className="close-search">Close</button></Link> 
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" value={query} onChange={(event)=> this.UpdateSearch(event.target.value)}/>
                </div>
            </div>
            <div className="search-books-results">
            {searchedBooks.length > 0 &&(
                <div>
                    <p>{`Search Returned ${searchedBooks.length} Books`}</p>
                    <ol className="books-grid">
                        {searchedBooks.map(book=>(
                            <Book key={book.id} book={book} books={books} changeCategory={changeCategory}/>
                        ))}

                    </ol>
                </div>
                    
            )} 
            {searchError && (
                <h3>{`${query}not Found. Please try again!`}</h3>
            )}   
            </div>  
          </div>
        )
    }
}

export default Search