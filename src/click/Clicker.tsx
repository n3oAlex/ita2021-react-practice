import { Component } from "react";

//Just practicing inline styles
const wrapStyle = {
  width: "50%",
  display: "flex",
  flexDirection: "column" as "column",
  alignItems: "center",
  fontSize: "40px",
};

const btnStyle = {
  background: "transparent",
  border: "none",
  fontSize: "2em",
  cursor: "pointer",
  alignSelf: "center",
};

export default class Clicker extends Component<{}, { CPS: string }> {
  clicks = {
    first: 0,
    last: 0,
    count: 0,
  };
  timeout: any;

  constructor(props) {
    super(props);
    this.state = { CPS: "0" };

    this.registerClick = this.registerClick.bind(this);
    this.calculateCPS = this.calculateCPS.bind(this);
  }

  registerClick() {
    let date = new Date();
    if (this.clicks.first === 0) {
      this.clicks.first = date.getTime();
    }
    this.clicks.last = date.getTime();
    this.clicks.count += 1;

    clearInterval(this.timeout);
    this.timeout = setTimeout(() => {
      this.clicks = { first: 0, last: 0, count: 0 };
      this.calculateCPS();
    }, 1000);

    this.calculateCPS();
  }

  calculateCPS() {
    let passed = this.clicks.last - this.clicks.first;
    let cps = passed === 0 ? 1 : (this.clicks.count / passed) * 1000;
    this.setState(() => {
      return {
        CPS:
          this.clicks.count !== 0
            ? Number.parseFloat(cps.toString()).toPrecision(4)
            : "0",
      };
    });
  }

  componentWillUnmount() {
    clearInterval(this.timeout);
  }

  render() {
    return (
      <div style={wrapStyle}>
        <p>Average clicks per second: </p>
        <h1>{this.state.CPS}</h1>
        <button style={btnStyle} onClick={this.registerClick}>
          Click
        </button>
      </div>
    );
  }
}
