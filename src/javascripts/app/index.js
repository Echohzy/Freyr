'use strict';

import BaseApp from './base_app.js';

import React, { Component } from 'react';

import ReactDOM from 'react-dom';

import Home from '../components/home.js';

import PersonalMenu from '../components/personal_menu.js';

import { observable, autorun } from 'mobx';

// var numbers = observable([1,2,3]);

// var sum = autorun(()=>console.log(numbers[numbers.length-1]));

// numbers.push(2);


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



