import React, { Component } from 'react';

export default class TextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: ""
    };
  }
  onTextFocus(){
    this.setState({status: 'editing'});
  }
  render() {
    const { defaultValue, value, label, type, required } = this.props;
    const { status } = this.state;
    return (
      <div className="text-input-box">
        <div className="name-box">
          {label?
            <label>
              {required?<span className="star">*</span>:""}
              {label+"："}
            </label>:""
            }
        </div>
        <div className="content-box">
          <input className={status} onFocus={()=>this.onTextFocus()} onBlur={()=>this.onTextBlur()} onChange={} type={type||"text"} value={defaultValue||value} onChange={this.props.onTextChange} />
          {
            status==='editing'?<span className="hint edit-hint">{this.props.editHint}</span>:""
          }
          {
            status==='error'?<span className="hint error-hint">{this.props.errorHint}</span>:""
          }
        </div>
      </div>
    );
  }
}