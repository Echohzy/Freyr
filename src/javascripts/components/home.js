'use strict';

import React, { Component } from 'react';

import Tabs from './tabs.js';

import MovieList from "./movie_list.js";

const { Item } = Tabs;

import axios from 'axios';

import '../../stylesheets/home.less';

export default class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      activeKey: "books",
      movies: []
    };
  }
  componentDidMount(){
    this.fetchMovies();
  }
  fetchMovies() {
    axios.get("/api/hot_movies.json").then((res)=>{
      return res.data;
    }).then((data)=>{
      this.setState({movies: data.movies});
    });
  }
  changeActiveKey(activeKey) {
    this.setState({activeKey: activeKey});
  }
  render(){
    return (
      <div className="home-container">
        <Tabs activeKey={this.state.activeKey}>
          <Item itemKey="books" title={<button onClick={()=>this.changeActiveKey("books")}>Book</button>}>
          </Item>
          <Item itemKey="movies" title={<button onClick={()=>this.changeActiveKey("movies")}>Movie</button>}>
            <MovieList movies={this.state.movies} />
          </Item>
        </Tabs>
      </div>
    );
  }
}