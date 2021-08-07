import { GameCard } from "./Types";
import styled from "styled-components";

const DivPexesoCard = styled.div`
  padding: 0;
  margin: 1rem;
  height: 7vh;
  width: 7vh;
  text-align: center;
  cursor: pointer;
`;

export const PexesoCard = (props: {
  card: GameCard;
  selectCard: (id: string) => void;
}) => {
  return (
    <DivPexesoCard
      onClick={() => {
        props.selectCard(props.card.id);
      }}
    >
      {props.card.selected || props.card.cleared ? props.card.value : "❓"}
    </DivPexesoCard>
  );
};
