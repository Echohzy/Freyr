import React, { Component } from 'react';

import { observer, inject } from 'mobx-react';

import "../../stylesheets/parts/comment_input.less";

@inject('notificationStore')
@inject('commentStore')
@observer
class CommentInput extends Component {
  constructor(props){
    super(props);
    this.state = {
      content: ""
    };
    this.onSubmitComment = this.onSubmitComment.bind(this);
  }
  onContentChange(value){
    this.setState({content: value});
  }
  onSubmitComment(){
    if(this.props.commentStore.isRequesting){
      return;
    }
    if(!this.state.content){
      this.props.notificationStore.addNotification("error", "内容不能为空");
      return;
    }
    this.props.commentStore.postComment({content: this.state.content, review_id: this.props.review_id}).then(()=>{
        this.setState({content: ""});
      });
  }
  render(){
    return (
      <div className="comment-input-container">
        <input type="text" placeholder="说点什么......"  value={this.state.content}  onChange={(evt)=>this.onContentChange(evt.target.value)} />
        <button onClick={this.onSubmitComment}>评论</button>
      </div>
    );
  }
}

export default CommentInput;


