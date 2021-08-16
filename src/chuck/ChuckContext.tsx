import { Joke, JokesDic } from "./Types";
import { ReactNode, createContext, useEffect, useState } from "react";
import { URL_CATEGORIES, URL_RANDOM, getCategoryUrl } from "./chuckApiUrls";
import { uniqueArrayElementById } from "./arrayUtils";

const N_OF_RANDOM_JOKES = 20 as const;
const MAX_TRIES = 5 as const;
const N_OF_JOKES = 5 as const;

type ContextProps = {
  jokes: JokesDic;
  categories: string[];
  loading: boolean;
  errors: string[];
};
export const ChuckContext = createContext<ContextProps>({} as ContextProps);

export const ChuckProvider = (props: { children: ReactNode }) => {
  const [jokes, setJokes] = useState<JokesDic>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const newCategories = await getCategories();
        const allCategories = ["random", ...newCategories];
        setCategories(allCategories);
        allCategories.forEach((cate) => {
          getJokes(cate);
        });
      } catch (e) {
        addError("There has been an unexpected error: " + e);
      }
    };
    fetchAll();
  }, []);

  const fetchJoke = async (category?: string) => {
    let result = new Promise<Joke | null>(() => null);
    const url =
      category && category !== "random" ? getCategoryUrl(category) : URL_RANDOM;

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
    const url = URL_CATEGORIES;
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
      while (uniqueArrayElementById(newJokes, joke)) {
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
    setErrors((p) => [...new Set([...p, errorMessage])]);
  };

  const values = {
    jokes,
    categories,
    loading,
    errors,
  };

  return (
    <ChuckContext.Provider value={values}>
      {props.children}
    </ChuckContext.Provider>
  );
};
