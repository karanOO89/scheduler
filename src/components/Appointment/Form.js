import React, { useState } from "react";
import Button from "../Button";
import InterviewerList from "../InterviewerList";

const Form = (props) => {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [nameError, setNameError] = useState("");
  const [interviewerError, setInterviewerError] = useState("");

  const reset = () => {
    setName("");
    setInterviewer(null);
  };
  const cancel = () => {
    reset();
    props.onCancel();
  };
  // function validate(name, interviewer) {
 
  //   if (name === "") {
  //     setNameError("Student name cannot be blank");
  //     return ;
  //   }
  //   setNameError("");
  //   props.onSave(name, interviewer);
  // }
  function validate(name, interviewer) {
    if (name !== "" && interviewer) {
      setNameError("");
      setInterviewerError("");
      props.onSave(name, interviewer);
    }
    if (name !== "" && !interviewer) {
      setNameError("");
      setInterviewerError("Please select Interviewer");
      return;
    }
    if (interviewer && name === "") {
      setNameError("Student name cannot be blank");
      setInterviewerError("");
      return;
    }
    if (name === "") {
      setNameError("Student name cannot be blank");
      return;
    }
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name={"name"}
            type="text"
            placeholder="Enter Student Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            data-testid="student-name-input"
          />
          <section className="appointment__validation">{nameError}</section>
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          interviewer={interviewer}
          setInterviewer={setInterviewer}
        />
        <section className="appointment__validation">
          {interviewerError}
        </section>
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          <Button confirm onClick={() => validate(name, interviewer)}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
};
export default Form;
