import { CMS } from "./cms/CMS";
import {
  NavLink,
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import { Pexeso } from "./pexeso/Pexeso";
import { TicTac } from "./tictac/TicTac";
import Clicker from "./click/Clicker";
import Counter from "./click/Counter";
import HackerTyper from "./hack/HackerTyper";
import TodoApp from "./todo/TodoApp";
import styled from "styled-components";

const DivMain = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  padding-top: 2rem;
  align-items: center;
  font-family: "Calibri";
`;

const NavStyled = styled.nav`
  height: 40px;
  display: flex;
  justify-content: space-evenly;
`;

const LinkStyled = styled(NavLink)`
  font-weight: bold;
  font-family: "Calibri";
  text-decoration: none;
  font-size: 20px;
  :hover {
    opacity: 0.8;
  }
`;

const LinkProject = styled(LinkStyled)`
  &.active {
    filter: brightness(1.3);
    text-decoration: underline;
  }
`;

function App() {
  return (
    <Router>
      <div className="App">
        <NavStyled>
          <LinkStyled to="/">Home</LinkStyled>

          <LinkProject to="/click">/click</LinkProject>

          <LinkProject to="/todo">/todo</LinkProject>

          <LinkProject to="/hack">/hack</LinkProject>

          <LinkProject to="/tictac">/tictac</LinkProject>

          <LinkProject to="/pexeso">/pexeso</LinkProject>

          <LinkProject to="/cms">/cms</LinkProject>
        </NavStyled>

        <DivMain>
          <Switch>
            <Route exact path="/">
              <h1>Welcome home</h1>
            </Route>
            <Route exact path="/click">
              <Counter />
              <Clicker />
            </Route>
            <Route path="/todo">
              <TodoApp />
            </Route>
            <Route exact path="/hack">
              <HackerTyper />
            </Route>
            <Route exact path="/tictac">
              <TicTac />
            </Route>
            <Route exact path="/pexeso">
              <Pexeso />
            </Route>
            <Route path="/cms">
              <CMS />
            </Route>
          </Switch>
        </DivMain>
      </div>
    </Router>
  );
}

export default App;
