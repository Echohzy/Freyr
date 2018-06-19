import { observable, action, configure } from 'mobx';

configure({ enforceActions: true });


export class NotificationStore { 
  @observable notifications = [];

  @action
  addNotifications(status, mesage){
    this.notifications.push({id: Date.now(), status: status, message: message});
  }
  @action
  removeNotification(id){
    this.notifications = this.notifications.filter((n)=>{
      return id!==n.id
    })
  }
}

export default new NotificationStore();