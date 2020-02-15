/********************************************************************
**  Description:  Desktop layout component
********************************************************************/

// @ts-check

import React from 'react';
import firebase, { auth, provider } from './firebase.js';
import './App.css';
import './ScorekeeperDesktopView.css';
import './media-query.css';
import CustomUploadButton from 'react-firebase-file-uploader/lib/CustomUploadButton';


class ScorekeeperView extends React.Component {
   constructor(props) {
      super(props);
         this.state = {
            user: null,
            
            pageset: null,
            lastpage: null,
            
            quiztype: false,
            notoss: false,

            twoteam: false,
            teamselect: false,
            teaminput: false,
            
            quizid: null,
            description: '',
            redid: '',
            yellowid: '',
            greenid: '',
            
            colorjump: [],
            score: null,

            qnumber: 1,
            teamcolor: null,
            padnum: null,
            jumptype: 'regular',
            jresult: true,
            jcolor: '',
            outsetredscore: 0,
            outsetyellowscore: 0,
            outsetgreenscore: 0,
            redscore: 0,
            rederror: 0,
            redfouls: 0,
            yellowscore: 0,
            yellowerror: 0,
            yellowfouls: 0,
            greenscore: 0,
            greenerror: 0,
            greenfouls: 0,


            
            TourneyIDItem: '',
            items: [],            
            scorekeeperpad: false,
            username: '',            
            authtype: null,
            wronganswer: false,
            wronganswer2: false,
            quizzerpad: '',
            jcase: '',
            scorecard: [],
            scoreboard:[],
            thisfoul: 0,
            redfoulscore:0,
            redout: false,
            reddisplay: 0,
            red1:0,
            red2:0,
            red3:0,
            red4:0,
            red5:0,
            red6:0,
            red7:0,
            yellowfoulscore:0,
            yellowout: false,
            yellow1:0,
            yellow2:0,
            yellow3:0,
            yellow4:0,
            yellow5:0,
            yellow6:0,
            yellow7:0,
            greenfoulscore:0,
            greenout: false,
            green1:0,
            green2:0,
            green3:0,
            green4:0,
            green5:0,
            green6:0,
            green7:0,
            profileIO:null
         }
         this.keepscoreout = this.keepscoreout.bind(this);
         this.keepscorein = this.keepscorein.bind(this);
         
         this.profileout = this.profileout.bind(this);
         this.profilein = this.profilein.bind(this);
         
         this.AACS = this.AACS.bind(this);
         this.Spectacular = this.Spectacular.bind(this);
         this.training = this.training.bind(this);

         this.twoteam = this.twoteam.bind(this);
         this.threeteam = this.threeteam.bind(this);         

         this.handleStartQuizSubmit = this.handleStartQuizSubmit.bind(this);

         this.endquiz = this.endquiz.bind(this);

         this.handleSubmit = this.handleSubmit.bind(this);

         this.handletcOptionChange = this.handletcOptionChange.bind(this); //Handles Team Color Change
         this.handlenumOptionChange = this.handlenumOptionChange.bind(this);// Handles Correct/Incorrect         

         this.correctguess = this.correctguess.bind(this);
         this.incorrectguess = this.incorrectguess.bind(this);
         
         
         this.handleChange = this.handleChange.bind(this);// Currently unused, but saved just in case
         this.handlerOptionChange = this.handlerOptionChange.bind(this);// Currently unused, but saved just in case
         this.redfoul = this.redfoul.bind(this);
         this.yellowfoul = this.yellowfoul.bind(this);
         this.greenfoul = this.greenfoul.bind(this);
         this.redunfoul = this.redunfoul.bind(this);
         this.yellowunfoul = this.yellowunfoul.bind(this);
         this.greenunfoul = this.greenunfoul.bind(this);
         this.pass = this.pass.bind(this);
         
         this.challengeappeal = this.challengeappeal.bind(this);
         this.validateredscore = this.validateredscore.bind(this);
         this.validateyellowscore = this.validateyellowscore.bind(this);
         this.validategreenscore = this.validategreenscore.bind(this);
         
   }

   
   keepscoreout() {
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

   profileout() {
      const pageset = this.lastpage;
      this.setState({
         pageset
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

   AACS() {
      this.setState({
         quiztype: true
      })
   }

   Spectacular() {
      this.setState({
         notoss: true,
         quiztype: true
      })
   }

   training() {
      this.setState({
         quiztype: true,
      })
   }

   twoteam() {
      this.setState({
         twoteam: true,
         teamselect: true,
         teaminput: true
      })
   }

   threeteam() {
      this.setState({
         teamselect: true,
         teaminput: true
      })
   }

   handleStartQuizSubmit(e) {
      e.preventDefault();
      const itemsRef = firebase.database().ref('items');

      const item = {
          title: this.state.quizid,
          user: this.state.user.displayName || this.state.user.email,
          description: this.state.QuizRoomItem,
          redteamid: this.state.redid,
          yellowteamid: this.state.yellowid,
          greenteamid: this.state.greenid
      };
      itemsRef.push(item);
      this.setState({
          quizid: '',
          username: '',
          QuizRoomItem: '',
          redid: '',
          yellowid: '',
          greenid: '',
          teaminput: false,
          scorekeeperpad: true 
      });
  }

  myChangeHandler = (event) => {
   let nam = event.target.name;
   let val = event.target.value;
   if (nam === "testphrase") {
     if (!Number(val)) {
       alert("Your testphrase event must be a number");
     }
   }
   this.setState({[nam]: val});
 }

 endquiz(){
   this.setState({
     quiztype: false,
     twoteam: false,
     teamselect: false,
     teaminput: false,
     scorekeeperpad: false,
     wronganswer: false,
         wronganswer2: false,
         teamcolor: null,
         padnum: null,
         redid: '',
         greenid: '',
         yellowid: '',
         notoss: false,
         quizzerpad: '',
         qnumber: 1,
         jumptype: 'regular',
         jresult: true,
         jcase: '',
         jcolor: '',
         scorecard: [],
         scoreboard:[],
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
   })
}

handleSubmit(e) {
   e.preventDefault();
   
   const scoreRef = firebase.database().ref('scorecard');
   const scoreboardRef = firebase.database().ref('scoreboard');
   var er = -10;
   var temperror = 0;
   var tempqnumber = 0;
   // var jcase = '';
   this.setState({
      colorjump: this.state.teamcolor,
      score : {
         title: this.state.qnumber,
         teamcolor: this.state.teamcolor,
         quizzerpad: this.state.padnum,
         jumptype: this.state.jumptype,
         jresult: this.state.jresult,
         jcolor: this.state.jcolor,
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
})
   var scoreb = {
      redscore: this.state.outsetredscore,
      yellowscore: this.state.outsetyellowscore,
      greenscore: this.state.outsetgreenscore
   }
   scoreRef.push(this.state.score);
   scoreboardRef.push(scoreb);
   var tempred = 0;
   var tempyellow = 0;
   var tempgreen = 0;
   var prered = 0;
   var preyellow = 0;
   var pregreen = 0;
   if (this.state.notoss === true){
      this.setState({
      outsetredscore: 40,
      outsetyellowscore:40,
      outsetgreenscore: 40
      })
   };
   switch (this.state.score.jumptype) {
      default:
         console.log('no pad registered');
         break;
      case 'regular':
         var rc = 20;
         if (this.state.score.jresult === true) {
            this.state.jcolor = 'green';
            tempqnumber = this.state.qnumber;
            switch (this.state.teamcolor) {
            default:
               console.log('last or first error message, you pick');
               break;
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
            this.state.jcolor = 'red';
            switch (this.state.teamcolor) {
               default:
                  console.log('insert default message')
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
                           outsetredscore: prered,
                        })
                     }
                     else if (this.state.qnumber >= 16) {
                        this.setState({
                           outsetredscore: prered,
                        })
                     };
                 break;
               }
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
                           outsetyellowscore: preyellow,
                        })
                     }
                     else if (this.state.qnumber >= 16) {
                        this.setState({
                           outsetyellowscore: preyellow,
                        })
                     };
                     break;
                  }
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
                           outsetgreenscore: pregreen,
                        })
                     }
                     else if (this.state.qnumber >= 16) {
                        this.setState({
                           outsetgreenscore: pregreen,
                        })
                     };
                     break;
                  }
            };
            if (this.state.twoteam === true) {
              this.setState({
                 jumptype: 'free'
              })
            }
            else (
              this.setState({
                 jumptype: 'tossup',
                 wronganswer: true,
                 padnum: null
              })
            )
         };
         break;
      case 'tossup':
         var tc = 20;
         if (this.state.score.jresult === true) {
            this.state.jcolor = 'green';
            tempqnumber = this.state.qnumber;
            switch (this.state.teamcolor) {
               default:
                  console.log('no team color picked')
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
            this.state.jcolor = 'red';
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
                        outsetredscore: prered + er,
                     })
                  }
                  else if (this.state.qnumber >= 16) {
                     this.setState({
                        outsetredscore: prered + er,
                     })
                  };
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
                       outsetyellowscore: preyellow + er,
                     })
                  }
                  else if (this.state.qnumber >= 16) {
                     this.setState({
                        outsetyellowscore: preyellow + er,
                     })
                  };
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
                        outsetgreenscore: pregreen + er,
                     })
                  }
                  else if (this.state.qnumber >= 16) {
                     this.setState({
                        outsetgreenscore: pregreen + er,
                     })
                  };
                  break;
            }
            this.setState({
               jumptype: 'free',
               teamcolor: null,
               quizzerpad: '',
               wronganswer: true,
               wronganswer2: true,
               padnum: null
            })
         }; 
         break;
      case 'free':
         if (this.state.twoteam === true) {
            var fc = 20;
            var tt = 1;
            console.log(fc);
            console.log(tt);
         }
         else if (this.state.twoteam === false){
            fc = 10;
            tt = 0;
            console.log(fc);
            console.log(tt);
         };
         tempqnumber = this.state.qnumber;
         if (this.state.score.jresult === true) {
            this.state.jcolor = 'green';
            switch (this.state.teamcolor) {
               default:
                  console.log('no team color registered');
                  break;
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
               quizzerpad: '',
               username: [this.state.user.displayName || this.state.user.email]
            });
         } 
         else {
            this.state.jcolor = 'red';
            this.setState({
               jcolor: this.state.jcolor
            })
         };
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
            jcolor: '',
         })
         break;
   }
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

