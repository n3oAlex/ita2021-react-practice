import { Joke } from "./Types";
import { JokeCard } from "./JokeCard";

type CategoryProps = { jokes?: Joke[] };
export const Category = (props: CategoryProps) => {
  return (
    <div>
      {props.jokes ? (
        props.jokes.map((joke) => {
          return <JokeCard key={joke.id} joke={joke} />;
        })
      ) : (
        <span>Loading...</span>
      )}
    </div>
  );
};
