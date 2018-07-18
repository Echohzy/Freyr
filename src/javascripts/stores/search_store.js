import { observable, configure, action } from 'mobx';

import axios from 'axios';
require('promise.prototype.finally').shim();

import NotificationStore from './notification_store';

configure({ enforceActions: true });

export class SearchStore {
  @observable searchBooks=[];
  @observable searchReviews = [];
  @observable requesting = false;

  @action
  getSearchResult(params){
    return axios({
      url: "/api/search",
      method: "get",
      params: params
    }).then(function(res){
      return res.data;
    }).then(action((res)=>{
      if(!params.type || params.type==="book"){
        this.searchBooks = res.data;
      } else if(params.type==="review"){
        this.searchReviews = res.data;
      }
    }))
  }

}

export default new SearchStore();