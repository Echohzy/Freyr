import {  observable, configure, action } from 'mobx';

import axios from 'axios';

require('promise.prototype.finally').shim();

import NotificationStore from './notification_store';

configure({ enforceActions: true });

export class CollectionStore {
  @observable currentCollections = [];
  @observable isRequesting = false;

  @action
  addCollection(params){
    this.isRequesting = true;
    return axios({
      url: "/api/collections",
      method: "post",
      data: params
    }).then(function(res){
      return res.data;
    }).then(this.addCollectionSuccess, this.addCollectionFail)
    .finally(this.completeRequest);
  }

  @action.bound
  addCollectionSuccess(data){
    NotificationStore.addNotification('success', '收藏成功');
  }
  @action.bound
  addCollectionFail(error){
    NotificationStore.addNotification('error', '收藏失败');
  }

  @action
  getCollections(params){
    this.isRequesting = true;
    return axios({
      url: "/api/collections",
      method: "get",
      params: params
    }).then(function(res){
      return res.data;
    }).then(this.getCollectionsSuccess, this.getCollectionsFail)
    .finally(this.completeRequest);
  }

  @action.bound
  getCollectionsSuccess(res){
    this.currentCollections = res.data;
  }

  @action.bound
  getCollectionsFail(){
    this.currentCollections = [];
  }

  @action
  deleteCollection(id){
    this.isRequesting = true;
    return axios({
      url: "/api/collections/" + id,
      method: "delete"
    }).then(function(res){
      return id;
    }).then(this.deleteCollectionSuccess, this.deleteCollectionFail)
    .finally(this.completeRequest);
  }

  @action.bound
  deleteCollectionSuccess(id){
    this.currentCollections = this.currentCollections.filter(function(c){
      return c.id!==id;
    });
    NotificationStore.addNotification('success', '删除成功');
  }

  @action.bound
  deleteCollectionFail(){
    NotificationStore.addNotification('error', '删除失败');
  }

  @action.bound
  completeRequest(){
    this.isRequesting = true;
  }
}

export default new CollectionStore();