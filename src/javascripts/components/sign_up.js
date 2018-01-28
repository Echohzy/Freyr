'use strict';

import React, { Component } from 'react';

import TextInput from './text_input';

import wrappedInput from './text_input_wrapper';

import FormSetting from '../utils/form_setting';

import axios from 'axios';

import "../../stylesheets/form.less";


const attr_settings = {
  username: FormSetting.username,
  password: FormSetting.password,
  password_confirm: FormSetting.password_confirm,
  email: FormSetting.email
};

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state =  this.props.getInitAttrs(attr_settings);
  }
  onTextValueChange(attr, value) {
    this.setState({[attr]: value});
  }
  onPasswordConfirm(password_confirm){
    return this.state.password.value===password_confirm;
  }
  onSignUpUser(){
    let passed = true;
    var data = {};
    Object.keys(attr_settings).map((attr)=>{
      if(this.state[attr].status!=="passed"){
        passed = false
      } else {
        data[attr] = this.state[attr].value;
      }
    });
    if (!passed) {
      return;
    }
    axios({
      method: "post",
      url: "/api/accounts/sign_up",
      data: data
    }).then(function(res){
      return res.data;
    }).then(function(data){
      
    }).catch(function(){
      
    });
  }
  render() {
    return (
      <div className="form-container">
        <div className="logo-wrapper">
          <img src="../../images/logo2.png"/>
        </div>
        <TextInput 
          {...this.state.email}
          {...attr_settings.email}
          onTextChange={(value)=>this.onTextValueChange('email', value)}/>
        <TextInput
          {...this.state.username}
          {...attr_settings.username}
          onTextChange={(value)=>this.onTextValueChange('username', value)}/>
        <TextInput
          {...this.state.password}
          {...attr_settings.password}
          onTextChange={(value)=>this.onTextValueChange('password', value)}/>
        <TextInput
          {...this.state.password_confirm}
          {...attr_settings.password_confirm}
          validation={(value)=>this.onPasswordConfirm(value)}
          onTextChange={(value)=>this.onTextValueChange('password_confirm', value)}/>
        <div className="form-action">
          <button className="submit" onClick={()=>this.onSignUpUser()}>注册</button>
        </div>
      </div>
    );
  }
}

export default wrappedInput(SignUp);