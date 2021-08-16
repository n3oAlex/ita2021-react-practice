import { CategoryPage } from "./CategoryPage";
import { ChuckContext, ChuckProvider } from "./ChuckContext";
import {
  NavLink,
  Redirect,
  Route,
  BrowserRouter as Router,
} from "react-router-dom";
import { useContext } from "react";
import styled from "styled-components";

const DivLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 90vw;
  justify-content: center;
`;

const DivError = styled.div`
  padding: 0.5rem;
`;

const DivErrorBox = styled.div`
  display: flex;
  flex-direction: column;
  color: red;
  flex-wrap: wrap;
  max-height: 15rem;
  align-content: center;
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
  const { categories, error } = useContext(ChuckContext);
  return (
    <Router basename="/chuck">
      <DivLinks>
        {categories?.map((c, i) => {
          return (
            <NavLinkCategory exact key={i} to={"/" + c}>
              {c}
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
      <DivErrorBox>
        {error.length > 0
          ? error.map((e, i) => {
              return <DivError key={i}>{e}</DivError>;
            })
          : null}
      </DivErrorBox>
    </Router>
  );
};
