'use strict';

import React, { Component } from 'react';

import axios from 'axios';

import "../../stylesheets/review.less";

import { getDateByTimestamp } from '../utils/date.js';

export default class ReviewContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      review: {}
    }
    this.getReviewData();
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
  render() {
    const { review } = this.state;
    return (
      <div className="review-container">
        <div className="cover-block">
          <img src={review.cover}/>
        </div>
        <div className="review-detail">
          <div className="info">
            <i className="date">{"posted " + getDateByTimestamp(review.created_at_timestamp)}</i>
            {
              review.author?<a className="author" href={"/users/" + review.author.id}><img src={review.author.avatar + "?imageView2/1/w/40/h/40"} /></a>:""
            }
          </div>
          <h1 className="title">{review.title}</h1>
          <div className="detail" dangerouslySetInnerHTML={{__html: review.content}}></div>
        </div>
      </div>
    );
  }
}