import { BlogContext } from "./BlogContext";
import { PostMini } from "./PostMini";
import { useContext } from "react";

export const PostList = () => {
  const { posts } = useContext(BlogContext);

  return (
    <div>
      {posts.length > 0 ? (
        posts
          .sort((p1, p2) => {
            return p2.createdAt - p1.createdAt;
          })
          .map((post) => <PostMini key={post.id} post={post} />)
      ) : (
        <h3>No posts yet</h3>
      )}
    </div>
  );
};
