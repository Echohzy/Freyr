'use strict';

import React, { Component }  from 'react';

import ReactDOM from 'react-dom';

import BaseApp from "./base_app.js";

import createHistory from 'history/createBrowserHistory';

import SignUp from '../components/sign_up.js';

class SignUpApp extends BaseApp {
  constructor() {
    super(createHistory());
  }
  render() {
    let node = document.getElementById("app");
    ReactDOM.render(<SignUp />, node);
  }
  initialize(history) {
    this.history = history;
    this.render();
  }
}

const __main = function() {
  new SignUpApp();
}

__main();