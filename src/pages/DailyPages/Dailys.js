import { Editor, EditorState, convertFromRaw } from "draft-js";
import { getDailys } from "../../api";
import Suspense from "../../components/Suspense";
import { useFetch } from "../../hooks/useFetch";

export default function Dailys(){
  const { data, loading, error } = useFetch(getDailys);
  return (
    <div className="posts">
      <Suspense noData={!data && !loading} error={error} loading={loading}>
        {data ? data.map((el) => {
          const contentState = convertFromRaw(JSON.parse(el.message));
          const editorState = EditorState.createWithContent(contentState);
          return (
            <div key={el._id} style={{ paddingTop: "3rem", width: "500px", border:"black 2px"}}>
              <Editor editorState={editorState} readOnly={true} />
            </div>
          );
        }) : <div><p> Vous n'avez pas encore de daily </p><a href="/new-daily">Ecrire</a> </div>}
      </Suspense>
    </div>
  );
};
