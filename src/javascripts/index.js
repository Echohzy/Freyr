'use strict';


import React, { Component } from 'react';

import ReactDOM from 'react-dom';

import { Router, Route } from "react-router-dom";


import { observable, autorun } from 'mobx';

import createBrowserHistory  from 'history/createBrowserHistory';

import { Provider } from 'mobx-react';

import App from './pages/app.js';

import Home from './pages/home.js';
import Search from './pages/search.js';
import Review from './pages/review.js';
import User from './pages/user.js';
import Notification from './pages/notification.js';
import Editor from './pages/editor.js';
import Book from './pages/book.js';
import SignIn from './pages/sign_in';

import indexStore from './stores/index_store';
import notificationStore from './stores/notification_store';
import accountStore from './stores/account_store';
import bookStore from './stores/book_store';
import reviewStore from './stores/review_store';
import commentStore from './stores/comment_store';

const history  = createBrowserHistory();

const store = {
  indexStore,
  notificationStore,
  accountStore,
  bookStore,
  reviewStore,
  commentStore
};

ReactDOM.render(
  <Provider {...store}>
    <Router  history={history}>
      <App>
        <Route  exact  path="/" component={Home}/>
        <Route path="/search" component={Search}/>
        <Route path="/books/:id" component={Book}/>
        <Route path="/reviews/:id/draft" component={Editor} />
        <Route path="/reviews/new" component={Editor} />
        <Route path="/reviews/:id" component={Review} />
        <Route path="/users/:id" component={User} />
        <Route path="/notifications" component={Notification}/>
        <Route path="/sign_in" component={SignIn}/>
      </App>
    </Router>
  </Provider>,
  document.getElementById('app')
)




