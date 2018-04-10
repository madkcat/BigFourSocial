import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import firebase, { auth, provider } from './firebase.js';
import { Foulstuff } from './components/foulstuff';


class App extends Component {
  constructor() {
    super();
    this.state = {
      twoteam: false,
      hidebutt: false,
      quizzerpad:'',
      qnumber: 1,
      jumptype:'regular',
      jresult: true,
      jcase: '',
      jcolor: '',
      username: '',
      scorecard: [],
      user: null,
      authtype: null,
      pageset: null,
      lastpage: null,
      wronganswer: false,
      wronganswer2: false,
      teamcolor: null,
      padnum: null,
      colorjump: [],
      thisfoul: 0,
      redscore: 0,
      rederror: 0,
      redfouls: 0,
      redout: false,
      yellowscore: 0,
      yellowerror: 0,
      yellowfouls: 0,
      yellowout: false,
      greenscore: 0,
      greenerror: 0,
      greenfouls: 0,
      greenout: false

    }
    this.handleChange = this.handleChange.bind(this);// Currently unused, but saved just in case
    this.handletcOptionChange = this.handletcOptionChange.bind(this); //Handles Team Color Change
    this.handlerOptionChange = this.handlerOptionChange.bind(this);// Currently unused, but saved just in case
    this.handlenumOptionChange = this.handlenumOptionChange.bind(this);// Handles Correct/Incorrect
    this.handleSubmit = this.handleSubmit.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.profilein = this.profilein.bind(this);
    this.profileout = this.profileout.bind(this);
    this.keepscorein = this.keepscorein.bind(this);
    this.keepscoreout = this.keepscoreout.bind(this);
    this.redfoul = this.redfoul.bind(this);
    this.yellowfoul = this.yellowfoul.bind(this);
    this.greenfoul = this.greenfoul.bind(this);
    this.redunfoul = this.redunfoul.bind(this);
    this.yellowunfoul = this.yellowunfoul.bind(this);
    this.greenunfoul = this.greenunfoul.bind(this);
    this.correctguess = this.correctguess.bind(this);
    this.incorrectguess = this.incorrectguess.bind(this);
    this.pass = this.pass.bind(this);
    this.standard = this.standard.bind(this);
    this.twoteam = this.twoteam.bind(this);  
    this.challengeappeal = this.challengeappeal.bind(this);  
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handletcOptionChange(e) {
    this.setState({
      teamcolor: e.target.value
    });
  }
  
  handlenumOptionChange(e) {
    this.setState({
      padnum: e.target.value
    });
  }
  handlerOptionChange(e) {
    this.setState({
      jresult: e.target.value
    });
  }
  logout() {
    auth.signOut()
      .then(() => {
        this.setState({
          user: null,
          authtype: null,
          pageset: null
        });
      });
  }
  login() {
    auth.signInWithPopup(provider) 
      .then((result) => {
        const user = result.user;
        const username = [this.state.user.displayName || this.state.user.email];
        const authtype = null;
        this.setState({
          user,
          authtype,
          username
        });
      });
  }
  profilein() {
    const lastpage = this.pageset;
    const pageset = 'profile';
    this.setState({
      lastpage,
      pageset
    });
  }
  profileout() {
    const pageset = this.lastpage;
    this.setState({
      pageset
    });
 }
  keepscorein() {
    const lastpage = this.pageset;
    const pageset = 'scorekeeper';
    this.setState({
      lastpage,
      pageset
    });
  }
  keepscoreout() {
    const pageset = this.lastpage;
    this.setState({
      pageset
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      colorjump: this.state.teamcolor
    })
    const scoreRef = firebase.database().ref('scorecard');
    const er = -10;
    var temperror = 0;
    var tempqnumber = '';
    // var jcase = '';
    var jcolor = '';

    var score = {
      title: this.state.qnumber,
      teamcolor: this.state.teamcolor,
      quizzerpad: this.state.padnum,
      jumptype: this.state.jumptype,
      jresult: this.state.jresult,
      jcolor: jcolor,
      openredscore: (this.state.redscore - Math.floor(this.state.redfoul / 3)*10),
      openyellowscore: (this.state.yellowscore - Math.floor(this.state.yellowfoul / 3)*10),
      opengreenscore: (this.state.greenscore - Math.floor(this.state.greenfoul / 3)*10),
      redscore: this.state.redscore,
      rederror: this.state.rederror,
      redfoul: this.state.redfouls,
      yellowscore: this.state.yellowscore,
      yellowerror: this.state.yellowerror,
      yellowfoul: this.state.yellowfoul,
      greenscore: this.state.greenscore,
      greenerror: this.state.greenerror,
      greenfoul: this.state.yellowfoul,

      user: this.state.user.displayName || this.state.user.email
    }
    console.log(score.jresult)
    scoreRef.push(score);
    switch(score.jumptype) {
      case 'regular':
        const rc = 20;
        if(score.jresult === true){
          jcolor = 'green';  
          tempqnumber = this.state.qnumber;
          switch(this.state.teamcolor){
            case 'red':             
              var tempred = this.state.redscore;
              this.setState({
                redscore: tempred + rc
              })
            break;
            case 'yellow':
              var tempyellow = this.state.yellowscore;
              this.setState({
                yellowscore: tempyellow + rc
              })
            break;
            case 'green':
              var tempgreen = this.state.greenscore;
              this.setState({
                greenscore: tempgreen + rc
              })
            break;
          }
          this.setState({
            qnumber: tempqnumber+1,
            jumptype: 'regular',              
            wronganswer: false,
            wronganswer2: false,
            quizzerpad:'',
            teamcolor: null,
            redout: false,
            yellowout: false,
            greenout: false,
            padnum: null,
            username: [this.state.user.displayName || this.state.user.email]
          });
        }
        else {
          jcolor = 'red';
          switch(this.state.teamcolor){
            case 'red':             
              tempred = this.state.redscore;
              temperror = this.state.rederror;
              this.setState({  
                rederror: temperror +1,
                redout: true
              });
              if (this.state.rederror >= 3){
                this.setState({
                  redscore: tempred + er
                })
              }
              else if (this.state.qnumber >= 16){
                this.setState({
                  redscore: tempred + er
                })
              };
            break;
            case 'yellow':
              tempyellow = this.state.yellowscore;
              temperror = this.state.yellowerror;
              this.setState({
                yellowerror: temperror +1,
                yellowout: true
              });
              if (this.state.yellowerror >= 3){
                this.setState({
                  yellowscore: tempyellow + er
                })
              }
              else if (this.state.qnumber >= 16){
                this.setState({
                  yellowscore: tempyellow + er
                })
              };
            break;
            case 'green':
              tempgreen = this.state.greenscore;
              temperror = this.state.greenerror;
              this.setState({
                greenerror: temperror +1,
                greenout: true
              });
              if (this.state.greenerror >= 3){
                this.setState({
                  greenscore: tempgreen + er
                })
              }
              else if (this.state.qnumber >= 16){
                this.setState({
                  greenscore: tempgreen + er
                })
              };
            break;
          }
          if (this.state.twoteam === true){
            this.setState ({
              jumptype:'free'
          })}
          else(
          this.setState({
            jumptype: 'tossup',
            wronganswer: true,
            padnum: null
          }))
        };
      break;
      case 'tossup': 
        const tc = 20;
        if(score.jresult === true){
          jcolor = 'green';
          tempqnumber = this.state.qnumber;
          switch(this.state.teamcolor){
            case 'red':             
              tempred = this.state.redscore;
              this.setState({
                redscore: tempred + tc
              })
            break;
            case 'yellow':
              tempyellow = this.state.yellowscore;
              this.setState({
                yellowscore: tempyellow + tc
              })
            break;
            case 'green':
              tempgreen = this.state.greenscore;
              this.setState({
                greenscore: tempgreen + tc
              })
            break;
          }
          this.setState({
            qnumber: tempqnumber+1,
            jumptype: 'regular',              
            wronganswer: false,
            wronganswer2: false,
            quizzerpad:'',
            teamcolor: null,
            redout: false,
            yellowout: false,
            greenout: false,
            padnum: null,
            username: [this.state.user.displayName || this.state.user.email]
          });
        }
        else {
          jcolor ='red';
          switch(this.state.teamcolor){
            case 'red':             
              tempred = this.state.redscore;
              temperror = this.state.rederror;
              this.setState({
                rederror: temperror +1,
                redout: true
              });
              if (this.state.rederror >= 3){
                this.setState({
                  redscore: tempred + er
                })
              }
              else if (this.state.qnumber >= 16){
                this.setState({
                  redscore: tempred + er
                })
              };
            break;
            case 'yellow':
              tempyellow = this.state.yellowscore;
              temperror = this.state.yellowerror;
              this.setState({
                yellowerror: temperror +1,
                yellowout: true
              });
              if (this.state.yellowerror >= 3){
                this.setState({
                  yellowscore: tempyellow + er
                })
              }
              else if (this.state.qnumber >= 16){
                this.setState({
                  yellowscore: tempyellow + er
                })
              };
            break;
            case 'green':
              tempgreen = this.state.greenscore;
              temperror = this.state.greenerror;
              this.setState({
                greenerror: temperror +1,
                greenout: true
              });
              if (this.state.greenerror >= 3){
                this.setState({
                  greenscore: tempgreen + er
                })
              }
              else if (this.state.qnumber >= 16){
                this.setState({
                  greenscore: tempgreen + er
                })
              };
            break;
          }
          this.setState({
            jumptype: 'free',
            wronganswer: true,
            wronganswer2: true,
            padnum: null
          })
        };
      break;
      case 'free':
        if(this.state.twoteam === true){
        var fc = 20;
        var tt = 1}
        else(
          fc = 10,
          tt= 0
        )
        if(score.jresult === true){
          jcolor = 'green';
          tempqnumber = this.state.qnumber;
          switch(this.state.teamcolor){
            case 'red':             
              tempred = this.state.redscore;
              this.setState({
                redscore: tempred + fc
              })
            break;
            case 'yellow':
              tempyellow = this.state.yellowscore;
              this.setState({
                yellowscore: tempyellow + fc
              })
            break;
            case 'green':
              tempgreen = this.state.greenscore;
              this.setState({
                greenscore: tempgreen + fc
              })
            break;
          }
          this.setState({
            quizzerpad:'',
            username: [this.state.user.displayName || this.state.user.email]
          });
        }
        else {
          jcolor = 'red';
          this.setState({
            jcolor : jcolor
          })
        };
        this.setState({
          qnumber: tempqnumber + tt,
          jumptype: 'regular',
          wronganswer: false,
          wronganswer2: false,
          teamcolor: null,
          redout: false,
          yellowout: false,
          greenout: false,
          padnum: null,
          jcolor: ''
        })
      break;
    }
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
      }
      this.setState({
        scorecard: newState
      });      
    });
  }
  componentDidMountex() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      } 
    });
    const scoreRef = firebase.database().ref('scoredisplay');

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
      }
      this.setState({
        scorecard: newState
      });      
    });
  }
  removeItem(scoreID) {
    const scoreRef = firebase.database().ref(`/scorecard/${scoreID}`);
    scoreRef.remove();
  }
  redfoul(){
    const tempfoul = this.state.redfouls;
    this.setState({
      redfouls: tempfoul + 1
    })
  }
  yellowfoul(){
    const tempfoul = this.state.yellowfouls;
    this.setState({
      yellowfouls: tempfoul + 1
    })
  }
  greenfoul(){
    const tempfoul = this.state.greenfouls;
    this.setState({
      greenfouls: tempfoul + 1
    })
  }
  redunfoul(){
    const tempfoul = this.state.redfouls;
    if (tempfoul === 0){
      this.setState({})
    }
    else (
      this.setState({
        redfouls: tempfoul - 1
      })
    );
  }
  yellowunfoul(){
    const tempfoul = this.state.yellowfouls;
    if (tempfoul === 0){
      this.setState({})
    }
    else (
      this.setState({
      yellowfouls: tempfoul - 1
    })
    );
  }
  greenunfoul(){
    const tempfoul = this.state.greenfouls;
    if (tempfoul === 0){
      this.setState({})
    }
    else (
      this.setState({
      greenfouls: tempfoul - 1
    })
    );
  }
  correctguess(){
    this.setState({
      jresult: true
    })
    console.log(this.state.jresult);
  }
  incorrectguess(){
    this.setState({
      jresult: false
    })
    console.log(this.state.jresult);
  }
  pass(){
    var tempqnumber = this.state.qnumber;
    this.setState({
      qnumber: tempqnumber,
      jresult: false,
      jumptype: 'regular',
      wronganswer: false,
      wronganswer2: false,
      teamcolor: null,
      redout: false,
      yellowout: false,
      greenout: false,
      padnum: null,
      jcolor: ''
    })
  }
  twoteam(){
    this.setState({
      twoteam: true,
      hidebutt: true
    }) 
  }
  standard(){
    this.setState({
      hidebutt: true,
    }) 
  }
  challengeappeal(){
    this.setState({
      twoteam: true,
      hidebutt: true
    }) 
  }
  render() {
    return (
      <div className='app'>
        <header>
          <div className="wrapper">
            <h1>CI Framework V0.3</h1>
            {this.state.user ?
              <div>
                <button onClick={this.logout}>Log Out</button> 
                {(this.state.pageset === 'scorekeeper') ?
                  <button onClick={this.keepscoreout}>Return</button> 
                  :
                  <button onClick={this.keepscorein}>Keep Score</button> 
                }
                {(this.state.pageset === 'profile') ?
                  <button onClick={this.profileout} className="profilebutton"> <img src={this.state.user.photoURL} alt="UserGooglePhoto" /></button>
                  :
                  <button onClick={this.profilein} className="profilebutton"> <img src={this.state.user.photoURL} alt="UserGooglePhoto" /></button>
                }               
              </div>
            :
            <button onClick={this.login}>Log In</button>              
            }
          </div>
        </header>
        {(this.state.pageset === 'profile') ?
          <div>
            <h1>This shows you are now veiwing the profile page. To be developed to the profile page</h1>
            <h1> Raw information: {this.state.user.displayName} </h1>
          </div>
        :
        (this.state.pageset === 'scorekeeper') ?
          <div>
            <div>
              <div className='container'>
                <section className='add-score'>
                  {(this.state.hidebutt === false) ?
                    <div className='teamqualifier'>
                      <button className='twobutton' onClick={this.twoteam}>Two-team</button>
                      <button className='threebutton' onClick={this.standard}>Standard</button>
                    </div>
                   :
                    <div>hidden</div>}
                  <form onSubmit={this.handleSubmit}>
                    <div className="quizzerpad-radio-div">
                      {(this.state.redout === true )?
                        <label className="switch">
                          <div className="quizzerpad-radio">
                            <input type="radio" disabled className="teamcolor redpads" id="redpad"value="red" />
                            <span className="teampads slider round redpads" for="redpad">ERROR</span>
                          </div>
                        </label>                   
                      :
                        <label className="switch">
                          <div className="quizzerpad-radio">
                            <input type="radio" className="teamcolor redpads" id="redpad"value="red" checked={this.state.teamcolor === 'red'} onChange={this.handletcOptionChange} />
                            <span className="teampads slider round redpads" for="redpad"></span>
                          </div>
                        </label>
                      }
                      {(this.state.yellowout === true || this.state.twoteam === true )?
                        <label className="switch">
                          <div className="quizzerpad-radio">
                            <input type="radio" disabled className="teamcolor yellowpads" id="yellowpad"value="yellow" />
                            <span className="teampads slider round yellowpads" for="yellowpad">ERROR</span>
                          </div>
                        </label>                   
                      :
                        <label className="switch">
                          <div className="quizzerpad-radio">
                            <input type="radio" className="teamcolor yellowpads" id="yellowpad"value="yellow" checked={this.state.teamcolor === 'yellow'} onChange={this.handletcOptionChange} />
                            <span className="teampads slider round yellowpads" for="yellowpad"></span>
                          </div>
                        </label>
                      }
                      {(this.state.greenout === true )?
                        <label className="switch">
                          <div className="quizzerpad-radio">
                            <input type="radio" disabled className="teamcolor greenpads" id="greenpad"value="green" />
                            <span className="teampads slider round greenpads" for="greenpad">ERROR</span>
                          </div>
                        </label>                   
                      :
                        <label className="switch">
                          <div className="quizzerpad-radio">
                            <input type="radio" className="teamcolor greenpads" id="greenpad"value="green" checked={this.state.teamcolor === 'green'} onChange={this.handletcOptionChange} />
                            <span className="teampads slider round greenpads" for="greenpad"></span>
                          </div>
                        </label>
                      }
                    </div>
                    <div className="quizzerpadnum-radio-div">
                      <label className="switch">
                        <div className="quizzerpadnum-radio">
                          <input type="radio" className="padnum" id="pad1"value="1" checked={this.state.padnum === '1'} onChange={this.handlenumOptionChange} />
                          <span className="slider round seatnum" for="pad1">1</span>
                        </div>
                      </label>
                      <label className="switch">
                        <div className="quizzerpadnum-radio">
                          <input type="radio" className="padnum" id="pad2" value="2" checked={this.state.padnum === '2'} onChange={this.handlenumOptionChange}/>
                          <span className="slider round seatnum" for="pad2">2</span>
                        </div>
                      </label>
                      <label className="switch">
                        <div className="quizzerpadnum-radio">
                          <input type="radio" className="padnum" id="pad3" value="3" checked={this.state.padnum === '3'} onChange={this.handlenumOptionChange}/>
                          <span className="slider round seatnum" for="pad3">3</span>
                        </div>
                      </label>
                      <label className="switch">
                        <div className="quizzerpadnum-radio">
                          <input type="radio" className="padnum" id="pad4" value="4" checked={this.state.padnum === '4'} onChange={this.handlenumOptionChange}/>
                          <span className="slider round seatnum" for="pad4">4</span>
                        </div>
                      </label>
                      <label className="switch">
                        <div className="quizzerpadnum-radio">
                          <input type="radio" className="padnum" id="pad5" value="5" checked={this.state.padnum === '5'} onChange={this.handlenumOptionChange}/>
                          <span className="slider round seatnum" for="pad5" >5</span>
                        </div>
                      </label>
                    </div>
                    
                    {(this.state.teamcolor &&  this.state.padnum !== null )?
                      <div className='submitclass'>
                        <button className='correctbutton' onClick={this.correctguess}>Correct</button>
                        <button className='incorrectbutton' onClick={this.incorrectguess}>Incorrect</button>
                      </div>                    
                    :
                    <button className='passbutton' onClick={this.pass}>PASS</button>
                    }
                  </form>
                </section>
                <section className='scoreboard'>
                  <h1> Question # {this.state.qnumber}</h1>
                  <div>
                    <h3 className='scoreboard sbl'>RED TEAM: {this.state.redscore - Math.floor(this.state.redfoul / 3)*10}</h3>
                    <h3 className='scoreboard sbl'>Errors: {this.state.rederror}   <button className="foulbutton button" onClick={this.redfoul}>Foul</button>: <button className="foulbutton button" onClick={this.redunfoul}>{this.state.redfouls}</button></h3>
                  </div>
                  <div>
                    <h3 className='scoreboard sbl'>YELLOW TEAM: {this.state.yellowscore - Math.floor(this.state.yellowfoul / 3)*10}</h3>
                    <h3 className='scoreboard sbl'>Errors: {this.state.yellowerror}   <button className="foulbutton button" onClick={this.yellowfoul}>Foul</button>: <button className="foulbutton button" onClick={this.yellowunfoul}>{this.state.yellowfouls}</button></h3>
                  </div>
                  <div>
                    <h3 className='scoreboard sbl'>GREEN TEAM: {this.state.greenscore - Math.floor(this.state.greenfoul / 3)*10}</h3>
                    <h3 className='scoreboard sbl'>Errors: {this.state.greenerror}   <button className="foulbutton button" onClick={this.greenfoul}>Foul</button>: <button className="foulbutton button" onClick={this.greenunfoul}>{this.state.greenfouls}</button></h3>
                  </div>
                </section>
              </div>
            </div>
          </div>
        :
          <div>
            <h2>Test shows that you are not on the profile page. To be replaced with all live scoresheets</h2>
          </div>}

        {this.state.user ?  
          <div className='wrapper'>

          </div>
        :
          <div className='wrapper'>
            <p>You must be logged in to see the other stuff and submit to it.</p>
          </div>
        }           
          {/* <div>placeholder for "Live" Quizzes. All Visitors to the site will be able to view Current "Live" quizzes, as well as past completed Quizzes.</div> */}
          {/* <img src="DatabaseFlowChart.jpg" alt="databaseflowchart.jpg" /> */}
          <br/>
          <section className='display-score'>
            <div className="wrapper">
              <ul>
                {this.state.scorecard.map((score) => {
                return (
                  <li className='smallcard' key={score.id}>
                    <h3>{score.title}</h3>
                    <h4 style={{backgroundColor: score.teamcolor }}>{score.quizzerpad}</h4>
                    <h5>{score.jumptype}</h5>
                    {score.jresult === true ?
                      <h4 style={{backgroundColor: 'green' }}>*</h4>
                    :
                      <h4 style={{backgroundColor: 'red' }}>***</h4>}
                      {score.user === this.state.user.displayName || score.user === this.state.user.email ?
                        <button className='xelement' onClick={() => this.removeItem(score.id)}>X</button> : null}
                  </li>
                )
                })}
              </ul>
            </div>
          </section>
        </div>
      );
  }
}

export default App;
