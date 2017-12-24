import React, { Component } from 'react';

import { getDateByTimestamp } from "../utils/date.js";

import axios from 'axios';

import '../../stylesheets/book.less';

export default class BookDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      book: {},
      reviews: []
    };
  }
  componentDidMount() {
    this.getBookDate();
    this.getBookReviews();
  }
  getBookDate() {
    const { id } = this.props;
    axios.get("/api/books/" + id).then((res)=>{
      return res.data;
    }).then((data)=>{
      this.setState({book: data.book});
    });
  }
  getBookReviews() {
    const { id } = this.props;
    axios.get("/api/books/"+id+"/reviews").then((res)=>{
      return res.data;
    }).then((data)=>{
      this.setState({reviews: data.reviews});
    });
  }
  render() {
    const { book, reviews }  = this.state;

    return (
      <div className="book-detail-container">
        <div className="cover-block">
          <img src={book.cover} />
        </div>
        <div className="book-title">
          <h1>{book.title}</h1>
          <p className="author">{book.author}</p>
          <p className="score">
            {
              [1,2,3,4,5].map((num)=>{
                if(num<=book.score){
                  return <i className="fa fa-star" key={num} />
                } else {
                  return <i className="fa fa-star-o" key={num} />
                }
              })
            }
          </p>
        </div>
        <p className="book-summary">{book.summary + "..."}</p>
        <div className="review-list">
          <h1>热门书评</h1>
          {
           reviews.map((review)=>{
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
                      <span className="date">{getDateByTimestamp(review.created_at_timestamp)}</span>
                    </div>
                    <div className="review-content">
                      <h1>{review.title}</h1>
                      <p className="summary">{review.summary + "..."}</p>
                    </div>
                    <div className="review-action">
                      <span><i className="fa fa-thumbs-up" />{review.like}</span>
                      <span><i className="fa fa-thumbs-o-down" />{review.dislike}</span>
                      <span><i className="fa fa-commenting" />{review.comment_count}</span>
                    </div>
                  </div>
                );
              })
          }
        </div>
      </div>
    );
  }
}