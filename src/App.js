import React from 'react';  
import Display from './components/Display';
import Pad from './components/Pad';
import RadioButton from './components/RadioButton';
import ToggleButton from './components/ToggleButton';
import audioList from './data/audioList';
import './styles/main.css';


const padColor = ["blue","green","red","yellow", "random"];
const drumType = ["heater kit", "smooth piano kit"];


export class App extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      showKeys: true,
      showTitles: false,
      drumOn: true,
      selectedPadColorType: "single", //"single - random"
      selectedButtonPadColor: "blue",
      selectedPadColor: "blue",
      selectedDrumType: "heater kit",
      display: "heater kit",
      isPadSelected: false,
      isSystemOn: "true",
      isKeysOn: "true",
      isDrumTitlesOn: "false",
      volumeValue: 80,
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
    document.addEventListener("dragstart drop", function (e) { e.preventDefault(); }, false);
    document.getElementsByClassName("left-side")[0].addEventListener('contextmenu', function (e) { e.preventDefault(); }, false);
    for (let e of document.querySelectorAll('input[type="range"].slider-progress')) {
      e.style.setProperty('--value', e.value);
      e.style.setProperty('--min', e.min == '' ? '0' : e.min);
      e.style.setProperty('--max', e.max == '' ? '100' : e.max);
      e.addEventListener('input', () => e.style.setProperty('--value', e.value));
    }
  }
  
  componentWillMount() {
    document.removeEventListener("keydown", this.handleKeyPress);
  }
  
  
  colorSelection = (type) => {
    let selectedPadColor = this.state.selectedPadColor;
    if (type === "random" || selectedPadColor === "random") {
      let randomNum =  Math.floor(Math.random() * (padColor.length - 1));
      this.setState({
        selectedPadColor: padColor[randomNum],
        selectedPadColorType: "random"
      });
    }   
    else {
      this.setState({
        selectedPadColor: selectedPadColor,
        selectedPadColorType: "single"
      });
    }
  }
  
  
  handleClick(event, key) {
    this.colorSelection(this.state.selectedPadColorType);
    var colorClass = this.state.selectedPadColor + "-pad";
    
    const selectedDrumType = audioList.filter(a => a.type === this.state.selectedDrumType);
    const padItem = selectedDrumType.find((obj, i) => i === key % 9);
    if (padItem && this.state.isSystemOn === "true") {
      event.target.focus();
      event.target.click();
      if(event.type === "mousedown") {
        const sound = document.getElementById(padItem.key);
        sound.currentTime = 0;
        sound.play();
        this.setState({
          isPadSelected: true,
          display: event.target.name
        }, () => {
          event.target.className = "drum-pad " + colorClass
        });
      }
      else if(event.type === "mouseup") {
        this.setState({
          isPadSelected: false
        }, () => {
          event.target.className = "drum-pad"
        });
      }
    }
    
  }
  
  
  handleKeyPress = (event, index) => {
    this.colorSelection(this.state.selectedPadColorType);
    var colorClass = this.state.selectedPadColor + "-pad";
    const selectedDrumType = audioList.filter(a => a.type === this.state.selectedDrumType);
    const padItem = selectedDrumType.find(obj => obj.keyCode === event.keyCode);
  
    if (padItem && this.state.isSystemOn === "true") {
      event.target.focus();
      event.target.click();
      if(event.type === "keydown") {
        const sound = document.getElementById(padItem.key);
        sound.currentTime = 0;
        sound.play();
        this.setState({
            isPadSelected: true,
            display: padItem.name
          }, () => {
            document.getElementById(`pad` + padItem.index).focus();
            document.getElementById(`pad` + padItem.index).className = "drum-pad " + colorClass 
        });
      }
     else {
        this.setState({
            isPadSelected: false
          }, () => {
            document.getElementById(`pad` + padItem.index).focus();
            document.getElementById(`pad` + padItem.index ).className = "drum-pad"
        });
      }
    }
  }
  
  
  handleCallbackPadColor = (item) => {
    if (item !== "random") {
      this.setState({
        selectedPadColorType: "single",
        selectedPadColor: item,
      });    
    } else {
       this.setState({
         selectedPadColorType: "random",
         selectedPadColor: item,
       });    
    }
     
  }
  
  handleCallbackDrumType = (item) => {
    this.setState({
      selectedDrumType: item,
      display: item,
    });
  }
  
  handleCallbackShowTitles = (item) => {
    this.setState({
      isDrumTitlesOn: item
    });
  }
  handleCallbackShowKeys = (item) => {
    this.setState({
      isKeysOn: item
    });
  }
  handleCallbackTurnOnOff = (item) => {
    this.setState({
      isSystemOn: item
    }, () => {
      this.state.isSystemOn === "false" ? 
        document.getElementById("root").classList.add("disabled")
      :
        document.getElementById("root").classList.remove("disabled")
    });
  }


  handleVolumeChange = (event) => {
    this.setState({volumeValue: event.target.value});
  }

  render(){
    const clips = [].slice.call(document.getElementsByClassName('clip'));
    clips.forEach(sound => {
      sound.volume = this.state.volumeValue / 100;
    });

    return(
      <>
      
        <h1><em>DRUM <span>by badeozgule</span> MACHINE</em></h1>
        
        <div className="left-side">
          <div className="pad-container">
            {audioList.map((pad, index) => (
              this.state.selectedDrumType === pad.type ?
              <Pad
                selectedPadColor={this.state.selectedPadColor}
                isActive={this.state.isPadSelected}
                isDrumTitlesOn={this.state.isDrumTitlesOn}
                isKeysOn={this.state.isKeysOn}
                index={index}
                key={index}
                id={index}
                letterKey={pad.key}
                handleClick={this.handleClick}
                handleKeyPress={this.handleKeyPress}
                padName={pad.name}
                innerRef={pad.key}
                url={pad.url}
                />
              :
              null
            ))}
            
          </div>
          <div className="bottom-controller">
            <ToggleButton
              title="Turn"
              name="turn"
              isButtonActive={this.state.isSystemOn}
              parentCallback={this.handleCallbackTurnOnOff}
            />
            <Display displayTitle={this.state.display}/>
          </div>
        </div>
        <div className="v-line"/>
        <div className="right-side">
          
          <div className="h-line hidden"/>
          <RadioButton 
            sectionTitle="Drum Type"
            btnName="type"
            btnItems={drumType}
            selectedItem={this.state.selectedDrumType} 
            parentCallback={this.handleCallbackDrumType}/>
          <div className="h-line"/>

          <RadioButton 
            sectionTitle="Pad Color"
            btnName="color"
            btnItems={padColor}
            selectedItem={this.state.selectedPadColor}
            selectedItemType={this.state.selectedPadColorType}
            parentCallback={this.handleCallbackPadColor}/>
          <div className="h-line"/>
          <div>
            <ToggleButton
              title="Show Keys"
              name="keys"
              isButtonActive={this.state.isKeysOn}
              parentCallback={this.handleCallbackShowKeys}
            />
            <ToggleButton
              title="Show Drum Titles"
              name="titles"
              isButtonActive={this.state.isDrumTitlesOn}
              parentCallback={this.handleCallbackShowTitles}
            />
          </div>
          <div className="h-line"/>
          <div>
            <div className="volume">
              <div>
                <span>Volume</span>
                <span id="volume_val">{this.state.volumeValue}%</span>
              </div>
              <input 
                className="styled-slider slider-progress" 
                type="range" 
                min="0"
                max="100" 
                step="1"
                value={this.state.volumeValue} 
                onChange={this.handleVolumeChange}
                />
            </div>
          </div>
        </div>    
      </>
    );
  }
}

export default App;
