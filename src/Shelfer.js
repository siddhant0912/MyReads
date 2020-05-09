import React, {Component} from 'react'
import PropTypes from 'prop-types'

class Shelfer extends Component{
    static propTypes ={
        book:PropTypes.object.isRequired,
        books:PropTypes.array.isRequired,
    }
    updateShelf = event =>{
        this.props.changeShelf(this.props.book , event.target.value)
        console.log(this.props.book)

    }
render(){
    const {books ,book} =  this.props
    var currentShelf = 'none'
    for(var item of books){
        if(item.id === book.id){
            currentShelf =item.shelf 
            break
        }   
    }
    return(
        <div className="book-shelf-changer">
        <select onChange={this.updateShelf} defaultValue={currentShelf}>
          <option disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    )
    }
}

export default Shelfer