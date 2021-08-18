export const URL_CATEGORIES = "https://api.chucknorris.io/jokes/categories";
export const URL_RANDOM = "https://api.chucknorris.io/jokes/random";
const URL_CATEGORY = "https://api.chucknorris.io/jokes/random?category=";

export const getCategoryUrl = (category: string) => URL_CATEGORY + category;
