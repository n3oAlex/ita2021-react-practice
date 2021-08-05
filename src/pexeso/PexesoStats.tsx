import { Reset } from "./Reset";
import styled from "styled-components";

const DivPexesoStats = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  text-align: center;
  > div > h1,
  h3 {
    padding: 0;
    margin: 0;
  }
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
      <div>
        <h3>Moves</h3>
        <h1>{moves}</h1>
      </div>
      <div>
        <h3>Rounds</h3>
        <h1>{rounds}</h1>
      </div>
      <div>
        <Reset reset={restartGame} />
      </div>
    </DivPexesoStats>
  );
};
