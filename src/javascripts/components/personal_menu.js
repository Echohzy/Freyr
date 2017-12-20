import React, { Component } from 'react';

import axios from "axios";

import "../../stylesheets/personal_menu.less";

export default class PersonalMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      account: {}
    }
  }
  componentDidMount() {
    this.getAccountInfo();
  }
  getAccountInfo(){
    axios.get("/api/accounts/123").then(function(res){
      return res.data;
    }).then((data)=>{
      this.setState({account: data.account});
    })
  }
  setVisible(value) {
    this.setState({visible: value});
  }
  render() {
    const { account } = this.state;
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
            <img src={account.avatar ? account.avatar + "?imageView2/2/w/80/h/80": ""} />
          </div>
          <ul className="user-menu">
            <li className="active"><i className="fa fa-commenting-o" /><span>我的消息</span></li>
            <li><i className="fa fa-heart-o" /><span>我的收藏</span></li>
            <li><i className="fa fa-cog" /><span>设置</span></li>
            <li><i className="fa fa-sign-out" /><span>退出</span></li>
          </ul>
        </div>
      </div>
    ];
  }
}