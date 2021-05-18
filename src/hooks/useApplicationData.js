import { useEffect, useState } from "react";
import axios from "axios";

export default function useApplicationData() {
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

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    let days = updateSpots(appointments, state.day, state.days);

    const urlAppointments = `http://localhost:8001/api/appointments/${id}`;
    return axios.put(urlAppointments, appointment).then(() => {
      setState((prev) => ({ ...prev, appointments, days }));
    });
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const urlAppointments = `http://localhost:8001/api/appointments/${id}`;
    let days = updateSpots(appointments, state.day, state.days);
    return axios.delete(urlAppointments).then(() => {
      setState((prev) => ({ ...prev, appointments, days }));
    });
  }

  function spotsForDay(day, appointments) {
    let spots = 0;
    for (let d of day.appointments) {
      if (!appointments[d].interview) {
        spots++;
      }
    }
    return spots;
  }

  function updateSpots(appointments, dayName, days) {
    let foundDay = days.find((day) => day.name === dayName);
    let spots = spotsForDay(foundDay, appointments);
    let newDay = { ...foundDay, spots };
    return days.map((day) => (day.name === dayName ? newDay : day));
  }

  return { state, setDay, bookInterview, cancelInterview };
}
