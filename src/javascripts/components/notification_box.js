import React, { Component } from 'react';

const ICON_CLASS = {
  "warning": "fa fa-exclamation-circle",
  "success": "fa fa-check-circle",
  "error": "fa fa-times-circle"
};

import "../../stylesheets/parts/notification_box.less";

export default class NotificationBox extends Component {
  render(){
    return (
      <div className="notification-box">
        <span className={"notification-text " + this.props.status}>
          <i className={ICON_CLASS[this.props.status]} />
          {this.props.text}
        </span>
      </div>
    );
  }
}