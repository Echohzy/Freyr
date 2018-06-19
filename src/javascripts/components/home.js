'use strict';

import React, { Component } from 'react';

import Tabs from './tabs.js';

import HomeList from "./home_list.js";

import GeneralHeader from './general_header.js';

const { Item } = Tabs;

import axios from 'axios';

import '../../stylesheets/home.less';

export default class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      activeKey: "books",
    };
  }
  changeActiveKey(activeKey) {
    this.setState({activeKey: activeKey});
  }
  render(){
    return [
      <GeneralHeader key="header"/>,
      <div className="home-container" key="home">
        <Tabs activeKey={this.state.activeKey}>
          <Item itemKey="books" title={<button onClick={()=>this.changeActiveKey("books")}>Book</button>}>
            <HomeList type="books" />
          </Item>
          <Item itemKey="movies" title={<button onClick={()=>this.changeActiveKey("movies")}>Movie</button>}>
            <HomeList type="movies" />
          </Item>
        </Tabs>
      </div>]
    
  }
}