import { BlogProvider } from "../contexts/BlogContext";
import {
  Link,
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import { NewPost } from "./NewPost";
import { PostList } from "./PostList";
import { PostPage } from "./PostPage";
import styled from "styled-components";

const LinkStyled = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
  transition: 200ms linear;
  :hover {
    opacity: 0.8;
  }
`;

const NavCmsLinks = styled.nav`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 50%;
  height: 3rem;
  border-bottom: 1px solid;
`;

export const CMS = () => {
  return (
    <BlogProvider>
      <Router basename="/cms">
        <NavCmsLinks>
          <LinkStyled to="/">Posts</LinkStyled>
          <LinkStyled to="/new-post">+New Post</LinkStyled>
        </NavCmsLinks>
        <Switch>
          <Route exact path="/">
            <PostList />
          </Route>
          <Route exact path="/new-post">
            <NewPost />
          </Route>
          <Route path="/post/:slug">
            <PostPage />
          </Route>
          <Route>
            <Redirect to="/" />
          </Route>
        </Switch>
      </Router>
    </BlogProvider>
  );
};
