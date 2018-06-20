'use strict';

import React, { Component } from 'react';

import TextInput from '../components/text_input';

import wrappedInput from '../components/text_input_wrapper';

import FormSetting from '../utils/form_setting';

import axios from 'axios';

import { observer, inject } from 'mobx-react';

import "../../stylesheets/form.less";

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
      [<header key="header"><h1>Freyr</h1></header>,
      <div className="form-container" key="form">
        <div className="logo-wrapper">
          <img src="../../images/logo2.png"/>
        </div>
        <TextInput
          {...this.state.username}
          {...attr_settings.username}
          onTextChange={(value)=>this.onTextValueChange('username', value)}/>
        <TextInput
          {...this.state.password}
          {...attr_settings.password}
          onTextChange={(value)=>this.onTextValueChange('password', value)}/>  
        <div className="form-action">
          <button className="submit" onClick={()=>this.onSignIn()}>登录</button>
        </div>
      </div>]
    );
  }
}

export default SignIn;


