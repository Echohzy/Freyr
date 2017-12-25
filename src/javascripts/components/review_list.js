'use strict';

import React, { Component } from 'react';

export default class ReviewList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { data } = this.props;
    return (
      <div className="review-list">
        {
          data && data.map((item)=>{
            return (
              <div className="review-block" key={item.id}>
                <a href={"/reviews/"+item.id}>{item.title}</a>
                <button className="delete-button">删除</button>
              </div>
            );
          })
        }
      </div>
    );
  }
}