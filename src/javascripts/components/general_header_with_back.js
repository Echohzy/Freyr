import React, { Component } from 'react';

export default class GeneralHeaderWithBack extends Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
      <header>
        {this.props.history?<i className="fa fa-angle-left" onClick={()=>this.props.history.goBack()}/>:""}
        <h1>{this.props.title}</h1>
        {this.props.history?<span className="fa"></span>:""}
      </header>
    );
  }
}