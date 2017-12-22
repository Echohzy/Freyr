import React, { Component } from 'react';

export default class MovieCard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { data } = this.props;
    return (
      <div className="movie-card card" key={data.id}>
        <img src={data.post + "?imageView2/1/h/150/w/100"} />
        <div className="movie-info">
          <div className="title">
            <a href={"/movies/" + data.id}>{data.name}</a>
            {
              data.tag?
              <span className="tag">{data.tag}</span>:""
            }
            <button>
              <i className="fa fa-ellipsis-h" />
              <ul className="menu">
                <div className="triangle">
                </div>
                <li>收藏</li>
              </ul>
            </button>
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
}