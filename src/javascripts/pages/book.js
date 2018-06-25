import React, { Component } from 'react';

import { getDateByTimestamp } from "../utils/date.js";

import { observer, inject } from 'mobx-react';

import { Link } from 'react-router-dom';

import axios from 'axios';

import GeneralHeader from '../components/general_header';

import '../../stylesheets/book.less';

@inject('reviewStore')
@inject('bookStore')
@observer
class Book extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { params } =  this.props.match;
    if(params&&params.id){
      this.props.bookStore.getBook(params.id);
      this.props.reviewStore.getReviews(params.id);
    }
  }
  likeReview(review_id, type){
    this.props.reviewStore.likeReview(review_id, type);
  }
  render() {
    const { currentBook }  = this.props.bookStore;
    const { currentReviews } = this.props.reviewStore;
    return [
      <GeneralHeader key="header" />,
      <div className="book-detail-container" key="book">
        <div className="cover-block">
          <img src={currentBook.cover} />
        </div>
        <div className="book-title">
          <h1>{currentBook.title}</h1>
          <p className="author">{currentBook.author}</p>
          <p className="score">
            {
              [1,2,3,4,5].map((num)=>{
                if(num<=currentBook.score){
                  return <i className="fa fa-star" key={num} />
                } else {
                  return <i className="fa fa-star-o" key={num} />
                }
              })
            }
          </p>
        </div>
        <p className="book-summary">{currentBook.summary + "..."}</p>
        <div className="review-list">
          <h1>热门书评</h1>
          {
           currentReviews&&currentReviews.map((review)=>{
                return (
                  <div className="review-block" key={review.id}>
                    <div className="review-author">
                      <img src={review.author.avatar + "?imageView2/1/w/30/h/30"} />
                      <span className="nickname">{review.author.nickname}</span>
                      <span className="score">
                        {
                          [1,2,3,4,5].map(function(num){
                            if (num <= review.score) {
                              return <i className="fa fa-star" key={num}/>
                            } else {
                              return <i className="fa fa-star-o" key={num}/>
                            }
                          })
                        }
                      </span>
                      <span className="date">{getDateByTimestamp(review.updatedAt)}</span>
                    </div>
                    <div className="review-content">
                      <Link to={"/reviews/" + review.id}><h1>{review.title}</h1></Link>
                      <p className="summary">{ review.content ? review.content.slice(0,60) + "..." : ""}</p>
                    </div>
                  </div>
                );
              })
          }
        </div>
      </div>,
      <div className="add-review">
      </div>]
  }
}


export default Book;