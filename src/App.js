import "./App.css";
import React from "react";
import CanvasFrame from "./components/Canvas/Canvas"
import { UseCanvas } from "./components/Canvas";

function App() {
  return (
    <div className="App">
      <CanvasFrame/>
      <UseCanvas/>
    </div>
  );
}

export default App;
