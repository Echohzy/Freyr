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
          <button className="normal">
            <i className="fa fa-home" />
            <br />
            主页
          </button>
        </div>
        <div className="footer-block">
          <button className="normal">
            <i  className="fa fa-user" />
            <br />
            我的
          </button>
        </div>
      </div>
    );
  }
}

