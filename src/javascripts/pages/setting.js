import React, { Component } from 'react';

import { observer, inject } from 'mobx-react';

import { Link } from 'react-router-dom';

import GeneralHeaderWithBack from '../components/general_header_with_back'

import '../../stylesheets/setting.less';

@inject('accountStore')
@observer
class Setting extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }
  changeAccountInfo(key, value){
    this.setState({[key]: value});
  }
  submitUserInfo(){
    var data = {};
    Object.keys(this.state).map((key)=>{
      data[key] = this.state[key];
    });
    this.props.accountStore.updateUserInfo(data);
  }
  render() {
    const { currentAccount } = this.props.accountStore;
    let sex = this.state.sex || currentAccount.sex;
    let username = this.state.username || currentAccount.username;
    return [
      <GeneralHeaderWithBack key="header" title="Setting" history={this.props.history}/>,
      <div className="setting-container" key="setting-container">
        <div className="img-container">
          <img src={currentAccount.avatar + "?imageView2/1/h/80/w/80"}/>
        </div>
        <div className="edit-block">
          <div className="edit-item">
            <span>昵称：</span>
            <input type="text"  value={username||""} onChange={(evt)=>this.changeAccountInfo("username", evt.target.value)} />
          </div>
          <div className="edit-item">
            <span>性别：</span>
            <i className={sex===1?"fa fa-male select":"fa fa-male"}  onClick={()=>this.changeAccountInfo("sex", 1)}/>
            <i className={sex===2?"fa fa-female select":"fa fa-female"}  onClick={()=>this.changeAccountInfo("sex", 2)} />
            <i className={sex===0?"fa fa-question select":"fa fa-question"}  onClick={()=>this.changeAccountInfo("sex", 0)} />
          </div>
        </div>
        <div className="button-container">
          <button onClick={()=>this.submitUserInfo()}>更新</button>
        </div>
      </div>
    ];
  }
}

export default Setting;  