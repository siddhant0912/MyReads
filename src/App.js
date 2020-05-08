import React from 'react'
import './App.css'
import Search from './Search'
import BookList from './BookList'
import {Route, Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookInfo  from './BookInfo'


class BooksApp extends React.Component {
  state ={
    books:[]
  }

  componentDidMount =async()=>{
    const res= await BooksAPI.getAll()
    this.setState({
      books:res
    })
  }
  changeCategory = async(newlyadded , shelf) =>{
      const res = await BooksAPI.update(newlyadded,shelf)
      if(res){
        newlyadded.shelf = shelf
        this.setState((oldState)=>({
          books: oldState.books.filter(book =>book.id !== newlyadded.id).concat(newlyadded)
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
         <BookList books={books} changeCategory={this.changeCategory} />  
         <div className="open-search">
          <Link to="/Search"> <button>Add a book</button></Link>
         </div>
         </div>
      )} 
      />   
      <Route path="/Search" render ={()=>(
         <Search books={books} changeCategory={this.changeCategory}/>
      )} 
      />    
       <Route path="/book" render={()=>(

         <div className="list-books">
           <div className="list-books-title">
             <h1>MyReads</h1>
           </div>
               <BookInfo  books={books}  />
               </div>
                )}
              />  
      </div>
    )
  }
}

export default BooksApp
