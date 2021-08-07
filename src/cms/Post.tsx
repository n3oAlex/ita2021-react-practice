import { BlogContext, PostType } from "./BlogContext";
import { theme } from "./theme";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import marked from "marked";
import styled from "styled-components";

const ButtonRemove = styled.button`
  font-size: 1.2rem;
  border: ${theme.borderBasic};
  background: transparent;
  opacity: 0.5;
  margin-top: 0.8rem;
  cursor: pointer;
  :hover {
    opacity: 1;
  }
`;

const DivContent = styled.div`
  width: 90%;
`;

const DivPost = styled.div`
  width: 80vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Post = (props: { post: PostType }) => {
  const { removePost } = useContext(BlogContext);
  const date = new Date(props.post.createdAt);
  const history = useHistory();

  const handleRemove = () => {
    removePost(props.post.id);
    history.push("/cms");
  };

  return (
    <DivPost>
      <ButtonRemove onClick={handleRemove}>Remove post</ButtonRemove>
      <h1>{props.post.title}</h1>
      <div>written by {props.post.author}</div>
      <div>{date.toLocaleString()}</div>
      {props.post.content !== "" ? (
        <DivContent
          dangerouslySetInnerHTML={{ __html: marked(props.post.content) }}
        ></DivContent>
      ) : (
        <p>This post has no content</p>
      )}
    </DivPost>
  );
};
