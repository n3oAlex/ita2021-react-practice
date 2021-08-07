import { PostType } from "../cms/Types";
import { useEffect, useState } from "react";

export const usePostsStorage = (defaultValue: PostType[]) => {
  const [posts, setPosts] = useState(defaultValue);
  const name = "blog-data";

  useEffect(() => {
    try {
      const storedValue = localStorage.getItem(name);
      if (storedValue !== null) setPosts(JSON.parse(storedValue));
      else localStorage.setItem(name, JSON.stringify(defaultValue));
    } catch {
      setPosts(defaultValue);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(name, JSON.stringify(posts));
    } catch {}
  }, [posts]);

  return [posts, setPosts] as const;
};
