import React, { Component } from 'react';
import ReactDom from 'react-dom';

export default class DrumPad extends Component{
  constructor(props) {
    super(props);

    this.audio = React.createRef();
    this.onPadClick = this.onPadClick.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this)
  }

  onPadClick(){
    const text = this.props.padItem.id.replace(/-/g, " ");
    const audioElm = this.audioHandler.current;

    this.props.updateDisplayText(text);
    audioElm.currentTime = 0;
    audioElm.play();
  }

  onKeyDown(e) {
    const root = ReactDom.findDOMNode(this);

    if(e.keyCode === this.props.padItem.keyCode) {
      root.classList.add("active");
      this.onPadClick();
    }
  }

  onKeyUpe(e) {
    const root = ReactDom.findDOMNode(this);

    if(e.keyCode === this.props.padItem.keyCode) {
      setTimeout(() => {
        root.classList.remove("active");
      }, 33);
    }
  }

  componentDidUpdate() {
    this.audio.current.volume = this.props.volumeValue / 100;
  }

  componentDidMount() {
    document.addEventListener('keydown', this.onKeyDown);
    document.addEventListener('keyup', this.onKeyUp);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown);
    document.removeEventListener('keyup', this.onKeyUp);
  }

  render() {
    const padItem = this.props.padItem;

    return(
      <div className = '' id = {padItem.id} onClick={this.onDrumPadClicked}>
        <audio className= '' id={padItem.keyTrigger} src={padItem.url} ref={this.audio}/>{padItem.keyTrigger}
        </div>
    )
  }
}