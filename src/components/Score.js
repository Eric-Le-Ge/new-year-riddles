import React from 'react';
import Tile from './Tile';
import './Score.css';

function hashCode(str) {
  var hash = 0, i, chr;
  for (i = 0; i < str.length; i++) {
    chr   = str.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

class Score extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
      let num = this.props.correct.filter(b => b).length;
      return (
        <div>
        <p>
        Your have collected {num} out of 5 Blessings
        </p>
        <div className="Score" >
          <Tile correct={this.props.correct[0]} ind={0} />
          <Tile correct={this.props.correct[1]} ind={1} />
          <Tile correct={this.props.correct[2]} ind={2} />
          <Tile correct={this.props.correct[3]} ind={3} />
          <Tile correct={this.props.correct[4]} ind={4} />
        </div>
        </div>
        );
  }

}



export default Score;