'use strict';

import React, { Component } from 'react';

import TextInput from './text_input';

import wrappedInput from './text_input_wrapper';

import FormSetting from '../utils/form_setting';

import axios from 'axios';

import "../../stylesheets/form.less";

const attr_settings = {
  username: FormSetting.username,
  password: FormSetting.password
};

class SignIn extends Component {
  constructor(props){
    super(props);
    this.state = this.props.getInitAttrs(attr_settings);
  }
  onTextValueChange(attr, value) {
    this.setState({[attr]: value});
  }
  onSignIn(){
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
    axios({
      method: "post",
      url: "/login",
      data: data
    }).then(function(res){

    }).catch(function(error){

    });
  }
  render(){
    return (
      <div className="form-container">
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
          <button className="submit">登录</button>
        </div>
      </div>
    );
  }
}

export default wrappedInput(SignIn);


