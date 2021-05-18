import React, { useEffect, useState } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "components/Appointment/index";
import {
  getAppointmentsForDay,
  getInterviewersForDay,
  getInterview,
} from "../helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });
  const setDay = (dayName) => {
    setState((prev) => ({ ...prev, day: dayName }));
  };
  useEffect(() => {
    const urlDays = "http://localhost:8001/api/days";
    const urlAppointments = "http://localhost:8001/api/appointments";
    const urlInterviwers = "http://localhost:8001/api/interviewers";
    Promise.all([
      axios.get(urlDays),
      axios.get(urlAppointments),
      axios.get(urlInterviwers),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  // console.log("application",state)
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviewers = getInterviewersForDay(state, state.day);
  const interviewersList = dailyInterviewers.map((interviewers) => {
    return { ...interviewers };
  });

  // function help(transition) {

  // }







  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    setState((prev) => ({ ...prev, appointments }));
    const urlAppointments = `http://localhost:8001/api/appointments/${id}`;
    return axios.put(urlAppointments, appointment);
  }






  function cancelInterview(id) {
    const urlAppointments = `http://localhost:8001/api/appointments/${id}`;
    return axios.delete(urlAppointments);
  }

  const appointmentList = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        bookInterview={bookInterview}
        interview={interview}
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
          <DayList days={state.days} day={state.day} setDay={setDay} />
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
