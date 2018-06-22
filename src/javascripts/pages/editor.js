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
      title: ""
    };
  }
  onContentChange(value){
    this.setState({content: value});
  }
  onTitleChange(value){
    this.setState({title: value});
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
    if(currentReview.id){
      this.props.reviewStore.updateReview({book_id: query&&query.book_id, title: this.state.title, content: this.state.content}).then(()=>{
        this.props.history.push("/reviews/"+this.currentReview.id);
      });
    } else {
      this.props.reviewStore.createNewReview({book_id: query&&query.book_id, title: this.state.title, content: this.state.content}).then(()=>{
        this.props.history.push('/reviews/' + this.currentReview.id);
      });
    }
  }
  render() {
    return [
      <GeneralHeader key="header"/>,
      <div className="editor-container" key="content">
        <input type="text" className="review-title" placeholder="请输入标题~~~" value={this.state.title} onChange={(evt)=>this.onTitleChange(evt.target.value)}/>
        <textarea className="review-content" value={this.state.content} placeholder="请输入书评~~~" onChange={(evt)=>this.onContentChange(evt.target.value)}/>
        <div className="footer">
          <button onClick={()=>this.onSubmitReview()}>发布</button>
        </div>
      </div>
    ]
  }
}

export default Editor;