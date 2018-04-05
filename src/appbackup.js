import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import firebase, { auth, provider } from './firebase.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      quizzerpad:'',
      qnumber:'',
      jumptype:'',
      jresult:'',
      username: '',
      scorecard: [],
      user: null,
      authtype: null,
      pageset: null,
      lastpage: null
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.profilein = this.profilein.bind(this);
    this.profileout = this.profileout.bind(this);
    this.keepscorein = this.keepscorein.bind(this);
    this.keepscoreout = this.keepscoreout.bind(this);
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
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
        const authtype = null;
        this.setState({
          user,
          authtype
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
    const scoreRef = firebase.database().ref('scorecard');
    const score = {
      title: this.state.qnumber,
      quizzerpad: this.state.quizzerpad,
      jumptype: this.state.jumptype,
      jresult: this.state.jresult,
      user: this.state.user.displayName || this.state.user.email
    }
    scoreRef.push(score);
    this.setState({
      quizzerpad:'',
      qnumber:'',
      jumptype:'',
      jresult:'',
      username: ''
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
          quizzerpad: scorecard[score].quizzerpad,
          jumptype: scorecard[score].jumptype,
          jresult: scorecard[score].jresult,
          user: scorecard[score].user
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
  render() {
    return (
      
      <div className='app'>
        <header>
          <div className="wrapper">
            <h1>CI Framework V0.1</h1>
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
            <h1> ScoreKeeperName: {this.state.user.displayName} </h1>
            <div>
              <div className='container'>
                <section className='add-score'>
                  <form onSubmit={this.handleSubmit}>
                    <input type="text" name="username" placeholder="What's your username?" value={this.state.user.displayName || this.state.user.email} />
                    <input type="text" name="quizzerpad" placeholder="Which pad jumped?" onChange={this.handleChange} value={this.state.quizzerpad} />
                    <input type="text" name="qnumber" placeholder="What question number?" onChange={this.handleChange} value={this.state.qnumber} />
                    <input type="text" name="jumptype" placeholder="regular, tossup, free?" onChange={this.handleChange} value={this.state.jumptype} />
                    <input type="text" name="jresult" placeholder="Correct, Incorrect" onChange={this.handleChange} value={this.state.jresult} />
                    <button>Score This</button>
                  </form>
                </section>
              </div>
            </div>
          </div>
        :
          <div>
            <h2>Test shows that you are not on the profile page. To be replaced with an empty div</h2>
          </div>}

        {this.state.user ?  
          <div className='wrapper'>
            <p>empty</p>
          </div>
        :
          <div className='wrapper'>
            <p>You must be logged in to see the other stuff and submit to it.</p>
          </div>
        }

        <div className='container'>
           
          {/* <div>placeholder for "Live" Quizzes. All Visitors to the site will be able to view Current "Live" quizzes, as well as past completed Quizzes.</div> */}
          {/* <img src="DatabaseFlowChart.jpg" alt="databaseflowchart.jpg" /> */}

          <section className='display-score'>
            <div className="wrapper">
              <ul>
                {this.state.scorecard.map((score) => {
                return (
                  <li key={score.id}>
                    <h3>{score.title}</h3>
                    <h3>Scored by User: {score.user}</h3>
                    <h4>{score.quizzerpad}</h4>
                    <h4>{score.jumptype}</h4>
                    <h4>{score.jresult}</h4>
                       {score.user === this.state.user.displayName || score.user === this.state.user.email ?
                         <button onClick={() => this.removeItem(score.id)}>Remove Score</button> : null}
                    
                  </li>
                )
                })}
              </ul>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default App;
