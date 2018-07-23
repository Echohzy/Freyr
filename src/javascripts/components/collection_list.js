'use strict';

import React, { Component } from 'react';

import { Link } from 'react-router-dom';

export default class CollectionList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { data, own } = this.props;
    return (
      <div className="collection-list">
        {
          data && data.map((item)=>{
            return (
              <div className="collection-block" key={item.id}>
                <img src={item.cover + "?imageView2/1/h/100/w/80"}/>
                <Link to={"/books/" + item.id}>{item.title}</Link>
                {own?<button className="delete-button">删除</button>:""}
              </div>
            );
          })
        }
      </div>
    );
  }
}