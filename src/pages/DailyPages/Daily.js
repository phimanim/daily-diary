import { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { getDailyById, deleteDaily } from "../../api";
import { Editor, EditorState, convertFromRaw } from "draft-js";
import ColorStyleMap from "../../components/Text/controls/Color/ColorStyleMap";
import "../../assets/stylesheets/TextEditor.css";

function Daily() {
  const { dailyId } = useParams();

  const [dailyData, setDailyData] = useState(null);
  const [message, setMessage] = useState(EditorState.createEmpty());
  const [dayName, setdayName] = useState(null);

  async function getDailyData() {
    const { data } = await getDailyById(dailyId);
    setDailyData(data);
    const contentState = convertFromRaw(JSON.parse(data.message));
    const editorState = EditorState.createWithContent(contentState);
    setMessage(editorState);
    setdayName(new Date(data.createdAt));
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

  function getWeekNumber (date){
    let firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    let numberOfDays = Math.floor((date - firstDayOfYear) / (24 * 60 * 60 * 1000));
    let result = Math.ceil((date.getDay() + 1 + numberOfDays) / 7);
   return result
  }

  return (
    <div
      className="Daily"
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <p>
        {dayName?.toLocaleString("fr-FR", { weekday: "long" })}{" "}
        {dayName?.toLocaleString("fr-FR", { day: "numeric" })}{" "}
        {dayName?.toLocaleString("fr-FR", { month: "long" })}{" "}
      </p>
      <div className="TextEditorContainer">
        <div className="TextEditor DailyEditor">
          <Editor
            editorState={message}
            customStyleMap={ColorStyleMap}
            readOnly={true}
          />
        </div>
        <div
          className="UpdateButtons"
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Link className="EditorButton" to={`/dailys/${dailyId}/update`}>
            Update daily
          </Link>
          <button className="EditorButton" onClick={handleDelete}>
            Delete daily
          </button>
        </div>
      </div>
    </div>
  );
}

export default Daily;
