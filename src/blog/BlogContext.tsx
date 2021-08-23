import { ReactNode, createContext } from "react";
import { usePostsStorage } from "./usePostsStorage";

export type PostType = {
  id: string;
  title: string;
  content: string;
  createdAt: number;
  author: string;
  lastEditedAt?: number;
};

type ContextProps = {
  posts: PostType[];
  addOrEditPost: (p: PostType) => void;
  removePost: (id: string) => void;
};

export const BlogContext = createContext<ContextProps>({} as ContextProps);

export const BlogProvider = (props: { children: ReactNode }) => {
  const [posts, setPosts] = usePostsStorage([] as PostType[]);

  const addOrEditPost = (post: PostType) => {
    setPosts((p) => {
      const posts = p.filter((ps) => ps.id !== post.id);
      return [...posts, post];
    });
  };

  const removePost = (id: string) => {
    setPosts((p) => {
      return [...p.filter((post) => post.id !== id)];
    });
  };

  const values = {
    posts,
    addOrEditPost,
    removePost,
  };

  return (
    <BlogContext.Provider value={values}>{props.children}</BlogContext.Provider>
  );
};
