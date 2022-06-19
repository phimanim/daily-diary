import { useState } from "react";
import { useFetch } from "../hooks/useFetch";
import Suspense from "../components/Suspense";
import { getDailys } from "../api";
import { DateRangePicker } from "react-dates";
import moment from "moment";
import ColorStyleMap from "../components/Text/controls/Color/ColorStyleMap";
import { Editor, EditorState, convertFromRaw } from "draft-js";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import "../components/Text/TextEditor.css";
import "../assets/stylesheets/Daily.css";

export default function DateRange() {
  const { data, loading, error } = useFetch(getDailys);
  const currentMoment = moment();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [focusedInput, setFocusedInput] = useState();
  const [selectedYear, setSelectedYear] = useState(currentMoment.year());
  const [selectedWeek, setSelectedWeek] = useState(currentMoment.isoWeek());
  console.log("🚀 ~ file: DateRange.js ~ line 22 ~ DateRange ~ selectedWeek", selectedWeek)

  const dateRange = (daily) => {
    let date = new Date(daily.createdAt);
    return date >= startDate && date <= endDate;
  };

  return (
    <div>
      <p>Select a date range:</p>
      <DateRangePicker
        numberOfMonths={1}
        startDate={startDate}
        startDateId="start-date"
        endDate={endDate}
        endDateId="end-date"
        onDatesChange={({ startDate, endDate }) => {
          setStartDate(startDate);
          setEndDate(endDate);
          setSelectedWeek(startDate.isoWeek())
        }}
        focusedInput={focusedInput}
        onFocusChange={(focusedInput) => setFocusedInput(focusedInput)}
        isOutsideRange={(day) => moment().diff(day) < 0}
      />

      <div className="Dailys">
        <Suspense noData={!data && !loading} error={error} loading={loading}>
          {data?.filter(dateRange).map((daily) => {
            const contentState = convertFromRaw(JSON.parse(daily.message));
            const editorState = EditorState.createWithContent(contentState);
            return (
              <div key={daily._id}>
                <p>{daily.createdAt.slice(0, 10)}</p>
                <div className="TextEditor ReadOnly">
                  <Editor
                    editorState={editorState}
                    customStyleMap={ColorStyleMap}
                    readOnly={true}
                  />
                </div>
              </div>
            );
          })}
        </Suspense>
      </div>
    </div>
  );
}
