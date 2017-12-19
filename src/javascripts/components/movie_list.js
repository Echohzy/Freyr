import React, { Component } from 'react';

export default class MovieList extends Component {
  constructor(props) {
    super(props);
  }
  renderMovieCard(data) {
    return (
      <div className="movie-card" key={data.id}>
        <img src={data.post + "?imageView2/1/h/150/w/100"} />
        <div className="movie-info">
          <div className="title">
            <span>{data.name}</span>
            {
              data.tag?
              <span className="tag">{data.tag}</span>:""
            }
            <i className="fa fa-ellipsis-h" />
          </div>
          <div className="types">
            {data.types.join("/")}
          </div>
          <div className="date">
            {data.date}
          </div>
          <div className="review">
            <div className="review-score-block">
              <p>用户影评</p>
              <p>{
                [1,2,3,4,5].map((num)=>{
                  if(num<=data.user_review_score){
                    return <i className="fa fa-star" key={num}/>
                  } else {
                    return <i className="fa fa-star-o" key={num}/>
                  }
                })
              }</p>
            </div>
            <div className="review-score-block">
              <p>专业影评</p>
              <p>
                {
                  [1,2,3,4,5].map((num)=>{
                    if (num <= data.professional_review_score) {
                      return <i className="fa fa-star" key={num} />
                    } else {
                      return <i className="fa fa-star-o" key={num} />
                    }
                  })
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  render() {
    return (
      <div className="movie-list">
        {
          this.props.movies.map((movie)=>{
            return this.renderMovieCard(movie)
          })
        }
      </div>
    );
  }
}