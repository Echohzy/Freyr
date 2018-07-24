import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import '../../stylesheets/parts/general_footer.less';

export default class GeneralFooter extends Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div className="general-footer-container">
        <div className="footer-block">
          <button className="normal" onClick={()=>this.props.history.push("/")}>
            <i className="fa fa-home" />
            <br />
            <span>首页</span>
          </button>
        </div>
        <div className="footer-block">
          <button className="normal" onClick={()=>this.props.history.push("/setting")}>
            <i  className="fa fa-user" />
            <br />
            <span>我的</span>
          </button>
        </div>
      </div>
    );
  }
}

