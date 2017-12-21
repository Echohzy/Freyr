import React, { Component } from 'react';

import axios from 'axios';

import '../../stylesheets/movie.less';

export default class MovieDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: {}
    }
  }
  componentDidMount() {
    this.getMovieData();
  }
  getMovieData() {
    const { id } = this.props;

    axios.get("/api/movies/"+id).then((res)=>{
      return res.data;
    }).then((data)=>{
      this.setState({movie: data.movie});
    })
  }
  render() {
    const { movie } = this.state;
    return (
      <div className="movie-detail-container">
        <div className="post-block">
          <img src={movie.post}/>
          <div className="mask">
          </div>
        </div>
        <div className="movie-content">
          <div className="movie-info">
            <div className="image-wrapper">
              <img src={movie.post + "?imageView2/1/w/100/h/150"} />
            </div>
            <div className="movie-detail">
              <h1>{movie.name}</h1>
              <p>{"导演：" + (movie.directors&&movie.directors.join("/"))}</p>
              <p>{"主演：" + (movie.stars&&movie.stars.join("/"))}</p>
              <p>{"类型：" + (movie.types&&movie.types.join("/"))}</p>
              <p>{"语言：" + (movie.languages&&movie.languages.join("/"))}</p>
              <p>{"片长：" + (movie.durations + "分钟")}</p>
            </div>
          </div>

          <div className="summary"> 
            <h1>简介</h1>
            <p>{movie.summary + "......"}</p>
          </div>

          <div className="review-list">
            <h1>热门影评</h1>
          </div>

        </div>
      </div>
    );
  }
}