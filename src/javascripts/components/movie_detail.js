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
      </div>
    );
  }
}