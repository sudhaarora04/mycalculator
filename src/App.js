import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      display: "0",
      equation: ""
    }
    this.numInput = this.numInput.bind(this);
    this.operInput = this.operInput.bind(this);
    this.decInput = this.decInput.bind(this);
    this.clearInput = this.clearInput.bind(this);
    this.calculate = this.calculate.bind(this);
  }

  numInput(e){
    if(this.state.equation.match(/[0-9\.]$/) && !this.state.equation.includes("=")){
      if(this.state.equation.match(/[+\-*\/]/) == null){
        let val = this.state.equation + e.currentTarget.value;
        this.setState({
          display: val,
          equation: val
        });
      } else {
        this.setState({
          display: this.state.display + e.currentTarget.value,
          equation: this.state.equation + e.currentTarget.value
        });
      }
    } else if(this.state.equation.match(/[+\-*\/]$/)){
      let val = this.state.equation + e.currentTarget.value;
      this.setState({
        display: e.currentTarget.value,
        equation: val
      });
    } else if(this.state.display === "0" && e.currentTarget.value !== "0" || this.state.equation.includes("=")) {
      this.setState({
        display: e.currentTarget.value,
        equation: e.currentTarget.value
      });
    }
  }

  operInput(e){
    if(this.state.equation.includes("=")){
      let val = this.state.display;
      val += e.currentTarget.value;
      this.setState({
        equation: val
      });
    } else {
      if(this.state.equation != "" && this.state.equation.match(/[*\-\/+]$/) == null){
        let val = this.state.equation;
        val += e.currentTarget.value;
        this.setState({
          equation: val
        });
      } else if(this.state.equation.match(/[*\-\/+]$/) != null){
        let val = this.state.equation;
        val = val.substring(0, (val.length-1));
        val += e.currentTarget.value;
        this.setState({
          equation: val
        });
      }
    }
  }

  decInput(e){
    if(this.state.equation == "" || this.state.equation.includes("=")){
      let val = '0.';
      this.setState({
        display: val,
        equation: val
      });
    } else if(this.state.equation.match(/[+\-*\/]$/)){
      let val = '0.';
      this.setState({
        display: val,
        equation: this.state.equation + val
      });
    } else if(!this.state.display.includes(".")){
      this.setState({
        display: this.state.display + e.currentTarget.value,
        equation: this.state.equation + e.currentTarget.value
      });
    }
  }

  clearInput(){
    this.setState({
      display: "0",
      equation: ""
    });
  }

  calculate(){
    if(this.state.equation.includes("=")){
      let val = `${this.state.display} = ${this.state.display}`;
      this.setState({
        equation: val
      });
    } else if(this.state.equation != "" && this.state.equation.match(/[+\-*\/]/) != null && this.state.equation.match(/[+\-*\/]$/) == null) {
      let result = Number.isInteger(eval(this.state.equation)) ? eval(this.state.equation) : parseFloat(eval(this.state.equation).toFixed(5));
      let val = this.state.equation;
      val += ` = ${result}`;
      this.setState({
        display: result,
        equation: val
      });
    }
  }
  plusminus(){
    if(this.state){}
  }

  render() {
    return (
      <div class="container">
        <div class="calc-body">
          <div class="calc-screen">
            <div class="calc-operation">
              <Display equation={this.state.equation} />
            </div>
            <div class="calc-typed"><Display display={this.state.display} /><span class="blink-me">_</span></div>
          </div>
          <div class="calc-button-row">
            <Button id="clear" value="clear" display="C" class="button c row-3 col-1" click={this.clearInput} />
            <div class="button l">≠</div>
            <Button id="percent" value="%" display="%" class="button l row-3 col-3" />
            <Button id="divide" value="/" display="/" class="button l oper row-3 col-4" click={this.operInput} />
          </div>
          <div class="calc-button-row">
            <Button id="seven" value="7" display="7" class="button num row-4 col-1" click={this.numInput} />
            <Button id="eight" value="8" display="8" class="button num row-4 col-2" click={this.numInput} />
            <Button id="nine" value="9" display="9" class="button num row-4 col-3" click={this.numInput} />
            <Button id="multiply" value="*" display="×" class="button l oper row-4 col-4" click={this.operInput} />
          </div>
          <div class="calc-button-row">
            <Button id="four" value="4" display="4" class="button num row-5 col-1" click={this.numInput} />
            <Button id="five" value="5" display="5" class="button num row-5 col-2" click={this.numInput} />
            <Button id="six" value="6" display="6" class="button num row-5 col-3" click={this.numInput} />
            <Button id="subtract" value="-" display="−" class="button l oper row-5 col-4" click={this.operInput} />
          </div>
          <div class="calc-button-row">
            <Button id="one" value="1" display="1" class="button num row-6 col-1" click={this.numInput} />
            <Button id="two" value="2" display="2" class="button num row-6 col-2" click={this.numInput} />
            <Button id="three" value="3" display="3" class="button num row-6 col-3" click={this.numInput} />
            <Button id="add" value="+" display="+" class="button l oper row-6 col-4" click={this.operInput} />
          </div>
          <div class="calc-button-row">
            <Button id="decimal" value="." display="." class="button num row-7 col-2" click={this.decInput} />
            <Button id="zero" value="0" display="0" class="button num row-7 col-1-3" click={this.numInput} />
            <Button id="square" value="^" display="^" class="button num row-7 col-1-3" click={this.operInput} />
            <Button id="equals" value="=" display="=" class="button l oper row-7 col-5" click={this.calculate} />
            </div>
          </div>
        </div>
      
    );
  }
}

const Display = props => <div id="calc-display" className="row-1-2 col-1-4"><span id="eq">{props.equation}</span><span id="dis">{props.display}</span></div>;

const Button = props => <button type="button" id={props.id} value={props.value} className={props.class} onClick={props.click}>{props.display}</button>;

export default App;