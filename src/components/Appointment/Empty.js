import React from "react";
import "components/Appointment/styles.scss";

const Empty = (props) => {
  return (
    <main className="appointment__add">
      <img
        className="appointment__add-button"
        src="images/add.png"
        alt="Add"
        data-cy="Add"
        onClick={props.onAdd}
      />
    </main>
  );
};

export default Empty;
