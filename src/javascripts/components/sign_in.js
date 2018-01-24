'use strict';

import React, { Component } from 'react';

import TextInput from './text_input';

import wrappedInput from './text_input_wrapper';

import FormSetting from '../utils/form_setting';

import "../../stylesheets/form.less";

const attr_setting = {
  username: FormSetting.username,
  password: FormSetting.password
};

class SignIn extends Component {
  constructor(props){
    super(props);
    this.state = this.props.getInitAttrs(attr_setting);
  }
  onTextValueChange(attr, value) {
    this.setState({[attr]: value});
  }
  render(){
    return (
      <div className="form-container">
        <TextInput
          {...this.state.username}
          {...attr_settings.username}
          onTextValueChange={(value)=>this.onTextValueChnage('username', value)}/>
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


