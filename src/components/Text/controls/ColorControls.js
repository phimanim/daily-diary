import ColorTypes from "./ColorTypes";
import ColorButton from "./ColorButton";

const ColorControls = (props) => {
  let currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <div>
      {ColorTypes.map((type) => (
        <ColorButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

export default ColorControls;
