import { useState } from "react";
import { Editor, EditorState, convertFromRaw } from "draft-js";
import { getDailys } from "../../api";
import Suspense from "../../components/Suspense";
import { useFetch } from "../../hooks/useFetch";
import { DateRangePicker } from "react-dates";
import moment from "moment";
import ColorStyleMap from "../../components/Text/controls/Color/ColorStyleMap";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import "../../components/Text/TextEditor.css";
import "../../assets/stylesheets/Daily.css";

export default function Dailys() {
  const { data, loading, error } = useFetch(getDailys);

  //filter by date
  const [startDate, setStartDate] = useState(moment().startOf("month"));
  const [endDate, setEndDate] = useState(moment());
  const [focusedInput, setFocusedInput] = useState();
  const dateRange = (daily) => {
    let date = new Date(daily.createdAt);
    return date >= startDate && date <= endDate;
  };
  //filter by term
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = ({ target }) => {
    setSearchTerm(target.value);
  };
  const bySearchTerm = (daily) =>
    daily.message.toLowerCase().includes(searchTerm);

  return (
    <div className="DailysContainer">
       <h1>All your dailys</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "baseline",
          justifyContent:"space-around"
        }}
      >
       
        <DateRangePicker
          numberOfMonths={1}
          startDate={startDate}
          startDateId="start-date"
          endDate={endDate}
          endDateId="end-date"
          onDatesChange={({ startDate, endDate }) => {
            setStartDate(startDate);
            setEndDate(endDate);
          }}
          focusedInput={focusedInput}
          onFocusChange={(focusedInput) => setFocusedInput(focusedInput)}
          isOutsideRange={(day) => moment().diff(day) < 0}
        />
        <input
          className="SearchInput"
          type="text"
          name="search"
          id="search"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <div className="Dailys">
        <Suspense noData={!data && !loading} error={error} loading={loading}>
          {data ? (
            data
              .filter(dateRange)
              .filter(bySearchTerm)
              .map((el) => {
                const contentState = convertFromRaw(JSON.parse(el.message));
                const editorState = EditorState.createWithContent(contentState);
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
