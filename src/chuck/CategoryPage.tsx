import { Category } from "./Category";
import { ChuckContext } from "./ChuckContext";
import { useContext } from "react";
import { useParams } from "react-router-dom";

export const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { jokeCategories } = useContext(ChuckContext);
  const jokesCategory = jokeCategories.find((c) => c.category === slug);

  return (
    <>
      <Category jokes={jokesCategory?.jokes} />
      {jokesCategory?.loading ? <div>Loading...</div> : null}
      {jokesCategory?.error ? (
        <div>There has been an error fetching jokes for this category</div>
      ) : null}
    </>
  );
};
