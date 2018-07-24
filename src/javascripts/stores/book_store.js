import { configure, observable, action } from 'mobx';
import axios from 'axios';
require('promise.prototype.finally').shim();

import NotificationStore from './notification_store';

configure({ enforceActions: true });

export class BookStore {
  @observable currentBook = {};
  @observable isRequesting  = true;

  @action
  cleanBook(){
    this.currentBook = {};
  }
  @action
  getBook(id){
    axios.get("/api/books/"+id)
    .then(function(res){
      return res.data;
    }).then(this.getBookSuccess, this.getBookFail)
    .finally(this.requestingFinished)
  }

  @action.bound
  getBookSuccess(res){
    this.currentBook = res.data;
  }

  @action.bound
  getBookFail(error){
    NotificationStore.addNotification('error', "获取失败");
  }

  @action.bound
  requestingFinished(){
    this.isRequesting = false;
  }
}


export default new BookStore();