import { observable, configure, action } from 'mobx';

import axios from 'axios';

import NotificationStore from './notification_store';

configure({ enforceActions: true });

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
  @action.bound
  requestingFinished(){
    this.isRequesting = false;
  }
}

export default new ReviewStore();