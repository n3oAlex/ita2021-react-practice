import { Dummy } from "./dummyCode";
import React, { Component } from "react";
import styled from "styled-components";

const Buttons = styled.div`
  display: flex;
  width: 3.5em;
  justify-content: space-between;
`;

const Console = styled.textarea`
  height: 50vh;
  width: 50vw;
  min-width: 350px;
  background: transparent;
  border: 2px solid #114068;
  padding: 15px 20px;
  font-size: 16px;
  color: #1c6aaa;
`;

const Title = styled.div`
  font-weight: bold;
`;

const Titlebar = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 15px;
  border: 2px solid #114068;
  border-radius: 10px 10px 0 0;
  border-color: #114068 #114068 transparent #114068;
  align-items: center;
`;

const Window = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 350px;
  min-height: 450px;
`;

const Button = styled.div`
  height: 15px;
  width: 15px;
  border-radius: 15px;
  background: ${(props) => props.color};
`;

export default class HackerTyper extends Component<{}, {}> {
  hackerConsole: any;
  currentChunk: number;
  totalChunks: number;
  chunkSize: number;
  fileName: string;
  fileSize: number;
  file: string;

  constructor(props) {
    super(props);
    this.hackerConsole = React.createRef();
    this.currentChunk = 1;
    this.chunkSize = 16;
    this.file = Dummy;
    this.fileSize = this.file.length;
    this.totalChunks = Math.ceil(this.fileSize / this.chunkSize);
    this.fileName = "./dummyCode.txt";
  }

  componentDidMount() {
    document.title = "React showcase - HackerTyper";
    this.hackerConsole.current.focus();
  }

  handleKeyPress = (e) => {
    e.preventDefault();
    this.pasteChunk();

    // keep the text area scrolled down
    this.hackerConsole.current.scrollTop =
      this.hackerConsole.current.scrollHeight;
  };

  pasteChunk() {
    if (this.currentChunk >= this.totalChunks) {
      this.hackerConsole.current.value = "";
      this.currentChunk = 1;
    }

    const offset = (this.currentChunk - 1) * this.chunkSize;
    const currentFilePart = this.file.slice(offset, offset + this.chunkSize);

    this.hackerConsole.current.value += currentFilePart;
    this.currentChunk++;
  }

  render() {
    return (
      <Window>
        <Titlebar>
          <Title>hackerConsole -- /pentagon/secrets/</Title>
          <Buttons>
            <Button color={"#008000b8"} />
            <Button color={"#ffff0099"} />
            <Button color={"#ff000099"} />
          </Buttons>
        </Titlebar>
        <Console
          ref={this.hackerConsole}
          onKeyPress={this.handleKeyPress}
        ></Console>
      </Window>
    );
  }
}
