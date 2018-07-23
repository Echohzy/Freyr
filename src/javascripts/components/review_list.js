'use strict';

import React, { Component } from 'react';

import { Link } from 'react-router-dom';


class ReviewList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { data, own } = this.props;
    return (
      <div className="review-list">
        {
          data && data.map((item)=>{
            return (
              <div className="review-block" key={item.id}>
                <Link to={"/reviews/"+item.id}>{item.title}</Link>
                {own?<button className="delete-button" onClick={()=>this.props.accountStore.deleteUserReview(item.id)}>删除</button>:""}
              </div>
            );
          })
        }
      </div>
    );
  }
}

export default ReviewList;