'use strict';

import React, { Component } from 'react';

import ReactDOM from 'react-dom';

import BaseApp from "./base_app.js";

import SearchHeader from '../components/search_header.js';

import SearchContent from '../components/search_content.js';

import createHistory from 'history/createBrowserHistory';

class SearchApp extends BaseApp {
  constructor() {
    super(createHistory());
  }
  render() {
    ReactDOM.render(<SearchHeader history={this.history} />, document.getElementById("search-header"));
    ReactDOM.render(<SearchContent history={this.history} />, document.getElementById("app"));
  }
  initialize(history) {
    this.history = history;
    this.render();
  }
}

function __main() {
  new SearchApp();
}

__main();
