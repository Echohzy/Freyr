import React, { Component } from 'react';

export default class TextInput extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { value, label, type, required, status } = this.props;
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
          <input className={status} type={type||"text"} value={value}  />
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