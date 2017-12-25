'use strict';

import React, { Component } from 'react';

export default class InterestList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { data } = this.props;
    return (
      <div className="interest-list">
        {
          data&&data.map((item)=>{
            return (
              <div className="interest-block" key={item.id}>
                <div className="image-wrapper">
                  <img src={item.interest_type==="movie"?item.interest.post + "?imageView2/1/h/80/w/50" : item.interest.cover + "?imageView2/1/h/80/w/50"}/>
                </div>
                <div className="info">
                  <p className="name">
                    <a href={"/"+item.interest_type+"s/" + item.interest.id}>{item.interest_type==="movie" ? item.interest.name: item.interest.title}</a>
                    <span className="type-block">{item.interest.cate}</span>
                    <button className="delete-button">删除</button>
                  </p>
                  <p className="types">{item.interest.types.join("/")}</p>
                  <p className="score">
                  {
                    [1,2,3,4,5].map((num)=>{
                      if (num <= item.interest.user_review_score) {
                        return <i className="fa fa-star" key={num} />
                      } else {
                        return <i className="fa fa-star-o" key={num}/>
                      }
                    })
                  }
                  </p>
                </div>
              </div>);
          })
        }
      </div>
    );
  }
}