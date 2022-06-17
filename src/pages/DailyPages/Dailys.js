import { useState } from "react";
import { Editor, EditorState, convertFromRaw } from "draft-js";
import { getDailys } from "../../api";
import Suspense from "../../components/Suspense";
import { useFetch } from "../../hooks/useFetch";
import ColorStyleMap from "../../components/Text/controls/Color/ColorStyleMap";
import "../../components/Text/TextEditor.css";
import "../../assets/stylesheets/Daily.css";

export default function Dailys() {
  const { data, loading, error } = useFetch(getDailys);

  //filter by term
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = ({ target }) => {
    setSearchTerm(target.value);
  };
  const bySearchTerm = (daily) =>
    daily.message.toLowerCase().includes(searchTerm);

  return (
    <div className="DailysContainer">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        
        <input
          className="SearchInput"
          type="text"
          name="search"
          id="search"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <div className="Dailys">
        <Suspense noData={!data && !loading} error={error} loading={loading}>
          {data ? (
            data
              .filter(bySearchTerm)
              .map((el) => {
                const contentState = convertFromRaw(JSON.parse(el.message));
                const editorState = EditorState.createWithContent(contentState);
                // console.log("conso",new Date(el.createdAt))
                // console.log("conso",(el.createdAt))

                return (
                  <div key={el._id}>
                    <p className="DailyDate">{el.createdAt.slice(0, 10)}</p>
                    <a href={`/dailys/${el._id}`}>
                      <div className="TextEditor ReadOnly">
                        <Editor
                          editorState={editorState}
                          customStyleMap={ColorStyleMap}
                          readOnly={true}
                        />
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
    </div>
  );
}
