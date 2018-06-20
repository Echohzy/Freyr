import { configure, observable, action } from 'mobx';
import axios from 'axios';

import NotificationStore from './notification_store';

configure({ enforceActions: true });

export class AccountStore {
  @observable isRequesting=false;
  @observable currentAccount = {};
  @observable targetAccount = {};


  @action
  getMeInfo(){
    this.isRequesting = true
    axios.get("/api/accounts/me")
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

}

export default new AccountStore();

