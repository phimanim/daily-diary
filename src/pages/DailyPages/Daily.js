import { useParams, useHistory, Link } from "react-router-dom";
import { getDailyById, deleteDaily } from "../../api";
import { Editor, EditorState, convertFromRaw } from "draft-js";
import { useState, useEffect } from "react";
import "../../components/Text/TextEditor.css";
function Daily() {
  const { dailyId } = useParams();

  const [dailyData, setDailyData] = useState(null);
  const [message, setMessage] = useState(EditorState.createEmpty());

  async function getDailyData() {
    const { data } = await getDailyById(dailyId);
    setDailyData(data);
    const contentState = convertFromRaw(JSON.parse(data.message));
    const editorState = EditorState.createWithContent(contentState);
    setMessage(editorState);
  }

  useEffect(() => {
    if (dailyId) {
      getDailyData();
    }
  }, [dailyId]);

  const history = useHistory();
  const handleDelete = () => {
    deleteDaily(dailyId);
    history.push("/dailys");
  };

  return (
    <div className="Daily" style={{display:"flex",flexDirection:"column", alignItems:"center"}}>
      <h2 className="DailyDate"  style={{padding:"0", margin:"0"}}>Daily {dailyData?.createdAt.slice(0,10)}</h2>
      <p ></p>
      <div className="TextEditorContainer">
      <div className="TextEditor TypingText">
      <Editor editorState={message} readOnly={true} />

      </div>
      <div className="UpdateButtons" style={{display:"flex",flexDirection:"row", alignItems:"center"}}>
        <Link className="EditorButton" to={`/dailys/${dailyId}/update`}>Update daily</Link>
      <button className="EditorButton" onClick={handleDelete}>Delete daily</button>

      </div>
      
      </div>
     
    </div>
  );
}

export default Daily;
