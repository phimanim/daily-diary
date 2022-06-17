import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  Editor,
  EditorState,
  RichUtils,
  Modifier,
  convertToRaw,
  convertFromRaw,
} from "draft-js";
import ColorStyleMap from "./controls/Color/ColorStyleMap";
import BlockTypeControls from "./controls/Block/BlockTypeControls";
import InlineStyleControls from "./controls/Inline/InlineStyleControls";
import ColorControls from "./controls/Color/ColorControls";
import "./TextEditor.css";
import { updateDaily, getDailyById } from "../../api";

export default function RichEditor() {
  const [editorState, setEditorState] = React.useState(
    EditorState.createEmpty()
  );
  const history = useHistory();

  const { dailyId } = useParams();
  const [data, setData] = useState(null);

  async function getDailyData() {
    const { data } = await getDailyById(dailyId);
    setData(data);
    console.log(data);
    const contentState = convertFromRaw(JSON.parse(data.message));
    const editorState = EditorState.createWithContent(contentState);
    setEditorState(editorState);
  }

  useEffect(() => {
    if (dailyId) {
      getDailyData();
    }
  }, [dailyId]);

  const onInlineClick = (e) => {
    let nextState = RichUtils.toggleInlineStyle(editorState, e);
    setEditorState(nextState);
  };

  const onBlockClick = (e) => {
    let nextState = RichUtils.toggleBlockType(editorState, e);
    setEditorState(nextState);
  };

  const toggleColor = (toggledColor) =>
    ToggleColorControls(toggledColor, editorState);

  function ToggleColorControls(toggledColor) {
    const selection = editorState.getSelection();

    // Let's just allow one color at a time. Turn off all active colors.
    const nextContentState = Object.keys(ColorStyleMap).reduce(
      (contentState, color) => {
        return Modifier.removeInlineStyle(contentState, selection, color);
      },
      editorState.getCurrentContent()
    );

    let nextEditorState = EditorState.push(
      editorState,
      nextContentState,
      "change-inline-style"
    );

    const currentStyle = editorState.getCurrentInlineStyle();

    // Unset style override for current color.
    if (selection.isCollapsed()) {
      nextEditorState = currentStyle.reduce((state, color) => {
        return RichUtils.toggleInlineStyle(state, color);
      }, nextEditorState);
    }

    // If the color is being toggled on, apply it.
    if (!currentStyle.has(toggledColor)) {
      nextEditorState = RichUtils.toggleInlineStyle(
        nextEditorState,
        toggledColor
      );
    }
    setEditorState(nextEditorState);
  }

  const onChange = (editorState) => {
    setEditorState(editorState);
    console.log(editorState)
  };

  const newHandleSubmit = async (event) => {
    event.preventDefault();
    const contentRaw = convertToRaw(editorState.getCurrentContent());
    const newDaily = {
      message: JSON.stringify(contentRaw),
    };
    try {
      const { data } = await updateDaily(dailyId, {
        ...newDaily
      });
      history.push("/profile");
    } catch (err) {
      console.log(await err.response);
    }
  };

  return (
    <div className="TextEditorContainer">
      <p>Update Daily</p>

      <div className="Toggles">
        <BlockTypeControls onToggle={onBlockClick} />
        <InlineStyleControls
          editorState={editorState}
          onToggle={onInlineClick}
        />
        <ColorControls editorState={editorState} onToggle={toggleColor} />
      </div>
      <div className="TextEditor TypingText">
        <Editor
          editorState={editorState}
          customStyleMap={ColorStyleMap}
          onChange={onChange}
        />
      </div>
      <button className="EditorButton" onClick={newHandleSubmit}>
        Save
      </button>
    </div>
  );
}
