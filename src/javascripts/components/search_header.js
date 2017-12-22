'use strict';

import React, { Component } from 'react';

import { parseUrl } from '../utils/location.js';

import "../../stylesheets/search.less";

export default class SearchHeader extends Component {
  constructor(props) {
    super(props);
    let query = parseUrl(window.location.href);
    this.state = {
      keyword: query.keyword
    }
  }
  closePage() {
    this.props.history.goBack();
  }
  render() {
    return (
      <div className="search-header">
        <input type="text" placeholder="输入书籍或者电影名" />
        <div className="close-icon" onClick={()=>this.closePage()}>
          <div className="icon-item horizontal"></div>
          <div className="icon-item vertical"></div>
        </div>
      </div>
    );
  }
}