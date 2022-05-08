import React, { useRef, useEffect, useState } from "react";

function CanvasFrame() {
  const canvas = useRef();
  let ctx = null;

  const [messages, setMessages] = useState([]);
  console.log("messages state", messages);

  const [text, setText] = useState({
    message: "",
    x: 20,
    y: ""
  });
  console.log("text state", text);

  useEffect(() => {
    const canvasEl = canvas.current;
    canvasEl.width = canvasEl.clientWidth;
    canvasEl.height = canvasEl.clientHeight;
    ctx = canvasEl.getContext("2d");
    drawText();
  }, [text.message]);

  function handleChange({target}) {
    const { value } = target;
    setText({
      ...text,
      message: value,
      y: messages.length * 20 + 20
  })
  };

  const handleClick = async (event) => {
    event.preventDefault();
    setMessages(messages => messages.concat(text))
    console.log(messages);
  }

  function drawText() {
    ctx.font = "35px";
    ctx.fillStyle = "red";
    ctx.textAlign = "start";
    ctx.clearRect(50, 110, 500, -50);

    for (let i = 0; i < messages.length; i++) {
      let text = messages[i];
      ctx.fillText(text.message, text.x, text.y);
    }
  }

  return (
    <div className="Canvas">
      <canvas ref={canvas}></canvas>
      <form>
        <input
          type="text"
          name="message"
          placeholder="write your daily here"
          value={text.message}
          onChange={handleChange}
        />
        <button onClick={handleClick}>Add daily</button>
      </form>
    </div>
  );
}

export default CanvasFrame;
