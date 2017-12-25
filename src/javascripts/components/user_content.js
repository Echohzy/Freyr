'use strict';

import React, { Component } from 'react';

import axios from 'axios';

import Tabs from './tabs.js';

const { Item } = Tabs;

import "../../stylesheets/user.less";

export default class UserContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: {},
      activeKey: "books"
    };
  }
  changeActiveKey(activeKey) {
    this.setState({activeKey: activeKey});
  }
  componentDidMount() {
    this.getAccountInfo();
  }
  getAccountInfo() {
    axios.get("/api/accounts/" + this.props.id).then(function(res){
      return res.data;
    }).then((data)=>{
      this.setState({account: data.account});
    });
  }
  render() {
    const { account } = this.state;
    return (
      <div className="user-container">
        <div className="user-info-card" style={{backgroundImage: "url("+account.background+")"}}>
          <div className="avatar-wrapper">
            <img src={account.avatar + "?imageView2/1/h/80/w/80"} />
          </div>
          <p className="nickname">{account.nickname}</p>
        </div>
        <Tabs activeKey={this.state.activeKey}>
          <Item itemKey={"books"} title={<button onClick={()=>this.changeActiveKey("books")}>Books</button>}>
          </Item>
          <Item itemKey={"movies"} title={<button onClick={()=>this.changeActiveKey("movies")}>Movies</button>}>
          </Item>
        </Tabs>
      </div>
    );
  }
}

