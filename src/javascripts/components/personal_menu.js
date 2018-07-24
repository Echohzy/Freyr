import React, { Component } from 'react';

import { observer, inject } from 'mobx-react';

import { Link } from 'react-router-dom';

import axios from "axios";

import { getItem } from '../utils/cookie';

import "../../stylesheets/personal_menu.less";

@inject('accountStore')
@observer
class PersonalMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    }
  }
  componentDidMount() {
    const { currentAccount }  = this.props.accountStore;
    if(!currentAccount.id){
      this.props.accountStore.getMeInfo();
    }
  }
  setVisible(value) {
    this.setState({visible: value});
  }
  render() {
    const { currentAccount } = this.props.accountStore;
    let classname = ["personal-menu"];
    this.state.visible ? classname.push("show") : "";
    return [
      <i className="fa fa-bars" id="bar-button" key="button" onClick={()=>this.setVisible(true)}/>,
      <div className={classname.join(" ")} key="block">
        <button onClick={()=>this.setVisible(false)}>
          <i className="fa fa-outdent" />
        </button>
        <div className="content">
          <div className="avatar-wrapper">
            <img src={currentAccount.avatar ? currentAccount.avatar + "?imageView2/1/w/80/h/80": ""} />
          </div>
          <ul className="user-menu">
            <li className="active"><i className="fa fa-commenting-o" /><Link to="/">我的主页</Link></li>
            <li><i className="fa fa-cog" /><Link to="/setting">设置</Link></li>
            <li><i className="fa fa-sign-out" /><span>退出</span></li>
          </ul>
        </div>
      </div>
    ];
  }
}

export default PersonalMenu;