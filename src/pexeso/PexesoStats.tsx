import { Reset } from "./Reset";
import styled from "styled-components";

const DivGameInfo = styled.div`
  > h1,
  h3 {
    padding: 0;
    margin: 0;
  }
`;

const DivPexesoStats = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  text-align: center;
`;

export const PexesoStats = ({
  moves,
  rounds,
  restartGame,
}: {
  moves: number;
  rounds: number;
  restartGame: () => void;
}) => {
  return (
    <DivPexesoStats>
      <DivGameInfo>
        <h3>Moves</h3>
        <h1>{moves}</h1>
      </DivGameInfo>
      <DivGameInfo>
        <h3>Rounds</h3>
        <h1>{rounds}</h1>
      </DivGameInfo>
      <div>
        <Reset reset={restartGame} />
      </div>
    </DivPexesoStats>
  );
};
