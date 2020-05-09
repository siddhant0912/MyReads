import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import {Link} from 'react-router-dom'
import Book from './Book'
import PropTypes from 'prop-types'


class Search extends Component {
    static propTypes ={
        books:PropTypes.array.isRequired,
        changeCategory:PropTypes.func.isRequired
    }
    state={
        query:"",
        searchedBooks:[],
        searchError:false
    }
    
    UpdateSearch = async (event) =>{
        const query = event.target.value
        this.setState({query})
        console.log(this.state.searchedBooks.length)

        if(query){
            const sbooks =await BooksAPI.search(query)
            if(sbooks.length > 0 ){
                this.setState({
                    searchedBooks:sbooks,
                    searchError:false
                })
                
            }else{
                this.setState({
                    searchedBooks:[],
                    searchError:true
                })
            }
        }else{
            console.log('Emptying')
           
            this.setState({
                searchedBooks:[],
                searchError:false
            })
            
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
                        <input type="text" placeholder="Search by title or author" value={query} onChange={this.UpdateSearch}/>
                </div>
            </div>
            <div className="search-books-results">
            {searchedBooks.length > 0 &&(
                <div>
                    <h3>{`Hey I found ${searchedBooks.length} Books related to ${query}.....`}</h3>
                    <ol className="books-grid">
                        {searchedBooks.map(book=>(
                            <Book key={book.id} book={book} books={books} changeCategory={changeCategory}/>
                        ))}

                    </ol>
                </div>
                    
            )} 
            {searchError && (
                <h3>{`${query} Not Found. Please try again!`}</h3>
            )}   
            </div>  
          </div>
        )
    }
}

export default Search