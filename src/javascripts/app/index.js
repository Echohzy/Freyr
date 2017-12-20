'use strict';

import BaseApp from './base_app.js';

import React, { Component } from 'react';

import ReactDOM from 'react-dom';

import Home from '../components/home.js';

import PersonalMenu from '../components/personal_menu.js';

import '../../stylesheets/style.less';

class IndexApp extends BaseApp {
  constructor() {
    super();
  }
  render() {
    ReactDOM.render(<Home />, document.getElementById('app'));
    ReactDOM.render(<PersonalMenu />, document.querySelector(".bar-button-wrap"));
  }
  initialize() {
    this.render();
  }
}

function __main() {
  new IndexApp();
}

__main();



