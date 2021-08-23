import { BlogContext } from "./BlogContext";
import { PostManager } from "./PostManager";
import { Redirect, useParams } from "react-router-dom";
import { useContext } from "react";

export const EditPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { posts } = useContext(BlogContext);
  const post = posts.find((p) => p.id === slug);

  return post ? <PostManager post={post} /> : <Redirect to="/" />;
};
