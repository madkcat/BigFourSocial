/********************************************************************
**  Description:  Desktop layout component
********************************************************************/

// @ts-check

import React from 'react';
import firebase from './firebase.js';
import './App.css';
// import './media-query.css';
import CustomUploadButton from 'react-firebase-file-uploader/lib/CustomUploadButton';


class DesktopView extends React.Component {
    render() {
        return (
            <div className = "NewScoreboardBox">

                <h4 id = "StartScoreText">New Scoreboard</h4>

                <form id = "desktopForm" onSubmit = {this.props.handleSubmit}>
                    
                    {/* Quiz Location input field */}
                    <input
                        id = "QuizRoomField"
                        type = "text"
                        name = "QuizRoomItem"
                        placeholder = "Quiz Location"
                        onChange = {this.props.handleChange}
                        value = {this.props.QuizRoomItem}
                    />

                    {/* Tournament ID input field */}
                    <input
                        className = "InputRequire"
                        id = "TourneyIDNameField"
                        type = "text"
                        name = "TourneyIDItem"
                        placeholder = "Use 'Practice' or Quiz #"
                        onChange = {this.props.handleChange}
                        value = {this.props.TourneyIDItem}
                        required
                    />

                    <button 
                        className = "addButton"
                        type = "submit"
                    > 
                        Start a new Quiz 
                    </button>



                </form>
            </div>
        )
    }
}

class ScorekeeperView extends React.Component {
    render() {
        return (
            <div className = "NewScoreboardBox">

                <h4 id = "StartScoreText">Scorekeeper Box</h4>

                <form id = "desktopForm" onSubmit = {this.props.handleSubmit}>
                    
                    {/* Quiz Location input field */}
                    <input
                        id = "QuizRoomField"
                        type = "text"
                        name = "QuizRoomItem"
                        placeholder = "Quiz Location"
                        onChange = {this.props.handleChange}
                        value = {this.props.QuizRoomItem}
                    />

                    {/* Tournament ID input field */}
                    <input
                        className = "InputRequire"
                        id = "TourneyIDNameField"
                        type = "text"
                        name = "TourneyIDItem"
                        placeholder = "Use 'Practice' or Quiz #"
                        onChange = {this.props.handleChange}
                        value = {this.props.TourneyIDItem}
                        required
                    />

                    <button 
                        className = "addButton"
                        type = "submit"
                    > 
                        Start a new Quiz 
                    </button>



                </form>
            </div>
        )
    }
}


export default DesktopView;