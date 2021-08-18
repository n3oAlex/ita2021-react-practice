import { Joke, JokesDic } from "./Types";
import { ReactNode, createContext, useEffect, useState } from "react";
import { URL_CATEGORIES, URL_RANDOM, getCategoryUrl } from "./chuckApiUrls";
import { uniqueArrayElementById } from "./arrayUtils";

const N_OF_RANDOM_JOKES = 20 as const;
const MAX_TRIES = 5 as const;
const N_OF_JOKES = 5 as const;

type ContextProps = {
  jokeCategories: JokesDic;
};
export const ChuckContext = createContext<ContextProps>({} as ContextProps);

export const ChuckProvider = (props: { children: ReactNode }) => {
  const [jokeCategories, setJokeCategories] = useState<JokesDic>([]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const newCategories = await getCategories();
        const allCategories = ["random", ...newCategories];
        const freshJokeCategories: JokesDic = [
          ...allCategories.map((c) => ({
            category: c,
            jokes: [] as Joke[],
            loading: true,
            error: false,
          })),
        ] as JokesDic;
        setJokeCategories(freshJokeCategories);
        allCategories.forEach((c) => {
          getJokes(c);
        });
      } catch (e) {
        console.error(e);
      }
    };
    fetchAll();
  }, []);

  const fetchJoke = async (category: string) => {
    let result = new Promise<Joke | null>(() => null);
    const url =
      category && category !== "random" ? getCategoryUrl(category) : URL_RANDOM;

    try {
      setLoading(category, true);
      const response = await fetch(url);
      if (!response.ok) throw new Error();
      result = await response.json();
    } catch {
      const errorMessage = "There has been an error while fetching jokes.";
      console.error(errorMessage);
      setError(category, true);
    } finally {
      setLoading(category, false);
      return result;
    }
  };

  const getCategories = async () => {
    const url = URL_CATEGORIES;
    let data: string[] = [];

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error();
      data = await response.json();
    } catch {
      const errorMessage =
        "There has been an error while fetching joke categories";
      console.error(errorMessage);
    } finally {
      return data;
    }
  };

  const getJokes = async (category: string) => {
    const newJokes: Joke[] = [];
    const nOfJokes = category === "random" ? N_OF_RANDOM_JOKES : N_OF_JOKES;

    for (let i = 0; i < nOfJokes; i++) {
      setLoading(category, true);

      let joke = await fetchJoke(category);
      if (!joke || joke.error) {
        const errorMessage = joke?.message
          ? joke.message
          : "There has been an error while fetching a joke.";
        console.error(errorMessage);
        setError(category, true);
        setLoading(category, false);

        continue;
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

      if (joke) {
        newJokes.push(joke);

        setJokeCategories((p) => {
          const current = p.find((c) => c.category === category);
          const rest = p.filter((c) => c.category !== category);
          const currentJokes = current ? current.jokes : [];
          return current
            ? [
                ...rest,
                {
                  ...current,
                  loading: false,
                  jokes: joke ? [...currentJokes, joke] : [...currentJokes],
                },
              ]
            : [...p];
        });
      }
    }
  };

  const setError = (category: string, value: boolean) => {
    setJokeCategories((p) => {
      const current = p.find((c) => c.category === category);
      const rest = p.filter((c) => c.category !== category);
      return current ? [...rest, { ...current, error: value }] : [...p];
    });
  };

  const setLoading = (category: string, value: boolean) => {
    setJokeCategories((p) => {
      const current = p.find((c) => c.category === category);
      const rest = p.filter((c) => c.category !== category);
      return current ? [...rest, { ...current, loading: value }] : [...p];
    });
  };

  const values = {
    jokeCategories,
  };

  return (
    <ChuckContext.Provider value={values}>
      {props.children}
    </ChuckContext.Provider>
  );
};
