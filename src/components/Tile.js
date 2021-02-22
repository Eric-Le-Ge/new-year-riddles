import React from 'react';
import blessingoff from "../images/blessingoff.png";
import blessingon from "../images/blessingon.png";
import on0 from "../images/0on.png";
import on1 from "../images/1on.png";
import on2 from "../images/2on.png";
import on3 from "../images/3on.png";
import on4 from "../images/4on.png";
import off0 from "../images/0off.png";
import off1 from "../images/1off.png";
import off2 from "../images/2off.png";
import off3 from "../images/3off.png";
import off4 from "../images/4off.png";
import './Tile.css';

class Tile extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
  	   let on = [on0, on1, on2, on3, on4][this.props.ind];
  	   let off = [off0, off1, off2, off3, off4][this.props.ind];
      return (this.props.correct?
        <img src={on} className="TileImage"/>:
        <img src={off} className="TileImage"/>
        );
  }

}



export default Tile;