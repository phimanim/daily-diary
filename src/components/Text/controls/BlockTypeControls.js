import StyleButton from "./StyleButton";
import BlockTypes from "./BlockTypes";

const BlockTypeControls = (props) => {
    return (
      <div>
        {BlockTypes.map((type) => (
          <StyleButton
            key={type.label}
            label={type.label}
            onToggle={props.onToggle}
            style={type.block}
          />
        ))}
      </div>
    );
  };

  export default BlockTypeControls;