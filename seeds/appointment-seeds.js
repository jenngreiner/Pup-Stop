const { Appointment } = require("../models");

const appointmentData = [
  {
    user_id: "1",
    yard_id: "3",
    datetime: "2021-05-12",
    num_pets: "2",
  },
  {
    user_id: "1",
    yard_id: "2",
    datetime: "2021-04-28",
    num_pets: "2",
  },
  {
    user_id: "2",
    yard_id: "1",
    datetime: "2021-04-18",
    num_pets: "1",
  },
  {
    user_id: "3",
    yard_id: "1",
    datetime: "2021-05-12",
    num_pets: "4",
  },
];

const seedAppointments = () => Appointment.bulkCreate(appointmentData);

module.exports = seedAppointments;
