'use strict';

import React, { Component } from 'react';

import TextInput from './text_input';

import wrappedInput from './text_input_wrapper';

import "../../stylesheets/sign_up.less";


const attr_settings = {
  username: {
    required: true,
    editHint:"用户名由字母和下划线组成",
    errorHint:"请填入合法的用户名",
    validation: /^[\w\_]+$/,
    label: "用户名"
  },
  password: {
    required: true,
    editHint: "8-20位的数字、字母或符号",
    errorHint: "8-20位的数字、字母或符号",
    validation: /^([A-Z]|[a-z]|[0-9]|[`\-=[];,.\/~!@#\$\%\^\*()_+}{:?]){8,20}$/,
    label: "密码"
  },
  password_confirm: {
    required: true,
    editHint: "请输入确认密码",
    errorHint: "与密码不同",
    label: "确认密码"
  },
  email: {
    required: true,
    editHint: "请输入一个有效的电子邮箱",
    errorHint: "请输入一个有效的电子邮箱",
    label: "邮箱"
  }
};
class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state =  this.props.getInitAttrs(attr_settings);
  }
  onTextValueChange(attr, value) {
    this.setState({[attr]: value});
  }
  render() {
    return (
      <div className="sign-up-container">
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
          onTextChange={(value)=>this.onTextValueChange('password_confirm', value)}/>
        <div className="form-action">
          <button className="submit">注册</button>
        </div>
      </div>
    );
  }
}

export default wrappedInput(SignUp);