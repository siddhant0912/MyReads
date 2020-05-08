import React ,{Component} from 'react'
import * as BooksAPI from './BooksAPI'


class BookInfo extends Component{
    state ={
        book :{}
    }


componentDidMount = async() =>{
    const bookid =window.location.pathname.slice(6)
    const res = await BooksAPI.get(bookid)
    if(res){
        this.setState({
            book:res
        })
        console.log(res)
    }
}

render(){
    const {book} = this.state
    const CoverImg = book.imageLinks && book.imageLinks.thumbnail ? book.imageLinks.thumbnail :  'noCover'
    const category = book.categories ? book.categories : 'Not Provided'
    const link =  book.infoLink ? book.infoLink : 'No link Provided'
    const Rating = book.averageRating ? `${book.averageRating}/5` : 'Not Provided'
    const Publsiher = book.publisher ? book.publisher : 'Not Provided'
    const PublishDate = book.publishedDate ? book.publishedDate : 'Not Provided'
    const PageCount = book.pageCount ? book.pageCount : 'Not Provided'
   
       
   
    return(
        <div className="book-main">
            <div className="book-top-main">
                <div className="book-cover-live" style={{ width: 128, height: 188, backgroundImage: `url(${CoverImg})`}}></div>
                <div className="book-title-main">{`Title : ${book.title}`}</div>
            {book.authors &&(
                book.authors.map((author, index) =>(
                <div className="book-authors-main" key={index}>{`Author: ${author}`}</div>
               
            )))}
              <div className="book-authors-main">{`Category : ${category}`}</div>
                <div className="book-authors-main">{`PageCount : ${PageCount}`}</div>
                <div className="book-authors-main">{`Rating:  ${Rating}`}</div>
                <div className="book-authors-main">{`Published At: ${PublishDate}`}</div>
                <div className="book-authors-main">{`Published By: ${Publsiher}`}</div>
                {book.infoLink &&(
                    <a className="info-link" href={link}  target="blank">Click Here for more info</a>
                )}
    
                

            </div>
              
            </div>
    )
    
}
    
}
export default BookInfo