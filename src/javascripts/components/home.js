'use strict';

import React, { Component } from 'react';

import Tabs from './tabs.js';

const { Item } = Tabs;

import '../../stylesheets/home.less';

export default class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      activeKey: "books"
    };
  }
  render(){
    return (
      <div className="home-container">
        <Tabs activeKey={this.state.activeKey}>
          <Item itemKey="books" title={<button>Book</button>}>
          </Item>
          <Item itemKey="movies" title={<button>Movie</button>}>
          </Item>
        </Tabs>
      </div>
    );
  }
}