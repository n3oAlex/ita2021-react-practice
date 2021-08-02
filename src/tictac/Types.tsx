export type Player = POSITION.Player_1 | POSITION.Player_2;
export type GameState = "play" | "won" | "draw" | "reset";
export type LastPlay = {
  position: { x: number; y: number };
  player: Player | null;
};
export enum POSITION {
  Empty = "Empty",
  Player_1 = "🐱",
  Player_2 = "🐶",
}
