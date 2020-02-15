/********************************************************************
**  Description:  Header component which renders the log in and log
**                out button. It checks the passed in user props to
**                find the current user's sign in status
********************************************************************/

// @ts-check

import React from 'react';
import './App.css';
// import './media-query.css';
import firebase, { auth, provider } from './firebase.js';
import ScorekeeperView from './ScorekeeperDesktopView'


class HeaderWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            left: false
        };
    }

    render() {
        return (
            <div className = "wrapper">
                <h1>Colorado Invitational 2020</h1>

                {this.props.user ? (
                    <div className = "headerWrapper">
                        <button className = "logButton" onClick = {this.props.logout}> Log Out </button>

                        {<ScorekeeperView ></ScorekeeperView>}
                        <button id = "mobileMenu" onClick = {this.props.toggleDrawer('left', true)}> New Scoreboard </button>
                        <button className = "back-button" id="back-button-in" onClick={() => window.history.back()}> Back </button>   
                    </div>
                    ) : (
                    <div>
                        <button className = "logButton" onClick = {this.props.login}> Log In </button>
                    </div>
                )}
            </div>
        )
    }
}

export default HeaderWrapper;