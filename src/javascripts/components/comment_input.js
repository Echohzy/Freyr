import React, { Component } from 'react';

import { obverser, inject } from 'mobx-react';

@inject('commentStore')
@observer
class CommentInput extends Component {
  render(){
    return (
      <div className="comment-input-container">
        <input type="text" placeholder="说点什么......" />
        <button>评论</button>
      </div>
    );
  }
}

export default CommentInput;


