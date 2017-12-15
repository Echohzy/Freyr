'use strict';

import React, { Component } from 'react';

export default class Tabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current_tab: this.props.default_tab
    }
  }
  render() {
    return (
      <div>
      </div>
    );
  }
}