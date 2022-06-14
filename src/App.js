import "./App.css";
import Navbar from "./components/Navbar";
import { AppRouter } from "./router";

function App() {
  return (
    <div className="App">
      <Navbar />
      <AppRouter />
    </div>
  );
}

export default App;
