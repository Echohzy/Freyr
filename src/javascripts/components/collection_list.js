'use strict';

import React, { Component } from 'react';

export default class CollectionList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { data } = this.props;
    return (
      <div className="collection-list">
        {
          data && data.map((item)=>{
            return (
              <div className="collection-block" key={item.id}>
                <a className="user-link" href={"/users/" + item.collection.author.id}>
                  <img src={item.collection.author.avatar + "?imageView2/1/w/40/h/40"} />
                </a>
                <a className="collection-content" href={"/collections/" + item.collection.id}>{item.collection.title}</a>
                <button className="delete-button">删除</button>
              </div>
            );
          })
        }
      </div>
    );
  }
}