'use strict';

import React, { Component } from  'react';

import axios from 'axios';

import Tabs from '../components/tabs.js';

const { Item } = Tabs;

import { parseUrl } from '../utils/location.js';

import { observer, inject } from 'mobx-react';

import SearchList from '../components/search_list.js';

import SearchHeader from '../components/search_header.js';

@inject('accountStore')
@inject('searchStore')
@observer
class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: "book"
    };
  }
  changeActiveKey(activeKey="book") {
    const { location } = this.props;
    var query = parseUrl(location.search), query_arr=[];
    query.type = activeKey;
    Object.keys(query).map(function(key){
      query_arr.push(key + "=" + query[key]);
    });
    this.props.history.push("/search?"+query_arr.join("&"));
  }
  componentDidMount() {
    var query = parseUrl(location.search);
    this.setState({activeKey: query.type||"book"});
    if(query.keyword){
      this.props.searchStore.getSearchResult({type: query.type||'book', keyword: query.keyword});
    }
  }
  componentWillReceiveProps(nextProps){
    const { location } = this.props;
    const { searchReviews, searchBooks } = nextProps.searchStore;
    if(location.search!==nextProps.location.search){
      var current_query = parseUrl(location.search);
      var query = parseUrl(nextProps.location.search);
      this.setState({activeKey: query.type||"book"});
      if(!query.type||query.type==="book"){
        this.props.searchStore.getSearchResult({type: query.type||"book", keyword: query.keyword});
      } else if(query.type==="review"){
        this.props.searchStore.getSearchResult({type: query.type, keyword: query.keyword});
      }
    }
  }
  render() {
    return [
      <SearchHeader key="search-header" history={this.props.history}/>,
      <div className="search-container" key="search-content">
        <Tabs activeKey={this.state.activeKey}>
          <Item itemKey="book" title={<button onClick={()=>this.changeActiveKey("book")}>Books</button>}>
            <SearchList data={this.props.searchStore.searchBooks} result_count={this.props.searchStore.searchBooks.length}/>
          </Item>
          <Item itemKey="review" title={<button onClick={()=>this.changeActiveKey("review")}>Reviews</button>}>
            <SearchList data={this.props.searchStore.searchReviews} result_count={this.props.searchStore.searchReviews.length}/>
          </Item>
        </Tabs>
      </div>];
  }
}


export default Search;