import React, { Component } from 'react';

import BookCard from './book_card.js';

import { observer } from "mobx-react";

import axios from 'axios'

@observer
class HomeList extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    if (this.props.active) {
      this.props.indexStore.getBooks();
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.active && nextProps.active !== this.props.active && !this.props.indexStore.books.length) {
      this.props.indexStore.getBooks();
    } 
  }
  renderLoadingBlock() {
    return (
      <div className="loading-block">
        <svg height="32" width="32" viewBox="0 0 32 32">
          <circle id="circle" cx="16" cy="16" r="14" fill="none"/>  
        </svg>
      </div>
    );
  }
  render() {
    const { type } = this.props;
    return (
      <div className="home-list">
        {
          this.props.indexStore.books.map((data)=>{
            return <BookCard data={data} key={data.id}/>
          })
        }
        {
          this.props.indexStore.isRequesting? this.renderLoadingBlock() : ""
        }
      </div>
    );
  }
}

export default HomeList;