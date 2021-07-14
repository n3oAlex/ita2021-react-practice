import "./App.css";
import Clicker from "./Clicker";
import Counter from "./Counter";

const mainStyle = {
  display: "flex",
  flexDirection: "column" as "column",
  justifyContent: "space-around",
  height: "100vh",
  width: "100vw",
  alignItems: "center",
  fontFamily: "Calibri",
};

function App() {
  return (
    <div className="App" style={mainStyle}>
      <Counter />
      <Clicker />
    </div>
  );
}

export default App;
