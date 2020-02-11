/********************************************************************
**  Description:  Desktop layout component
********************************************************************/

// @ts-check

import React from 'react';
import firebase from './firebase.js';
import './App.css';
import './media-query.css';
import CustomUploadButton from 'react-firebase-file-uploader/lib/CustomUploadButton';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';


class MobileView extends React.Component {
    render() {
        const sideList = (
            <div className = "drawer">
                <section>
                    <h3 id = "StartScoreText">New Scoreboard</h3>
                </section>
            </div>
        );

        return (
            <div>
                <Drawer open = {this.props.left} onClose = {this.props.toggleDrawer('left', false)}>
                    <div
                        tabIndex = {0}
                        role = "button"
                        onClick = {this.props.toggleDrawer('left', false)}
                        onKeyDown = {this.props.toggleDrawer('left', false)}
                        id = "drawerDiv"
                    >
                        {sideList}
                    </div>

                    <div>
                        <h3 id = "mobileStartScoreText"> New Scoreboard </h3>

                        <Divider id = "mobileDivide"/>

                        <form id="mobileForm" onSubmit = {this.props.handleSubmit}>
                            
                            {/* Quiz Location input field */}
                            <input
                                id = "mobileQuizRoomField"
                                type = "text"
                                name = "QuizRoomItem"
                                placeholder = "Quiz Location"
                                onChange = {this.props.handleChange}
                                value = {this.props.QuizRoomItem}
                            />

                            {/* Tournament ID input field */}
                            <input
                                className = "InputRequire"
                                id = "mobileTourneyIDNameField"
                                type = "text"
                                name = "TourneyIDItem"
                                placeholder = "Use 'Practice' or Quiz #"
                                onChange = {this.props.handleChange}
                                value = {this.props.TourneyIDItem}
                            />

                            <button className = "mobileAddButton" onClick={this.props.toggleDrawer('left', false)}> Start a new Quiz </button>
                        </form>
                    </div>

                    <Divider id = "mobileDivide" />

                    <button
                        className = "back-button"
                        id = "back-button-in-mobile"
                        onClick = {() => window.history.back()}
                    > 
                        Back 
                    </button>

                    <div className="mobile-user-profile">
                        <img
                            id = "mobileUserIcon"
                            alt = "user thumbnail"
                            src = {this.props.user.photoURL}
                        />
                        <h3 id = "mobileUserName"> {this.props.user.displayName || this.props.user.email}{' '} </h3>
                    </div>

                </Drawer>
            </div>
        )
    }
}

export default MobileView;