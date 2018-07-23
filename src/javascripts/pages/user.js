'use strict';

import React, { Component } from 'react';

import axios from 'axios';

import Tabs from '../components/tabs.js';

const { Item } = Tabs;

import ReviewList from '../components/review_list.js';

import CollectionList from '../components/collection_list.js';

import GeneralHeader from '../components/general_header.js';

import { parseUrl } from '../utils/location.js';

import { observer, inject } from 'mobx-react';

import "../../stylesheets/user.less";

@inject("collectionStore")
@inject("accountStore")
@observer
class User extends Component {
  constructor(props) {
    super(props);
    let query = parseUrl(location.href);
    this.state = {
      activeKey: query.type || "reviews"
    };
  }
  componentDidMount() {
    const { match } = this.props;
    this.props.accountStore.getAccountById(match.params.id);
    this.props.accountStore.getReviewsByAccountId(match.params.id);
    this.props.collectionStore.getCollections({user_id: match.params.id});
  }
  changeActiveKey(key){
    this.setState({activeKey: key});
  }
  render() {
    const { targetAccount, targetAccountReviews, currentAccount } = this.props.accountStore;
    const { currentCollections } = this.props.collectionStore;
    return [
      <GeneralHeader key="header"/>,
      <div className="user-container" key="user">
        <div className="user-info-card" style={{backgroundImage: "url("+targetAccount.background+")"}}>
          <div className="avatar-wrapper">
            <img src={targetAccount.avatar + "?imageView2/1/h/80/w/80"} />
          </div>
          <p className="nickname">{targetAccount.nickname}</p>
        </div>
        <Tabs activeKey={this.state.activeKey}>
          <Item itemKey={"reviews"} title={<button onClick={()=>this.changeActiveKey("reviews")}>Reviews</button>}>
            <ReviewList
              data={targetAccountReviews}
              own={currentAccount.id===targetAccount.id}
              accountStore={this.props.accountStore}/>
          </Item>
          <Item itemKey={"collections"} title={<button onClick={()=>this.changeActiveKey("collections")}>Collections</button>}>
            <CollectionList
              data={currentCollections}
              own={currentAccount.id===targetAccount.id}
              collectionStore={this.props.collectionStore}/>
          </Item>
        </Tabs>
      </div>]
  }
}

export default User;

