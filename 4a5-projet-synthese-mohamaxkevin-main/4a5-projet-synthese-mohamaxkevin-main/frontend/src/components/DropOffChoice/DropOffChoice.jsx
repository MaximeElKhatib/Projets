import React, { useState } from "react";
import "./DropOffChoice.css";

export const ReactChoix = (props) => {
  const [valeurSelectionnee, setValeurSelectionnee] = useState("");

  const options = [
    { label: "Same drop-off location", value: 1 },
    { label: "Different drop-off location", value: 2 },
  ];

  const changeSameLocation = (event) => {
    setValeurSelectionnee(event.target.value);
    if (event.target.value == "Same drop-off location") {
      props.modifySameLocation(false);
    } else {
      props.modifySameLocation(true);
    }
  };

  return (
    <div className="drop-off-choice">
      <select
        className="drop"
        onChange={changeSameLocation}
        value={valeurSelectionnee}
      >
        <option value="Same drop-off location">Same drop-off Location</option>
        <option value="Different drop-off location">
          Different drop-off Location
        </option>
      </select>
    </div>
  );
};
