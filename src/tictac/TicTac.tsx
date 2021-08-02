import { CircleIcon, CrossIcon, MinusIcon, PlusIcon, ResetIcon } from "./Icons";
import { GameState, LastPlay, POSITION, Player } from "./Types";
import { checkWinConditions, generateEmptyBoard } from "./TicTacLogin";
import { useEffect, useState } from "react";
import styled from "styled-components";

//#region StyCo
const ButtonReset = styled.button`
  background-color: transparent;
  border: none;
  padding: 0;
  width: 3rem;
  height: 3rem;
  align-self: center;
  transition: 300ms linear;
  margin-inline: 1rem;
  :hover {
    cursor: pointer;
    transform: rotate(-180deg);
  }
  :active {
    cursor: default;
    transform: rotate(-360deg);
  }
`;

const DivGameStatus = styled.div`
  display: flex;
  align-items: center;
  font-size: 2.5rem;
  font-weight: bold;
  filter: brightness(1.5);
  > svg {
    width: 3rem;
    height: 3rem;
  }
`;

const ButtonChangeSize = styled.button`
  background: transparent;
  border: 3px solid;
  border-radius: 2rem;
  padding: 0;
  height: 3em;
  aspect-ratio: 1 / 1;
  :hover {
    cursor: pointer;
  }
`;

const DivBoardControl = styled.div`
  display: flex;
  width: 30vw;
  justify-content: space-evenly;
  align-items: center;
`;

const DivPosition = styled.div`
  padding: 0;
  font-weight: bold;
  font-size: 26px;
  background: #010f1b;
  display: flex;
  justify-content: center;
  align-items: center;
  aspect-ratio: 1 / 1;
`;

const DivGameboard = styled.div<{ boardSize: number }>`
  display: grid;
  grid-template-columns: repeat(
    ${(props) => props.boardSize},
    minmax(2rem, 5vh)
  );
  grid-template-rows: repeat(${(props) => props.boardSize}, auto);
  background: #0d314f;
  margin: 1rem;
  padding: 0.3rem;
  gap: 0.3rem;
`;
//#endregion

//#region Game settings
const maxGameSize = 16; // works with more, 16+ is annoying on my screen
const winLineLength = 5; // could be derived from boardSize etc.
const firstPlay = {
  position: { x: 0, y: 0 },
  player: null,
};
//#endregion

export function TicTac() {
  const [boardSize, setBoardSize] = useState(10);
  const [gameboard, setGameboard] = useState<POSITION[][]>(
    generateEmptyBoard(boardSize, POSITION.Empty)
  );
  // current player
  const [cPlayer, setCPlayer] = useState<Player>(POSITION.Player_1);
  const [winner, setWinner] = useState<Player | null>(null);
  // game state
  const [game, setGame] = useState<GameState>("play");
  const [round, setRound] = useState(0);
  const [lastPlay, setLastPlay] = useState<LastPlay>(firstPlay);

  const move = (x: number, y: number) => {
    if (gameboard[y][x] !== POSITION.Empty) return;
    if (game !== "play") return;

    setRound((p) => p + 1);
    setGameboard((p) => {
      const copy = p.map((row, cY) =>
        cY === y
          ? row.map((position, cX) => (cX === x ? cPlayer : position))
          : row
      );
      setLastPlay({ position: { x: x, y: y }, player: cPlayer });
      return copy;
    });
    setCPlayer((p) =>
      p === POSITION.Player_1 ? POSITION.Player_2 : POSITION.Player_1
    );
  };

  // reset game on BoardSize change
  useEffect(() => {
    setGameState("reset");
  }, [boardSize]);

  useEffect(() => {
    const [newGS, winner] = checkWinConditions(
      gameboard,
      lastPlay,
      game,
      winLineLength,
      boardSize,
      round
    );
    setWinner(winner);
    setGameState(newGS);
  }, [round]);

  const setGameState = (newState: GameState) => {
    if (newState === "reset") {
      setGameboard(generateEmptyBoard(boardSize, POSITION.Empty));
      setWinner(null);
      setCPlayer(POSITION.Player_1);
      setRound(0);
      setLastPlay(firstPlay);
      setGameState("play");
    } else setGame(newState);
  };

  const gameStatusSwitch = () => {
    switch (game) {
      case "won":
        return (
          <>
            <span>{winner} has won!! 🔥🔥🔥</span>
            <Reset />
          </>
        );
      case "draw":
        return (
          <>
            <span>It&apos;s a draw! 🤔</span>
            <Reset />
          </>
        );
      case "play":
      case "reset":
        return (
          <>
            {cPlayer === POSITION.Player_1 ? (
              <CrossIcon />
            ) : cPlayer === POSITION.Player_2 ? (
              <CircleIcon />
            ) : null}
            <span>{cPlayer}&apos;s turn</span>
          </>
        );
      default:
        return <span>I&apos;m broken 😦</span>;
    }
  };

  const Reset = () => (
    <ButtonReset
      onClick={() => {
        setGameState("reset");
      }}
    >
      <ResetIcon />
    </ButtonReset>
  );

  return (
    <>
      <DivGameStatus>{gameStatusSwitch()}</DivGameStatus>
      <DivBoardControl>
        <ButtonChangeSize
          onClick={() => {
            setBoardSize((p) =>
              p <= maxGameSize && p > winLineLength ? p - 1 : p
            );
          }}
        >
          <MinusIcon />
        </ButtonChangeSize>
        <h1>{boardSize + "x" + boardSize}</h1>
        <ButtonChangeSize
          onClick={() => {
            setBoardSize((p) =>
              p < maxGameSize && p >= winLineLength ? p + 1 : p
            );
          }}
        >
          <PlusIcon />
        </ButtonChangeSize>
      </DivBoardControl>
      <DivGameboard boardSize={boardSize}>
        {gameboard.map((row, y) => {
          return row.map((column, x) => {
            return (
              <DivPosition
                key={y.toString() + x.toString()}
                onClick={() => move(x, y)}
              >
                {column === POSITION.Player_1 ? (
                  <CrossIcon winner={winner} />
                ) : column === POSITION.Player_2 ? (
                  <CircleIcon winner={winner} />
                ) : null}
              </DivPosition>
            );
          });
        })}
      </DivGameboard>
    </>
  );
}
