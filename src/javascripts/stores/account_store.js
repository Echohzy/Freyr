import { configure, observable, action } from 'mobx';
import axios from 'axios';
require('promise.prototype.finally').shim();

import NotificationStore from './notification_store';

configure({ enforceActions: true });

export class AccountStore {
  @observable isRequesting=false;
  @observable currentAccount = {};
  @observable targetAccount = {};
  @observable targetAccountReviews = [];


  @action
  getMeInfo(){
    this.isRequesting = true
    var test = axios.get("/api/accounts/me")
    .then(function(res){
      return res.data;
    }).then(this.getMeSuccess, this.getAccountFail)
    .finally(this.requestingFinished)
  }

  @action.bound
  getMeSuccess(data){
    this.currentAccount = data.account;
  }

  @action 
  getAccountById(id){
    axios.get("/api/accounts/"+id)
    .then(function(res){
      return res.data;
    }).then(this.getTargetAccount, this.getAccountFail)
    .finally(this.requestingFinished)
  }

  @action
  getReviewsByAccountId(id){
    axios.get("/api/reviews/users/" + id)
    .then(function(res){
      return res.data;
    }).then(this.getReviewsByAccountIdSuccess);
  }

  @action.bound
  getReviewsByAccountIdSuccess(res){
    this.targetAccountReviews = res.data;
  }

  @action.bound
  getTargetAccount(data){
    this.targetAccount = data.account;
  }

  @action.bound
  requestingFinished(){
    this.isRequesting = false;
  }

  @action.bound
  getAccountFail(){
    NotificationStore.addNotification("error", "获取失败");
  }

  @action
  signIn(data, successCallback, failCallback){
    this.isRequesting = true;
    axios({
      method: "post",
      url: "/api/accounts/login",
      data: data
    }).then(function(res){
      return res.data;
    }).then(action((data)=>{
      this.currentAccount = data.user;
      NotificationStore.addNotification("success", "登陆成功");
      successCallback&&successCallback();
    }), action((error)=>{
      NotificationStore.addNotification("error", "登陆失败");
      failCallback&&failCallback(error)
    })).finally(this.requestingFinished);
  }


  @action
  deleteUserReview(id){
    this.isRequesting = true;
    axios({
      method: "delete",
      url: "/api/reviews/" + id, 
    }).then(action(()=>{
      NotificationStore.addNotification("success", "删除成功");
      this.targetAccountReviews = this.targetAccountReviews.filter(function(review){
        return review.id != id;
      });
    })).finally(this.requestingFinished)
  }


  @action
  updateUserInfo(params){
    this.isRequesting = true;
    axios({
      url: "/api/accounts/me",
      method: "put",
      data: params
    }).then(this.updateUserInfoSuccess, this.updateUserInfoFail)
    .finally(this.requestingFinished);
  }

  @action.bound
  updateUserInfoSuccess(currentAccount){
    NotificationStore.addNotification("success", "更新成功");
    this.currentAccount = currentAccount;
  }

  @action.bound
  updateUserInfoFail(){
    NotificationStore.addNotification("error", "更新失败");
  }
}

export default new AccountStore();

