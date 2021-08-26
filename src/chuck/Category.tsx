import { Joke } from "./Types";
import { JokeCard } from "./JokeCard";
import styled from "styled-components";

const DivJokesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 90vw;
  justify-content: center;
`;

type CategoryProps = { jokes?: Joke[] };
export const Category = (props: CategoryProps) => {
  return (
    <DivJokesContainer>
      {props.jokes?.map((joke) => {
        return <JokeCard key={joke.id} joke={joke} />;
      })}
    </DivJokesContainer>
  );
};
