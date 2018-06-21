import { observable, configure, action } from 'mobx';

import axios from 'axios';

import NotificationStore from './notification_store';

configure({ enforceActions: true });

export class CommentStore {
  @observable currentComments = [];
  @observable isRequesting = false;

  @action
  postComment(params){
    this.isRequesting = true;
    axios({
      url: "/api/comments",
      method: "post",
      data: params
    }).then(function(res){
      return res.data;
    }).then(this.postCommentSuccess, this.postCommentFail)
    .finally(this.requestingFinally);
  }

  @action.bound
  postCommentSuccess(res){
    this.currentComments = [res.data].concat(res.data);
    NotificationStore.addNotification('success', "评论成功");
  }

  @action.bound
  postCommentFail(error){
    NotificationStore.addNotification("error", error.response.data.error);
  }

  @action
  getCommentsByReview(review_id){
    axios.get("/api/comments/reviews/" + review_id).then(function(res){
      return res.data;
    }).then(this.getCommentsSuccess, this.getCommentsFail)
    .finally(this.requestingFinally);
  }

  @action.bound
  getCommentsSuccess(res){
    this.currentComments = res.data;
  }

  @action.bound
  getCommentsFail(){

  }

  @action.bound
  requestingFinally(){
    this.isRequesting = false;
  }
}

export default new CommentStore();