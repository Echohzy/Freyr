import React, { Component } from 'react';

export default class TextInput extends Component {
  constructor(props) {
    super(props);
  }
  onFocus(){
    const { value } = this.props;
    this.props.onTextChange({value: value, status: "editing"});
  }
  onBlur(){
    const { required, value, validation } = this.props;
    const toString = Object.prototype.toString;
    let attr = {value: value};
    if(required&&!value){
      attr.status = "error";
    } else if (validation) {
      if (toString.call(validation)==="[object RegExp]") {
        attr.status = validation.test(value)?"passed":"error";
      } else if(toString.call(validation)==="[object Function]") {
        attr.status = validation(value)?"passed":"error";
      }
    } else {
      attr.status = "passed";
    }
    this.props.onTextChange(attr);
  }
  onChange(evt){
    this.props.onTextChange({status: "editing", value: evt.target.value});
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
          <input className={status} 
            type={type||"text"} 
            value={value} 
            onFocus={()=>this.onFocus()} 
            onBlur={()=>this.onBlur()}
            onChange={(evt)=>this.onChange(evt)}/>
          {
            status==='editing'?<span className="hint edit-hint"><i className="fa fa-exclamation-triangle" />{this.props.editHint}</span>:""
          }
          {
            status==='error'?<span className="hint error-hint"><i className="fa fa-times-circle" />{this.props.errorHint}</span>:""
          }
        </div>
      </div>
    );
  }
}