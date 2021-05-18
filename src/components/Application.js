import React from "react";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "components/Appointment/index";
import {
  getAppointmentsForDay,
  getInterviewersForDay,
  getInterview,
} from "../helpers/selectors";
import useApplicationData from "../hooks/useApplicationData";

export default function Application(props) {

  const { state, setDay, bookInterview, cancelInterview } =
    useApplicationData();

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviewers = getInterviewersForDay(state, state.day);
  const interviewersList = dailyInterviewers.map((interviewers) => {
    return { ...interviewers };
  });

 
  
  const appointmentList = dailyAppointments.map((appointment) => {

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        bookInterview={bookInterview}
        interview={getInterview(state, appointment.interview)}
        cancelInterview={cancelInterview}
        interviewers={interviewersList}
        {...appointment}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day}  setDay={setDay} />
        </nav>

        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">{appointmentList}</section>
    </main>
  );
}
