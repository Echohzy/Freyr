'use strict';

import React, { Component } from 'react';

import axios from 'axios';

import "../../stylesheets/review.less";

import { getDateByTimestamp } from '../utils/date.js';

import { observer, inject } from 'mobx-react';

import GeneralHeader from '../components/general_header';

import  CommentInput from '../components/comment_input';


@inject('reviewStore')
@inject('commentStore')
@observer
class Review extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount(){
    const { params } = this.props.match;
    if(params.id){
      this.props.reviewStore.getSingleReview(params.id);
      this.props.commentStore.getCommentsByReview(params.id);
    }
  }
  deleteCommentById(id){
    this.props.commentStore.deleteComment(id);
  }
  render() {
    const { match } = this.props;
    const {currentComments } = this.props.commentStore;
    const { currentReview } = this.props.reviewStore;
    return [
      <GeneralHeader key="header"/>,
      <div className="review-container" key="content">
        <div className="cover-block">
          <img src={currentReview.cover}/>
        </div>
        <div className="review-detail">
          <div className="info">
            <span className="score">
              {
                [1,2,3,4,5].map((num)=>{
                  if (num <= currentReview.score) {
                    return <i className="fa fa-star" key={num} />
                  } else {
                    return <i className="fa fa-star-o" key={num} />
                  }
                })
              }
            </span>
            <span className="middle">&middot;</span>
            <i className="date">
              {"posted " + getDateByTimestamp(currentReview.updatedAt, "YYYY-MM-DD")}
            </i>
            {
              currentReview.author?<a className="author" href={"/users/" + currentReview.author.id}><img src={currentReview.author.avatar + "?imageView2/1/w/40/h/40"} /></a>:""
            }
          </div>
          <h1 className="title">{currentReview.title}</h1>
          <div className="detail" dangerouslySetInnerHTML={{__html: currentReview.content}}></div>
        </div>
        <div className="comment-list">
          <h1>{currentComments.length + "条评论"}</h1>
          {
            currentComments && currentComments.map((comment)=>{
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
                        <li onClick={()=>this.deleteCommentById(comment.id)}>删除</li>
                      </ul>
                    </button>
                    <a className="nickname" href={"/users/" + comment.creator.id}>{comment.creator.username}</a>
                    <p>{comment.content}</p>
                    <span className="date">{getDateByTimestamp(comment.updatedAt)}</span>
                  </div>
                  
                </div>
              );
            })
          }
        </div>
      </div>,
      <CommentInput key="comment" review_id={match.params.id}/>
    ]
  }
}

export default Review;