const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  yard_id: {
    type: Schema.Types.ObjectId,
    ref: "Yard",
  },
  num_pets: { Number, default: 0 },
  date: { type: Date },
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
