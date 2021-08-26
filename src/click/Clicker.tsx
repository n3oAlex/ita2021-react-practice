import { Component } from "react";
import styled from "styled-components";

const H1 = styled.h1`
  font-size: 3rem;
`;

const H2 = styled.h2`
  font-size: 2rem;
`;

const Button = styled.button`
  background: none;
  border: none;
  font-size: 3rem;
  cursor: pointer;
`;
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
    const date = new Date();
    if (this.clicks.first === 0) this.clicks.first = date.getTime();

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
    const passed = this.clicks.last - this.clicks.first;
    const cps = passed === 0 ? 1 : (this.clicks.count / passed) * 1000;
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
      <>
        <H2>Average clicks per second: </H2>
        <H1>{this.state.CPS}</H1>
        <Button onClick={this.registerClick}>Click</Button>
      </>
    );
  }
}
