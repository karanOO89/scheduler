export function getAppointmentsForDay(state, day) {
  const result = [];
  state.days.map((arDay) => {
    if (arDay.name === day) {
      arDay.appointments.map((apId) => {
        result.push(state.appointments[apId]);
      });
    }
  });
  return result;
}
export function getInterview(state, interview) {
  let result = null;
  for (let app in state["appointments"]) {
    if (state["appointments"][app]["interview"] === interview && interview) {
      result = {
        student: state["appointments"][app]["interview"]["student"],
        interviewer:
          state["interviewers"][
            `${state["appointments"][app]["interview"]["interviewer"]}`
          ],
      };
    }
  }
  return result;
}
export function getInterviewersForDay(state, day) {
  const result = [];
  state.days.map((arDay) => {
    if (arDay.name === day) {
      arDay.interviewers.map((apId) => {
        result.push(state.interviewers[apId]);
      });
    }
  });
  return result;
}
