import { observable, configure, action } from 'mobx';

import axios from 'axios';

import NotificationStore from './notification_store';

configure({ enforceActions: true });

const LIKE_MAP = {
  "like": "点赞",
  "dislike": "踩"
};

export class ReviewStore {
  @observable currentReviews = [];
  @observable isRequesting = true;

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


  @action.bound
  requestingFinished(){
    this.isRequesting = false;
  }
}

export default new ReviewStore();