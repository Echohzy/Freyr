'use strict';

import React, { Component } from 'react';

import { parseUrl } from '../utils/location.js';

import "../../stylesheets/search.less";

export default class SearchHeader extends Component {
  constructor(props) {
    super(props);
    let query = parseUrl(window.location.href);
    this.state = {
      keyword: query.keyword||''
    }
  }
  inputKeyword(e) {
    if (e.key === "Enter") {
      this.changeSearchUrl();
    }
  }
  changeKeyword(value) {
    this.setState({keyword: value});
  }
  changeSearchUrl() {
    let query = parseUrl(window.location.href), query_arr=[];
    query['keyword'] = encodeURIComponent(this.state.keyword);
    Object.keys(query).map(function(key){
      query_arr.push(key + "=" + query[key]);
    });
    this.props.history.push("/search?" + query_arr.join("&"));
  }
  closePage() {
    this.props.history.goBack();
  }
  render() {
    return (
      <header id="search-header">
        <div className="search-header">
          <input type="text" placeholder="输入书籍或者书评名" value={this.state.keyword} onChange={(e)=>this.changeKeyword(e.target.value)} onKeyDown={(e)=>this.inputKeyword(e)} />
          <div className="close-icon" onClick={()=>this.closePage()}>
            <div className="icon-item horizontal"></div>
            <div className="icon-item vertical"></div>
          </div>
        </div>
      </header>
    );
  }
}