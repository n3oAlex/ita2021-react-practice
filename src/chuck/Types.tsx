export type Joke = {
  icon_url: string;
  id: string;
  url: string;
  value: string;
  updated_at: string;
  created_at: string;
  categories: string[];
  error?: string;
  message?: string;
  path?: string;
  status?: number;
  timestamp?: string;
};

export type JokesDic = {
  category: string;
  jokes: Joke[];
}[];
