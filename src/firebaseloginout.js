import React, { Component } from 'react';
import firebaseloginout from './firebaseloginout.js';
class Firebaseloginout extends Component {
  render() {
    return (
      <div>
        <button onClick={this.logout}>Log Out</button>                
        <button onClick={this.logout} className="profilebutton"> <img src={this.state.user.photoURL}></img></button>
      </div>
)}}
export default Firebaseloginout;
// import Firebaseloginout from './firebaseloginout.js'; - format for app.js

