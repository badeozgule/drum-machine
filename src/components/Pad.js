import React from 'react';
import Audio from './Audio';


export default class Pad extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    
    return(
      <button 
        key={this.props.index}
        onMouseDown={event => this.props.handleClick(event, this.props.index)} 
        onMouseUp={event => this.props.handleClick(event, this.props.index)}
        onKeyDown={(event) => this.props.handleKeyPress(event, this.props.index)}
        onKeyUp={(event) => this.props.handleKeyPress(event, this.props.index)}
        className="drum-pad"
        id={`pad` + this.props.index}
        name={this.props.padName}
        onContextMenu={() => {return false;}}
        >
        {this.props.isKeysOn === "true" ? this.props.letterKey : null}
        {this.props.isDrumTitlesOn === "true" ? <p className="pad-name">{this.props.padName}</p> : null}
          
          <Audio
            innerRef={this.props.innerRef}
            letterKey={this.props.letterKey}
            url={this.props.url}
           />
      </button>
    );
  }
}