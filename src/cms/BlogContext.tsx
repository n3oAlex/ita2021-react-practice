import { ReactNode, createContext } from "react";
import { usePostsStorage } from "./usePostsStorage";

export type PostType = {
  id: string;
  title: string;
  content: string;
  createdAt: number;
  author: string;
};

type ContextProps = {
  posts: PostType[];
  addPost: (p: PostType) => void;
  removePost: (id: string) => void;
};

export const BlogContext = createContext<ContextProps>({} as ContextProps);

export const BlogProvider = (props: { children: ReactNode }) => {
  const [posts, setPosts] = usePostsStorage([] as PostType[]);

  const addPost = (post: PostType) => {
    setPosts((p) => [...p, post]);
  };

  const removePost = (id: string) => {
    setPosts((p) => {
      return [...p.filter((post) => post.id !== id)];
    });
  };

  const values = {
    posts,
    addPost,
    removePost,
  };

  return (
    <BlogContext.Provider value={values}>{props.children}</BlogContext.Provider>
  );
};
