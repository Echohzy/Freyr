'use strict';

import React, { Component } from 'react';

import axios from 'axios';

import Tabs from '../components/tabs.js';

const { Item } = Tabs;

import InterestList from '../components/interest_list.js';

import CollectionList from '../components/collection_list.js';

import ReviewList from '../components/review_list.js';

import { parseUrl } from '../utils/location.js';

import { observer, inject } from 'mobx-react';

import "../../stylesheets/user.less";


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
  }
  render() {
    const { targetAccount, targetAccountReviews } = this.props.accountStore;
    return (
      <div className="user-container">
        <div className="user-info-card" style={{backgroundImage: "url("+targetAccount.background+")"}}>
          <div className="avatar-wrapper">
            <img src={targetAccount.avatar + "?imageView2/1/h/80/w/80"} />
          </div>
          <p className="nickname">{targetAccount.nickname}</p>
        </div>
        <Tabs activeKey={this.state.activeKey}>
          <Item itemKey={"reviews"} title={<button >Reviews</button>}>
            <ReviewList data={targetAccountReviews} />
          </Item>
        </Tabs>
      </div>
    );
  }
}

export default User;

