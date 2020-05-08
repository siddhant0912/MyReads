import React from 'react'
import './App.css'
import Search from './Search'
import BookList from './BookList'
import {Route, Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'


class BooksApp extends React.Component {
  state ={
    books:[]
  }

  componentDidMount =async()=>{
    const res= await BooksAPI.getAll()
    this.setState({
      books:res
    })
    console.log(res)
  }
  changeShelf = async(changedbook , shelf) =>{
      const res = await BooksAPI.update(changedbook,shelf)
      if(res){
        changedbook.shelf = shelf
        this.setState((prevState)=>({
          books: prevState.books.filter(book =>book.id !== changedbook.id).concat(changedbook)
        }))
      }
  }

  render() {
    const {books} = this.state
    return (
      <div className="app"> 
      <Route exact path="/" render ={()=>(
           <div className="list-books">
           <div className="list-books-title">
             <h1>MyReads</h1>
           </div>
         <BookList books={books} changeShelf={this.changeShelf} />  
         <div className="open-search">
          <Link to="/Search"> <button>Add a book</button></Link>
         </div>
         </div>
      )} 
      />   
      <Route path="/Search" render ={()=>(
         <Search books={books} changeShelf={this.changeShelf}/>
      )} 
      />
        
      </div>
    )
  }
}

export default BooksApp
