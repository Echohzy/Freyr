'use strict';

import React, { Component } from 'react';

export default class SearchList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { data, result_count } = this.props;
    return (
      <div className="search-list">
        <div className="result-block">{"共找到"+result_count+"个结果"}</div>
        
      </div>
    );
  }
}