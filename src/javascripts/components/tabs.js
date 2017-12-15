'use strict';

import React, { Component } from 'react';

export default class Tabs extends Component {
  constructor(props) {
    super(props);
  }
  renderNav() {
    return React.Children.map(this.props.children, (child) => {
      let { itemKey, title} = child.props;
      let itemNavClassName  = ["tab-button"];
      if (itemKey === this.props.activeKey) {
        itemNavClassName.push('active');
      }
      return (
        <div className={itemNavClassName.join(" ")}>
          {title}
        </div>
      );
    });
  }
  renderItems() {
    return React.Children.map((child) => {
      let { itemKey, children } = child.props;
      return (
        <Item active={this.props.activeKey===itemKey}>
          {children}
        </Item>
      );

    });
  }
  render() {
    return (
      <div className="tabs-container">
        <div className="tabs-buttons">
          {this.renderNav()}
        </div>
        <div className="tabs-content">
          {this.renderItems()}
        </div>
      </div>
    );
  }
}

class Item extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let classname = ["tab-item-container"];
    this.props.active ? classname.push('active') : "";
    return (
      <div className={classname.join(" ")}>
        {this.props.children}
      </div>
    );
  }
}


Tabs.Item = Item;


