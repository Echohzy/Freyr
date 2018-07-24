'use strict';

import React, { Component } from 'react';

import { observer, inject } from 'mobx-react';

import { parseUrl } from '../utils/location';

import GeneralHeaderWithBack from '../components/general_header_with_back';

import "../../stylesheets/editor.less";

@inject('notificationStore')
@inject('reviewStore')
@observer
class Editor extends Component {
  constructor(props){
    super(props);
    this.state = {
      content: "",
      title: "",
      score: 0,
      cover: ""
    };
  }
  componentDidMount(){
    const { match } = this.props;
    if(match&&match.params.id){
      this.props.reviewStore.getSingleReview(match.params.id).then(()=>{
        const { currentReview } = this.props.reviewStore;
        this.setState({content: currentReview.content, title: currentReview.content, score: currentReview.score, cover: currentReview.cover||"" });
      })
    }
  }
  onStateChange(key, value){
    this.setState({ [key] : value });
  }
  onSubmitReview(){
    var query = parseUrl(window.location.href);
    const { currentReview } =  this.props.reviewStore;
    if(this.props.reviewStore.isRequesting){
      return;
    }
    if(!this.state.content){
      this.props.notificationStore.addNotification("error", "内容不能为空");
      return;
    }
    if(!this.state.title) {
      this.props.notificationStore.addNotification('error', "标题不能为空");
      return;
    }
    if(!this.state.score) {
      this.props.notificationStore.addNotification('error', "您还未评分");
      return;
    }
    if(currentReview.id){
      this.props.reviewStore.updateReview({ id: currentReview.id, title: this.state.title, content: this.state.content,score: this.state.score, cover: this.state.cover, book_id: currentReview.book&&currentReview.book.id}).then(()=>{
        this.props.history.push("/reviews/"+this.props.reviewStore.currentReview.id);
      });
    } else {
      this.props.reviewStore.createNewReview({book_id: query&&query.book_id, title: this.state.title, content: this.state.content, score: this.state.score, cover: this.state.cover}).then(()=>{
        this.props.history.push('/reviews/' + this.props.reviewStore.currentReview.id);
      });
    }
  }
  render() {
    return [
      <GeneralHeaderWithBack key="header" title="Editor" history={this.props.history}/>,
      <div className="editor-container" key="content">
        <input type="text" className="review-title" placeholder="请输入标题~~~" value={this.state.title} onChange={(evt)=>this.onStateChange("title", evt.target.value)}/>
        <input type="text" className="review-cover" placeholder="请输入封面地址URL~~~" value={this.state.cover} onChange={(evt)=>this.onStateChange("cover", evt.target.value)} />
        <div className="review-score">
          {
            [1,2,3,4,5].map((num)=>{
              if(this.state.score<num){
                return <i key={num} className="fa fa-star-o" onClick={()=>this.onStateChange("score",num)}/>
              } else {
                return <i key={num} className="fa fa-star" onClick={()=>this.onStateChange("score", num)} />
              }
            })
          }
        </div>
        <textarea className="review-content" value={this.state.content} placeholder="请输入书评~~~" onChange={(evt)=>this.onStateChange("content", evt.target.value)}/>
        <div className="footer">
          <button onClick={()=>this.onSubmitReview()}>发布</button>
        </div>
      </div>
    ]
  }
}

export default Editor;