import { Editor, EditorState, convertFromRaw } from "draft-js";
import { getDailys } from "../../api";
import Suspense from "../../components/Suspense";
import { useFetch } from "../../hooks/useFetch";
import "../../components/Text/TextEditor.css";
import "../../assets/stylesheets/Daily.css";


export default function Dailys() {
  const { data, loading, error } = useFetch(getDailys);
  return (
    <div
      className="Dailys"    >
      <Suspense noData={!data && !loading} error={error} loading={loading}>
        {data ? (
          data.map((el) => {
            const contentState = convertFromRaw(JSON.parse(el.message));
            const editorState = EditorState.createWithContent(contentState);
            return (
              <div key={el._id}>
              <p className="DailyDate">{el.createdAt.slice(0,10)}</p>
              <a href={`/dailys/${el._id}`}>
              <div
                className="TextEditor ReadOnly"
                
              >

                
                <Editor editorState={editorState} readOnly={true} />
              </div>
              </a>
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
