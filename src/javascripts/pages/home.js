'use strict';

import React, { Component } from 'react';

import Tabs from '../components/tabs.js';

import HomeList from "../components/home_list.js";

import GeneralHeader from '../components/general_header.js';

const { Item } = Tabs;

import axios from 'axios';

import { observer, inject } from 'mobx-react';

import '../../stylesheets/home.less';


@inject("indexStore")
@observer
class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      activeKey: "books",
    };
  }
  changeActiveKey(activeKey) {
    this.setState({activeKey: activeKey});
  }
  render(){
    return [
      <GeneralHeader key="header"/>,
      <div className="home-container" key="home">
        <Tabs activeKey={this.state.activeKey}>
          <Item itemKey="new" title={<button onClick={()=>this.changeActiveKey("new")}>New</button>}>
            <HomeList indexStore={this.props.indexStore} active={this.state.activeKey==="new"}/>
          </Item>
          <Item itemKey="hoe" title={<button onClick={()=>this.changeActiveKey("hot")}>Hot</button>}>
            <HomeList indexStore={this.props.indexStore} active={this.state.activeKey==="hot"}/>
          </Item>
        </Tabs>
      </div>]
    
  }
}



export default Home;