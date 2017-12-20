'use strict';

import BaseApp from './base_app.js';

import React, { Component } from 'react';

import ReactDOM from 'react-dom';

import Home from '../components/home.js';

import '../../stylesheets/style.less';

class IndexApp extends BaseApp {
  constructor(node) {
    super(node);
  }
  initialize(node) {
    ReactDOM.render(<Home />, node);
  }
}

function __main() {
  new IndexApp(document.getElementById('app'));
}

__main();
