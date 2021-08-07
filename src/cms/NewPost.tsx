import { BlogContext } from "./BlogContext";
import { theme } from "./theme";
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import DOMPurify from "dompurify";
import styled from "styled-components";

const DivErrorInfo = styled.div`
  font-size: 1.1rem;
  align-self: center;
  color: ${theme.ErrorColor};
  padding: 1rem 0;
`;

const Label = styled.label`
  margin-top: 2rem;
  font-size: 1.4rem;
`;

const ButtonAddPost = styled.button`
  background: ${theme.BasicBg};
  border: ${theme.BorderBasic};
  border-radius: ${theme.BorderRadius};
  height: 3rem;
  width: 10rem;
  margin-top: 2rem;
  align-self: flex-end;
  cursor: pointer;
`;

const TextareaContent = styled.textarea`
  background: ${theme.BasicBg};
  border: ${theme.BorderBasic};
  border-radius: ${theme.BorderRadius};
  padding: 1rem;
  min-height: 20rem;
  max-width: 57.5vw;
  margin-top: 2rem;
  font-size: 1.2rem;
`;

const InputText = styled.input`
  background: ${theme.BasicBg};
  border: ${theme.BorderBasic};
  border-radius: ${theme.BorderRadius};
  padding: 0.5rem 1rem;
  height: 3rem;
  font-size: 1.3rem;
`;

const DivNewPost = styled.div`
  display: flex;
  flex-direction: column;
  width: 60vw;
`;

const randomID = () => Math.random().toString(36).substr(2, 9);

export const NewPost = () => {
  const { addPost } = useContext(BlogContext);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  const handleAdd = () => {
    setError("");
    if (title.replace(" ", "") === "") {
      setError("Title is required");
      return;
    }
    if (author.replace(" ", "") === "") {
      setError("Author is required");
      return;
    }
    addPost({
      id: randomID(),
      title: DOMPurify.sanitize(title),
      content: DOMPurify.sanitize(content),
      author: DOMPurify.sanitize(author),
      createdAt: Date.now(),
    });
    history.push("/cms");
  };

  return (
    <DivNewPost>
      <DivErrorInfo>{error}</DivErrorInfo>
      <Label htmlFor="title">Title</Label>
      <InputText
        id="title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Label htmlFor="title">Author</Label>
      <InputText
        type="text"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <TextareaContent
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <ButtonAddPost onClick={handleAdd}>Add</ButtonAddPost>
    </DivNewPost>
  );
};
