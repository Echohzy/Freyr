import React, { Component } from 'react';

import axios from 'axios';

export default class BookList extends Component {
  constructor(props) {
    super(props);
  }
  renderBookCard(data) {
    return (
      <div className="book-card" key={data.id}>
        <img src={data.cover + "?imageView2/1/h/150/w/100"}/>
        <div className="book-info">
          <div className="title">
            <span>{data.title}</span>
            <i className="fa fa-ellipsis-h" />
          </div>
          <p>{"作者：" + data.author}</p>
          <p>{"出版社：" + data.publisher}</p>
          <p>{"ISBN：" +  data.ISBN}</p>
          <p>{"定价：" + data.price}</p>
        </div>
      </div>
    );
  }
  render() {
    return (
      <div className="book-list">
        {
          this.props.books.map((book)=>{
            return this.renderBookCard(book)
          })
        }
      </div>
    );
  }
}