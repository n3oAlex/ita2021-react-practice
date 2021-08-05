import { GameCard } from "./Types";
import { PexesoCard } from "./PexesoCard";
import { PexesoStats } from "./PexesoStats";
import { useEffect, useState } from "react";
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
const shuffleArray = (arr: any[]) => {
  const kek = () => 0.5 - Math.random();
  return arr.sort(kek).sort(kek);
};

const generateDeck = () =>
  shuffleArray(
    cards.reduce((total: GameCard[], current) => {
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
    }, [])
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
  const [nOfCleared, setNOfCleared] = useState(0);
  const [moves, setMoves] = useState(0);
  const [rounds, setRounds] = useState(0);

  useEffect(() => {
    if (nOfCleared >= nOfCards) {
      setRounds((p) => p + 1);
      setTimeout(() => resetGame(), 1000);
    }
  }, [nOfCleared]);

  useEffect(() => {
    if (nOfSelected >= 2) {
      const selected = cards.filter((c) => c.selected);
      if (selected[0].value === selected[1].value) clearCard(selected[0].value);
      setMoves((p) => p + 1);
      setTimeout(() => deSelectAll(), 500);
    }
  }, [nOfSelected]);

  const selectCard = (id: string) => {
    if (nOfSelected >= 2) return;
    setCards((p) => {
      return p.map((c) => {
        if (c.id === id) {
          return { ...c, selected: true };
        }
        return c;
      });
    });
    setNOfSelected((p) => p + 1);
  };

  const clearCard = (value: string) => {
    setCards((p) => {
      return p.map((c) => {
        if (c.value === value) {
          return { ...c, cleared: true };
        }
        return c;
      });
    });
    setNOfCleared((p) => p + 2);
  };

  const resetGame = () => {
    setCards(generateDeck());
    setNOfCleared(0);
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
