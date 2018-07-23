import React, { Component } from 'react';

import { Link } from 'react-router-dom';

export default class BookCard extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { data } = this.props;
    return (
      <div className="book-card card" data-id={data.id} >
        <img src={data.cover + "?imageView2/1/h/150/w/100"}/>
        <div className="book-info">
          <div className="title">
            <Link to={"/books/" + data.id}>{data.title}</Link>
            <button className="card-button">
              <i className="fa fa-ellipsis-h" />
              <ul className="menu">
                <div className="triangle">
                </div>
                <li onClick={()=>this.props.collectionStore.addCollection({book_id: data.id})}>收藏</li>
              </ul>
            </button>
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