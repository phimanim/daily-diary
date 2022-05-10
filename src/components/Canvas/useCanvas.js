import React from "react";
import ReactDOM from "react-dom";
import Draggable from "react-draggable";
import './Canvas.css';
function UseCanvas() {

    const handleTextInput = async (event) => {
        event.preventDefault();
        let daily = React.createElement('h1', {}, 'My First React Code');
        ReactDOM.render(
            daily,
            document.getElementById('redbox')
          );
      };

  return (
      <div>
<div
      className="box"
      id="redbox"
      style={{
        height: "500px",
        width: "500px",
        position: "relative",
        overflow: "hidden",
        padding: "0",
        backgroundColor: "red",
      }}
    >
      <Draggable bounds="parent">
        <div
          className="box"
          style={{
            height: "40px",
            width: "40px",
            overflow: "hidden",
            padding: "0",
            backgroundColor: "green",
          }}
        >
          I can only be moved within my offsetParent.
          <br />
          <br />
          Both parent padding and child margin work properly.
        </div>
      </Draggable>
      <Draggable bounds="parent">
        <div
          className="box"
          style={{
            height: "40px",
            width: "40px",
            overflow: "hidden",
            padding: "0",
            backgroundColor: "blue",
          }}
        >
          I also can only be moved within my offsetParent.
          <br />
          <br />
          Both parent padding and child margin work properly.
        </div>
      </Draggable>
      <Draggable bounds="parent">
        <input className="DailyText" type="text" name="message" placeholder="Text" style={{background:"transparent", overflow:"auto", border:"none", }}/>
      </Draggable>
    </div>
    <button onClick={handleTextInput}>
        Text
    </button>
      </div>
    
  );
}

{
  /* <Draggable
        axis="x"
        handle=".handle"
        defaultPosition={{x: 0, y: 0}}
        position={null}
        grid={[25, 25]}
        scale={1}
        onStart={this.handleStart}
        onDrag={this.handleDrag}
        onStop={this.handleStop}>
        <div>
          <div className="handle">Drag from here</div>
          <div>This readme is really dragging on...</div>
        </div>
      </Draggable> */
}

export default UseCanvas;
