'use strict';

import BaseApp from './base_app.js';

import React, { Component } from 'react';

import ReactDOM from 'react-dom';

import createHistory from 'history/createBrowserHistory'

import MovieDetail from '../components/movie_detail.js';

import '../../stylesheets/style.less';

class MovieApp extends BaseApp {
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
    let node = document.getElementById('app');
    let id = parseInt(node.getAttribute('data-id'));
    ReactDOM.render(<MovieDetail id={id}/>, node);
  }
  initialize(history) {
    this.history = history;
    this.render();
    this.bindBackButton();
  }
}

function __main() {
  new MovieApp();
}

__main();