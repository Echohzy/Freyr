'use strict';

import React, { Component } from 'react';

export default class SearchList extends Component {
  constructor(props) {
    super(props);
  }
  getSearchItem(item) {
    const { type } = this.props;
    return (
      <div className="search-item" key={item.id}>
        <div className="img-wrapper">
          <img src={item.cate==='book'?item.cover+"?imageView2/1/w/30/h/50":item.post+"?imageView2/1/w/30/h/50"}/>
        </div>
        <div className="item-info">
          <a href={type==="review"?"/reviews/"+item.id:"/books/"+item.id}>{item.title}</a>
          {
            item.cate==="review"?
            <p>{"类型：" + item.types.join("/")}</p>:
            <p>{"作者：" + item.author}</p>
          }
        </div>
      </div>
    );
  }
  render() {
    const { data, result_count } = this.props;
    return (
      <div className="search-list">
        <div className="result-block">{"共找到"+result_count+"个结果"}</div>
        {
          data.map((item)=>{
            return this.getSearchItem(item)
          })
        }
      </div>
    );
  }
}