'use strict';

import React, { Component } from 'react';

import Tabs from '../components/tabs.js';

import HomeList from "../components/home_list.js";

import GeneralHeader from '../components/general_header.js';

import GeneralFooter from '../components/general_footer.js';

const { Item } = Tabs;

import { observer, inject } from 'mobx-react';

import '../../stylesheets/home.less';


@inject("indexStore")
@inject("collectionStore")
@observer
class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      activeKey: "new",
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
            <HomeList collectionStore={this.props.collectionStore} indexStore={this.props.indexStore} active={this.state.activeKey==="new"} push={this.props.history.push}/>
          </Item>
          <Item itemKey="hot" title={<button onClick={()=>this.changeActiveKey("hot")}>Hot</button>}>
            <HomeList collectionStore={this.props.collectionStore} indexStore={this.props.indexStore} active={this.state.activeKey==="hot"} push={this.props.history.push}/>
          </Item>
        </Tabs>
      </div>,
      <GeneralFooter key="footer" history={this.props.history}/>]
  }
}



export default Home;