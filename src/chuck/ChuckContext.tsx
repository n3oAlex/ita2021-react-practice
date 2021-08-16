import { Joke, JokesDic } from "./Types";
import { ReactNode, createContext, useEffect, useState } from "react";

const URL_CATEGORIES = "https://api.chucknorris.io/jokes/categories";
const URL_RANDOM = "https://api.chucknorris.io/jokes/random";
const URL_CATEGORY = "https://api.chucknorris.io/jokes/random?category=";

const N_OF_RANDOM_JOKES = 20;
const MAX_TRIES = 5;
const N_OF_JOKES = 5;

type ContextProps = {
  jokes: JokesDic;
  categories: string[];
  loading: boolean;
  error: string[];
};
export const ChuckContext = createContext<ContextProps>({} as ContextProps);

export const ChuckProvider = (props: { children: ReactNode }) => {
  const [jokes, setJokes] = useState<JokesDic>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string[]>([]);

  useEffect(() => {
    getCategories().then((newCategories) => {
      const allCategories = ["random", ...newCategories];
      setCategories(allCategories);
      allCategories.forEach((cate) => {
        getJokes(cate);
      });
    });
  }, []);

  const fetchJoke = async (category?: string) => {
    let result = new Promise<Joke | null>(() => null);
    let url =
      category && category !== "random" ? URL_CATEGORY + category : URL_RANDOM;

    try {
      setLoading(true);
      const response = await fetch(url);
      result = await response.json();
    } catch (e) {
      const errorMessage = "There has been an error while fetching jokes.";
      addError(errorMessage);
      console.error(e);
    } finally {
      setLoading(false);
      return result;
    }
  };

  const getCategories = async () => {
    let url = URL_CATEGORIES;
    let data: string[] = [];

    try {
      setLoading(true);
      const response = await fetch(url);
      data = await response.json();
    } catch (e) {
      const errorMessage =
        "There has been an error while fetching joke categories";
      addError(errorMessage);
      console.error(e);
    } finally {
      setLoading(false);
      return data;
    }
  };

  const getJokes = async (category: string) => {
    const newJokes: Joke[] = [];
    const nOfJokes = category === "random" ? N_OF_RANDOM_JOKES : N_OF_JOKES;

    for (let i = 0; i < nOfJokes; i++) {
      let joke = await fetchJoke(category);
      if (!joke || joke.error) {
        const errorMessage = joke?.message
          ? joke.message
          : "There has been an error while fetching a joke.";
        addError(errorMessage);
      }

      let counter = 0;
      while (uniqueJoke(newJokes, joke)) {
        if (counter >= MAX_TRIES) {
          joke = null;
          break;
        }
        counter++;
        joke = await fetchJoke(category);
      }

      if (joke) newJokes.push(joke);
    }

    setJokes((p) => {
      return [{ category: category, jokes: newJokes }, ...p];
    });
  };

  const addError = (errorMessage: string) => {
    setError((p) => [...new Set([...p, errorMessage])]);
  };

  const uniqueJoke = (jokes: Joke[], joke: Joke | null) => {
    return joke ? jokes.some((j) => j?.id === joke?.id) : false;
  };

  const values = {
    jokes,
    categories,
    loading,
    error,
  };

  return (
    <ChuckContext.Provider value={values}>
      {props.children}
    </ChuckContext.Provider>
  );
};
