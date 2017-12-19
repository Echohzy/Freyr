import React, { Component } from 'react';

import BookCard from './book_card.js';

import MovieCard from './movie_card.js';

import axios from 'axios'

export default class HomeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      requesting: false
    }
  }
  componentDidMount() {
    this.getData();
  }
  getData() {
    if (this.state.requesting) {
      return;
    }
    const { type } = this.props;
    this.setState({ requesting: true });
    axios.get("/api/hot_" + type + ".json").then((res)=>{
      return res.data;
    }).then((data)=>{
      this.setState({requesting: false, data: data[type]});
    });
  }
  render() {
    const { type } = this.props;
    let Tmp = BookCard;
    if (type === "movies") {
      Tmp = MovieCard;
    }
    return (
      <div className="home-list">
        {
          this.state.data.map((data)=>{
            return <Tmp data={data} key={data.id}/>
          })
        }
      </div>
    );
  }
}