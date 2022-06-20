import "./App.css";
import Navbar from "./components/Navbar";
import useLocalStorage from "use-local-storage";
import { AppRouter } from "./router";

function App() {
  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  const [theme, setTheme] = useLocalStorage(
    "theme",
    defaultDark ? "dark" : "light"
  );

  const switchTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  return (
    <div className="App" data-theme={theme}>
      <Navbar /> 
      <div style={{padding: "1em 3em"}} >
          <AppRouter />
      </div>
      <button className="Circle" style={{margin: "1em 3em", textAlign:"right"}} onClick={switchTheme}></button>
    </div>
  );
}

export default App;
