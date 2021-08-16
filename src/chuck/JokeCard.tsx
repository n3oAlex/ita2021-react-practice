import { Joke } from "./Types";
import styled from "styled-components";

const DivJokeCard = styled.div`
  border: 1px solid;
  padding: 1rem;
  margin: 0.5rem;
  width: 80vw;
`;

type JokeCardProps = { joke: Joke };
export const JokeCard = (props: JokeCardProps) => {
  return props.joke ? <DivJokeCard>{props.joke.value}</DivJokeCard> : null;
};
