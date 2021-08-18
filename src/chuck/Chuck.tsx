import { CategoryPage } from "./CategoryPage";
import { ChuckContext, ChuckProvider } from "./ChuckContext";
import {
  NavLink,
  Redirect,
  Route,
  BrowserRouter as Router,
} from "react-router-dom";
import { compareElementsByCategoryString } from "./arrayUtils";
import { useContext } from "react";
import styled from "styled-components";

const DivLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 90vw;
  justify-content: center;
`;

const NavLinkCategory = styled(NavLink)`
  padding: 5px;
  margin: 5px;
  border: 1px solid;

  text-decoration: none;
  &.active {
    font-weight: bold;
  }
`;

export const Chuck = () => {
  return (
    <ChuckProvider>
      <ChuckRoute />
    </ChuckProvider>
  );
};

const ChuckRoute = () => {
  const { jokeCategories } = useContext(ChuckContext);
  return (
    <Router basename="/chuck">
      <DivLinks>
        {jokeCategories?.sort(compareElementsByCategoryString).map((jc) => {
          return (
            <NavLinkCategory exact key={jc.category} to={"/" + jc.category}>
              {jc.category}
            </NavLinkCategory>
          );
        })}
      </DivLinks>
      <Route path="/:slug">
        <CategoryPage />
      </Route>
      <Route>
        <Redirect to="/random" />
      </Route>
    </Router>
  );
};
