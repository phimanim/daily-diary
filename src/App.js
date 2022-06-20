import useLocalStorage from "use-local-storage";
import { AppRouter } from "./router";
import Navbar from "./components/Navbar";
import "./App.css";
import Footer from "./components/Footer";

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
       
        <div style={{ padding: "0 3em"}}>
          
            <Navbar />
          <AppRouter />
         <button className="DarkButton" onClick={switchTheme}/>
          
        </div>
       
        <Footer/>
           </div>
  );
}

export default App;
