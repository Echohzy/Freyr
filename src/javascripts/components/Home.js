'use strict';

import React , { Component } from 'react';

import { Link } from 'react-router-dom';

export default class Home extends Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div className="home-container">
        <h1>This is Home page</h1>
        <Link to="/about">About page</Link>
      </div>
    );
  }
}