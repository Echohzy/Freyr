'use strict';

import React, { Component } from  'react';

import axios from 'axios';

import Tabs from './tabs.js';

const { Item } = Tabs;

import { parseUrl } from '../utils/location.js';

import SearchList from './search_list.js';

export default class SearchContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: "books",
      books:[],
      movies: []
    };
  }
  changeActiveKey(activeKey) {
    this.setState({activeKey: activeKey});
  }
  componentDidMount() {
    this.listenUrl();
    var query = parseUrl(location.search);
    if (query.keyword) {
      this.searchData(query.keyword);
    }
  }
  searchData(keyword) {
    axios.get("/api/search?keyword="+keyword).then((res)=>{
      return res.data;
    }).then((data)=>{
      this.setState(data);
    });
  }
  listenUrl() {
    const { history } = this.props;
    this.unlisten = history.listen((location, action)=>{
      let query = parseUrl(location.search);
      this.searchData(query.keyword);
    });
  }
  componentWillUnmount() {
    this.unlisten();
  }
  render() {
    return (
      <div className="search-container">
        <Tabs activeKey={this.state.activeKey}>
          <Item itemKey="books" title={<button onClick={()=>this.changeActiveKey("books")}>Books</button>}>
            <SearchList data={this.state.books} result_count={this.state.books.length}/>
          </Item>
          <Item itemKey="movies" title={<button onClick={()=>this.changeActiveKey("movies")}>Movies</button>}>
            <SearchList data={this.state.movies} result_count={this.state.movies.length}/>
          </Item>
        </Tabs>
      </div>
    );
  }
}