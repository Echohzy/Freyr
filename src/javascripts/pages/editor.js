'use strict';

import React, { Component } from 'react';

import { observer, inject } from 'mobx-react';

import { parseUrl } from '../utils/location';

import GeneralHeader from '../components/general_header';

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
      score: 0
    };
  }
  onContentChange(value){
    this.setState({content: value});
  }
  onTitleChange(value){
    this.setState({title: value});
  }
  onChangeScore(score){
    this.setState({score: score});
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
      this.props.reviewStore.updateReview({book_id: query&&query.book_id, title: this.state.title, content: this.state.content,score: this.state.score}).then(()=>{
        this.props.history.push("/reviews/"+this.props.reviewStore.currentReview.id);
      });
    } else {
      this.props.reviewStore.createNewReview({book_id: query&&query.book_id, title: this.state.title, content: this.state.content, score: this.state.score}).then(()=>{
        this.props.history.push('/reviews/' + this.props.reviewStore.currentReview.id);
      });
    }
  }
  render() {
    return [
      <GeneralHeader key="header"/>,
      <div className="editor-container" key="content">
        <input type="text" className="review-title" placeholder="请输入标题~~~" value={this.state.title} onChange={(evt)=>this.onTitleChange(evt.target.value)}/>
        <div className="review-score">
          {
            [1,2,3,4,5].map((num)=>{
              if(this.state.score<num){
                return <i key={num} className="fa fa-star-o" onClick={()=>this.onChangeScore(num)}/>
              } else {
                return <i key={num} className="fa fa-star" onClick={()=>this.onChangeScore(num)}/>
              }
            })
          }
        </div>
        <textarea className="review-content" value={this.state.content} placeholder="请输入书评~~~" onChange={(evt)=>this.onContentChange(evt.target.value)}/>
        <div className="footer">
          <button onClick={()=>this.onSubmitReview()}>发布</button>
        </div>
      </div>
    ]
  }
}

export default Editor;