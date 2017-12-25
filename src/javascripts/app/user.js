'use strict';

import React, { Component }  from 'react';

import ReactDOM from 'react-dom';

import BaseApp from "./base_app.js";

import createHistory from 'history/createBrowserHistory';

import UserContent from '../components/user_content.js';


class UserApp extends BaseApp {
  constructor() {
    super(createHistory());
  }
  render() {
    let node = document.getElementById("app");
    let user_id = node.getAttribute("data-id");
    ReactDOM.render(<UserContent id={user_id} history={this.history}/>, node);
  }
  initialize(history) {
    this.history = history;
    this.render();
  }
}

const __main = function() {
  new UserApp();
}

__main();