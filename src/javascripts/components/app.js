import React, { Component } from 'react';

import NotificationBox from './notification_box.js';

export default class App extends Component {
  render(){
    return (
      <div>
        <NotificationBox status="success" text="hahahahahah" />
        {this.props.children}
      </div>
    );
  }
}