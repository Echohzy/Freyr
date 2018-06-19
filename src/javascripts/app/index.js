'use strict';

import BaseApp from './base_app.js';

import React, { Component } from 'react';

import ReactDOM from 'react-dom';

import { Router, Route } from "react-router-dom";

import Home from '../components/home.js';

import PersonalMenu from '../components/personal_menu.js';

import { observable, autorun } from 'mobx';

import createBrowserHistory  from 'history/createBrowserHistory';

import { Provider } from 'mobx-react';

import App from '../components/app.js';

import indexStore from '../stores/index_store';

const history  = createBrowserHistory();

const store = {
  indexStore
};

ReactDOM.render(
  <Provider {...store}>
    <Router  history={history}>
      <App>
        <Route  exact  path="/" component={Home}/>
      </App>
    </Router>
  </Provider>,
  document.getElementById('app')
)




