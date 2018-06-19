import React, { Component } from 'react';

import PersonalMenu from './personal_menu';

import { Link } from 'react-router-dom';

export default class GeneralHeader extends Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
      <header>
        <span className="bar-button-wrap">
          <PersonalMenu />
        </span>
        <h1>Freyr</h1>
        <Link to="/search"><i className="fa fa-search" /></Link>
      </header>
    );
  }
}