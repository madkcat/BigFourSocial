/**********************************************************************
**  Description:  Scorecards component which renders the database
**********************************************************************/

// @ts-check

import React, { Component } from 'react';
import firebase, { auth, provider } from './firebase.js';
import './App.css';
// import './media-query.css';
import ModalImage from 'react-modal-image'
import App from './App.js';
import handleScore from './App.js';



class ScoreCards extends React.Component {
    constructor(props) {
        super(props);
           this.state = {
              scoreCardMode: false
           }
           this.scoreCardModeSwapt = this.scoreCardModeSwapt.bind(this)
           this.scoreCardModeSwapf = this.scoreCardModeSwapf.bind(this)
           this.componentDidMount = this.componentDidMount.bind(this)
        }
    scoreCardModeSwapt(){
        this.setState({
            scoreCardMode: true
         });
    }
    scoreCardModeSwapf(){
        this.setState({
            scoreCardMode: false
         });
    }
    componentDidMount() {
        auth.onAuthStateChanged((user) => {
           if (user) {
              this.setState({ user });
           }
        });
        const scoreRef = firebase.database().ref('scorecard');
           scoreRef.on('value', (snapshot) => {
              let scorecard = snapshot.val();
              let newState = [];
              for (let score in scorecard) {
                 newState.push({
                    id: score,
                    title: scorecard[score].title,
                    teamcolor: scorecard[score].teamcolor,
                    quizzerpad: scorecard[score].quizzerpad,
                    jumptype: scorecard[score].jumptype,
                    jresult: scorecard[score].jresult,
                    user: scorecard[score].user,
                    openredscore: scorecard[score].openredscore,
                    openyellowscore: scorecard[score].openyellowscore,
                    opengreenscore: scorecard[score].opengreenscore
                 });
                 this.setState({
                    openredscore: scorecard[score].openredscore
                 })
              }
              this.setState({
                 scorecard: newState
              });
           });
     }

    render() {
        return (
            
            <div className = "wrapper">
                {this.state.scoreCardMode === false ?
                <ul>
                    {this.props.items.map(item => {
                        return (
                            <li key = {item.id}>
                                <h3>
                                    <table><tr line-width = "100%">
                                        <td text-align="Left">{item.title}</td> <td text-align="Right">{item.description}</td>
                                    </tr></table>
                                </h3>
                                <h4>{item.redteamid}</h4>
                                <h4>{item.yellowteamid}</h4>
                                <h4>{item.greenteamid}</h4>
                                {/* 
                                // @ts-ignore */}
                                {//<ModalImage
                                    //className = "photo"
                                    //alt = "Penguin"
                                    //small = {item.photo}
                                    //large = {item.photo}
                                //>
                            }

                                

                                {/* 
                                // @ts-ignore */}
                                {//<ModalImage
                                    //className = "gridSheet"
                                    //alt = {item.yellowteamid}
                                    //small = {item.layout}
                                    //large = {item.layout}
                                ///>
                            }
                                

                                {/* 
                                // @ts-ignore */}
                                {//<ModalImage
                                    //className = "gridSheet"
                                    //alt = {item.greenteamid}
                                    //small = {item.layout}
                                    //large = {item.layout}
                                ///>
                    }
                                
                                <p id = "ciScorekeeper">
                                    {' '} 
                                    {item.user} - Scorekeeper
                                    {item.user === this.props.user.displayName ||
                                        item.user === this.props.user.email ? (
                                        <button
                                            id = "removeButton"
                                            onClick = {() => this.props.removeItem(item.id)}
                                        >
                                            Remove Sheet
                                        </button>
                                    ) : null}

                                    {' '} 
                                    {item.user === this.props.user.displayName ||
                                        item.user === this.props.user.email ? (
                                        <button
                                            id = "keepScoreButton"
                                            onClick = {this.scoreCardModeSwapt}
                                                //this.props.setState.Scorekeepermode(null)}
                                            //.replace( /(?:^|\s)ScoreKeeperBox(?!\S)/g , '' )}
                                            //this.props.removeItem(item.id)}
                                        >    
                                            
                                        
                                            View Score
                                        </button>
                                    ) : null}
                                </p>
                            </li>
                        );
                    })}
                </ul>
            
            :
            
            <section className='display-score'>
            <button
                                            id = "keepScoreButton"
                                            onClick = {this.scoreCardModeSwapf}
                                                //this.props.setState.Scorekeepermode(null)}
                                            //.replace( /(?:^|\s)ScoreKeeperBox(?!\S)/g , '' )}
                                            //this.props.removeItem(item.id)}
                                        >    
                                            
                                        
                                            View Block
                                        </button>
            <div className="wrapper">
              <ul>
                {this.state.scorecard.map((score) => {
                  return (
                    <li className='smallcard' key={score.id}>
                      {score.jresult === true ?
                        <h3 style={{color: 'darkgreen'}}>{score.title} {score.user === this.state.user.displayName || score.user === this.state.user.email ?
                        <button className='xelement' onClick={() => this.removeItem(score.id)}>X</button> : null}</h3>
                      :
                        <h3 style={{color: 'red'}}>{score.title} {score.user === this.state.user.displayName || score.user === this.state.user.email ?
                        <button className='xelement' onClick={() => this.removeItem(score.id)}>X</button> : null}</h3>}
                        <h4 style={{backgroundColor: score.teamcolor }}>{score.quizzerpad}</h4>
                        <h4>{score.jumptype}</h4>  
                    </li>
                  )
                })}
              </ul>
            </div>
          </section>}
          </div>
            )
    }
}

export class First extends Component {

    render() {
            var taskStatus = this.props.status;
            if(taskStatus)
                return true
            else return false;
        }
  }
  
  class Second extends Component {
    constructor(props) {
       super(props);
    }
    render() {
      return(<div><button onClick={this.props.colorChange} /></div>)
    }
  }

export default ScoreCards;