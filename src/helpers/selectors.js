export default function getAppointmentsForDay(state, day) {

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
