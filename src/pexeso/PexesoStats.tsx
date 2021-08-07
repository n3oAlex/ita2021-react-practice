import { Reset } from "./Reset";
import styled from "styled-components";

const H1 = styled.h1`
  padding: 0;
  margin: 0;
`;

const H3 = styled.h3`
  padding: 0;
  margin: 0;
`;

const DivPexesoStats = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  text-align: center;
`;

export const PexesoStats = (props: {
  moves: number;
  rounds: number;
  restartGame: () => void;
}) => {
  return (
    <DivPexesoStats>
      <div>
        <H3>Moves</H3>
        <H1>{props.moves}</H1>
      </div>
      <div>
        <H3>Rounds</H3>
        <H1>{props.rounds}</H1>
      </div>
      <div>
        <Reset reset={props.restartGame} />
      </div>
    </DivPexesoStats>
  );
};