correctguess() {
   var tempr = this.state.outsetredscore + this.state.redfoulscore;
   var tempy = this.state.outsetyellowscore + this.state.yellowfoulscore;
   var tempg = this.state.outsetgreenscore + this.state.greenfoulscore
     
   this.setState({
      jresult: true,
      redscore:tempr,
      yellowscore:tempy,
      greenscore:tempg
   })
   console.log(this.state.jresult);
}

incorrectguess() {
   var tempr = this.state.outsetredscore + this.state.redfoulscore;
   var tempy = this.state.outsetyellowscore + this.state.yellowfoulscore;
   var tempg = this.state.outsetgreenscore + this.state.greenfoulscore
   
   this.setState({
      jresult: false,
      redscore:tempr,
      yellowscore:tempy,
      greenscore:tempg
   })
   console.log(this.state.jresult);
}

   handleChange(e) {
      this.setState({
         [e.target.name]: e.target.value
      });
   }
   
   handlerOptionChange(e) {
      this.setState({
         jresult: e.target.value
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
        // const scoreboardRef = firebase.database().ref('scoreboard');
        // scoreboardRef.on('value',(snapshot) =>{
        //   let scoreboard = snapshot.val();
        //   let newState = [];
        //   for (let scoreb in scoreboard){
        //     newState.push({
        //       redscore: scoreboard[scoreb].redscore,
        //       yellowscore: scoreboard[scoreb].yellowscore,
        //       greenscore: scoreboard[scoreb].greenscore          
        //     });
        //     this.setState({
        //       redscore: scoreboard[scoreb].redscore,
        //       yellowscore: scoreboard[scoreb].yellowscore,
        //       greenscore: scoreboard[scoreb].greenscore          
        //     })
        //   }
        
        //   this.setState({
        //     scoreboard:newState
        //   })  
        // })
        
      // componentDidMountex() {
      //   auth.onAuthStateChanged((user) => {
      //     if (user) {
      //       this.setState({ user });
      //     } 
      //   });
      //   const scoreRef = firebase.database().ref('scoredisplay');
      //   scoreRef.on('value', (snapshot) => {
      //     let scorecard = snapshot.val();
      //     let newState = [];
      //     for (let score in scorecard) {
      //       newState.push({
      //         id: score,
      //         title: scorecard[score].title,
      //         teamcolor: scorecard[score].teamcolor,
      //         quizzerpad: scorecard[score].quizzerpad,
      //         jumptype: scorecard[score].jumptype,
      //         jresult: scorecard[score].jresult,
      //         user: scorecard[score].user,
      //         openredscore: scorecard[score].openredscore,
      //         openyellowscore: scorecard[score].openyellowscore,
      //         opengreenscore: scorecard[score].opengreenscore
      //       });
      //     }
      //     this.setState({
      //       scorecard: newState
      //     });      
      //   });
      // }
   removeItem(scoreID) {
      const scoreRef = firebase.database().ref(`/scorecard/${scoreID}`);
      scoreRef.remove();
   }

   redfoul() {
      const scoreboardRef = firebase.database().ref('scoreboard');
      var tempfoul = this.state.redfouls;
      this.setState({
         redfouls: tempfoul + 1
      })
      tempfoul = tempfoul +1;
      var tempfoulscore = (Math.floor(tempfoul/3)*-10)
      console.log(tempfoulscore)
      this.setState({
         redfoulscore: tempfoulscore
      })
      var tempscore = this.state.outsetredscore + this.state.redfoulscore;
      this.setState({
         redscore:tempscore
      })
      var scoreb = {
         redscore: tempscore
      }
      scoreboardRef.push(scoreb);
   }
    
   yellowfoul() {
      const scoreboardRef = firebase.database().ref('scoreboard');
      var tempfoul = this.state.yellowfouls;
      this.setState({
         yellowfouls: tempfoul + 1
      })
      tempfoul = tempfoul +1;
      var tempfoulscore = (Math.floor(tempfoul/3)*-10)
      console.log(tempfoulscore)
      this.setState({
         yellowfoulscore: tempfoulscore
      })
      var tempscore = this.state.outsetyellowscore + this.state.yellowfoulscore;
      this.setState({
         yellowscore:tempscore
      })
      var scoreb = {
         yellowscore: tempscore
      }
      scoreboardRef.push(scoreb);
   }
    
   greenfoul() {
      const scoreboardRef = firebase.database().ref('scoreboard');
      var tempfoul = this.state.greenfouls;
      this.setState({
         greenfouls: tempfoul + 1
      })
      tempfoul = tempfoul +1;
      var tempfoulscore = (Math.floor(tempfoul/3)*-10)
      console.log(tempfoulscore)
      this.setState({
         greenfoulscore: tempfoulscore
      })
      var tempscore = this.state.outsetgreenscore + this.state.greenfoulscore;
      this.setState({
         greenscore:tempscore
      })
      var scoreb = {
         greenscore: tempscore
      }
      scoreboardRef.push(scoreb);
   }
    
   redunfoul() {
      var tempfoul = this.state.redfouls;
      if(tempfoul-1<=0){
         this.setState({
            redfouls:0
         })
      }
      else {
         tempfoul = this.state.redfouls -1;
         this.setState({
            redfouls: tempfoul
         })
      };
      var tempfoulscore = (Math.floor(tempfoul/3)*-10)
      this.setState({
         redfoulscore: tempfoulscore
      });
      var tempscore = this.state.outsetredscore + this.state.redfoulscore;
      this.setState({
         redscore:tempscore
      })
   }
      
   yellowunfoul() {
      var tempfoul = this.state.yellowfouls;
      if(tempfoul-1<=0){
         this.setState({
            yellowfouls:0
         })
      }
      else {
         tempfoul = this.state.yellowfouls -1;
         this.setState({
            yellowfouls: tempfoul
         })
      };
      var tempfoulscore = (Math.floor(tempfoul/3)*-10)
      this.setState({
         yellowfoulscore: tempfoulscore
      });
      var tempscore = this.state.outsetyellowscore + this.state.yellowfoulscore;
      this.setState({
         yellowscore:tempscore
      })
   }
    
   greenunfoul() {
      var tempfoul = this.state.greenfouls;
      if(tempfoul-1<=0){
         this.setState({
            greenfouls:0
         })
      }
      else {
         tempfoul = this.state.greenfouls -1;
         this.setState({
            greenfouls: tempfoul
         })
      };
      var tempfoulscore = (Math.floor(tempfoul/3)*-10)
      this.setState({
         greenfoulscore: tempfoulscore
      });
      var tempscore = this.state.outsetgreenscore + this.state.greenfoulscore;
      this.setState({
         greenscore:tempscore
      })
   }
    
   

   

   pass() {
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

   



   
   challengeappeal() {
      this.setState({
         twoteam: true,
         hidebutt: true
      })
   }

   validateredscore() {
      var tempredscore = this.state.redscore;
        //  - Math.floor(this.state.redfoul / 3)*10);
      if (tempredscore >= 1) {
         this.setState({
            outsetredscore: tempredscore
         })
      }
      else (
         this.setState({
            outsetredscore: 0
         })
      );
   }

   validateyellowscore() {
      var tempyellowscore = (this.state.yellowscore - Math.floor(this.state.yellowfoul / 3) * 10);
      if (tempyellowscore >= 1) {
         this.setState({
            outsetyellowscore: tempyellowscore
         })
      }
      else (
         this.setState({
            outsetyellowscore: 0
         })
      );
   }

   validategreenscore() {
      var tempgreenscore = (this.state.greenscore - Math.floor(this.state.greenfoul / 3) * 10);
      if (tempgreenscore >= 1) {
         this.setState({
            outsetgreenscore: tempgreenscore
         })
      }
      else (
         this.setState({
            outsetgreenscore: 0
         })
      );
   }

   displayredscore() {
      const scoreRef = firebase.database().ref('scoredisplay');
      var newState = [];
      this.setState({
         reddisplay: this.state.outsetredscore
      })
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


  render() {
    let profileIO = null;
    if (this.state.user) {
      profileIO = 
        <div className='scoreandprofile'>
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
        </div>}
    else profileIO = null;
        
      return (      
        <div className='app'>
          {this.state.user ?
            <div className='keepscoreprofile'>
              {(this.state.pageset === 'scorekeeper') ?
                <button className='keepscorebutton' onClick={this.keepscoreout}>Return</button>
              :
                <button className='keepscorebutton' onClick={this.keepscorein}>Keep Score</button>
              }
              {(this.state.pageset === 'profile') ?
              
                <button onClick={this.profileout} className="profilebutton">
                  <img src={this.state.user.photoURL} alt="UserGooglePhoto" />
                  <h3 id = "userNameTag">
                    {this.state.user.displayName || this.state.user.email}{' '}
                  </h3>
                </button>
              
              :
                <button onClick={this.profilein} className="profilebutton">
                  <img src={this.state.user.photoURL} alt="UserGooglePhoto" />
                  <h3 id = "userNameTag">
                    {this.state.user.displayName || this.state.user.email}{' '}
                  </h3>
                </button>
              }
            </div>
          :
            null
          }
          {(this.state.pageset === 'profile') ?
            <section className='add-item'>
              <h1>This shows you are now veiwing the profile page. To be developed to the profile page</h1>
              <h1> Raw information: {this.state.user.displayName} </h1>                
            </section>
          :
          (this.state.pageset === 'scorekeeper') ?
            <section className='add-item'>
              <div className='container cibox'>
                {(this.state.quiztype === false) ?
                  <div className='quiztype'>
                    <button className='quiztypebutton AACS' onClick={this.AACS}>AACS Rules</button>
                    <button className='quiztypebutton AACS' onClick={this.AACS}>CI Rules</button>
                    <button className='quiztypebutton Spectacular' onClick={this.Spectacular}>Spectacular Rules</button>
                    <button className='quiztypebutton training' onClick={this.training}>Training Mode</button>
                  </div>
                :
                  null
                }
                {(this.state.teamselect === false) ?
                  <div className='teamselect'>
                    <button className='teamselectbutton twoteam' onClick={this.twoteam}>2-team Quiz</button>
                    <button className='teamselectbutton threeteam' onClick={this.threeteam}>3-team Quiz</button>
                  </div>
                :
                  null
                }
                {(this.state.teaminput === false) ?
                  null
                :
                
                  <form className='quizForm' onSubmit={this.handleStartQuizSubmit}>
                     <p>Enter Quiz ID</p>
                     <select 
                        name='quizid'
                        onChange={this.myChangeHandler}
                        required>
                        <option value="Select Quiz">Select Quiz</option>
                        <option value="Quiz 1">Quiz 1</option>
                        <option value="Quiz 2">Quiz 2</option>
                        <option value="Quiz 3">Quiz 3</option>
                        <option value="Quiz 4">Quiz 4</option>
                        <option value="Quiz 5">Quiz 5</option>
                        <option value="Quiz 6">Quiz 6</option>
                        <option value="Quiz 7">Quiz 7</option>
                        <option value="Quiz 8">Quiz 8</option>
                        <option value="Quiz 9">Quiz 9</option>
                        <option value="Quiz 10">Quiz 10</option>
                        <option value="Quiz 11">Quiz 11</option>
                        <option value="Quiz 12">Quiz 12</option>
                        <option value="Quiz 13">Quiz 13</option>
                        <option value="Quiz 14">Quiz 14</option>
                        <option value="Quiz 15">Quiz 15</option>
                        <option value="Quiz 16">Quiz 16</option>
                        <option value="Quiz 17">Quiz 17</option>
                        <option value="Quiz 18">Quiz 18</option>
                        <option value="Quiz 19">Quiz 19</option>
                        <option value="Quiz 20">Quiz 20</option>
                        <option value="Quiz 21">Quiz 21</option>
                        <option value="Quiz 22">Quiz 22</option>
                        <option value="Quiz 23">Quiz 23</option>
                        <option value="Quiz 24">Quiz 24</option>
                        <option value="Quiz 25">Quiz 25</option>
                        <option value="Quiz 26">Quiz 26</option>
                        <option value="Quiz 27">Quiz 27</option>
                        <option value="Quiz 28">Quiz 28</option>
                        <option value="Quiz 29">Quiz 29</option>
                        <option value="Quiz 30">Quiz 30</option>

                        <option value="Quiz A">Quiz A</option>
                        <option value="Quiz B">Quiz B</option>
                        <option value="Quiz C">Quiz C</option>
                        <option value="Quiz D">Quiz D</option>
                        <option value="Quiz E">Quiz E</option>
                        <option value="Quiz F">Quiz F</option>
                        <option value="Quiz G">Quiz G</option>
                        <option value="Quiz H">Quiz H</option>
                        <option value="Quiz I">Quiz I</option>
                        <option value="Quiz J">Quiz J</option>
                        <option value="Quiz K">Quiz K</option>
                        <option value="Quiz L">Quiz L</option>
                        <option value="Quiz M">Quiz M</option>
                        <option value="Quiz N">Quiz N</option>
                        <option value="Quiz O">Quiz O</option>
                     </select>
                     <p>Room ID</p>
                     <input
                        type='text'
                        name='QuizRoomItem'
                        onChange={this.myChangeHandler}
                        required
                     />
                     <p>Select Red Team</p>
                     <select 
                        name='redid'
                        onChange={this.myChangeHandler}
                        required>
                           <option value="Select Red Team" selected>Select Red Team</option>
                        <option value="CA Bethel Baptist">CA Bethel Baptist</option>
                        <option value="CA First Baptist" >CA First Baptist</option>
                        <option value="WI Falls 1">WI Falls 1</option>
                        <option value="WI Falls 2">WI Falls 2</option>
                        <option value="NC Progress">NC Progress</option>
                        <option value="WI Mukwonago">WI Mukwonago</option>
                        <option value="NY Heritage Mission">NY Heritage Mission</option>
                        <option value="FL Faith Baptist">FL Faith Baptist</option>
                        <option value="PA Old Paths">PA Old Paths</option>
                        <option value="SC Z-Team">SC Z-Team</option>
                        <option value="WI JV Falls">WI JV Falls</option>
                        <option value="WI JV Mukwonago">WI JV Mukwonago</option>
                        <option value="CO JV Woodside">CO JV Woodside</option>
                     </select>
                     <p>Select Yellow Team</p>
                     <select 
                        name='yellowid'
                        onChange={this.myChangeHandler}
                        required>
                           <option value="Select Yellow Team" selected>Select Yellow Team</option>
                        <option value="CA Bethel Baptist">CA Bethel Baptist</option>
                        <option value="CA First Baptist" >CA First Baptist</option>
                        <option value="WI Falls 1">WI Falls 1</option>
                        <option value="WI Falls 2">WI Falls 2</option>
                        <option value="NC Progress">NC Progress</option>
                        <option value="WI Mukwonago">WI Mukwonago</option>
                        <option value="NY Heritage Mission">NY Heritage Mission</option>
                        <option value="FL Faith Baptist">FL Faith Baptist</option>
                        <option value="PA Old Paths">PA Old Paths</option>
                        <option value="SC Z-Team">SC Z-Team</option>
                        <option value="WI JV Falls">WI JV Falls</option>
                        <option value="WI JV Mukwonago">WI JV Mukwonago</option>
                        <option value="CO JV Woodside">CO JV Woodside</option>
                     </select>
                     <p>Select Green Team</p>
                     <select 
                        name='greenid'
                        onChange={this.myChangeHandler}
                        required>
                           <option value="Select Green Team" selected>Select Green Team</option>
                        <option value="CA Bethel Baptist">CA Bethel Baptist</option>
                        <option value="CA First Baptist" >CA First Baptist</option>
                        <option value="WI Falls 1">WI Falls 1</option>
                        <option value="WI Falls 2">WI Falls 2</option>
                        <option value="NC Progress">NC Progress</option>
                        <option value="WI Mukwonago">WI Mukwonago</option>
                        <option value="NY Heritage Mission">NY Heritage Mission</option>
                        <option value="FL Faith Baptist">FL Faith Baptist</option>
                        <option value="PA Old Paths">PA Old Paths</option>
                        <option value="SC Z-Team">SC Z-Team</option>
                        <option value="WI JV Falls">WI JV Falls</option>
                        <option value="WI JV Mukwonago">WI JV Mukwonago</option>
                        <option value="CO JV Woodside">CO JV Woodside</option>
                     </select>
                     <button 
                       className = "addButton"
                       type = "submit"
                     > 
                       Start Quiz
                    </button>
                    <button 
                       className = "addButton"
                       onClick = {this.endquiz}
                     > 
                       End Quiz
                    </button>
                </form>
                }
                {(this.state.scorekeeperpad === false) ?
                  null
                :
                  <div>
                    <form onSubmit={this.handleSubmit}>
                      <div className="quizzerpad-radio-div">
                        {(this.state.redout === true) ?
                          <label className="switch">
                            <div className="quizzerpad-radio">
                              <input type="radio" disabled className="teamcolor redpads" id="redpad" value="red" />
                              <span className="teampads slider round redpads">ERROR</span>
                            </div>
                          </label>
                        :
                          <label className="switch">
                            <div className="quizzerpad-radio">
                              <input type="radio" className="teamcolor redpads" id="redpad" value="red" checked={this.state.teamcolor === 'red'} onChange={this.handletcOptionChange} />
                              <span className="teampads slider round redpads"></span>
                            </div>
                          </label>
                        }
                        {(this.state.yellowout === true || this.state.twoteam === true) ?
                          <label className="switch">
                            <div className="quizzerpad-radio">
                              <input type="radio" disabled className="teamcolor yellowpads" id="yellowpad" value="yellow" />
                              <span className="teampads slider round yellowpads">ERROR</span>
                            </div>
                          </label>
                        :
                          <label className="switch">
                            <div className="quizzerpad-radio">
                              <input type="radio" className="teamcolor yellowpads" id="yellowpad" value="yellow" checked={this.state.teamcolor === 'yellow'} onChange={this.handletcOptionChange} />
                              <span className="teampads slider round yellowpads"></span>
                            </div>
                          </label>
                        }
                        {(this.state.greenout === true) ?
                          <label className="switch">
                            <div className="quizzerpad-radio">
                              <input type="radio" disabled className="teamcolor greenpads" id="greenpad" value="green" />
                              <span className="teampads slider round greenpads">ERROR</span>
                            </div>
                          </label>
                        :
                          <label className="switch">
                            <div className="quizzerpad-radio">
                              <input type="radio" className="teamcolor greenpads" id="greenpad" value="green" checked={this.state.teamcolor === 'green'} onChange={this.handletcOptionChange} />
                              <span className="teampads slider round greenpads"></span>
                            </div>
                          </label>
                        }
                      </div>
                      <div className="quizzerpadnum-radio-div">
                        <label className="switch">
                          <div className="quizzerpadnum-radio">
                            <input type="radio" className="padnum" id="pad1" value="1" checked={this.state.padnum === '1'} onChange={this.handlenumOptionChange} />
                            <span className="slider round seatnum" >1</span>
                          </div>
                        </label>
                        <label className="switch">
                          <div className="quizzerpadnum-radio">
                            <input type="radio" className="padnum" id="pad2" value="2" checked={this.state.padnum === '2'} onChange={this.handlenumOptionChange} />
                            <span className="slider round seatnum" >2</span>
                          </div>
                        </label>
                        <label className="switch">
                          <div className="quizzerpadnum-radio">
                            <input type="radio" className="padnum" id="pad3" value="3" checked={this.state.padnum === '3'} onChange={this.handlenumOptionChange} />
                            <span className="slider round seatnum">3</span>
                          </div>
                        </label>
                        <label className="switch">
                          <div className="quizzerpadnum-radio">
                            <input type="radio" className="padnum" id="pad4" value="4" checked={this.state.padnum === '4'} onChange={this.handlenumOptionChange} />
                            <span className="slider round seatnum" >4</span>
                          </div>
                        </label>
                        <label className="switch">
                          <div className="quizzerpadnum-radio">
                            <input type="radio" className="padnum" id="pad5" value="5" checked={this.state.padnum === '5'} onChange={this.handlenumOptionChange} />
                            <span className="slider round seatnum">5</span>
                          </div>
                        </label>
                      </div>
  
                      {(this.state.teamcolor && this.state.padnum !== null) ?
                        <div className='submitclass'>
                          <button className='correctbutton' onClick={this.correctguess}>Correct</button>
                          <button className='incorrectbutton' onClick={this.incorrectguess}>Incorrect</button>
                        </div>
                      :
                        <button className='passbutton' onClick={this.pass}>PASS</button>
                      }
                    </form>
                    
                      <h1> Question # {this.state.qnumber}</h1>
                      <div>
                        <h4 className='scoreboard sbl'>RED TEAM: {(this.state.outsetredscore)}  - FOULS: {(this.state.redfoulscore)} = {(this.state.redscore)}<br />
                          Errors: {this.state.rederror}   <button className="foulbutton button" onClick={this.redfoul}>Foul</button>: <button className="foulbutton button" onClick={this.redunfoul}>{this.state.redfouls}</button></h4>
                      </div>
                      <div>
                        <h4 className='scoreboard sbl'>YELLOW TEAM: {this.state.outsetyellowscore}  - FOULS: {(this.state.yellowfoulscore)} = {(this.state.yellowscore)}<br />
                          Errors: {this.state.yellowerror}   <button className="foulbutton button" onClick={this.yellowfoul}>Foul</button>: <button className="foulbutton button" onClick={this.yellowunfoul}>{this.state.yellowfouls}</button></h4>
                      </div>
                      <div>
                        <h4 className='scoreboard sbl'>GREEN TEAM: {this.state.outsetgreenscore}  - FOULS: {(this.state.greenfoulscore)} = {(this.state.greenscore)}<br />
                          Errors: {this.state.greenerror}   <button className="foulbutton button" onClick={this.greenfoul}>Foul</button>: <button className="foulbutton button" onClick={this.greenunfoul}>{this.state.greenfouls}</button></h4>
                      </div>
                      <button 
                       className = "passbutton"
                       onClick = {this.endquiz}
                     > 
                       End Quiz
                    </button>
                    
                  </div>
                }
              <div/>
                        
                            

                        <div></div>
            
                    </div>
            </section>
          :
          (this.state.pageset === 'scoreboardscreen') ?
            <section className='add-item'>
              <section className='scoreboard'>
                <h1> Question # {this.state.qnumber}</h1>
                <div>
                  <h4 className='scoreboard sbl'>RED TEAM: {(this.state.outsetredscore)}  - FOULS: {(this.state.redfoulscore)} = {(this.state.redscore)}<br />
                    Errors: {this.state.rederror}   <button className="foulbutton button" onClick={this.redfoul}>Foul</button>: <button className="foulbutton button" onClick={this.redunfoul}>{this.state.redfouls}</button></h4>
                </div>
                <div>
                  <h4 className='scoreboard sbl'>YELLOW TEAM: {this.state.outsetyellowscore}  - FOULS: {(this.state.yellowfoulscore)} = {(this.state.yellowscore)}<br />
                    Errors: {this.state.yellowerror}   <button className="foulbutton button" onClick={this.yellowfoul}>Foul</button>: <button className="foulbutton button" onClick={this.yellowunfoul}>{this.state.yellowfouls}</button></h4>
                </div>
                <div>
                  <h4 className='scoreboard sbl'>GREEN TEAM: {this.state.outsetgreenscore}  - FOULS: {(this.state.greenfoulscore)} = {(this.state.greenscore)}<br />
                    Errors: {this.state.greenerror}   <button className="foulbutton button" onClick={this.greenfoul}>Foul</button>: <button className="foulbutton button" onClick={this.greenunfoul}>{this.state.greenfouls}</button></h4>                </div>
              </section>
            </section>
          :
            <section className='add-item'>
              <h2>Homepage placeholder</h2>
            </section>
          }
    
          {this.state.user ?
            <div className='wrapper'>
    
            </div>
          :
            <div className='wrapper'>
              <p>You must be logged in to see the other stuff and submit to it.</p>
            </div>
          }
          <br />
          <section className='display-score'>
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
          </section>
        </div>
      );
  }
}
    
    
export default ScorekeeperView;
            {/* <div>placeholder for "Live" Quizzes. All Visitors to the site will be able to view Current "Live" quizzes, as well as past completed Quizzes.</div> */}
            {/* <img src="DatabaseFlowChart.jpg" alt="databaseflowchart.jpg" /> */}
          
            {/* <section className='scoreboard'>
                      <h1> Question # {this.state.qnumber}</h1>
                      <div> */}
            {/* {this.state.scoreboard.onChange((scoreboard) => {
                    return (
                      <li className='smallcard'>
                        <h3>{scoreboard.redscorecall}</h3>
                        <h3>{scoreboard.yellowscorecall}</h3>
                        <h3>{scoreboard.greenscorecall}</h3>
                      </li>
                    )
                    })} */}
            {/* <h3 className='scoreboard sbl'>RED TEAM: {this.state.outsetredscore}</h3>
                        <h3 className='scoreboard sbl'>Errors: {this.state.rederror}   <button className="foulbutton button" onClick={this.redfoul}>Foul</button>: <button className="foulbutton button" onClick={this.redunfoul}>{this.state.redfouls}</button></h3>
                      </div>
                      <div>
                        <h3 className='scoreboard sbl'>YELLOW TEAM: {this.state.outsetyellowscore}</h3>
                        <h3 className='scoreboard sbl'>Errors: {this.state.yellowerror}   <button className="foulbutton button" onClick={this.yellowfoul}>Foul</button>: <button className="foulbutton button" onClick={this.yellowunfoul}>{this.state.yellowfouls}</button></h3>
                      </div>
                      <div>
                        <h3 className='scoreboard sbl'>GREEN TEAM: {this.state.outsetgreenscore}</h3>
                        <h3 className='scoreboard sbl'>Errors: {this.state.greenerror}   <button className="foulbutton button" onClick={this.greenfoul}>Foul</button>: <button className="foulbutton button" onClick={this.greenunfoul}>{this.state.greenfouls}</button></h3>
                      </div>
              </section> */}
             
            
