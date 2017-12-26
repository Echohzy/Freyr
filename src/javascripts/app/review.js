'use strict';

import React, { Component } from 'react';

import ReactDOM from 'react-dom';

import BaseApp from './base_app.js';

import createHistory from 'history/createBrowserHistory';

import ReviewContent from '../components/review_content.js';


class ReviewApp extends BaseApp {
  constructor(){
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
    let id = node.getAttribute("data-id");
    ReactDOM.render(<ReviewContent id={id} history={this.history}/>, node);
  }
  initialize(history) {
    this.history = history;
    this.bindBackButton();
    this.render();
  }
}

function __main() {
  new ReviewApp();
}

__main();


