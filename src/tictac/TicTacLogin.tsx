import { GameState, LastPlay, POSITION, Player } from "./Types";

export const generateEmptyBoard = (
  boardSize: number,
  emptyPosition: POSITION
): number[][] => {
  return Array.from({ length: boardSize }, () =>
    Array.from({ length: boardSize }, () => emptyPosition)
  );
};

export const checkWinConditions = (
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
