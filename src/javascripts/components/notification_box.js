import React, { Component } from 'react';

import { observer, inject } from 'mobx-react';

const ICON_CLASS = {
  "warning": "fa fa-exclamation-circle",
  "success": "fa fa-check-circle",
  "error": "fa fa-times-circle"
};

import "../../stylesheets/parts/notification_box.less";

@inject('notificationStore')
@observer
class NotificationBox extends Component {
  componentDidMount(){
    setTimeout(()=>{
      this.props.notificationStore.removeNotification(this.props.id);
    }, 3000)
  }
  render(){
    return (
      <div className="notification-box">
        <span className={"notification-text " + this.props.status}>
          <i className={ICON_CLASS[this.props.status]} />
          {this.props.message}
        </span>
      </div>
    );
  }
}

export default NotificationBox;