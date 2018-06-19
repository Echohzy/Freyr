import { configure, observable, action } from 'mobx';
import axios from 'axios';

import NotificationStore from './notification_store';

class AccountStore {
  @observable isRequesting=false;
  @observable currentAccount = {};
  @observable targetAccount = {};


  @action
  getMeInfo(){
    this.isRequesting = true
    axios.get("/api/me")
    .then(function(res){
      return res.data;
    }).then()
  }

  @action.bound
  getMeSuccess(data){
    this.currentAccount = data;
  }

  @action.bound
  getMeFail(){
    NotificationStore.addNotification("error", "获取失败");
  }


  @action 
  getAccountById(id){
    axios.get("/api/accounts/"+id)
    .then(function(res){
      return res.data;
    }).then()
  }

  @action.bound
  receivedAccount(data, type){

  }

  @action.bound

}