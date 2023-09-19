import React from "react";

export default class Display extends React.Component {
  
  render() {
    return(
      <div className="name-display" id="display">
        {this.props.displayTitle}
      </div>
    )
  }
}