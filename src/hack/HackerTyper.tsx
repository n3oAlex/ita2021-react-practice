import { Dummy } from "./dummyCode";
import React, { Component } from "react";
import styled from "styled-components";

const DivButtons = styled.div`
  display: flex;
  width: 3.5em;
  justify-content: space-between;
`;

const TextAreaConsole = styled.textarea`
  height: 50vh;
  width: 50vw;
  min-width: 350px;
  background: transparent;
  border: 2px solid #114068;
  padding: 15px 20px;
  font-size: 16px;
  color: #1c6aaa;
`;

const DivTitle = styled.div`
  font-weight: bold;
`;

const DivTitleBar = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 15px;
  border: 2px solid #114068;
  border-radius: 10px 10px 0 0;
  border-color: #114068 #114068 transparent #114068;
  align-items: center;
`;

const DivWindow = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 350px;
  min-height: 450px;
`;

const DivButton = styled.div`
  height: 15px;
  width: 15px;
  border-radius: 15px;
  background: ${(props) => props.color};
`;

const CHUNK_SIZE = 16;
const FILE = Dummy;
const FILE_SIZE = FILE.length;
const TOTAL_CHUNKS = Math.ceil(FILE_SIZE / CHUNK_SIZE);

export default class HackerTyper extends Component<{}, {}> {
  hackerConsole: any;
  currentChunk: number;

  constructor(props) {
    super(props);
    this.hackerConsole = React.createRef();
    this.currentChunk = 1;
  }

  componentDidMount() {
    document.title = "React showcase - HackerTyper";
    this.hackerConsole.current.focus();
  }

  handleKeyPress = (e) => {
    e.preventDefault();
    this.pasteChunk();

    this.hackerConsole.current.scrollTop =
      this.hackerConsole.current.scrollHeight;
  };

  pasteChunk() {
    if (this.currentChunk >= TOTAL_CHUNKS) {
      this.hackerConsole.current.value = "";
      this.currentChunk = 1;
    }

    const offset = (this.currentChunk - 1) * CHUNK_SIZE;
    const currentFilePart = FILE.slice(offset, offset + CHUNK_SIZE);

    this.hackerConsole.current.value += currentFilePart;
    this.currentChunk++;
  }

  render() {
    return (
      <DivWindow>
        <DivTitleBar>
          <DivTitle>hackerConsole -- /pentagon/secrets/</DivTitle>
          <DivButtons>
            <DivButton color={"#008000b8"} />
            <DivButton color={"#ffff0099"} />
            <DivButton color={"#ff000099"} />
          </DivButtons>
        </DivTitleBar>
        <TextAreaConsole
          ref={this.hackerConsole}
          onKeyPress={this.handleKeyPress}
        ></TextAreaConsole>
      </DivWindow>
    );
  }
}
