import React, { Component } from 'react';
import logo from './logo.svg';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sum_text: '0',
      results: []
    };

    this.sum = 0;
    this.actionBtnComponent = this.actionBtnComponent.bind(this);
    this.showResultComponent = this.showResultComponent.bind(this);
    this.changeSumInput = this.changeSumInput.bind(this);
    this.removeResult = this.removeResult.bind(this);
  }

  changeSumInput (text) {
    let _this = this;
    return () => {

      if ( !isNaN(+text) &&
           (_this.state.sum_text === '0' || 
            _this.state.sum_text.indexOf('=') > -1)) {

        _this.state.sum_text = text + '';
        _this.state.sum = 0;
      } else {
        if ( (!isNaN(+_this.state.sum_text.slice(-1)) && 
              _this.state.sum_text.slice(-1) !== '=') ||
             !isNaN(+text)) {

              if (text === '=') {
                eval('_this.sum = ' + _this.state.sum_text)
                _this.state.sum_text = _this.state.sum_text + '=' +  _this.sum;
                _this.state.results.push(
                  {
                    str: _this.state.sum_text,
                    sum: _this.sum
                  }
                )

                this.state.results.sort((a, b) => {
                  if (a.sum < b.sum)
                    return -1;
                  if (a.sum > b.sum)
                    return 1;
                  return 0;
                })

              } else {
                _this.state.sum_text += text;
              }
        }
      }
        _this.forceUpdate();
      }

  }

  removeResult (idx) {
    return () => {
      this.state.results.splice(idx, 1);
      this.forceUpdate();
    }
  }

  showResultComponent (result, idx) {
    return (
      <div key={`result_${idx}`} onClick={this.removeResult(idx)}>{result.str}</div>
    )
  }

  actionBtnComponent (text) {
    return (
      <Button 
          variant="outlined" 
          component="span" 
          color="primary"
          key={`btn-${text}`}
          onClick={this.changeSumInput(text)}>{text}</Button>
    )
  }

  render() {
    let numBtnsRender = [];
    let calBtnsRender = [];
    let showResultsRender = [];
    let sign = ['+', '-', '*', '/', '='],
        sign_len = sign.length;

    let results_len = this.state.results.length;


    for (let i=0; i < 10; i++) {
      numBtnsRender.push(this.actionBtnComponent(i))
    }

    for (let i=0; i < sign_len; i++) {
      calBtnsRender.push(this.actionBtnComponent(sign[i]))
    }

    for (let i=0; i < results_len; i++ ) {
      showResultsRender.push(
        this.showResultComponent(this.state.results[i], i)
      )
    }

    return (
      <div className="App">
        <div className="calculator">
          <div>
            <TextField
              id="outlined-name"
              label="Result"
              value={this.state.sum_text}
              margin="normal"
              variant="outlined"
            />
            <div className="nums">
              {numBtnsRender}
            </div>
          </div>
          <div className="operation">
            {calBtnsRender}
          </div>
          <div className="results">
            {showResultsRender}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
