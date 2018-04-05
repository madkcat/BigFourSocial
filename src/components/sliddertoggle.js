import React, { Component } from 'react';
import slidertoggle from './sliddertoggle.js';
class SlidderToggle extends Component {
    constructor(props) {
        super(props)
    }

    render(){
        return(
      <label className="switch">
        <input type="checkbox"/>
        <span className="slider round"></span>
      </label>
      )
    }
}

export default SlidderToggle;