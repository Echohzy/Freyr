import React, { Component } from 'react';

export default class BookCard extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { data } = this.props;
    return (
      <div className="book-card card" key={data.id}>
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
}