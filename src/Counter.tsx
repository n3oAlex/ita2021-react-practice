import { Component } from "react";

//Just practicing inline styles
const divStyle = {
  display: "flex",
  width: "50%",
  height: "50%",
  justifyContent: "space-around",
  fontSize: "3em",
  borderBottom: "1px solid lightgray",
  alignItems: "center",
};

const btnStyle = {
  background: "transparent",
  border: "none",
  fontSize: "4em",
  cursor: "pointer",
  width: "5em",
};

export default class Counter extends Component<{}, { count: number }> {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    this.incrementCount = this.incrementCount.bind(this);
    this.decrementCount = this.decrementCount.bind(this);
  }

  incrementCount() {
    this.setState((state) => {
      return { count: state.count + 1 };
    });
  }

  decrementCount() {
    this.setState((state) => {
      return { count: state.count - 1 };
    });
  }

  render() {
    return (
      <div style={divStyle}>
        <button style={btnStyle} onClick={this.incrementCount}>
          +
        </button>
        <h1>{this.state.count}</h1>
        <button style={btnStyle} onClick={this.decrementCount}>
          -
        </button>
      </div>
    );
  }
}
