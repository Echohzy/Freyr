'use strict';

import React, { Component } from 'react';

import TextInput from '../components/text_input';

import wrappedInput from '../components/text_input_wrapper';

import FormSetting from '../utils/form_setting';

import axios from 'axios';

import { observer, inject } from 'mobx-react';

import {  Link } from 'react-router-dom';

import "../../stylesheets/sign_in.less";

const attr_settings = {
  username: FormSetting.username,
  password: FormSetting.password
};

@inject("accountStore")
@wrappedInput
@observer
class SignIn extends Component {
  constructor(props){
    super(props);
    this.state = this.props.getInitAttrs(attr_settings);
    this.signInSuccess = this.signInSuccess.bind(this);
    this.signInFail = this.signInFail.bind(this);
  }
  onTextValueChange(attr, value) {
    this.setState({[attr]: value});
  }
  onInputChange(attr, value){
    this.onTextValueChange(attr, {status: "editing", value: value});
  }
  onInputFocus(attr){
    var info = this.state[attr];
    this.onTextValueChange(attr, {value: info.value, status: "editing"});
  }
  onInputBlur(key){
    const { required, validation } = attr_settings[key];
    const { value } = this.state[key];
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
    this.onTextValueChange(key, attr);
  }
  onSignIn(){
    if(this.props.accountStore.isRequesting){
      return;
    }
    let passed = true;
    var data = {};
    Object.keys(attr_settings).map((attr)=>{
      if(this.state[attr].status!=='passed'){
        passed = false;
      }else{
        data[attr] = this.state[attr].value;
      }
    });
    if(!passed){
      return;
    }
    this.props.accountStore.signIn(data, this.signInSuccess, this.signInFail);
  }
  signInSuccess(){
    this.props.history.push("/");
  }
  signInFail(error){
    if(error.response&&error.response.data){
      var err = error.response.data.error;
      this.setState({[err.attr]: Object.assign({}, this.state[err.attr],{status:"request_error", request_error: err.message})});
    }
  }
  render(){
    return (
      [
      <header key="header" className="sign-in-header">
        <Link to="#">注册</Link>
        <h1>Sign In</h1>
        <Link to="/">取消</Link>
      </header>,
      <div className="form-container sign-in-container" key="form">
        <div className="text-input-box">
          <label><i className="fa fa-user" /></label>
          <input
            type="text"
            placeholder="USERNAME"
            onBlur={()=>this.onInputBlur("username")}
            onChange={(evt)=>this.onInputChange("username", evt.target.value)}
            onFocus={()=>this.onInputFocus("username")}/>
        </div>
        <div className="text-input-box">
          <label><i className="fa fa-lock" /></label>
          <input
            type="password"
            placeholder="PASSWORD"
            onBlur={()=>this.onInputBlur("password")}
            onChange={(evt)=>this.onInputChange("password", evt.target.value)}
            onFocus={()=>this.onInputFocus("password")}/>
        </div>
        <div className="forget-password">
          <Link to="#">forgot it?</Link>
        </div>
        <div className="form-action">
          <button className="submit" onClick={()=>this.onSignIn()}>SIGN IN</button>
        </div>
        <div className="other-sign-in-type">
          <div className="text">{"or sign in with"}</div>
          <div className="buttons">
            <button><i className="fa fa-wechat" /></button>
            <button><i className="fa fa-weibo" /></button>
            <button><i className="fa fa-qq" /></button>
          </div>
        </div>
        <div className="page-footer img-block-1">
          <img src="../../images/flower2.png" />
        </div>
        <div className="page-footer img-block-2">
          <img src="../../images/flower2.png" />
        </div>
      </div>]
    );
  }
}

export default SignIn;


