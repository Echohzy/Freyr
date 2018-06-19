import React, { Component } from 'react';

import "../../stylesheets/style.less";

import NotificationBox from '../components/notification_box.js';

export default class App extends Component {
  render(){
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}