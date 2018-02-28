'use strict';

import React, { Component } from 'react';

import ReactDOM from 'react-dom';

import BaseApp from './base_app.js';

import createHistory from 'history/createBrowserHistory';

import SignIn from '../components/sign_in.js';

class SignInApp extends BaseApp {
  constructor(){
    super(createHistory());
  }
  render() {
    let node = document.getElementById("app");
    ReactDOM.render(<SignIn />, node);
  }
  initialize(history) {
    this.history = history;
    this.render();
  }
}

const __main = function() {
  new SignInApp();
}

__main();