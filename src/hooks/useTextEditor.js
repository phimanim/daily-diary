import { RichUtils, Modifier, EditorState, convertFromRaw, convertToRaw } from "draft-js";
import { useEffect } from "react";
import ColorStyleMap from "../components/Text/controls/Color/ColorStyleMap";

export default function useTextEditor() {

  

  
  return onInlineClick(), onBlockClick(), toggleColor()
}
