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
                <img src={item.book.cover + "?imageView2/1/h/40/w/60"}/>
                <Link className="book-title" to={"/books/" + item.book.id}>{item.book.title}</Link>
                {own?<button className="delete-button" onClick={()=>this.props.collectionStore.deleteCollection(item.id)}>删除</button>:""}
              </div>
            );
          })
        }
      </div>
    );
  }
}