import "./App.css";
import { Link, Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Clicker from "./click/Clicker";
import Counter from "./click/Counter";
import HackerTyper from "./hack/HackerTyper";
import TodoApp from "./todo/TodoApp";

const mainStyle = {
  display: "flex",
  flexDirection: "column" as "column",
  justifyContent: "space-around",
  width: "100vw",
  paddingTop: "50px",
  alignItems: "center",
  fontFamily: "Calibri",
};

const navStyle = {
  height: "40px",
  display: "flex",
  justifyContent: "space-around",
};

const linkStyle = {
  color: "lightgray",
  textDecoration: "none",
};

function App() {
  return (
    <Router>
      <div className="App">
        <nav style={navStyle}>
          <Link style={linkStyle} to="/">
            Home
          </Link>

          <Link style={linkStyle} to="/click">
            /click
          </Link>

          <Link style={linkStyle} to="/todo">
            /todo
          </Link>

          <Link style={linkStyle} to="/hack">
            /hack
          </Link>
        </nav>

        <div style={mainStyle}>
          <Switch>
            <Route exact path="/">
              <h1>Welcome home</h1>
            </Route>
            <Route exact path="/click">
              <Counter />
              <Clicker />
            </Route>
            <Route exact path="/todo">
              <TodoApp />
            </Route>
            <Route exact path="/hack">
              <HackerTyper />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
