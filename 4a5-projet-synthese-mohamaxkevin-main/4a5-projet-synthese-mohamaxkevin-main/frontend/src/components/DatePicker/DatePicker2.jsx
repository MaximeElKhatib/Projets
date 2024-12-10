import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DatePicker.css";

export const ReactDatePicker2 = ({ setEndDate }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setEndDate(date.toISOString());
  };

  return (
    <>
      <div className="label-date">
        <label id="drop-off">Drop-off date</label>
        <div className="date-picker">
          <DatePicker
            className="date"
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="yyyy-MM-dd"
            showYearDropdown
            scrollableMonthYearDropdown
            placeholderText="Date"
          />
        </div>
      </div>
    </>
  );
};
