import { useDispatch, useSelector, Provider } from "react-redux";
import store from "./store/store";

import { AppRouter } from "./router";
import Navbar from "./components/Navbar";
import { setDarkTheme, setDefaultTheme } from "./store/themeSlice";
import { ModeButton } from "./assets/stylesheets/styled/Button";
import { ThemeProvider } from "styled-components";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);

  const setDark = () => {
    dispatch(setDarkTheme());
  };

  const setDefault = () => {
    dispatch(setDefaultTheme());
  };
  return (
          <ThemeProvider theme={theme}>

        <div className="App" id="darkmode">
          <Navbar />
          <div style={{ padding: "1em 3em" }}>
            <AppRouter />
          </div>
        </div>
        {!theme.darkmode ? (
          <ModeButton onClick={setDark} bg="#324b50">
            <img src="./images/night-mode.png" alt="" />
          </ModeButton>
        ) : (
          <ModeButton onClick={setDefault} bg="#FFE9D0">
            <img src="./images/contrast.png" alt="" />
          </ModeButton>
        )}</ThemeProvider>
  );
}

export default App;
