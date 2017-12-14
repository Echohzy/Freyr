'use strict';

import React, { Component } from 'react';

import { Link } from 'react-router-dom';

export default class About extends Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div className="about-container">
        <h1>This is About page</h1>
        <Link to="/">Back to home page.</Link>
      </div>
    );
  }
}