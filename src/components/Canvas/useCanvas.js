import React, { useRef, useEffect, useState } from "react";

function useCanvas() {
  const [x, setX] = useState();
  const [y, setY] = useState();

  useEffect(() => {
    const update = (e) => {
      setX(e.x);
      setY(e.y);
    };
    window.addEventListener("mousemove", update);
    window.addEventListener("touchmove", update);
    
    return () => {
      window.removeEventListener("mousemove", update);
      window.removeEventListener("touchmove", update);
    };
  }, [setX, setY]);
  return x && y ? <h1>{`x: ${x}; y: ${y};`}</h1> : null;
}

export default useCanvas;
