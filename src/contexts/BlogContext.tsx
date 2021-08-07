import { PostType } from "../cms/Types";
import { ReactNode, createContext } from "react";
import { usePostsStorage } from "../hooks/usePostsStorage";

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
