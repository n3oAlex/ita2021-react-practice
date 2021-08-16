import { Joke } from "./Types";
import { JokeCard } from "./JokeCard";

type CategoryProps = { jokes?: Joke[] };
export const Category = (props: CategoryProps) => {
  return (
    <div>
      {props.jokes ? (
        props.jokes.map((joke, i) => {
          return <JokeCard key={i} joke={joke} />;
        })
      ) : (
        <span>Loading...</span>
      )}
    </div>
  );
};
