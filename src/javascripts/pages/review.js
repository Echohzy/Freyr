'use strict';

import React, { Component } from 'react';

import axios from 'axios';

import "../../stylesheets/review.less";

import { getDateByTimestamp } from '../utils/date.js';

import { observer, inject } from 'mobx-react';

import GeneralHeaderWithBack from '../components/general_header_with_back';

import  CommentInput from '../components/comment_input';

@inject('accountStore')
@inject('reviewStore')
@inject('commentStore')
@observer
class Review extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount(){
    const { params } = this.props.match;
    this.deleteReviewSuccess = this.deleteReviewSuccess.bind(this);
    if(params.id){
      this.props.reviewStore.getSingleReview(params.id);
      this.props.commentStore.getCommentsByReview(params.id);
    }
  }
  likeReview(review_id, type){
    this.props.reviewStore.likeReview(review_id, type);
  }
  turnToEditPage(){
    const { currentReview } = this.props.reviewStore;
    this.props.history.push("/reviews/" + currentReview.id + "/edit");
  }
  deleteReview(){
    this.props.reviewStore.deleteReview(this.props.reviewStore.currentReview.id, this.deleteReviewSuccess);
  }
  deleteReviewSuccess(){
    this.props.history.replace("/books/" + this.props.reviewStore.currentReview.book.id);
  }
  deleteCommentById(id){
    this.props.commentStore.deleteComment(id);
  }
  render() {
    const { match } = this.props;
    const {currentComments } = this.props.commentStore;
    const { currentReview } = this.props.reviewStore;
    const { currentAccount } = this.props.accountStore;
    return [
      <GeneralHeaderWithBack key="header" title="Review" history={this.props.history}/>,
      <div className="review-container" key="content">
        <div className="cover-block">
          <img src={currentReview.cover}/>
        </div>
        <div className="review-detail">
          <h1 className="title">{currentReview.title}</h1>
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
            
            {
              currentReview.author?<a className="author" href={"/users/" + currentReview.author.id}><img src={currentReview.author.avatar + "?imageView2/1/w/40/h/40"} /></a>:""
            }
          </div>
          <div className="detail" dangerouslySetInnerHTML={{__html: currentReview.content}}></div>
          <div className="action">
            <i className="date">
              {getDateByTimestamp(currentReview.updatedAt, "YYYY-MM-DD")}
            </i>
            {currentReview.author&&currentAccount.id==currentReview.author.id?<i className="fa fa-trash" onClick={()=>this.deleteReview()}/>:""}
            {currentReview.author&&currentAccount.id==currentReview.author.id?<i className="fa fa-pencil" onClick={()=>this.turnToEditPage()}/>:""}
            <i className="fa fa-thumbs-o-down" onClick={()=>this.likeReview(currentReview.id, "dislike")}>{currentReview.dislike}</i>
            <i className="fa fa-thumbs-up" onClick={()=>this.likeReview(currentReview.id, "like")}>{currentReview.like}</i>
          </div>
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