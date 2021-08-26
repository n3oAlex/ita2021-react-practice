import { Dummy } from "./dummyCode";
import { Helmet } from "react-helmet";
import { useState } from "react";
import styled from "styled-components";

const DivButtons = styled.div`
  display: flex;
  width: 3.5em;
  justify-content: space-between;
`;

const TextAreaConsole = styled.textarea`
  height: 70vh;
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
  width: 90vw;
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

export const HackerTyper = () => {
  const [hackerConsole, setHackerConsole] = useState("");
  const [currentChunk, setCurrentChunk] = useState(1);

  const handleKeyPress = (e) => {
    e.preventDefault();
    pasteChunk();
  };

  const pasteChunk = () => {
    if (currentChunk >= TOTAL_CHUNKS) {
      setHackerConsole("");
      setCurrentChunk(1);
    }

    const offset = (currentChunk - 1) * CHUNK_SIZE;
    const currentFilePart = FILE.slice(offset, offset + CHUNK_SIZE);

    setHackerConsole((p) => "" + p + currentFilePart);
    setCurrentChunk((p) => p + 1);
  };

  return (
    <>
      <Helmet>
        <title>React showcase - HackerTyper</title>
      </Helmet>
      <DivWindow>
        <DivTitleBar>
          <DivTitle>hackerConsole -- /pentagon/secrets/</DivTitle>
          <DivButtons>
            <DivButton color={"#008000b8"} />
            <DivButton color={"#ffff0099"} />
            <DivButton color={"#ff000099"} />
          </DivButtons>
        </DivTitleBar>
        <TextAreaConsole value={hackerConsole} onChange={handleKeyPress} />
      </DivWindow>
    </>
  );
};
