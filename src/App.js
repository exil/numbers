import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      number: '',
      guess: '',
      min: 0,
      max: 100,
      speed: 1,
      mode: 'custom'
    }
  }
  
  componentDidMount() {
    this.nextNumber();
  }

  nextNumber = () => {
    this.setState({
      number: this.generateNumber(),
      guess: ''
    }, () => {
      this.sayNumber();
    });
  }

  sayNumber = () => {
    console.log(this.state.number);
  }

  handleChange = (evt) => {
    const value = evt.target.value;

    if (!isNaN(value)) {
      this.setState({
        guess: value
      });
  
      if (parseInt(value, 10) === this.state.number) {
        this.nextNumber();
      }
    }
  }

  handleRangeChange = (evt) => {
    const name = evt.target.name;
    const value = evt.target.value;

    if (!isNaN(value)) {
      this.setState({
        [name]: parseInt(value, 10)
      });
    }
  }

  handleSpeedChange = (evt) => {
    this.setState({
      speed: evt.target.value
    })
  }

  generateNumber() {
    let min = this.state.min;
    let max = this.state.max;

    // just in case
    if (min > max) {
      const tempMin = min;
      min = max;
      max = tempMin;
    }

    return Math.floor(Math.random() * (max + 1 - min) + min);
  }
  
  render() {
    return (
      <div className="App">
        <input onInput={this.handleChange} type="text" className="entry" value={this.state.guess} autoFocus></input>
        <button onClick={this.sayNumber} className="repeat">Repeat </button>
        <button onClick={this.nextNumber} className="skip">Skip</button>
        <input onChange={this.handleRangeChange} name="min" type="text" className="range" value={this.state.min}></input>
        <input onChange={this.handleRangeChange} name="max" type="text" className="range" value={this.state.max}></input>
        <select onChange={this.handleSpeedChange} value={this.state.speed} className="speed">
          <option value="0.5">0.5x</option>
          <option value="1">1x</option>
          <option value="1.25">1.25x</option>
          <option value="1.5">1.5x</option>
          <option value="2">2x</option>
        </select>
      </div>
    );
  }
}

export default App;
