import { BlogContext } from "./BlogContext";
import { Post } from "./Post";
import { useContext } from "react";
import { useParams } from "react-router-dom";

export const PostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { posts } = useContext(BlogContext);
  const post = posts.find((p) => p.id === slug);

  return post ? <Post post={post} /> : <span>404 :(</span>;
};
