import { Category } from "./Category";
import { ChuckContext } from "./ChuckContext";
import { useContext } from "react";
import { useParams } from "react-router-dom";

export const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { jokes } = useContext(ChuckContext);

  return <Category jokes={jokes.find((c) => c.category === slug)?.jokes} />;
};
