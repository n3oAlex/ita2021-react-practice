export type Player = 1 | 2;
export type GameState = "play" | "won" | "draw" | "reset";
export type LastPlay = {
  position: { x: number; y: number };
  player: Player | null;
};
