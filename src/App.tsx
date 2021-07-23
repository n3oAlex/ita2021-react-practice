import "./App.css";
import { Link, Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Clicker from "./click/Clicker";
import Counter from "./click/Counter";
import HackerTyper from "./hack/HackerTyper";
import TodoApp from "./todo/TodoApp";
import styled from "styled-components";

const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  padding-top: 50px;
  align-items: center;
  font-family: "Calibri";
`;

const StyledNav = styled.nav`
  height: 40px;
  display: flex;
  justify-content: space-evenly;
`;

const StyledLink = styled(Link)`
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
        <StyledNav>
          <StyledLink to="/">Home</StyledLink>

          <StyledLink to="/click">/click</StyledLink>

          <StyledLink to="/todo">/todo</StyledLink>

          <StyledLink to="/hack">/hack</StyledLink>
        </StyledNav>

        <Main>
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
          </Switch>
        </Main>
      </div>
    </Router>
  );
}

export default App;
