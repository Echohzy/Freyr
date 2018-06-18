'use strict';

import BaseApp from './base_app.js';

import React, { Component } from 'react';

import ReactDOM from 'react-dom';

import { Router, Route } from "react-router-dom";

import Home from '../components/home.js';

import PersonalMenu from '../components/personal_menu.js';

import { observable, autorun } from 'mobx';

import { Provider } from 'mobx-react';

import indexStore from '../stores/index_store';

const store = {
  indexStore
};

ReactDOM.render(
  <Provider {...store}>
    <Router>
      <Route path="/" component={Home}/>
    </Router>
  </Provider>,
  document.getElementById('app')
)




