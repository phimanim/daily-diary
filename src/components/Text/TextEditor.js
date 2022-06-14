import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Editor,
  EditorState,
  RichUtils,
  Modifier,
  convertToRaw,
  convertFromRaw,
} from "draft-js";
import { createDaily } from "../../api";
import ColorStyleMap from "./controls/Color/ColorStyleMap";
import ColorControls from "./controls/Color/ColorControls";
import InlineStyleControls from "./controls/Inline/InlineStyleControls";
import BlockTypeControls from "./controls/Block/BlockTypeControls";

import "./TextEditor.css";

export default function TextEditor() {
  const [editorState, setEditorState] = React.useState(
    EditorState.createEmpty()
  );
  console.log("state editor", editorState);
  const history = useHistory();

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

  const saveContent = (content) => {
    window.localStorage.setItem(
      "content",
      JSON.stringify(convertToRaw(content))
    );
  };

  const onChange = (editorState) => {
    const contentState = editorState.getCurrentContent();
    saveContent(contentState);
    setEditorState(editorState);
  };

  useEffect(() => {
    const content = window.localStorage.getItem("content");

    if (content) {
      setEditorState(
        EditorState.createWithContent(convertFromRaw(JSON.parse(content)))
      );
    } else {
      setEditorState(EditorState.createEmpty());
    }
  }, []);

  const newHandleSubmit = async (event) => {
    event.preventDefault();
    const contentRaw = convertToRaw(editorState.getCurrentContent());
    console.log("raw content", contentRaw);
    const newDaily = {
      message: JSON.stringify(contentRaw),
    };
    console.log("new daily", newDaily);
    try {
      const { data } = await createDaily({
        ...newDaily,
      });
      console.log("data", data);
      history.push("/profile");
    } catch (err) {
      console.log(await err.response);
    }
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div style={{ paddingBottom: "10px" }}>
        <BlockTypeControls onToggle={onBlockClick} />
        <InlineStyleControls
          editorState={editorState}
          onToggle={onInlineClick}
        />
        <ColorControls editorState={editorState} onToggle={toggleColor} />
      </div>
      <div className="TextEditor">
        <Editor
          editorState={editorState}
          customStyleMap={ColorStyleMap}
          onChange={onChange}
        />
      </div>
      <button
        style={{ width: "100px", padding: "5px", margin: "10px" }}
        onClick={newHandleSubmit}
      >
        Save
      </button>
    </div>
  );
}
