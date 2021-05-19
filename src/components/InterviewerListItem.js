import React from "react";
import "./InterviewerListItem.scss";
import classnames from "classnames";

const InterviewerListItem = (props) => {
  // console.log("selected",props.selected)
  const interviewerClass = classnames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  });
  // console.log("interview", props);
    return (
      <li
        className={interviewerClass}
        onClick={() => {
          props.setInterviewer(props.id);
        }}
      >
        <img
          className="interviewers__item-image"
          src={props.avatar}
          alt={props.name}
        />
        {props.selected && props.name}
      </li>
    );
};

export default InterviewerListItem;
