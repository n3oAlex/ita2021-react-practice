import { PostType } from "./BlogContext";
import { useState } from "react";

const BLOG_LS_NAME = "blog-data";

/**
 * Inspiration: https://usehooks.com/useLocalStorage/
 */
export const usePostsStorage = (defaultValue: PostType[]) => {
  const [posts, setPostsLocally] = useState(() => {
    try {
      const data = localStorage.getItem(BLOG_LS_NAME);
      return data ? JSON.parse(data) : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  const setPosts = (value: PostType[] | ((v: PostType[]) => PostType[])) => {
    try {
      const valueToStore = value instanceof Function ? value(posts) : value;
      setPostsLocally(valueToStore);
      localStorage.setItem(BLOG_LS_NAME, JSON.stringify(valueToStore));
    } catch {}
  };

  return [posts, setPosts] as const;
};
