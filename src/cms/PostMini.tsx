import { PostType } from "./BlogContext";
import { theme } from "./theme";
import styled from "styled-components";

const DivInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const DivCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 5rem;
  border: ${theme.BorderBasic};
  border-radius: ${theme.BorderRadius};
  margin: 2rem 0;
  width: 60vw;
  padding: 0.5rem 1rem 0.5rem 2rem;
  transition: 300ms linear;
  :hover {
    opacity: 0.8;
  }
`;

const A = styled.a`
  text-decoration: none;
`;

export const PostMini = (props: { post: PostType }) => {
  const date = new Date(props.post.createdAt);
  return (
    <A href={"/cms/post/" + props.post.id}>
      <DivCard>
        <h1>{props.post.title}</h1>
        <DivInfo>
          <span>{date.toLocaleString()}</span>
          <span>by {props.post.author}</span>
        </DivInfo>
      </DivCard>
    </A>
  );
};
