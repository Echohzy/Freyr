'use strict';

import React, { Component } from 'react';

import axios from 'axios';

import { getDateByTimestamp } from '../utils/date.js';

import "../../stylesheets/notification.less";

export default class NotificationList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications:[]
    }
    this.getNotificationsData();
  }
  getNotificationsData() {
    axios.get("/api/notifications.json").then(function(res){
      return res.data;
    }).then((data)=>{
      this.setState({notifications: data.notifications});
    });
  }
  render() {
    const { notifications } = this.state
    return (
      <div className="notification-list">
        {
          notifications && notifications.map((n)=>{
            return (
              <div className="notification-block" key={n.id}>
                <div className="avatar-wrapper">
                  <img src={n.creator.avatar + "?imageView2/1/w/40/h/40"} />
                </div>
                <div className="info">
                  <button>删除</button>
                  <a className="nickname" href={"/users/"+n.creator.id}>{n.creator.nickname}</a>
                  <p>{n.content}</p>
                  <span className="date">{getDateByTimestamp(n.created_at_timestamp)}</span>
                </div>
              </div>
            );
          })
        }
      </div>
    );
  }
}