import InlineStyleMap from "./InlineStyleMap";

const styles = {
  styleButton: {
    border: "1px solid black",
    background: " transparent",
    padding: "3px",
    margin: "3px",
  },
  styleActiveButton:{
    background: "grey",
  }
};

const StyleButton = (props) => {
  let onButtonClick = (e) => {
    e.preventDefault();
    props.onToggle(props.style);
  };
  let style;
  let styled = { ...styles.styleButton, ...InlineStyleMap[props.style] };
  //if color button is toggled, it will take the color
  if (props.active) {
    style = { ...styled, ...styles.styleActiveButton  };
  } else {
    style = styled;
  }

  return (
    <button style={style} onMouseDown={onButtonClick}>
      {props.label}
    </button>
  );
};

export default StyleButton;
