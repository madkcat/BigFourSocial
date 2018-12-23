// import React, { Component } from 'react';
// import {Link} from 'react-router';
// import checkAuth from '../requireAuth';
// import './App.css';
// import firebase, { auth, provider } from '../../config.js';
// import { UIPad } from './components/uipad';
// import { UIPad } from './components/uipad.js';
class CoreApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      twoteam: false,
      teamselect: false,
      notoss: false,
      quizzerpad: '',
      qnumber: 1,
      jumptype: 'regular',
      jresult: true,
      jcase: '',
      jcolor: '',
      username: '',
      scorecard: [],
      scoreboard:[],
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
      redfoulscore:0,
      redout: false,
      reddisplay: 0,
      outsetredscore: 0,
      red1:0,
      red2:0,
      red3:0,
      red4:0,
      red5:0,
      red6:0,
      red7:0,
      yellowscore: 0,
      yellowerror: 0,
      yellowfouls: 0,
      yellowfoulscore:0,
      yellowout: false,
      outsetyellowscore: 0,
      yellow1:0,
      yellow2:0,
      yellow3:0,
      yellow4:0,
      yellow5:0,
      yellow6:0,
      yellow7:0,
      greenscore: 0,
      greenerror: 0,
      greenfouls: 0,
      greenfoulscore:0,
      greenout: false,
      outsetgreenscore: 0,
      green1:0,
      green2:0,
      green3:0,
      green4:0,
      green5:0,
      green6:0,
      green7:0
    };
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
    this.challengeappeal = this.challengeappeal.bind(this);
    this.validateredscore = this.validateredscore.bind(this);
    this.validateyellowscore = this.validateyellowscore.bind(this);
    this.validategreenscore = this.validategreenscore.bind(this);
    this.twoteam = this.twoteam.bind(this);
    this.threeteam = this.threeteam.bind(this);
    this.AACS = this.AACS.bind(this);
    this.Spectacular = this.Spectacular.bind(this);
    this.training = this.training.bind(this);
 
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
    });
    const scoreRef = firebase.database().ref('scorecard');
    const scoreboardRef = firebase.database().ref('scoreboard');
    const er = -10;
    var fc = 0;
    var tt = 0;
    let temperror = 0;
    let tempqnumber = 0;
    // let jcase = '';
    let jcolor = '';
    let score = {
      title: this.state.qnumber,
      teamcolor: this.state.teamcolor,
      quizzerpad: this.state.padnum,
      jumptype: this.state.jumptype,
      jresult: this.state.jresult,
      jcolor: jcolor,
      openredscore: this.state.outsetredscore,
      openyellowscore: this.state.outsetyellowscore,
      opengreenscore: this.state.outsetgreenscore,
      redscore: this.state.redscore,
      rederror: this.state.rederror,
      redfoul: this.state.redfouls,
      yellowscore: this.state.yellowscore,
      yellowerror: this.state.yellowerror,
      yellowfoul: this.state.yellowfouls,
      greenscore: this.state.greenscore,
      greenerror: this.state.greenerror,
      greenfoul: this.state.greenfouls,
      user: this.state.user.displayName || this.state.user.email
    };
    let scoreb = {
      redscore: this.state.outsetredscore,
      yellowscore: this.state.outsetyellowscore,
      greenscore: this.state.outsetgreenscore
    };
    scoreRef.push(score);
    scoreboardRef.push(scoreb);
    let tempred = 0;
    let tempyellow = 0;
    let tempgreen = 0;
    let prered = 0;
    let preyellow = 0;
    let pregreen = 0;
    if (this.state.notoss === true){
      this.setState({
        outsetredscore: 40,
        outsetyellowscore:40,
        outsetgreenscore: 40
      });
    }
    switch (score.jumptype) {
      case "regular":
        let rc = 20;
        if (score.jresult === true) {
          jcolor = 'green';
          tempqnumber = this.state.qnumber;
          switch (this.state.teamcolor) {
            default:
              console.log('last or first error message, you pick');
              break;
            case 'red':
              tempred = this.state.outsetredscore;
              prered = (tempred + rc);
              this.setState({
                outsetredscore: prered
              });
              break;
            case 'yellow':
              tempyellow = this.state.outsetyellowscore;
              preyellow = (tempyellow + rc);
              this.setState({
                outsetyellowscore: preyellow
              });
              break;
            case 'green':
              tempgreen = this.state.outsetgreenscore;
              pregreen = (tempgreen + rc);
              this.setState({
                outsetgreenscore: pregreen
              });
              break;
          }
          this.setState({
            qnumber: tempqnumber + 1,
            jumptype: 'regular',
            wronganswer: false,
            wronganswer2: false,
            quizzerpad: '',
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
          switch (this.state.teamcolor) {
            default:
              console.log('insert default message');
              break;
            case 'red':
            if (this.state.notoss === true){
              tempred = this.state.outsetredscore;
                temperror = this.state.rederror;
                prered = tempred + er;
                this.setState({
                  rederror: temperror + 1,
                  redout: true
                });
            }
            else
              {
                tempred = this.state.outsetredscore;
                temperror = this.state.rederror;
                prered = tempred + er;
                this.setState({
                  rederror: temperror + 1,
                  redout: true
                });
                if (this.state.rederror >= 3) {
                  this.setState({
                    outsetredscore: prered
                  });
                }
                else if (this.state.qnumber >= 16) {
                  this.setState({
                    outsetredscore: prered
                  });
                }
                break;
              }
              break;
            case 'yellow':
            if (this.state.notoss === true){
              tempyellow = this.state.outsetyellowscore;
                temperror = this.state.yellowerror;
                preyellow = tempyellow + er;
                this.setState({
                  yellowerror: temperror + 1,
                  yellowout: true
                });
            }
            else
              {
                tempyellow = this.state.outsetyellowscore;
                temperror = this.state.yellowerror;
                preyellow = tempyellow + er;
                this.setState({
                  yellowerror: temperror + 1,
                  yellowout: true
                });
                if (this.state.yellowerror >= 3) {
                  this.setState({
                    outsetyellowscore: preyellow
                  });
                }
                else if (this.state.qnumber >= 16) {
                  this.setState({
                    outsetyellowscore: preyellow
                  });
                }
                break;
              }
              break;
            case 'green':
            if (this.state.notoss === true){
              tempgreen = this.state.outsetgreenscore;
                temperror = this.state.greenerror;
                pregreen = tempgreen + er;
                this.setState({
                  greenerror: temperror + 1,
                  greenout: true
                });
            }
            else
              {
                tempgreen = this.state.outsetgreenscore;
                temperror = this.state.greenerror;
                pregreen = tempgreen + er;
                this.setState({
                  greenerror: temperror + 1,
                  greenout: true
                });
                if (this.state.greenerror >= 3) {
                  this.setState({
                    outsetgreenscore: pregreen
                  });
                }
                else if (this.state.qnumber >= 16) {
                  this.setState({
                    outsetgreenscore: pregreen
                  });
                }
                break;
              }
          }
          if (this.state.twoteam === true) {
            this.setState({
              jumptype: 'free'
            });
          }
          else (
            this.setState({
              jumptype: 'tossup',
              wronganswer: true,
              padnum: null
            })
          );
        }
        break;
      case 'tossup':
        let tc = 20;
        if (score.jresult === true) {
          jcolor = 'green';
          tempqnumber = this.state.qnumber;
          switch (this.state.teamcolor) {
            default:
              console.log('no team color picked');
              break;
            case 'red':
              tempred = this.state.outsetredscore;
              prered = (tempred + tc);
              this.setState({
                outsetredscore: prered
              });
              break;
            case 'yellow':
              tempyellow = this.state.outsetyellowscore;
              preyellow = (tempyellow + tc);
              this.setState({
                outsetyellowscore: preyellow
              });
              break;
            case 'green':
              tempgreen = this.state.outsetgreenscore;
              pregreen = (tempgreen + tc);
              this.setState({
                outsetgreenscore: pregreen
              });
              break;
          }
          this.setState({
            qnumber: tempqnumber + 1,
            jumptype: 'regular',
            wronganswer: false,
            wronganswer2: false,
            quizzerpad: '',
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
          switch (this.state.teamcolor) {
            default:
              console.log('no team color chosen');
              break;
            case 'red':
              tempred = this.state.outsetredscore;
              temperror = this.state.rederror;
              prered = tempred;
              this.setState({
                rederror: temperror + 1,
                redout: true
              });
              if (this.state.rederror >= 3) {
                this.setState({
                  outsetredscore: prered + er
                });
              }
              else if (this.state.qnumber >= 16) {
                this.setState({
                  outsetredscore: prered + er
                });
              }
              break;
            case 'yellow':
              tempyellow = this.state.outsetyellowscore;
              temperror = this.state.yellowerror;
              preyellow = tempyellow;
              this.setState({
                yellowerror: temperror + 1,
                yellowout: true
              });
              if (this.state.yellowerror >= 3) {
                this.setState({
                  outsetyellowscore: preyellow + er
                });
              }
              else if (this.state.qnumber >= 16) {
                this.setState({
                  outsetyellowscore: preyellow + er
                });
              }
              break;
            case 'green':
              tempgreen = this.state.outsetgreenscore;
              temperror = this.state.greenerror;
              pregreen = tempgreen;
              this.setState({
                greenerror: temperror + 1,
                greenout: true
              });
              if (this.state.greenerror >= 3) {
                this.setState({
                  outsetgreenscore: pregreen + er
                });
              }
              else if (this.state.qnumber >= 16) {
                this.setState({
                  outsetgreenscore: pregreen + er
                });
              }
              break;
          }
          this.setState({
            jumptype: 'free',
            teamcolor: null,
            quizzerpad: '',
            wronganswer: true,
            wronganswer2: true,
            padnum: null
          });
        }
        break;
      case 'free':
        if (this.state.twoteam === true) {
          fc = 20; 
          tt = 1;
          console.log(fc);
          console.log(tt);
        }
        else if (this.state.twoteam === false){
          fc = 10;
          tt = 0;
          console.log(fc);
          console.log(tt);
        }
        tempqnumber = this.state.qnumber;
        if (score.jresult === true) {
          jcolor = 'green';
          switch (this.state.teamcolor) {
            default:
              console.log('no team color registered');
              break;
            case 'red':
              tempred = this.state.outsetredscore;
              prered = (tempred + fc);
              this.setState({
                outsetredscore: prered
              });
              break;
            case 'yellow':
              tempyellow = this.state.outsetyellowscore;
              preyellow = (tempyellow + fc);
              this.setState({
                outsetyellowscore: preyellow
              });
              break;
            case 'green':
              tempgreen = this.state.outsetgreenscore;
              pregreen = (tempgreen + fc);
              this.setState({
                outsetgreenscore: pregreen
              });
              break;
          }
          this.setState({
            quizzerpad: '',
            username: [this.state.user.displayName || this.state.user.email]
          });
        }
        else {
          jcolor = 'red';
          this.setState({
            jcolor: jcolor
          });
        }
        this.setState({
          qnumber: tempqnumber + tt,
          jumptype: 'regular',
          quizzerpad: '',
          wronganswer: false,
          wronganswer2: false,
          teamcolor: null,
          redout: false,
          yellowout: false,
          greenout: false,
          padnum: null,
          jcolor: ''

        });
        break;    
      default:
        console.log('no pad registered');
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
        this.setState({
          openredscore: scorecard[score].openredscore
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
  redfoul() {
    const scoreboardRef = firebase.database().ref('scoreboard');
    let tempfoul = this.state.redfouls;
    this.setState({
      redfouls: tempfoul + 1
    });
    tempfoul = tempfoul +1;
    let tempfoulscore = (Math.floor(tempfoul/3)*-10);
    console.log(tempfoulscore);
    this.setState({
      redfoulscore: tempfoulscore
    });
    let tempscore = this.state.outsetredscore + this.state.redfoulscore;
    this.setState({
      redscore:tempscore
    });
    let scoreb = {
      redscore: tempscore
    };
    scoreboardRef.push(scoreb);
  }

  yellowfoul() {
    const scoreboardRef = firebase.database().ref('scoreboard');
    let tempfoul = this.state.yellowfouls;
    this.setState({
      yellowfouls: tempfoul + 1
    });
    tempfoul = tempfoul +1;
    let tempfoulscore = (Math.floor(tempfoul/3)*-10);
    console.log(tempfoulscore);
    this.setState({
      yellowfoulscore: tempfoulscore
    });
    let tempscore = this.state.outsetyellowscore + this.state.yellowfoulscore;
    this.setState({
      yellowscore:tempscore
    });
    let scoreb = {
      yellowscore: tempscore
    };
    scoreboardRef.push(scoreb);
  }

  greenfoul() {
    const scoreboardRef = firebase.database().ref('scoreboard');
    let tempfoul = this.state.greenfouls;
    this.setState({
      greenfouls: tempfoul + 1
    });
    tempfoul = tempfoul +1;
    let tempfoulscore = (Math.floor(tempfoul/3)*-10);
    console.log(tempfoulscore);
    this.setState({
      greenfoulscore: tempfoulscore
    });
    let tempscore = this.state.outsetgreenscore + this.state.greenfoulscore;
    this.setState({
      greenscore:tempscore
    });
    let scoreb = {
      greenscore: tempscore
    };
    scoreboardRef.push(scoreb);
  }

  redunfoul() {
    let tempfoul = this.state.redfouls;
    if(tempfoul-1<=0){
      this.setState({
        redfouls:0
      });
    }
    else {
      tempfoul = this.state.redfouls -1;
      this.setState({
        redfouls: tempfoul
      });
    }
    let tempfoulscore = (Math.floor(tempfoul/3)*-10);
    this.setState({
      redfoulscore: tempfoulscore
    });
    let tempscore = this.state.outsetredscore + this.state.redfoulscore;
    this.setState({
      redscore:tempscore
    });
  }
  
  yellowunfoul() {
    let tempfoul = this.state.yellowfouls;
    if(tempfoul-1<=0){
      this.setState({
        yellowfouls:0
      });
    }
    else {
      tempfoul = this.state.yellowfouls -1;
      this.setState({
        yellowfouls: tempfoul
      });
    }
    let tempfoulscore = (Math.floor(tempfoul/3)*-10);
    this.setState({
      yellowfoulscore: tempfoulscore
    });
    let tempscore = this.state.outsetyellowscore + this.state.yellowfoulscore;
    this.setState({
      yellowscore:tempscore
    });
  }

  greenunfoul() {
    let tempfoul = this.state.greenfouls;
    if(tempfoul-1<=0){
      this.setState({
        greenfouls:0
      });
    }
    else {
      tempfoul = this.state.greenfouls -1;
      this.setState({
        greenfouls: tempfoul
      });
    }
    let tempfoulscore = (Math.floor(tempfoul/3)*-10);
    this.setState({
      greenfoulscore: tempfoulscore
    });
    let tempscore = this.state.outsetgreenscore + this.state.greenfoulscore;
    this.setState({
      greenscore:tempscore
    });
  }

  correctguess() {
    let tempr = this.state.outsetredscore + this.state.redfoulscore;
    let tempy = this.state.outsetyellowscore + this.state.yellowfoulscore;
    let tempg = this.state.outsetgreenscore + this.state.greenfoulscore;
    
    this.setState({
      jresult: true,
      redscore:tempr,
      yellowscore:tempy,
      greenscore:tempg
    });
    console.log(this.state.jresult);
  }
  incorrectguess() {
    let tempr = this.state.outsetredscore + this.state.redfoulscore;
    let tempy = this.state.outsetyellowscore + this.state.yellowfoulscore;
    let tempg = this.state.outsetgreenscore + this.state.greenfoulscore;
    
    this.setState({
      jresult: false,
      redscore:tempr,
      yellowscore:tempy, 
      greenscore:tempg
    });
    console.log(this.state.jresult);
  }
  pass() {
    let tempqnumber = this.state.qnumber;
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
    });
  }
  twoteam() {
    this.setState({
      twoteam: true,
      teamselect: true
    });
  }
  threeteam() {
    this.setState({
      teamselect: true
    });
  }
  AACS() {
    this.setState({
      quiztype: true
    });
  }
  Spectacular() {
    this.setState({
      notoss: true,
      quiztype: true
    });
  }
  training() {
    this.setState({
      quiztype: true
    });
  }
  challengeappeal() {
    this.setState({
      twoteam: true,
      hidebutt: true
    });
  }
  validateredscore() {
    let tempredscore = this.state.redscore;
    //  - Math.floor(this.state.redfoul / 3)*10);
    if (tempredscore >= 1) {
      this.setState({
        outsetredscore: tempredscore
      });
    }
    else (
      this.setState({
        outsetredscore: 0
      })
    );
  }
  validateyellowscore() {
    let tempyellowscore = (this.state.yellowscore - Math.floor(this.state.yellowfoul / 3) * 10);
    if (tempyellowscore >= 1) {
      this.setState({
        outsetyellowscore: tempyellowscore
      });
    }
    else (
      this.setState({
        outsetyellowscore: 0
      })
    );
  }
  validategreenscore() {
    let tempgreenscore = (this.state.greenscore - Math.floor(this.state.greenfoul / 3) * 10);
    if (tempgreenscore >= 1) {
      this.setState({
        outsetgreenscore: tempgreenscore
      });
    }
    else (
      this.setState({
        outsetgreenscore: 0
      })
    );
  }
  displayredscore() {
    const scoreRef = firebase.database().ref('scoredisplay');
    let newState = [];
    this.setState({
      reddisplay: this.state.outsetredscore
    });
    newState.push({
      reddisplay: this.state.outsetredscore
    });
    this.setState({
      scorecard: newState
    });

    scoreRef.on('value', (snapshot) => {
      let scorecard = snapshot.val();
    });

  }
}
export default CoreApp;
