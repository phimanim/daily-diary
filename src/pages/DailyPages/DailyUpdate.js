import { useState, useEffect } from "react";
import { getDailyById, updateDaily } from "../../api";
import { useParams } from "react-router-dom";
import { Editor, EditorState, convertFromRaw, convertToRaw } from "draft-js";
import RichEditor from "../../components/Text/RichEditor";

export default function UpdateDaily() {
  const { dailyId } = useParams();
  const [data, setData] = useState(null);
  const [message, setMessage] = useState(null);

  async function getDailyData() {
    const { data } = await getDailyById(dailyId);
    setData(data);
    console.log("id daily data", data);
    const contentState = convertFromRaw(JSON.parse(data.message));
    console.log("contentState",contentState)
    const editorState = EditorState.createWithContent(contentState);
    console.log("editorState",editorState)
    setMessage(editorState);
    console.log("message",message)

  }

  useEffect(() => {
    if (dailyId) {
      getDailyData();
    }
  }, [dailyId]);

  // const handleSubmit = (event) => {
  //     event.preventDefault();
  // const contentRaw = convertToRaw(editorState.getCurrentContent());
  // const newDaily = {
  //   message: JSON.stringify(contentRaw),
  // };
  // try {
  //   const { data } = await createDaily({
  //     ...newDaily,
  //   });
  //   history.push("/profile");
  // } catch (err) {
  //   console.log(await err.response);
  // }
  //     const { data } = await updateDaily(dailyId, {...state});
  //       console.log("data", data);
  //       history.push("/dailys");
  // }
  return (
    <div>
      <p>Update Daily</p>
      {message ? <RichEditor/> : <p>loading ...</p>}
      
      <button className="UpdateButton">Update</button>
    </div>
  );
}
