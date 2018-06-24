import { observable, configure, action } from 'mobx';

import axios from 'axios';
require('promise.prototype.finally').shim();

import NotificationStore from './notification_store';

configure({ enforceActions: true });

const LIKE_MAP = {
  "like": "点赞",
  "dislike": "踩"
};

export class ReviewStore {
  @observable currentReviews = [];
  @observable currentReview = [];
  @observable isRequesting = false;

  @action
  getReviews(book_id){
    axios.get("/api/reviews/books/"+book_id)
    .then(function(res){
      return res.data;
    })
    .then(this.getReviewsSuccess, this.getReviewsFail)
    .finally(this.requestingFinished)
  }

  @action.bound
  getReviewsSuccess(res){
    this.currentReviews = res.data;
  }
  @action.bound
  getReviewsFail(){

  }

  @action
  likeReview(review_id, type){
    this.isRequesting = true;
    axios({
      url: "/api/reviews/" + review_id + "/like",
      method: "post",
      data: {
        type: type
      }
    }).then(function(res){
      return res.data;
    }).then(action((res)=>{
      this.currentReviews = this.currentReviews.map((r)=>{
        if(r.id===review_id){
          return Object.assign({}, r, res.data);
        }
        return r;
      });
      NotificationStore.addNotification("success", LIKE_MAP[type] + "成功")
    }), action((res)=>{
      NotificationStore.addNotification("error", res.response.data.error);
    }) ).finally(this.requestingFinished);
  }

  @action
  getSingleReview(review_id){
    this.isRequesting = true;
    axios.get("/api/reviews/"+review_id)
    .then(function(res){
      return res.data;
    }).then(this.getSingleReviewSuccess, this.getSingleReviewFail)
    .finally(this.requestingFinished);
  }

  @action.bound
  getSingleReviewSuccess(res){
    this.currentReview = res.data;
  }

  @action.bound
  getSingleReviewFail(){

  }
  
  @action
  createNewReview(params){
    this.isRequesting = true;
    return axios({
      url: "/api/reviews",
      method: "post",
      data: params
    }).then(function(res){
      return res.data;
    }).then(this.createNewReviewSuccess, this.createNewReviewFail)
    .finally(this.requestingFinished)
  }

  @action.bound
  createNewReviewSuccess(res){
    this.currentReview = res.data;
    NotificationStore.addNotification('success', '创建成功！');
  }

  @action.bound
  createNewReviewFail(){
    NotificationStore.addNotification('error', '创建失败');
  }

  @action
  updateReview(params){
    this.isRequesting = true;
    return axios({
      url: "/api/reviews/" + params.id,
      method: "put",
      data: params 
    }).then(function(res){
      return res.data;
    }).then(this.updateReviewSuccess, this.updateReviewFail)
    .finally(this.requestingFinished);
  }

  @action.bound
  updateReviewSuccess(res){
    this.currentReview = res.data;
    NotificationStore.addNotification("success", "更新成功！");
  }

  @action.bound
  updateReviewFail(){
    NotificationStore.addNotification('error', "更新失败！");
  }

  @action.bound
  updateReviewFail(){

  }

  @action.bound
  requestingFinished(){
    this.isRequesting = false;
  }
}

export default new ReviewStore();