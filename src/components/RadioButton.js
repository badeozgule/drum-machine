import React from "react";

export default class RadioButton extends React.Component {
  
  onTrigger = (event) => {
    this.props.parentCallback(event.target.id);
  }
  
  render() {
    const sectionTitle = this.props.sectionTitle;
    const btnItems = this.props.btnItems;
    const btnName = this.props.btnName;
    return (
       <>
        <div>
          <span>{sectionTitle}</span>
        </div>
        <div className="btn-container">
          <div className="btn-radio">
            {btnItems.map((item, index) => (
              <div className="button">
                <input
                  type="radio" 
                  name={btnName} 
                  value={item}
                  id={item} 
                  onClick={this.onTrigger}
                  checked={
                    this.props.selectedItemType === item 
                    ?
                      true 
                    : this.props.selectedItem === item ? true : false}/>
                <label htmlFor={item}>{item}</label>
              </div>
            ))}
          </div>
        </div>
       </>
    );
  }
}