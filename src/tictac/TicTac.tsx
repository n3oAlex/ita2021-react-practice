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
type Player = 1 | 2;
type GameState = "play" | "won" | "draw" | "reset";
type LastPlay = {
  position: { x: number; y: number };
  player: Player | null;
};
const maxGameSize = 16; // works with more, 16+ is annoying on my screen
const winLineLength = 5; // could be derived from boardSize etc.
const firstPlay = {
  position: { x: 0, y: 0 },
  player: null,
};
//#endregion

export function TicTac() {
  const [boardSize, setBoardSize] = useState(10);
  const [gameboard, setGameboard] = useState<number[][]>(
    generateEmptyBoard(boardSize)
  );
  // current player
  const [cPlayer, setCPlayer] = useState<Player>(1);
  const [winner, setWinner] = useState<Player | null>(null);
  // game state
  const [game, setGame] = useState<GameState>("play");
  const [round, setRound] = useState(0);
  const [lastPlay, setLastPlay] = useState<LastPlay>(firstPlay);

  const move = (x: number, y: number) => {
    if (gameboard[y][x] !== 0) return;
    if (game !== "play") return;

    setRound((p) => ++p);
    setGameboard((p) => {
      const copy = p.map((row, cY) => {
        if (cY === y)
          return row.map((position, cX) => {
            if (cX === x) return cPlayer;
            else return position;
          });
        else return row;
      });
      setLastPlay({ position: { x: x, y: y }, player: cPlayer });
      return copy;
    });
    setCPlayer((p) => (p === 1 ? 2 : 1));
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
      setGameboard(generateEmptyBoard(boardSize));
      setWinner(null);
      setCPlayer(1);
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
            <span>Player {winner} has won!! 🔥🔥🔥</span>
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
            {cPlayer === 1 ? (
              <CrossIcon />
            ) : cPlayer === 2 ? (
              <CircleIcon />
            ) : null}
            <span>Player{cPlayer}&apos;s turn</span>
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
                {column === 1 ? (
                  <CrossIcon winner={winner} />
                ) : column === 2 ? (
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

//#region Icons
const ResetIcon = () => (
  <svg fill="#114068" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
    ></path>
  </svg>
);

const PlusIcon = () => (
  <svg fill="#114068" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
    />
  </svg>
);

const MinusIcon = () => (
  <svg fill="#114068" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
    />
  </svg>
);

const CrossIcon = ({ winner }: { winner?: number | null }) => (
  <svg
    fill={winner === 1 ? "green" : "#114068"}
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
    ></path>
  </svg>
);

const CircleIcon = ({ winner }: { winner?: number | null }) => (
  <svg
    viewBox="0 0 20 20"
    fill={winner === 2 ? "green" : "#114068"}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.9497 14.9497C16.2625 13.637 17 11.8565 17 10C17 8.14348 16.2625 6.36301 14.9497 5.05025C13.637 3.7375 11.8565 3 10 3C8.14348 3 6.36301 3.7375 5.05025 5.05025C3.7375 6.36301 3 8.14348 3 10C3 11.8565 3.7375 13.637 5.05025 14.9497C6.36301 16.2625 8.14348 17 10 17C11.8565 17 13.637 16.2625 14.9497 14.9497ZM13.7123 13.7123C14.6969 12.7277 15.25 11.3924 15.25 10C15.25 8.60761 14.6969 7.27226 13.7123 6.28769C12.7277 5.30312 11.3924 4.75 10 4.75C8.60761 4.75 7.27226 5.30312 6.28769 6.28769C5.30312 7.27226 4.75 8.60761 4.75 10C4.75 11.3924 5.30312 12.7277 6.28769 13.7123C7.27226 14.6969 8.60761 15.25 10 15.25C11.3924 15.25 12.7277 14.6969 13.7123 13.7123Z"
    />
  </svg>
);
//#endregion

//#region Separable
const generateEmptyBoard = (boardSize: number): number[][] => {
  return Array.from({ length: boardSize }, () =>
    Array.from({ length: boardSize }, () => 0)
  );
};

const checkWinConditions = (
  gameboard: number[][],
  lastPlay: LastPlay,
  gameState: GameState,
  winLineLength: number,
  boardSize: number = gameboard.length,
  round: number
): [game: GameState, winner: Player | null] => {
  if (!lastPlay.player) return [gameState, null];
  if (gameState !== "play") return [gameState, null];

  let won = false;
  const { x, y } = lastPlay.position;
  const player = lastPlay.player;

  const sX = x - (winLineLength - 1);
  const eX = x + (winLineLength - 1);
  const sY = y - (winLineLength - 1);
  const eY = y + (winLineLength - 1);

  //vertical
  let streak = 0;
  for (let i = sY; i <= eY; i++) {
    if (i < 0 || i >= boardSize) continue;

    if (gameboard[i][x] === player) streak++;
    else streak = 0;
    if (streak >= winLineLength) won = true;
  }

  //horizontal
  streak = 0;
  for (let i = sX; i <= eX; i++) {
    if (i < 0 || i >= boardSize) continue;

    if (gameboard[y][i] === player) streak++;
    else streak = 0;
    if (streak >= winLineLength) won = true;
  }

  //diagonal
  streak = 0;
  for (let i = sX, j = sY; i <= eX && j <= eY; i++, j++) {
    if (i < 0 || i >= boardSize) continue;
    if (j < 0 || j >= boardSize) continue;

    if (gameboard[j][i] === player) streak++;
    else streak = 0;
    if (streak >= winLineLength) won = true;
  }

  //anti-diagonal
  streak = 0;
  for (let i = eX, j = sY; i >= sX && j <= eY; i--, j++) {
    if (i < 0 || i >= boardSize) continue;
    if (j < 0 || j >= boardSize) continue;

    if (gameboard[j][i] === player) streak++;
    else streak = 0;
    if (streak >= winLineLength) won = true;
  }

  if (won) return ["won", player];

  if (round === boardSize ** 2) return ["draw", null];
  else return ["play", null];
};
//#endregion
