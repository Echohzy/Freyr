import React, { Component } from 'react';

import { observer, inject } from 'mobx-react';

import { withRouter } from 'react-router-dom';

import "../../stylesheets/style.less";

import NotificationBox from '../components/notification_box.js';

@withRouter
@inject('notificationStore')
@observer
class App extends Component {
  render(){
    const { notifications, removeNotification } = this.props.notificationStore;

    return (
      <div>
        {this.props.children}
        <div>
          {
            notifications.map((n)=>{
              return <NotificationBox {...n} key={n.id}/>
            })
          }
        </div>
      </div>
    );
  }
}


export default App;