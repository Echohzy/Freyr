import React, { Component } from 'react';

export default function wrappedInput(WrappedComponent) {
  class WrappedInput extends Component {
    constructor(props) {
      super(props);
    }
    getInitAttrs(attr_settings){
      let attrs = {};
      for (let k in attr_settings) {
        attrs[k] = {
          value: attr_settings[k].defaultValue||""
        }
      }
      return attrs;
    }
    render(){
      return (
        <WrappedComponent getInitAttrs={this.getInitAttrs}/>
      );
    }
  }
  WrappedInput.displayName = `Wrapped(${WrappedComponent.name})`;
  return WrappedInput;
}