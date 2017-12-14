'use strict';

import React, { Component } from 'react';

import ReactDOM from 'react-dom';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './components/Home.js';

import About from './components/About.js';

import '../stylesheets/style.less';

ReactDOM.render(
  <Router>
    <div className="container">
      <Route exact  path="/" component={Home} />
      <Route path="/about" component={About} />
    </div>
  </Router>, document.getElementById('app'));