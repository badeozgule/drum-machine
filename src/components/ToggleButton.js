import React from "react";

export default class ToggleButton extends React.Component {
  
  onTrigger = (event) => {
    this.props.parentCallback(event.target.value);
  }
  render() {
    return (
      <div className="btn-container">
        {this.props.title !== "" ? <span>{this.props.title}</span> : null}
        <div className="btn-radio type-switch">
          <div className="button" onClick={this.onTrigger}>
            <input type="radio" id={this.props.name + "_on"} name={this.props.name} value="true" defaultChecked={this.props.isButtonActive || this.props.isButtonActive === "true" ? true : false}/>
            <label htmlFor={this.props.name + "_on"}>On</label>
          </div>
          <div className="button" onClick={this.onTrigger}>
            <input type="radio" id={this.props.name + "_off"} name={this.props.name} value="false"  defaultChecked={!this.props.isButtonActive || this.props.isButtonActive === "false" ? true : false}/>
            <label htmlFor={this.props.name + "_off"}>Off</label>
          </div>
        </div>
      </div>
    );
  }
}