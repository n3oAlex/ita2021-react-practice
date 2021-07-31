import { Link, Route, BrowserRouter as Router, Switch } from "react-router-dom";
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
  padding-top: 50px;
  align-items: center;
  font-family: "Calibri";
`;

const NavStyled = styled.nav`
  height: 40px;
  display: flex;
  justify-content: space-evenly;
`;

const LinkStyled = styled(Link)`
  font-weight: bold;
  font-family: "Calibri";
  color: #114068;
  text-decoration: none;
  font-size: 20px;
`;

function App() {
  return (
    <Router>
      <div className="App">
        <NavStyled>
          <LinkStyled to="/">Home</LinkStyled>

          <LinkStyled to="/click">/click</LinkStyled>

          <LinkStyled to="/todo">/todo</LinkStyled>

          <LinkStyled to="/hack">/hack</LinkStyled>

          <LinkStyled to="/tictac">/tictac</LinkStyled>
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
          </Switch>
        </DivMain>
      </div>
    </Router>
  );
}

export default App;
