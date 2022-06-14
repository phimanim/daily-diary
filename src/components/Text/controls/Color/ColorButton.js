import ColorStyleMap from "./ColorStyleMap";

const styles = {
  styleButton: {
    border: "1px solid black",
    background: " transparent",
    padding: "3px",
    margin: "3px",
  },
};

const ColorButton = (props) => {
  let onButtonClick = (e) => {
    e.preventDefault();
    props.onToggle(props.style);
  };

  let style;
  // if color button is toggled, it will take the color
  if (props.active) {
    style = { ...ColorStyleMap[props.style] };
  } else {
    style = styles.styleButton;
  }

  return (
    <button style={style} onMouseDown={onButtonClick}>
      {props.label}
    </button>
  );
};

export default ColorButton;
