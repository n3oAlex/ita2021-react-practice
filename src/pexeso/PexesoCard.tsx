import { GameCard } from "./Types";
import styled from "styled-components";

const DivPexesoCard = styled.div`
  padding: 0;
  margin: 1rem;
  height: 7vh;
  width: 7vh;
  text-align: center;
  :hover {
    cursor: pointer;
  }
`;

export const PexesoCard = ({
  card,
  selectCard,
}: {
  card: GameCard;
  selectCard: (id: string) => void;
}) => {
  return (
    <DivPexesoCard
      onClick={() => {
        selectCard(card.id);
      }}
    >
      {card.selected || card.cleared ? card.value : "❓"}
    </DivPexesoCard>
  );
};
