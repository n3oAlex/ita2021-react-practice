import { GameCard } from "./Types";
import { PexesoCard } from "./PexesoCard";
import { PexesoStats } from "./PexesoStats";
import { useState } from "react";
import styled from "styled-components";

const cards = [
  "🐴",
  "🐱",
  "🐶",
  "🐼",
  "🐷",
  "🐻",
  "🦁",
  "🦊",
  "🐯",
  "🐭",
  "🐨",
  "🦄",
  "🐵",
  "🐰",
  "🦝",
  "🐸",
  "🐔",
  "🐺",
];

const randomID = () => Math.random().toString(36).substr(2, 9);
const nOfCards = cards.length * 2;
const shuffleArray = <T,>(arr: T[]): T[] => {
  const kek = () => 0.5 - Math.random();
  return arr.sort(kek).sort(kek);
};

const generateDeck = () =>
  shuffleArray(
    cards.reduce((total, current) => {
      total.push({
        id: randomID(),
        value: current,
        selected: false,
        cleared: false,
      });
      total.push({
        id: randomID(),
        value: current,
        selected: false,
        cleared: false,
      });
      return total;
    }, [] as GameCard[])
  );

//#region StyCo
const DivPexesoBoard = styled.div`
  display: grid;
  font-size: 3rem;
  grid-template-columns: repeat(${Math.round(Math.sqrt(nOfCards))}, 1fr);
`;
//#endregion

export const Pexeso = () => {
  const [cards, setCards] = useState<GameCard[]>(generateDeck());
  const [nOfSelected, setNOfSelected] = useState(0);
  const [moves, setMoves] = useState(0);
  const [rounds, setRounds] = useState(0);

  const selectCard = (id: string) => {
    // prevent clicking more than two card
    if (nOfSelected >= 2) return;
    setCards((p) => {
      const copy = p.map((c) => {
        if (c.id === id) {
          return { ...c, selected: true };
        }
        return c;
      });

      const selected = copy.filter((c) => c.selected);
      if (selected.length >= 2) {
        // found match ? clear it :
        if (selected[0].value === selected[1].value)
          clearCard(selected[0].value);
        setMoves((p) => p + 1);
        setTimeout(() => deSelectAll(), 500);
      }

      return copy;
    });
    setNOfSelected((p) => p + 1);
  };

  const clearCard = (value: string) => {
    setCards((p) => {
      const copy = p.map((c) => {
        if (c.value === value) {
          return { ...c, cleared: true };
        }
        return c;
      });
      const isAllCleared = copy.filter((c) => !c.cleared).length <= 0;
      if (isAllCleared) {
        setRounds((p) => p + 1);
        setTimeout(() => resetGame(), 1000);
      }
      return copy;
    });
  };

  const resetGame = () => {
    setCards(generateDeck());
    setNOfSelected(0);
    setMoves(0);
  };

  const deSelectAll = () => {
    setCards((p) => {
      return p.map((c) => {
        return { ...c, selected: false };
      });
    });
    setNOfSelected(0);
  };

  return (
    <div>
      <PexesoStats moves={moves} rounds={rounds} restartGame={resetGame} />
      <DivPexesoBoard>
        {cards.map((card) => (
          <PexesoCard key={card.id} card={card} selectCard={selectCard} />
        ))}
      </DivPexesoBoard>
    </div>
  );
};
