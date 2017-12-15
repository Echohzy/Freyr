'use strict';

import React, { Component } from 'react';

import '../../stylesheets/home.less';

export default class Home extends Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div className="home-container">
        This is home page
      </div>
    );
  }
}