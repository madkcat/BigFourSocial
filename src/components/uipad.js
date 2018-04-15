import React, { Component } from 'react';
import firebase, { auth, provider } from '../firebase.js';
import uipad from './uipad.js';
export class UIPad extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        this.setState({
          colorjump: this.state.teamcolor
        })
        const scoreRef = firebase.database().ref('scorecard');
        const scoreboardRef = firebase.database().ref('scoreboard');
        var er = -10;
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
        }
        var scoreb = {
        redscorecall: this.state.outsetredscore,
        yellowscorecall: this.state.outsetyellowscore,
        greenscorecall: this.state.outsetgreenscore
        }
        console.log(score.jresult)
        scoreRef.push(score);
        scoreboardRef.push(scoreb);
        var tempred = 0;
        var tempyellow = 0;
        var tempgreen = 0;
        var prered = 0;
        var preyellow = 0;
        var pregreen = 0;
        switch(score.jumptype) {
          case 'regular':
            var rc = 20;
            if(score.jresult === true){
              jcolor = 'green';  
              tempqnumber = this.state.qnumber;
              switch(this.state.teamcolor){
                case 'red':             
                  tempred = this.state.outsetredscore;
                  prered = (tempred + rc);
                  this.setState({
                    outsetredscore: prered,
                  });
                break;
                case 'yellow':
                  tempyellow = this.state.outsetyellowscore;
                  preyellow = (tempyellow + rc);
                  this.setState({
                    outsetyellowscore: preyellow,
                  });
                break;
                case 'green':
                  tempgreen = this.state.outsetgreenscore;
                  pregreen = (tempgreen + rc);
                  this.setState({
                    outsetgreenscore: pregreen,
                  });
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
                  {
                    tempred = this.state.outsetredscore;
                    temperror = this.state.rederror;
                    prered = tempred + er;
                    this.setState({
                      rederror: temperror + 1,
                      redout: true
                    });
                    if (this.state.rederror >= 3){
                      this.setState({
                        outsetredscore: prered,
                      })
                    }
                    else if (this.state.qnumber >= 16){
                      this.setState({
                        outsetredscore: prered,
                      })
                    };
                    break;
                  }
                case 'yellow':
                  {
                    tempyellow = this.state.outsetyellowscore;
                    temperror = this.state.yellowerror;
                    preyellow = tempyellow + er;
                    this.setState({
                      yellowerror: temperror + 1,
                      yellowout: true
                    });
                    if (this.state.yellowerror >= 3){
                      this.setState({
                        outsetyellowscore: preyellow,
                      })
                    }
                    else if (this.state.qnumber >= 16){
                      this.setState({
                        outsetyellowscore: preyellow,
                      })
                    };
                    break;
                  }
                case 'green':
                  {
                    tempgreen = this.state.outsetgreenscore;
                    temperror = this.state.greenerror;
                    pregreen = tempgreen + er;
                    this.setState({
                      greenerror: temperror + 1,
                      greenout: true
                    });
                    if (this.state.greenerror >= 3){
                      this.setState({
                        outsetgreenscore: pregreen,
                      })
                    }
                    else if (this.state.qnumber >= 16){
                      this.setState({
                        outsetgreenscore: pregreen,
                      })
                    };
                    break;
                  }
              if (this.state.twoteam === true){
                this.setState ({
                  jumptype:'free'
                })
              }
              else(
                this.setState({
                  jumptype: 'tossup',
                  wronganswer: true,
                  padnum: null
                }))
            };        
          };
          break;
          case 'tossup': 
            var tc = 20;
            if(score.jresult === true){
              jcolor = 'green';
              tempqnumber = this.state.qnumber;
              switch(this.state.teamcolor){ 
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
                  prered = (tempred + tc);
                  this.setState({
                    rederror: temperror +1,
                    outsetredscore: prered,
                  });
                  if (this.state.rederror >= 3){
                    this.setState({
                      outsetredscore: prered,
                    })
                  }
                  else if (this.state.qnumber >= 16){
                    this.setState({
                      outsetredscore: prered,
                    })
                  };
                break;
                case 'yellow':
                  tempyellow = this.state.yellowscore;
                  temperror = this.state.yellowerror;
                  preyellow = (tempyellow + tc);
                  this.setState({
                    yellowerror: temperror +1,
                    outsetyellowscore: preyellow,
                  });
                  if (this.state.yellowerror >= 3){
                    this.setState({
                      outsetyellowscore: preyellow,
                    })
                  }
                  else if (this.state.qnumber >= 16){
                    this.setState({
                      outsetyellowscore: preyellow,
                    })
                  };
                break;
                case 'green':
                  tempgreen = this.state.greenscore;
                  temperror = this.state.greenerror;
                  pregreen = (tempgreen + tc);
                  this.setState({
                    greenerror: temperror +1,
                    outsetgreenscore: pregreen,
                  });
                  if (this.state.greenerror >= 3){
                    this.setState({
                      outsetgreenscore: pregreen,
                    })
                  }
                  else if (this.state.qnumber >= 16){
                    this.setState({
                      outsetgreenscore: pregreen,
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
              var tt = 1;}
            else(
              fc = 10,
              tt = 0
              );
            if(score.jresult === true){
              jcolor = 'green';
              tempqnumber = this.state.qnumber;
              switch(this.state.teamcolor){
                default : break;
                case 'red':             
                  tempred = this.state.outsetredscore;
                  prered = (tempred + fc);
                  this.setState({
                    outsetredscore: prered,
                  });
                break;
                case 'yellow':
                  tempyellow = this.state.outsetyellowscore;
                  preyellow = (tempyellow + fc);
                  this.setState({
                    outsetyellowscore: preyellow,
                  });
                break;
                case 'green':
                  tempgreen = this.state.outsetgreenscore;
                  pregreen = (tempgreen + fc);
                  this.setState({
                    outsetgreenscore: pregreen,
                  });
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
              jcolor: '',
            
            })
          break;
          }      
          // console.log(this.state.redscore);
          // console.log(this.state.yellowscore);
          // console.log(this.state.greenscore);
        //   this.validateredscore;
        //   this.validateyellowscore;
        //   this.validategreenscore;
        }
    }

    export var er = -10