'use strict';

import React, { Component } from 'react';

import ReactDOM from 'react-dom';

import createHistory from 'history/createBrowserHistory';

import BookDetail from '../components/book_detail.js';

import BaseApp from './base_app.js';

import '../../stylesheets/style.less';

class Book extends BaseApp {
  constructor() {
    super(createHistory());
  }
  render() {
    let node = document.getElementById("app");
    let id = parseInt(node.getAttribute('data-id'));
    ReactDOM.render(<BookDetail id={id} />, node);
  }
  bindBackButton() {
    let backButton = document.getElementById("back-button");
    backButton.addEventListener("click", (evt)=>{
      this.history.goBack();
    });
  }
  initialize(history) {
    this.history = history;
    this.render();
    this.bindBackButton();
  }
}

function __main() {
  new Book();
}

__main();

