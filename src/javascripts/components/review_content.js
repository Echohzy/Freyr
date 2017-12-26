'use strict';

import React, { Component } from 'react';

import axios from 'axios';

import "../../stylesheets/review.less";

import { getDateByTimestamp } from '../utils/date.js';

export default class ReviewContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      review: {},
      comments: []
    }
    this.getReviewData();
    this.getReviewComments();
  }
  getReviewData() {
    axios.get("/api/reviews/"+this.props.id).then(function(res){
      return res.data;
    }).then((data)=>{
      this.setState({
        review: data.review
      });
    });
  }
  getReviewComments() {
    axios.get("/api/reviews/"+this.props.id+"/comments.json").then(function(res){
      return res.data;
    }).then((data)=>{
      this.setState({comments: data.comments});
    });
  }
  render() {
    const { review, comments } = this.state;
    return (
      <div className="review-container">
        <div className="cover-block">
          <img src={review.cover}/>
        </div>
        <div className="review-detail">
          <div className="info">
            <span className="score">
              {
                [1,2,3,4,5].map((num)=>{
                  if (num <= review.score) {
                    return <i className="fa fa-star" key={num} />
                  } else {
                    return <i className="fa fa-star-o" key={num} />
                  }
                })
              }
            </span>
            <span className="middle">&middot;</span>
            <i className="date">
              {"posted " + getDateByTimestamp(review.created_at_timestamp).slice(0, 10)}
            </i>
            {
              review.author?<a className="author" href={"/users/" + review.author.id}><img src={review.author.avatar + "?imageView2/1/w/40/h/40"} /></a>:""
            }
          </div>
          <h1 className="title">{review.title}</h1>
          <div className="detail" dangerouslySetInnerHTML={{__html: review.content}}></div>
        </div>
        <div className="comment-list">
          <h1>{review.comment_count + "条评论"}</h1>
          {
            comments && comments.map((comment)=>{
              return (
                <div className="comment-block" key={comment.id}>
                  <div className="avatar-wrapper">
                    <img src={comment.creator.avatar + "?imageView2/1/h/40/w/40"} />
                  </div>
                  <div className="comment-info">
                    <button className="menu-button">
                      <i className="fa fa-ellipsis-h" />
                      <ul className="menu">
                        <div className="triangle">
                        </div>
                        <li>删除</li>
                      </ul>
                    </button>
                    <a className="nickname" href={"/users/" + comment.creator.id}>{comment.creator.nickname}</a>
                    <p>{comment.comment}</p>
                    <span className="date">{getDateByTimestamp(comment.created_at_timestamp)}</span>
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