import React from 'react';

export default class Audio extends React.Component {
  
  render() {
    return(
      <audio 
        className="clip" 
        ref={this.props.innerRef}
        id={this.props.letterKey}
        src={this.props.url}
      />
    )
  }
}
