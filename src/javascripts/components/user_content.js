'use strict';

import React, { Component } from 'react';

import axios from 'axios';

import Tabs from './tabs.js';

const { Item } = Tabs;

import InterestList from './interest_list.js';

import CollectionList from './collection_list.js';

import ReviewList from './review_list.js';

import { parseUrl } from '../utils/location.js';

import "../../stylesheets/user.less";

export default class UserContent extends Component {
  constructor(props) {
    super(props);
    let query = parseUrl(location.href);
    this.state = {
      account: {},
      activeKey: query.type || "interestes"
    };
    this.getDataByType(this.state.activeKey);
    this.listenUrl();
  }
  listenUrl() {
    this.unlisten = this.props.history.listen((location, action)=>{
      let query = parseUrl(location.search);
      this.setState({activeKey: query.type});
      if(query.type && !this.state[query.type]) {
        this.getDataByType(query.type);
      }
    });
  }
  changeActiveKey(activeKey) {
    this.props.history.push(location.pathname + "?type=" + activeKey);
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
  getDataByType(type) {
    var url = "/api/accounts/"+this.props.id + "/" + type + ".json";
    axios.get(url).then(function(res){
      return res.data;
    }).then((data)=>{
      this.setState({[type]:data[type]});
    });
  }
  componentWillUnmount() {
    this.unlisten();
  }
  render() {
    const { account, interestes, collections, reviews } = this.state;
    return (
      <div className="user-container">
        <div className="user-info-card" style={{backgroundImage: "url("+account.background+")"}}>
          <div className="avatar-wrapper">
            <img src={account.avatar + "?imageView2/1/h/80/w/80"} />
          </div>
          <p className="nickname">{account.nickname}</p>
        </div>
        <Tabs activeKey={this.state.activeKey}>
          <Item itemKey={"interestes"} title={<button onClick={()=>this.changeActiveKey("interestes")}>Interestes</button>}>
            <InterestList data={interestes} />
          </Item>
          <Item itemKey={"collections"} title={<button onClick={()=>this.changeActiveKey("collections")}>Collections</button>}>
            <CollectionList data={collections} />
          </Item>
          <Item itemKey={"reviews"} title={<button onClick={()=>this.changeActiveKey("reviews")}>Reviews</button>}>
            <ReviewList data={reviews} />
          </Item>
        </Tabs>
      </div>
    );
  }
}

