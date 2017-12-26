'use strict';

import React, { Component } from 'react';

import ReactDOM from 'react-dom';

import createHistory from 'history/createBrowserHistory';

import BaseApp from './base_app.js';

import NotificationList from '../components/notification_list.js';

class NotificationApp extends BaseApp {
  constructor() {
    super(createHistory());
  }
  bindBackButton() {
    let backButton = document.getElementById("back-button");
    backButton.addEventListener("click", (evt)=>{
      this.history.goBack();
    });
  }
  render() {
    let node = document.getElementById("app");
    ReactDOM.render(<NotificationList />, node);
  }
  initialize(history) {
    this.history = history;
    this.bindBackButton();
    this.render();
  }
}

function __main() {
  new NotificationApp();
}

__main();