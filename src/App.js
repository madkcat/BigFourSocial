/*****************************************************************
**  Author:       Placeholder
**  Description:  Placeholder
**                .
*****************************************************************/

// @ts-check

import React, { Component } from 'react';
import firebase, { auth, provider } from './firebase.js';
import './App.css';
import './media-query.css';
import HeaderWrapper from './HeaderWrapper.js';
import DesktopView from './DesktopView';
import ScorekeeperView from './ScorekeeperDesktopView';
import MobileView from './MobileView.js';
import LoggedOutView from './LoggedOutView.js';
import ScoreCards from './ScoreCards.js';
import First from './ScoreCards.js'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Scorekeepermode: false,
            user: null,
            left: false,
            username: '',
            TourneyIDItem: '',
            description: '',
            items: [],
            ScoreImg: '',
            gridSheet: '',
            ScoreImgURL: '',
            gridSheetURL: '',
            isUploading: false,
            progress: 0,
            pageset: null,
            lastpage: null
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.profilein = this.profilein.bind(this);
        this.profileout = this.profileout.bind(this);
        this.keepscorein = this.keepscorein.bind(this);
        this.keepscoreout = this.keepscoreout.bind(this);
        
        
        //this.Scorekeepermode = this.Scorekeepermode.bind(this);
    }
      
    
      keepscorein() {
        const lastpage = this.props.pageset;
        const pageset = 'scorekeeper';
        this.setState({
          lastpage,
          pageset
        });
      }
      keepscoreout() {
        const pageset = this.props.lastpage;
        this.setState({
          pageset
        });
      }

    // Logout function
    logout() {
        auth.signOut().then(() => {
            this.setState({
                user: null,
                authtype: null,
                pageset: null
              });
        });
    }

    // Login function
    login() {
        auth.signInWithPopup(provider).then(result => {
            const user = result.user;
//            const username = [this.state.user.displayName || this.state.user.email];
            const authtype = null;
            this.setState({
                user,
                authtype,
//                username
            });
        });
    }
    

    profilein() {
        const lastpage = this.props.pageset;
        const pageset = 'profile';
        this.setState({
          lastpage,
          pageset
        });
      }
      profileout() {
        const pageset = this.props.lastpage;
        this.setState({
          pageset
        });
      }

    // Toggle mobile add scoreboard drawer function
    toggleDrawer = (side, open) => () => {
        this.setState({[side]: open});
    };

    // Function return cards from the database after a user is logged in
    componentDidMount() {
        auth.onAuthStateChanged(user => {
            if (user) {
                this.setState({user});
            }
        });
        const itemsRef = firebase.database().ref('items');
        itemsRef.on('value', snapshot => {
            let items = snapshot.val();
            let newState = [];
            for (let item in items) {
                newState.push({
                    id: item,
                    title: items[item].title,
                    user: items[item].user,
                    description: items[item].description,
                    redteamid: items[item].redteamid,
                    yellowteamid: items[item].yellowteamid,
                    greenteamid: items[item].greenteamid
                });
            }
            this.setState({items: newState});
        });
    }

    // Function to handle the form input fields
    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }


    // Function to handle new scorecard
    handleSubmit(e) {
        e.preventDefault();
        const itemsRef = firebase.database().ref('items');

        const item = {
            title: this.state.TourneyIDItem,
            user: this.state.user.displayName || this.state.user.email,
            description: this.state.QuizRoomItem,
            photo: this.state.ScoreImgURL,
            layout: this.state.gridSheetURL
        };
        itemsRef.push(item);
        this.setState({
            TourneyIDItem: '',
            username: '',
            QuizRoomItem: '',
            photo: '',
            layout: ''
        });
    }

    // Function For removing sheets
    removeItem(itemId) {
        const itemRef = firebase.database().ref(`/items/${itemId}`);
        itemRef.remove();
    }

    // Functions for uploading images to the database
    handleImgUpload = event => this.setState({ username: event.target.value });
    handleUploadStart = () => this.setState({ isUploading: true, progress: 0});
    handleProgress = progress => this.setState({ progress });
    handleUploadError = error => {
        this.setState({ isUploading: false });
        console.error(error);
    };

    // Function to change UI after image upload
    handleUploadSuccess = filename => {
        this.setState({ 
            ScoreImg: filename,
            progress: 100,
            isUploading: false 
        });
        firebase
            .storage()
            .ref('images')
            .child(filename)
            .getDownloadURL()
            .then(url => this.setState({ScoreImgURL: url}));
    };

    // Function for updating UI after gridSheet upload
    handleUploadSuccessgridSheet = filename => {
        this.setState({
            gridSheet: filename,
            progress: 100,
            isUploading: false
        });
        firebase
            .storage()
            .ref('images')
            .child(filename)
            .getDownloadURL()
            .then(url => this.setState({gridSheetURL: url}));
    };


    render() {
        let topboxview = null;
            if (this.state.Scorekeepermode = false) {
                topboxview = 

                /* Desktop Layout for Scorecard Entry */
                <section className = "add-item">
                    <DesktopView 
                        handleSubmit = {this.handleSubmit}
                        handleChange = {this.handleChange}
                        TourneyIDItem = {this.state.TourneyIDItem}
                        QuizRoomItem = {this.state.QuizRoomItem}
                        handleUploadStart = {this.handleUploadStart}
                        handleUploadError = {this.handleUploadError}
                        handleProgress = {this.handleProgress}
                        handleImgUpload = {this.handleImgUpload}
                        handleUploadSuccess = {this.handleUploadSuccess}
                        handleUploadSuccessgridSheet = {this.handleUploadSuccessgridSheet}
                    />
                

                {/* Mobile menu for Scorecard entry*/}
                
                    <MobileView
                        handleSubmit = {this.handleSubmit}
                        handleChange = {this.handleChange}
                        TourneyIDItem = {this.state.TourneyIDItem}
                        QuizRoomItem = {this.state.QuizRoomItem}
                        handleUploadStart = {this.handleUploadStart}
                        handleUploadError = {this.handleUploadError}
                        handleProgress = {this.handleProgress}
                        handleImgUpload = {this.handleImgUpload}
                        handleUploadSuccess = {this.handleUploadSuccess}
                        handleUploadSuccessgridSheet = {this.handleUploadSuccessgridSheet}
                        user = {this.state.user}
                        left = {this.state.left}
                        toggleDrawer = {this.toggleDrawer}
                    />
                </section>;

            } else {
                topboxview =

                <section>
                    <MobileView
                        handleSubmit = {this.handleSubmit}
                        handleChange = {this.handleChange}
                        TourneyIDItem = {this.state.TourneyIDItem}
                        QuizRoomItem = {this.state.QuizRoomItem}
                        handleUploadStart = {this.handleUploadStart}
                        handleUploadError = {this.handleUploadError}
                        handleProgress = {this.handleProgress}
                        handleImgUpload = {this.handleImgUpload}
                        handleUploadSuccess = {this.handleUploadSuccess}
                        handleUploadSuccessgridSheet = {this.handleUploadSuccessgridSheet}
                        user = {this.state.user}
                        left = {this.state.left}
                        toggleDrawer = {this.toggleDrawer}
                    />
                </section>;

            }
                    

        return (
            <div className = "app">

                {/* Header with login and logout button */}
                <header>
                    <HeaderWrapper 
                        user = {this.state.user}
                        logout = {this.logout}
                        login = {this.login}
                        toggleDrawer = {this.toggleDrawer}
                    />
                </header>

                {/* If the user is logged in then display the library */}
                
                {this.state.user ? (
                    <div className = "container">

                        {topboxview}

                        

                        {/* Display the Scorecards */}
                        <section className = "display-item">
                            <ScoreCards
                                items = {this.state.items}
                                user = {this.state.user}
                                removeItem = {this.removeItem}
                            />
                        </section>

                    </div>
                      
                    
                ) : (
                    // Else user is not logged in, so display the logged out layout
                    <LoggedOutView />
                )}
            </div>
        );
    }
}

App.state = undefined;

export default App;