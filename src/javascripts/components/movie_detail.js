import React, { Component } from 'react';

import axios from 'axios';

import '../../stylesheets/movie.less';

export default class MovieDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: {},
      reviews: []
    }
  }
  componentDidMount() {
    this.getMovieData();
    this.getReviews();
  }
  getMovieData() {
    const { id } = this.props;

    axios.get("/api/movies/"+id).then((res)=>{
      return res.data;
    }).then((data)=>{
      this.setState({movie: data.movie});
    })
  }
  getReviews() {
    const { id } = this.props;

    axios.get("/api/movies/" + id + "/reviews").then((res)=>{
      return res.data;
    }).then((data)=>{
      this.setState({reviews: data.reviews});
    });
  }
  getNumber(num) {
    return num < 10 ? "0" + num : num;
  }
  getDate(timestamp) {
    let date = new Date(timestamp*1000);
    let t = {
      day: [],
      time: []
    }
    t.day.push(date.getFullYear());
    t.day.push(this.getNumber(date.getMonth() + 1));
    t.day.push(this.getNumber(date.getDate()));

    t.time.push(this.getNumber(date.getHours()));
    t.time.push(this.getNumber(date.getMinutes()));
    t.time.push(this.getNumber(date.getSeconds()));

    return t.day.join("-") + " " + t.time.join(":");
  }
  render() {
    const { movie, reviews } = this.state;
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
            {
              reviews.map((review)=>{
                return (
                  <div className="review-block" key={review.id}>
                    <div className="review-author">
                      <img src={review.author.avatar + "?imageView2/1/w/30/h/30"} />
                      <span className="nickname">{review.author.nickname}</span>
                      <span className="score">
                        {
                          [1,2,3,4,5].map(function(num){
                            if (num <= review.score) {
                              return <i className="fa fa-star" />
                            } else {
                              return <i className="fa fa-star-o" />
                            }
                          })
                        }
                      </span>
                      <span className="date">{this.getDate(review.created_at_timestamp)}</span>
                    </div>
                    <p className="summary">{review.summary + "..."}</p>
                    <div className="review-action">
                      <span><i className="fa fa-thumbs-up" />{review.like}</span>
                      <span><i className="fa fa-thumbs-o-down" />{review.dislike}</span>
                      <span><i className="fa fa-commenting" />{review.comment_count}</span>
                    </div>
                  </div>
                );
              })
            }
          </div>

        </div>
      </div>
    );
  }
}