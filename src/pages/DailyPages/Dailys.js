import { Editor, EditorState, convertFromRaw } from "draft-js";
import { getDailys } from "../../api";
import Suspense from "../../components/Suspense";
import { useFetch } from "../../hooks/useFetch";
import "../../components/Text/TextEditor.css";

export default function Dailys() {
  const { data, loading, error } = useFetch(getDailys);
  return (
    <div
      className="Dailys"
      style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}
    >
      <Suspense noData={!data && !loading} error={error} loading={loading}>
        {data ? (
          data.map((el) => {
            const contentState = convertFromRaw(JSON.parse(el.message));
            const editorState = EditorState.createWithContent(contentState);
            console.log("data",data)
            return (
              <div
                className="TextEditor ReadOnly"
                key={el._id}
              >
                <p>{el.createdAt.slice(0,10)}</p>
                <Editor editorState={editorState} readOnly={true} />
              </div>
            );
          })
        ) : (
          <div>
            <p> Vous n'avez pas encore de daily </p>
            <a href="/new-daily">Ecrire</a>{" "}
          </div>
        )}
      </Suspense>
    </div>
  );
}
