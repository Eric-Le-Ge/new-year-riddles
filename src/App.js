import logo from './logo.svg';
import {riddles, riddleans, blesstype, incorrect} from './riddles';
import ReactDOM from "react-dom";
import React from 'react';
import {Link, useLocation, BrowserRouter as Router } from "react-router-dom";
import './App.css';
import Score from './components/Score'

function hashCode(str) {
  var hash = 0, i, chr;
  for (i = 0; i < str.length; i++) {
    chr   = str.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

class App extends React.Component {
  constructor(props) {
    super(props);
    const params = new URLSearchParams(props.location.search);
    let ind = params.get("blessing") || "0";
    if (ind > "4") {
      ind = "4";
    }
    let bless = [];
    for (const id in ["0", "1", "2", "3", "4"]) {
      bless.push(localStorage.getItem(id) || "");
    }
    let correct = [];
    for (let i = 0; i < 5; i += 1) {
      correct.push(riddleans[i].includes(hashCode(bless[i])));
    }
    this.state = {
      riddle: riddles[ind],
      ans: riddleans[ind],
      value: '',
      ind: ind,
      bless: bless,
      correct: correct,
    };
    this.handleChange = this.handleChange.bind(this);
    this.verdict = this.verdict.bind(this);
    console.log(hashCode('1'));
  }

  handleChange(event) {
    this.setState({value: event.target.value.toLowerCase()});
  }

  verdict() {
    console.log(hashCode(this.state.value));
    if (this.state.ans.includes(hashCode(this.state.value))) {
      localStorage.setItem(this.state.ind, this.state.value);
      let bless = [];
      for (const id in ["0", "1", "2", "3", "4"]) {
        bless.push(localStorage.getItem(id) || "");
      }
      let correct = [];
      for (let i = 0; i < 5; i += 1) {
        correct.push(riddleans[i].includes(hashCode(bless[i])));
      }
      this.setState({bless: bless, correct: correct})
      console.log('correct');
    } else {
      const nope = incorrect[Math.floor(Math.random() * incorrect.length)];
      this.setState({riddle: nope});
      setTimeout(() => {
        this.setState({riddle: riddles[this.state.ind]});
      }, 1000)
    }
  }

  render() {
    let num = this.state.correct.filter(b => b).length;
    if (num == 5) {
      return (<div className="App">
          <header className="App-header">
          <p>
          Congratulations! You have collected all the blessings!
          </p>
          <p>
          Replace this text with instructions to redeem you prize.
          </p>
          <Score correct={this.state.correct}/>
          </header>
        </div>
          )
    }
    if (this.state.correct[this.state.ind]) {
      return (<div className="App">
          <header className="App-header">
          <p>
          Congratulations! You have received the {blesstype[this.state.ind]} blessing
          </p>
          <p>
          Look around to collect the rest of the blessings
          </p>
          <Score correct={this.state.correct}/>
          </header>
        </div>
          )
    }
      return (
        <div className="App">
          <header className="App-header">
          <p>
          Riddle of {blesstype[this.state.ind]}
          </p>
            
            <p>
              {this.state.riddle}
            </p>
          <input
            type="text"
            text-align="center" 
            value={this.state.value}
            onChange={this.handleChange}
         />
         <input
           type="button"
           className="btn btn-warning"
           value="guess"
           onClick={this.verdict}/>
          <Score correct={this.state.correct}/>
          </header>
        </div>
      );
  }
}

export default App;
