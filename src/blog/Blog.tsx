import { BlogProvider } from "./BlogContext";
import { EditPost } from "./EditPost";
import { Helmet } from "react-helmet";
import {
  Link,
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import { PostList } from "./PostList";
import { PostManager } from "./PostManager";
import { PostPage } from "./PostPage";
import { theme } from "./theme";
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
  border-bottom: ${theme.borderBasic};
`;

export const Blog = () => {
  return (
    <BlogProvider>
      <Router basename="/blog">
        <Helmet>
          <title>CMS - ITA 2021</title>
        </Helmet>
        <NavCmsLinks>
          <LinkStyled to="/">Posts</LinkStyled>
          <LinkStyled to="/post/new">+New Post</LinkStyled>
        </NavCmsLinks>
        <Switch>
          <Route exact path="/">
            <PostList />
          </Route>
          <Route exact path="/post/new">
            <PostManager />
          </Route>
          <Route path="/post/edit/:slug">
            <EditPost />
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
