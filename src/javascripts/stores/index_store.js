import { configure, observable, action } from 'mobx';
import notificationStore from './notification_store';

configure({ enforceActions: true });

import axios from 'axios';

export class IndexStore {
  @observable isRequesting = false;
  @observable text = "indexStore";
  @observable books = [];

  @action
  getBooks(type="hot"){
    console.log(this, this.isRequesting);
    this.isRequesting = true;
    axios.get("/api/books?type="+type)
    .then((res)=>{
      return res.data;
    }).then(this.getBooksSuccess, this.getBooksError)
    .finally(this.getBooksFinally);
  }
  @action.bound
  getBooksSuccess(res){
    this.books = res&&res.data;
  }
  @action.bound
  getBooksError(){
    notificationStore.addNotification("error", "Failed")
  }
  @action.bound
  getBooksFinally(){
    this.isRequesting = false;
  }
}

var indexStore = new IndexStore();
export default indexStore;