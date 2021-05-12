import React from "react";
import "./InterviewerListItem.scss";
import classnames from "classnames";

const InterviewerListItem = (props) => {
  const interviewerClass = classnames("interviewers__item", {
    "interviewers__item--selected": props.selected 
  });
// console.log(props.id)
  return (
    <li
      className={interviewerClass}
      onClick={()=>{ 
        props.setInterviewer(props.id) 
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
