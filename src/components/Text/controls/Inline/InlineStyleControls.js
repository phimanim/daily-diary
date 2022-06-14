import StyleButton from "../StyleButton";
import InlineStyles from "./InlineStyles";

const InlineStyleControls = (props) => {
  let currentStyle = props.editorState.getCurrentInlineStyle();
    return (
      <div>
        {InlineStyles.map((type) => (
          <StyleButton
            key={type.label}
            label={type.label}
            active={currentStyle.has(type.style)}
            onToggle={props.onToggle}
            style={type.style}
          />
        ))}
      </div>
    );
  };

  export default InlineStyleControls;